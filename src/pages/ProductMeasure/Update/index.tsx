import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import CurrencyInput from '../../../components/CurrencyInput';
import VolumetricInput from '../../../components/VolumetricInput';
import IProductMeasureProps from '../../../dtos/ProductMeasure/IProductMeasureProps';
import IMeasureProps from '../../../dtos/Measure/IMeasureProps';
import ISelectOption from '../../../dtos/ISelectOption';

import { Container, Content, InfoRow, CategoryRow, VolumeRow } from './styles';

interface ILocationProps {
  item: IProductMeasureProps;
}

interface IFormSubmitProps {
  measure: string;
  volume: string;
  price: string;
}

const CreateProductMeasure: React.FC = () => {
  const { item } = useLocation().state as ILocationProps;
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [measures, setMeasures] = useState<ISelectOption[]>([]);

  // const handleDeleteProduct = useCallback(() => {
  //   try {
  //     api.delete(`/products-measures/${productMeasure.id}`);

  //     toast.success('Produto deletado!');

  //     history.push('/products-measures');
  //   } catch (err) {
  //     toast.error('Não foi possível deletar o produto, tente mais tarde');
  //   }
  // }, [history, productMeasure.id]);

  const handleFormSubmit = useCallback(
    async ({ volume, measure, price }: IFormSubmitProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          volume: Yup.string().required('Informe o volume'),
          measure: Yup.string().required('Informe a unidade de medida.'),
          price: Yup.string().required('Informe o valor'),
        });

        await schema.validate(
          { measure, volume, price },
          { abortEarly: false },
        );

        const formattedData = {
          id: item.productmeasure_id,
          product_id: item.productmeasure_product_id,
          measure_id: measure,
          volume,
          price,
        };

        await api.patch('/products-measures', formattedData);

        toast.success('Atualização realizada.');

        history.push('/products-measures');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formattedErrors = getValidationErrors(err);

          formRef.current?.setErrors(formattedErrors);

          return;
        }

        toast.error('Não foi possível atualizar as informações.');
      }
    },
    [item, history],
  );

  useEffect(() => {
    const formattedMeasures: ISelectOption[] = [];

    api.get(`/measures/1`).then((response: any) => { //eslint-disable-line
      response.data.map(({ id, name }: IMeasureProps) => {
        return formattedMeasures.push({ value: id, label: name });
      });

      setMeasures(formattedMeasures);
    });
  }, []);

  return (
    <Container>
      <Header
        urlBack="/products-measures"
        headerTitle="Atualizar Informações"
      />

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleFormSubmit}
          initialData={{
            name: item.productmeasure_product_name,
            brand: item.productmeasure_product_brand_name,
            category: item.productmeasure_product_subcategory_category_name,
            subcategory: item.productmeasure_product_subcategory_name,
            composition: item.productmeasure_product_composition,
            measure: {
              label: item.productmeasure_measure_name,
              value: item.productmeasure_measure_id,
            },
            volume: item.productmeasure_volume,
            price: item.productmeasure_price,
          }}
        >
          <InfoRow>
            <div>
              <label>Nome</label>
              <Input name="name" disabled placeholder="Nome do produto" />
            </div>
            <div>
              <label>Marca</label>
              <Input name="brand" disabled placeholder="Marca" />
            </div>
          </InfoRow>
          <CategoryRow>
            <div>
              <label>Categoria</label>
              <Input name="category" disabled placeholder="Categoria" />
            </div>

            <div>
              <label>Subcategoria</label>
              <Input name="subcategory" disabled placeholder="Subcategoria" />
            </div>

            <div>
              <label>Composição</label>
              <Input name="composition" disabled placeholder="Composição" />
            </div>
          </CategoryRow>
          <VolumeRow>
            <div>
              <label>Volume</label>
              <VolumetricInput
                name="volume"
                placeholder="50,00"
                decimalSeparator=","
                groupSeparator="."
                allowDecimals
                decimalsLimit={2}
              />
            </div>

            <div>
              <label>Unidade de medida</label>
              <Select name="measure" options={measures} />
            </div>
            <div>
              <label>Valor</label>
              <CurrencyInput
                name="price"
                placeholder="130,00"
                decimalSeparator=","
                groupSeparator="."
                allowDecimals
                prefix="R$ "
                decimalsLimit={2}
              />
            </div>
          </VolumeRow>

          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateProductMeasure;
