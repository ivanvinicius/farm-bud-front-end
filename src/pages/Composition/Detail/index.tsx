/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
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

const CompositionDetail: React.FC = () => {
  const { item } = useLocation().state as ILocationProps;
  const [compositionItems, setCompositionItems] = useState<ICompositionProps[]>(
    [],
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const formattedPrices: Array<number> = [0];

    compositionItems.map(({ price }) =>
      formattedPrices.push(parseFloat(price)),
    );

    const total = formattedPrices.reduce(
      (acc, currentValue) => acc + currentValue,
    );

    setTotalPrice(total);
  }, [compositionItems]);

  useEffect(() => {
    api
      .get('/providers-compositions', {
        params: {
          culture_id: String(item.culture_id),
          productivity: Number(item.productivity),
        },
      })
      .then((response) => {
        const formattedItems = response.data.map((currentItem: any) => ({
          ...currentItem,
          formatted_price: `R$ ${formatToStringBRL(currentItem.price)}`,
          formatted_recommendation: `${formatToStringBRL(
            currentItem.recommendation,
          )} ${currentItem.measure_name}`,
          formatted_size: `${formatToStringBRL(currentItem.size)} ${
            currentItem.measure_name
          }(s)`,
        }));

        setCompositionItems(formattedItems);
      });
  }, [item]);

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
          <strong>Quantidade de produtos:</strong>
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
          }: ICompositionProps) => (
            <ItemOfList key={id}>
              <ItemInfo>
                <div>
                  <strong>{`${product_name}  `}</strong>
                  <p>{formatted_size}</p>
                </div>

                <p>{formatted_price}</p>
              </ItemInfo>

              <RecommendationArea>
                <p>{`${formatted_recommendation} em 1 hectere`}</p>
              </RecommendationArea>
            </ItemOfList>
          ),
        )}
      </List>
    </>
  );
};

export default CompositionDetail;
