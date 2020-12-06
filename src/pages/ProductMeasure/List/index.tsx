import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import formatToCurrency from '../../../utils/formatToCurrency';
import IProductMeasureProps from '../../../dtos/IProductMeasureProps';
import Header from '../../../components/Header';
import Table from '../../../components/Table';

import { Container } from './styles';

const ListProductMeasure: React.FC = () => {
  const [productsMeasures, setProductsMeasures] = useState<
    IProductMeasureProps[]
  >([]);

  useEffect(() => {
    api
      .get('/products-measures')
      .then((response) => setProductsMeasures(response.data));
  }, []);

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Meus Produtos" />

      <Table>
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
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.product.subcategory.category.name}</td>
              <td>{item.product.brand.name}</td>
              <td>
                {item.volume}
                {item.measure.name}
              </td>
              <td>{formatToCurrency(item.price)}</td>
              <td>{item.product.composition}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListProductMeasure;
