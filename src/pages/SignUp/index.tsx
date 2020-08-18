import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Card, Adress, SelectBlock } from './styles';

import ISelectOption from '../../dtos/ISelectOption';

interface IResponseAPI {
  id: string;
  name: string;
}

interface IProvider {
  city_id: string;
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [states, setStates] = useState<ISelectOption[]>();
  const [cities, setCities] = useState<ISelectOption[]>();

  useEffect(() => {
    api.get('/states').then((response) => {
      const formatedStates: ISelectOption[] = [];

      response.data.map(({ id, name }: IResponseAPI) => {
        return formatedStates.push({ value: id, label: name });
      });

      setStates(formatedStates);
    });
  }, []);

  /* eslint-disable-next-line */
  const handleFindCityByState = useCallback(async (data: any): Promise<
    React.SetStateAction<ISelectOption | void>
  > => {
    if (!data) {
      return setCities([]);
    }

    const { value } = data;
    const formatedCities: ISelectOption[] = [];

    const response = await api.get('/cities', {
      params: {
        state_id: value,
      },
    });

    response.data.map(({ id, name }: IResponseAPI) => {
      return formatedCities.push({ value: id, label: name });
    });

    return setCities(formatedCities);
  }, []);

  const handleSubmitForm = useCallback(async (data: IProvider) => {
    await api.post('/providers', data);
  }, []);

  return (
    <Container>
      <Card>
        <h2>Dados do cadastro</h2>

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
                placeholder="Selecione"
                isClearable
                isSearchable
                onChange={handleFindCityByState}
              />
            </SelectBlock>

            <SelectBlock>
              <label>Cidades</label>
              <Select
                name="city"
                options={cities}
                isClearable
                isSearchable
                placeholder="Selecione"
                noOptionsMessage={() => 'Primeiro selecione o UF'}
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
