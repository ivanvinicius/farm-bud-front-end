import React, { useState, useEffect } from 'react';

import api from '../../../services/api';
import Header from '../../../components/Header';
import Table from '../../../components/Table';

import { Container } from './styles';

interface IProductMeasureProps {
  id: string;
}

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
      <Header />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {productsMeasures.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListProductMeasure;
