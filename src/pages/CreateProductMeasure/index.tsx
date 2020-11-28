import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {} from 'react-icons/fi';

import api from '../../services/api';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import IProductsProps from '../../dtos/IProductsProps';
import ISelectOption from '../../dtos/ISelectOption';

import { Container, Content, InfoRow, CategoryRow, VolumeRow } from './styles';

interface IProduct {
  product: IProductsProps;
}

interface IMeasureProps {
  id: string;
  name: string;
  type: string;
}

const CreateProductMeasure: React.FC = () => {
  const { product } = useLocation().state as IProduct;
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

  const handleFormSubmit = useCallback(async (data: any) => {
    console.log(data);
    return 2 + 2;
  }, []);

  return (
    <Container>
      <Header urlBack="/products" />

      <Content>
        <h2>Cadastro de produto</h2>
        <Form
          ref={formRef}
          initialData={{
            name: product.name,
            brand: product.brand.name,
            category: product.subcategory.category.name,
            subcategory: product.subcategory.name,
            composition: product.formattedComposition,
          }}
          onSubmit={handleFormSubmit}
        >
          <InfoRow>
            <div>
              <label htmlFor="">Nome</label>
              <Input name="name" disabled placeholder="Nome do produto" />
            </div>
            <div>
              <label htmlFor="">Marca</label>
              <Input name="brand" disabled placeholder="Marca" />
            </div>
          </InfoRow>

          <CategoryRow>
            <div>
              <label htmlFor="">Categoria</label>
              <Input name="category" disabled placeholder="Categoria" />
            </div>

            <div>
              <label htmlFor="">Subcategoria</label>
              <Input name="subcategory" disabled placeholder="Subcategoria" />
            </div>

            <div>
              <label htmlFor="">Composição</label>
              <Input name="composition" disabled placeholder="Composição" />
            </div>
          </CategoryRow>

          <VolumeRow>
            <div>
              <label htmlFor="">Volume</label>
              <Input name="volume" placeholder="50.00" />
            </div>

            <div>
              <label htmlFor="">Unidade de medida</label>
              <Select
                name="measures"
                options={measures}
                placeholder="Selecione"
                noOptionsMessage={() => 'Nenhuma'}
              />
            </div>
            <div>
              <label htmlFor="">Valor</label>
              <Input name="price" placeholder="R$ 10,00" />
            </div>
          </VolumeRow>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CreateProductMeasure;
