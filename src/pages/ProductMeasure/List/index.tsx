import React, { useState, useEffect, useMemo } from 'react';
import { Column } from 'react-table';

import api from '../../../services/api';
import formatToNumericBRL from '../../../utils/formatToNumericBRL';

import Header from '../../../components/Header';
import Table from '../../../components/Table';

import IProductMeasureProps from '../../../dtos/ProductMeasure/IProductMeasureProps';

import { Container } from './styles';

const ListProductMeasure: React.FC = () => {
  const [productsMeasures, setProductsMeasures] = useState<
    IProductMeasureProps[]
  >([]);

  useEffect(() => {
    api.get('/products-measures').then((response) => {
      const formattedData = response.data.map((item: IProductMeasureProps) => ({
        ...item,

        productmeasure_price: `R$ ${formatToNumericBRL(
          item.productmeasure_price,
        )}`,

        productmeasure_volume: `${formatToNumericBRL(
          item.productmeasure_volume,
        )} ${item.productmeasure_measure_name}`,

        productmeasure_product_composition:
          item.productmeasure_product_composition === null
            ? 'Não contém'
            : item.productmeasure_product_composition,
      }));

      setProductsMeasures(formattedData);
    });
  }, []);

  const tableColumns = useMemo(
    (): Column[] => [
      {
        Header: 'Produto',
        accessor: 'productmeasure_product_name',
      },
      {
        Header: 'Valor',
        accessor: 'productmeasure_price',
      },
      {
        Header: 'Marca',
        accessor: 'productmeasure_product_brand_name',
      },
      {
        Header: 'Volume',
        accessor: 'productmeasure_volume',
      },
      {
        Header: 'Categoria',
        accessor: 'productmeasure_product_subcategory_category_name',
      },
      {
        Header: 'Subcategoria',
        accessor: 'productmeasure_product_subcategory_name',
      },
      {
        Header: 'Composição',
        accessor: 'productmeasure_product_composition',
      },

      {
        Header: 'ID',
        accessor: 'productmeasure_id',
      },
      {
        Header: 'Provider ID',
        accessor: 'productmeasure_provider_id',
      },
      {
        Header: 'Product ID',
        accessor: 'productmeasure_product_id',
      },

      {
        Header: 'Measure ID',
        accessor: 'productmeasure_measure_id',
      },
      {
        Header: 'Subcategory ID',
        accessor: 'productmeasure_product_subcategory_id',
      },
      {
        Header: 'Brand ID',
        accessor: 'productmeasure_product_brand_id',
      },
      {
        Header: 'Category ID',
        accessor: 'productmeasure_product_subcategory_category_id',
      },
      {
        Header: 'Measure Name',
        accessor: 'productmeasure_measure_name',
      },
      {
        Header: 'Measure Type',
        accessor: 'productmeasure_measure_type',
      },
    ],
    [],
  );

  const hideTableColumns = useMemo(
    () => [
      'productmeasure_id',
      'productmeasure_provider_id',
      'productmeasure_product_id',
      'productmeasure_measure_id',
      'productmeasure_product_subcategory_id',
      'productmeasure_product_brand_id',
      'productmeasure_product_subcategory_category_id',
      'productmeasure_measure_type',
      'productmeasure_measure_name',
    ],
    [],
  );

  const tableActions = useMemo(
    () => ({
      update: '/',
      delete: '/',
    }),
    [],
  );

  return (
    <Container>
      <Header urlBack="/products-menu" headerTitle="Meus Produtos" />

      <Table
        data={productsMeasures}
        columns={tableColumns}
        hideColumns={hideTableColumns}
        actions={tableActions}
        loadingData={false}
      />
    </Container>
  );
};

export default ListProductMeasure;
