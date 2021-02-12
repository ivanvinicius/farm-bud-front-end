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

import IProductProps from '../../../dtos/Product/IProductsProps';
import IMeasureProps from '../../../dtos/Measure/IMeasureProps';
import ISelectOption from '../../../dtos/ISelectOption';

import { Container, Content, InfoRow, CategoryRow, VolumeRow } from './styles';

interface ILocationProps {
  item: IProductProps;
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

  useEffect(() => {
    const formattedMeasures: ISelectOption[] = [];

    api.get(`/measures/1`).then((response: any) => { //eslint-disable-line
      response.data.map(({ id, name }: IMeasureProps) => {
        return formattedMeasures.push({ value: id, label: name });
      });

      setMeasures(formattedMeasures);
    });
  }, []);

  const handleFormSubmit = useCallback(
    async ({ measure, volume, price }: IFormSubmitProps) => {
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
          product_id: item.product_id,
          measure_id: measure,
          volume,
          price,
        };

        await api.post('/products-measures', formattedData);

        toast.success('Cadastro realizado.');

        history.push('/products');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const formattedErrors = getValidationErrors(err);

          formRef.current?.setErrors(formattedErrors);

          return;
        }

        toast.error('Não foi possível realizar o cadastro.');
      }
    },
    [history, item],
  );

  return (
    <Container>
      <Header urlBack="/products" headerTitle="Finalize o Cadastro" />

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: item.product_name,
            brand: item.brand_name,
            category: item.category_name,
            subcategory: item.subcategory_name,
            composition: item.product_composition,
          }}
          onSubmit={handleFormSubmit}
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
                placeholder="R$ 10,00"
                prefix="R$ "
                decimalSeparator=","
                groupSeparator="."
                allowDecimals
                decimalsLimit={2}
              />
            </div>
          </VolumeRow>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateProductMeasure;
