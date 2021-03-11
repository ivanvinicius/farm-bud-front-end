import React, { useEffect, useMemo } from 'react';
import { Column } from 'react-table';

import api from '../../../services/api';
import { useTableContext } from '../../../hooks/table';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IProductsProps from '../../../dtos/Product/IProductsProps';

import { Container } from './styles';

const ListProducts: React.FC = () => {
  const { setData } = useTableContext();

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Produto',
        accessor: 'product_name',
      },
      {
        Header: 'Marca',
        accessor: 'brand_name',
      },

      {
        Header: 'Categoria',
        accessor: 'category_name',
      },
      {
        Header: 'Subcategoria',
        accessor: 'subcategory_name',
      },
      {
        Header: 'Composição',
        accessor: 'product_composition',
      },

      {
        Header: 'ID',
        accessor: 'product_id',
      },
      {
        Header: 'ID Marca',
        accessor: 'brand_id',
      },
      {
        Header: 'ID Categoria',
        accessor: 'category_id',
      },
      {
        Header: 'ID Subcategoria',
        accessor: 'subcategory_id',
      },
    ],
    [],
  );

  const hideColumns = useMemo(
    () => ['product_id', 'brand_id', 'category_id', 'subcategory_id'],
    [],
  );

  const tableActions = useMemo(
    () => ({ create: { url: '/create-product-measure' } }),
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

      setData(formattedProducts);
    });
  }, [setData]);

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Selecione um Produto" />

      <Table
        tableHeaderColumns={headerColumns}
        hidedColumns={hideColumns}
        actions={tableActions}
      />
    </Container>
  );
};

export default ListProducts;
