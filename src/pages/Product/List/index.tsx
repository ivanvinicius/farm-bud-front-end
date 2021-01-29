import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';

import api from '../../../services/api';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IProductsProps from '../../../dtos/Product/List/IProductsProps';

import { Container } from './styles';

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<IProductsProps[]>([]);

  const tableColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Produto',
        columns: [
          {
            Header: 'ID',
            accessor: 'product_id',
          },
          {
            Header: 'Nome',
            accessor: 'product_name',
          },
          {
            Header: 'Composição',
            accessor: 'product_composition',
          },
        ],
      },
      {
        Header: 'Marca',
        columns: [
          {
            Header: 'ID Marca',
            accessor: 'brand_id',
          },
          {
            Header: 'Nome',
            accessor: 'brand_name',
          },
        ],
      },
      {
        Header: 'Categoria',
        columns: [
          {
            Header: 'ID Categoria',
            accessor: 'category_id',
          },
          {
            Header: 'Nome',
            accessor: 'category_name',
          },
          {
            Header: 'ID Subcategoria',
            accessor: 'subcategory_id',
          },
          {
            Header: 'Subcategoria',
            accessor: 'subcategory_name',
          },
        ],
      },
    ],
    [],
  );

  const hideTableColumns = useMemo(
    () => ['product_id', 'brand_id', 'category_id', 'subcategory_id'],
    [],
  );

  useEffect(() => {
    api.get('products').then((response) => {
      const formattedProducts = response.data.map((item: IProductsProps) => ({
        ...item,
        product_composition: !item.product_composition
          ? 'Não contém'
          : item.product_composition,
      }));

      setProducts(formattedProducts);
    });
  }, []);

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Selecione um Produto" />

      <Table
        data={[...products, ...products, ...products]} // just for test pagination
        columns={tableColumns}
        hideColumns={hideTableColumns}
        useFilter
      />
    </Container>
  );
};

export default ListProducts;
