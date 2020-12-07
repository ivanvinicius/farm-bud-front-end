import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import formatToNumeric from '../../../utils/formatToNumeric';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import CurrencyInput from '../../../components/CurrencyInput';
import VolumetricInput from '../../../components/VolumetricInput';
import Modal from '../../../components/Modal';
import IProductMeasureProps from '../../../dtos/IProductMeasureProps';
import IMeasureProps from '../../../dtos/IMeasureProps';
import ISelectOption from '../../../dtos/ISelectOption';

import {
  Container,
  Content,
  InfoRow,
  CategoryRow,
  VolumeRow,
  TrashArea,
  ModalContent,
} from './styles';

interface ILocationProps {
  productMeasure: IProductMeasureProps;
}

interface IFormSubmitProps {
  measure: string;
  volume: number;
  price: number;
}

const CreateProductMeasure: React.FC = () => {
  const { productMeasure } = useLocation().state as ILocationProps;
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [measures, setMeasures] = useState<ISelectOption[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleToggleModal = useCallback(() => {
    setModalIsOpen((state) => !state);
  }, []);

  const handleDeleteProduct = useCallback(() => {
    try {
      api.delete(`/products-measures/${productMeasure.id}`);

      toast.success('Produto deletado!');

      history.push('/products-measures');
    } catch (err) {
      toast.error('Não foi possível deletar o produto, tente mais tarde');
    }
  }, [history, productMeasure.id]);

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
          id: productMeasure.id,
          product_id: productMeasure.product_id,
          measure_id: measure,
          volume: formatToNumeric(volume),
          price: formatToNumeric(price),
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
    [productMeasure, history],
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
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={handleToggleModal}>
        <ModalContent>
          <span>
            {'Tem certeza que deseja apagar o produto '}
            <strong>{`${productMeasure.product.brand.name} ${productMeasure.product.name}`}</strong>
            {' ?'}
          </span>

          <div>
            <button type="submit" onClick={handleDeleteProduct}>
              Apagar
            </button>
            <button type="submit" onClick={handleToggleModal}>
              Cancelar
            </button>
          </div>
        </ModalContent>
      </Modal>

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
              name: productMeasure.product.name,
              brand: productMeasure.product.brand.name,
              category: productMeasure.product.subcategory.category.name,
              subcategory: productMeasure.product.subcategory.name,
              composition: productMeasure.formattedComposition,
              volume: productMeasure.formattedVolume,
              price: productMeasure.formattedPrice,
            }}
          >
            <TrashArea>
              <button type="button" onClick={handleToggleModal}>
                Apagar o Produto
                <FaTrash size={16} />
              </button>
            </TrashArea>
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
                <Select
                  name="measure"
                  options={measures}
                  placeholder="Selecione"
                  defaultValue={{
                    value: productMeasure.measure.id,
                    label: productMeasure.measure.name,
                  }}
                />
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

            <Button type="submit">Atualizar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default CreateProductMeasure;
