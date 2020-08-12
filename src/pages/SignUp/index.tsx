import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container, Card, Adress } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Card>
        <h3>Dados do cadastro</h3>

        <form>
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
            <Select
              name="state"
              label="Estado"
              options={[{ value: 'SC', label: 'SC' }]}
            />
            <Select
              name="city"
              label="Cidade"
              options={[{ value: 'taio', label: 'Rio do Sul' }]}
            />
          </Adress>

          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/signin">Voltar a tela de login</Link>
      </Card>
    </Container>
  );
};

export default SignUp;
