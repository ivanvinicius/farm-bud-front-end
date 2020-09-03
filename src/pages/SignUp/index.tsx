import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { RiBuilding2Line } from 'react-icons/ri';
import { FiMail, FiLock } from 'react-icons/fi';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Container, Card, AdressGroup } from './styles';

import ISelectOption from '../../dtos/ISelectOption';

interface IResponseAPI {
  id: string;
  name: string;
}

interface ISingUpFormData {
  city: string;
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
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

  const handleFindCityByState = useCallback(async (data: any) => { // eslint-disable-line
    const selectRef = formRef.current?.getFieldRef('city');

    selectRef.select.clearValue();

    if (!data) {
      setCities([]);
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

    setCities(formatedCities);
  }, []);

  const handleSubmitForm = useCallback(
    async ({ city, name, email, password }: ISingUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          city: Yup.string().required('Você deve selecionar uma cidade.'),
          name: Yup.string().required('O nome é obrigatório.'),
          email: Yup.string().email('O e-mail deve ser válido'),
          password: Yup.string().min(
            6,
            'A senha deve conter pelo menos 6 digitos.',
          ),
        });

        await schema.validate(
          { city, name, email, password },
          { abortEarly: false },
        );

        await api.post('/providers', {
          city_id: city,
          name,
          email,
          password,
        });

        toast.success('Cadastro realizado com sucesso.');

        history.push('/signin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        toast.error(
          'Não foi possível realizar o cadastro, tente novamente mais tarde.',
        );
      }
    },
    [formRef, history],
  );

  return (
    <Container>
      <Card>
        <h2>Fazer Cadastro</h2>

        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <Input
            type="text"
            icon={RiBuilding2Line}
            name="name"
            placeholder="Nome da empresa"
          />
          <Input type="email" icon={FiMail} name="email" placeholder="Email" />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="Senha"
          />

          <AdressGroup>
            <Select
              name="state"
              options={states}
              placeholder="Estados"
              onChange={handleFindCityByState}
              noOptionsMessage={() => 'Não foi encontrado UF'}
            />

            <Select
              name="city"
              options={cities}
              placeholder="Cidades"
              noOptionsMessage={() => 'Primeiro selecione o UF'}
            />
          </AdressGroup>

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/signin">Voltar ao Login</Link>
      </Card>
    </Container>
  );
};

export default SignUp;
