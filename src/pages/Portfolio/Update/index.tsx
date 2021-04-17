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
import IPortfolioProps from '../../../dtos/IPortfolioProps';
import IMeasureProps from '../../../dtos/IMeasureProps';
import ISelectOption from '../../../dtos/ISelectOption';

import { Content, InfoRow, CategoryRow, VolumeRow } from './styles';
import formatToNumeric from '../../../utils/formatToNumeric';

interface ILocationProps {
  item: IPortfolioProps;
}

interface IFormSubmitProps {
  measure: string;
  size: string;
  price: string;
}

const UpdateProductMeasure: React.FC = () => {
  const { item } = useLocation().state as ILocationProps;
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [measures, setMeasures] = useState<ISelectOption[]>([]);

  const handleFormSubmit = useCallback(
    async ({ size, measure, price }: IFormSubmitProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          size: Yup.string().required('Informe o tamanho.'),
          measure: Yup.string().required('Informe a unidade de medida.'),
          price: Yup.string().required('Informe o valor.'),
        });

        await schema.validate({ measure, size, price }, { abortEarly: false });

        const formattedData = {
          id: item.id,
          measure_id: measure,
          price: formatToNumeric(price),
          size: formatToNumeric(size),
        };

        await api.put('/portfolios', formattedData);

        toast.success('Atualização realizada.');

        history.push('/portfolio');
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

    api.get(`/measures`).then((response: any) => { //eslint-disable-line
      response.data.map(({ id, name }: IMeasureProps) => {
        return formattedMeasures.push({ value: id, label: name });
      });

      setMeasures(formattedMeasures);
    });
  }, []);

  return (
    <>
      <Header urlBack="/portfolio" headerTitle="Atualizar Informações" />

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleFormSubmit}
          initialData={{
            name: item.product_name,
            brand: item.brand_name,
            category: item.category_name,
            subcategory: item.subcategory_name,
            composition: item.product_composition,
            measure: {
              label: item.measure_name,
              value: item.measure_id,
            },
            size: item.size,
            price: item.price,
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
              <label>Tamanho</label>
              <VolumetricInput
                name="size"
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
    </>
  );
};

export default UpdateProductMeasure;
