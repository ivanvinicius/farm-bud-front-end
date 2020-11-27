import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import api from '../../services/api';

import { Container, Content, Table } from './styles';

interface IProductsProps {
  id: string;
  name: string;
  composition?: string;
  brand: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProductsProps[]>([]);

  useEffect(() => {
    api.get('products').then((response) => setProducts(response.data));
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Composição</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <Link to={`product/${product.id}`} key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.brand.name}</td>
                  <td>{product.composition}</td>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default Products;
