import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';
import Header from '../../../components/Header';
import Table from '../../../components/Table';
import IProductsProps from '../../../dtos/IProductsProps';

import { Container } from './styles';

const ListProducts: React.FC = () => {
  const history = useHistory();
  const [products, setProducts] = useState<IProductsProps[]>([]);

  useEffect(() => {
    api.get('products').then((response) => {
      const formattedProducts = response.data.map(
        (product: IProductsProps) => ({
          ...product,
          formattedComposition:
            product.composition === null ? 'Não contém' : product.composition,
        }),
      );

      setProducts(formattedProducts);
    });
  }, []);

  const navigateToCreateProductMeasure = useCallback(
    (product: IProductsProps) => {
      return history.push(`create-product-measure`, { product });
    },
    [history],
  );

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Selecione um Produto" />

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Categoria</th>
            <th>Subcategoria</th>
            <th>Composição</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => navigateToCreateProductMeasure(product)}
            >
              <td>{product.name}</td>
              <td>{product.brand.name}</td>
              <td>{product.subcategory.category.name}</td>
              <td>{product.subcategory.name}</td>
              <td>{product.formattedComposition}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListProducts;
