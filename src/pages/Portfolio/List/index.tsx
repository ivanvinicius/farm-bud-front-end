import React, { useEffect, useMemo } from 'react';
import { Column } from 'react-table';
import { Link } from 'react-router-dom';

import api from '../../../services/api';
import formatToStringBRL from '../../../utils/formatToStringBRL';
import { useTableContext } from '../../../hooks/table';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IPortfolioProps from '../../../dtos/IPortfolioProps';

import { Container, AddProductsContainer } from './styles';

const ListPortfolio: React.FC = () => {
  const { setData } = useTableContext();

  useEffect(() => {
    api.get('/portfolios').then((response) => {
      const formattedData = response.data.map((item: IPortfolioProps) => ({
        ...item,
        price: formatToStringBRL(item.price),
        size: formatToStringBRL(item.size),
        formatted_price: `R$ ${formatToStringBRL(item.price)}`,
        formatted_size: `${formatToStringBRL(item.size)} ${item.measure_name}`,

        product_composition:
          item.product_composition === null
            ? 'Não contém'
            : item.product_composition,
      }));

      setData(formattedData);
    });
  }, [setData]);

  const headerColumns = useMemo(
    (): Column[] => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Produto',
        accessor: 'product_name',
      },
      {
        Header: 'Valor',
        accessor: 'formatted_price',
      },
      {
        Header: 'Marca',
        accessor: 'brand_name',
      },
      {
        Header: 'Tamanho',
        accessor: 'formatted_size',
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
        Header: 'Provider ID',
        accessor: 'provider_id',
      },
      {
        Header: 'Product ID',
        accessor: 'product_id',
      },

      {
        Header: 'Measure ID',
        accessor: 'measure_id',
      },
      {
        Header: 'Subcategory ID',
        accessor: 'subcategory_id',
      },
      {
        Header: 'Brand ID',
        accessor: 'brand_id',
      },
      {
        Header: 'Category ID',
        accessor: 'category_id',
      },
      {
        Header: 'Measure Name',
        accessor: 'measure_name',
      },
    ],
    [],
  );

  const hideColumns = useMemo(
    () => [
      'id',
      'provider_id',
      'product_id',
      'measure_id',
      'subcategory_id',
      'brand_id',
      'category_id',
      'measure_name',
    ],
    [],
  );

  const tableActions = useMemo(
    () => ({
      update: {
        url: '/update-portfolio',
      },

      delete: {
        url: '/portfolio',
        columnNameAccessor: 'id',
      },
    }),
    [],
  );

  return (
    <Container>
      <Header urlBack="/" headerTitle="Portfólio" />

      <AddProductsContainer>
        <strong>Adicionar produto ao portfólio</strong>

        <Link to="/products">Adicionar</Link>
      </AddProductsContainer>

      <Table
        tableHeaderColumns={headerColumns}
        hidedColumns={hideColumns}
        actions={tableActions}
      />
    </Container>
  );
};

export default ListPortfolio;
