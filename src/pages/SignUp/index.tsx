import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Card, Adress, SelectBlock } from './styles';

interface IResponseStateProps {
  id: string;
  name: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    api.get('/states').then((response) => {
      const formatedStates: any = [];

      response.data.map(({ id, name }: IResponseStateProps) => {
        return formatedStates.push({ value: id, label: name });
      });

      setStates(formatedStates);
    });
  }, []);

  const handleFindCityByState = useCallback((data: any) => {
    api
      .get('/adresses', {
        params: {
          state_id: data.value,
        },
      })
      .then((response) => {
        const formatedCities: any = [];

        response.data.map(({ id, city }: any) => {
          return formatedCities.push({ value: id, label: city });
        });

        setCities(formatedCities);
      });
  }, []);

  const handleSubmitForm = useCallback(async (data: any) => {
    const response = await api.post('/providers', {
      adress_id: data.cities,
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log(response);
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
                id="states"
                name="states"
                options={states}
                isClearable
                placeholder="Selecione"
                onChange={handleFindCityByState}
              />
            </SelectBlock>

            <SelectBlock>
              <label>Cidades</label>
              <Select
                id="cities"
                name="cities"
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
