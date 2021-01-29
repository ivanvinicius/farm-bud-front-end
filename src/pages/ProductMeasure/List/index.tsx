import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';
import formatToNumericBRL from '../../../utils/formatToNumericBRL';
import IProductMeasureProps from '../../../dtos/IProductMeasureProps';
import Header from '../../../components/Header';
import Table from '../../../components/Table';

import { Container } from './styles';

interface IFormattedProductMeasureProps extends IProductMeasureProps {
  formattedVolume?: string;
  formattedPrice?: string;
}

const ListProductMeasure: React.FC = () => {
  const history = useHistory();
  const [productsMeasures, setProductsMeasures] = useState<
    IFormattedProductMeasureProps[]
  >([]);

  const navigateToUpdateProductMeasure = useCallback(
    async (productMeasure: IFormattedProductMeasureProps) => {
      return history.push('update-product-measure', { productMeasure });
    },
    [history],
  );

  useEffect(() => {
    api.get('/products-measures').then((response) => {
      const formattedProducts = response.data.map(
        (item: IProductMeasureProps) => ({
          ...item,
          formattedVolume: formatToNumericBRL(item.volume),
          formattedPrice: formatToNumericBRL(item.price),
          formattedComposition:
            item.product.composition === null
              ? 'Não contém'
              : item.product.composition,
        }),
      );

      setProductsMeasures(formattedProducts);
    });
  }, []);

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Meus Produtos" />

      {/* <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Volume</th>
            <th>Preço</th>
            <th>Composição</th>
          </tr>
        </thead>
        <tbody>
          {productsMeasures.map((item) => (
            <tr
              key={item.id}
              onClick={() => navigateToUpdateProductMeasure(item)}
            >
              <td>{item.product.name}</td>
              <td>{item.product.subcategory.category.name}</td>
              <td>{item.product.brand.name}</td>
              <td>{`${item.formattedVolume} ${item.measure.name}`}</td>
              <td>{`R$ ${item.formattedPrice}`}</td>
              <td>{item.formattedComposition}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
};

export default ListProductMeasure;
