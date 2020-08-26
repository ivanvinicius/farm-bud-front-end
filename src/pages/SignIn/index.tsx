import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { SiGumtree } from 'react-icons/si';

import getValidationErrors from '../../utils/getValidationErrors';
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
    async ({ email, password }: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

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

          formRef.current?.setErrors(errors);
        }

        toast.error('Não foi possível fazer login, cheche suas credenciais.');
      }
    },
    [signIn, history],
  );

  return (
    <Container>
      <Card>
        <div>
          <h1>Fa</h1>
          <SiGumtree size={31} />
          <h1>m Bud</h1>
        </div>

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

        <Link to="/signup">Criar Conta</Link>
      </Card>
    </Container>
  );
};

export default SignIn;
