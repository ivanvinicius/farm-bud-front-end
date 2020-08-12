import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import { Container, Card } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Card>
        <h1>Farm Bud</h1>

        <form>
          <Input label="E-mail" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
          />

          <button type="submit">Entrar</button>
        </form>

        <Link to="/signup">Criar uma nova conta</Link>
      </Card>
    </Container>
  );
};

export default SignIn;
