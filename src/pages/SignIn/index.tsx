import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Card } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const response = await api.post('/sessions', data);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Card>
        <h1>Farm Bud</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input label="E-mail" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>
        </Form>

        <Link to="/signup">Criar uma nova conta</Link>
      </Card>
    </Container>
  );
};

export default SignIn;
