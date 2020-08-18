import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Card, Adress, SelectBlock } from './styles';

import ISelectOptionProps from '../../dtos/ISelectOptionProps';

interface IResponseData {
  id: string;
  name: string;
}

interface IProviderData {
  city_id: string;
  name: string;
  email: string;
  password: string;
}

type IState = ISelectOptionProps;
type ICity = ISelectOptionProps;
type IStateResponse = IResponseData;
type ICityResponse = IResponseData;

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [states, setStates] = useState<IState[]>();
  const [cities, setCities] = useState<ICity[]>();

  useEffect(() => {
    api.get('/states').then((response) => {
      const formatedStates: IState[] = [];

      response.data.map(({ id, name }: IStateResponse) => {
        return formatedStates.push({ value: id, label: name });
      });

      setStates(formatedStates);
    });
  }, []);

  const handleFindCityByState = useCallback(async ({ value }: any) => {
    const formatedCities: ICity[] = [];

    const response = await api.get('/adresses', {
      params: {
        state_id: value,
      },
    });

    response.data.map(({ id, name }: ICityResponse) => {
      return formatedCities.push({ value: id, label: name });
    });

    setCities(formatedCities);
  }, []);

  const handleSubmitForm = useCallback(async (data: IProviderData) => {
    await api.post('/providers', data);
  }, []);

  return (
    <Container>
      <Card>
        <h3>Dados do cadastro</h3>

        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <Input
            label="Nome"
            name="name"
            placeholder="Digite o nome da empresa"
          />
          <Input label="E-mail" name="email" placeholder="Digite o e-mail" />
          <Input
            type="password"
            label="Senha"
            name="password"
            placeholder="Digite a senha"
          />
          <Adress>
            <SelectBlock>
              <label>Estados</label>
              <Select
                name="state"
                options={states}
                isClearable
                placeholder="Selecione"
                onChange={handleFindCityByState}
              />
            </SelectBlock>

            <SelectBlock>
              <label>Cidades</label>
              <Select
                name="city"
                options={cities}
                isClearable
                placeholder="Selecione"
              />
            </SelectBlock>
          </Adress>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/signin">Voltar a tela de login</Link>
      </Card>
    </Container>
  );
};

export default SignUp;
