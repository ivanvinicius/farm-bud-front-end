import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Card } from './styles';

interface ISignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async ({ email, password }: ISignInFormData): Promise<Number | void> => {
      try {
        await signIn({ email, password });

        return history.push('/');
      } catch (err) {
        return 3 + 1;
      }
    },
    [signIn, history],
  );

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
