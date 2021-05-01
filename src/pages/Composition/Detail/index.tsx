/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../components/Header';
import api from '../../../services/api';
import ICompositionProps from '../../../dtos/ICompositionProps';
import formatToStringBRL from '../../../utils/formatToStringBRL';

import {
  HeaderInfo,
  List,
  ItemOfList,
  ItemInfo,
  RecommendationArea,
} from './styles';

interface ILocationProps {
  item: {
    culture_id: string;
    culture_name: string;
    productivity: number;
    productivity_description: string;
    provider_id: string;
    provider_name: string;
  };
}

interface ICalculateTotalProps {
  size: number;
  recommendation: number;
  price: number;
}

const CompositionDetail: React.FC = () => {
  const { item } = useLocation().state as ILocationProps;
  const [compositionItems, setCompositionItems] = useState<ICompositionProps[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const formattedPrices: Array<number> = [0];

    compositionItems.map(({ total }) => formattedPrices.push(total.price));

    const total = formattedPrices.reduce(
      (acc, currentValue) => acc + currentValue,
    );

    setTotalPrice(total);
  }, [compositionItems]);

  const calculateTotalPrice = useCallback(
    ({ size, recommendation, price }: ICalculateTotalProps) => {
      let count = 1;
      const originalSize = size;
      let restDivision = 0;

      restDivision = recommendation % originalSize;

      if (size < recommendation) {
        while (size <= recommendation) {
          count += 1;
          size += size;
        }

        if (restDivision !== 0) {
          count += 1;
        }

        return {
          amount: count,
          price: count * price,
        };
      }

      return {
        amount: count,
        price,
      };
    },
    [],
  );

  useEffect(() => {
    api
      .get('/providers-compositions', {
        params: {
          culture_id: String(item.culture_id),
          productivity: Number(item.productivity),
        },
      })
      .then((response) => {
        const formattedItems = response.data.map((current: any) => ({
          ...current,
          formatted_price: `R$ ${formatToStringBRL(current.price)}`,
          formatted_recommendation: `${formatToStringBRL(
            current.recommendation,
          )} ${current.measure_name}`,
          formatted_size: `${formatToStringBRL(current.size)} ${
            current.measure_name
          }`,

          total: calculateTotalPrice({
            size: parseFloat(current.size),
            recommendation: parseFloat(current.recommendation),
            price: parseFloat(current.price),
          }),
        }));

        setCompositionItems(formattedItems);
      });
  }, [item, calculateTotalPrice]);

  return (
    <>
      <Header urlBack="/composition" headerTitle="Detalhes da Composição" />

      <HeaderInfo>
        <div>
          <strong>Cultura:</strong>
          <p>{item.culture_name}</p>
          <br />
          <strong>Nível de produtividade:</strong>
          <p>{item.productivity_description}</p>
        </div>

        <div>
          <strong>Total de itens:</strong>
          <p>{compositionItems.length}</p>
          <br />
          <strong>Valor da composição:</strong>
          <p>{`R$ ${formatToStringBRL(String(totalPrice))}`}</p>
        </div>
      </HeaderInfo>
      <List>
        {compositionItems.map(
          ({
            id,
            product_name,
            formatted_size,
            formatted_price,
            formatted_recommendation,
            total,
          }: ICompositionProps) => (
            <ItemOfList key={id}>
              <ItemInfo>
                <strong>{product_name}</strong>
                <p>{`Tamanho: ${formatted_size}`}</p>
                <p>{`Valor: ${formatted_price}`}</p>
              </ItemInfo>

              <RecommendationArea>
                <strong>Recomendação para 1 hectare</strong>
                <p>{`Recomendação: ${formatted_recommendation} / ${total.amount} unidades`}</p>
                <p>{`Valor total: R$ ${formatToStringBRL(String(total.price))}`}</p> {/*eslint-disable-line*/}
              </RecommendationArea>
            </ItemOfList>
          ),
        )}
      </List>
    </>
  );
};

export default CompositionDetail;
