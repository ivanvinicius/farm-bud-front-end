import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import IProductsProps from '../../dtos/IProductsProps';

import { Container } from './styles';

interface IProduct {
  product: IProductsProps;
}

const CreateProductMeasure: React.FC = () => {
  const { product } = useLocation().state as IProduct;

  return (
    <Container>
      <Header urlBack="/products" />

      <p>{product.name}</p>
    </Container>
  );
};

export default CreateProductMeasure;
