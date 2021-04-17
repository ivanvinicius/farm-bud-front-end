import React, { useEffect, useMemo } from 'react';
import { Column } from 'react-table';

import api from '../../../services/api';
import { useTableContext } from '../../../hooks/table';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IProductsProps from '../../../dtos/IProductsProps';

import { Container } from './styles';

const ListProducts: React.FC = () => {
  const { setData } = useTableContext();

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Produto',
        accessor: 'name',
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
        accessor: 'composition',
      },

      {
        Header: 'ID',
        accessor: 'id',
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
    () => ['id', 'brand_id', 'category_id', 'subcategory_id'],
    [],
  );

  const tableActions = useMemo(
    () => ({ create: { url: '/create-portfolio' } }),
    [],
  );

  useEffect(() => {
    api.get('products').then((response) => {
      const formattedProducts = response.data.map((item: IProductsProps) => ({
        ...item,
        composition: !item.composition ? 'Não contém' : item.composition,
      }));

      setData(formattedProducts);
    });
  }, [setData]);

  return (
    <Container>
      <Header urlBack="/portfolio" headerTitle="Produtos" />

      <Table
        tableHeaderColumns={headerColumns}
        hidedColumns={hideColumns}
        actions={tableActions}
      />
    </Container>
  );
};

export default ListProducts;
