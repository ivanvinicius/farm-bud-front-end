import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

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
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async ({ email, password }: ISignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('O e-mail deve ser válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().min(6, 'A senha deve ter mínimo 6 digitos'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        await signIn({ email, password });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          addToast({
            type: 'error',
            title: 'Validação de formulário',
            description: String(errors.undefined),
          });

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer o login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
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
