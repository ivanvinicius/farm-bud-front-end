import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select/';

import Input from '../../components/Input';

import { customStyles } from '../../styles/select';
import { Container, Card, Adress, SelectBlock } from './styles';

const SignUp: React.FC = () => {
  const states = [{ value: '1', label: 'SC' }];
  const cities = [{ value: 'taio', label: 'Rio do Sul' }];

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
            <SelectBlock>
              <label>Estado</label>
              <Select
                styles={customStyles}
                id="state"
                name="states"
                options={states}
                isClearable
                placeholder="Selecione"
              />
            </SelectBlock>

            <SelectBlock>
              <label>Cidades</label>
              <Select
                id="cities"
                styles={customStyles}
                name="cities"
                options={cities}
                isSearchable
                isClearable
                placeholder="Selecione"
              />
            </SelectBlock>
          </Adress>

          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/signin">Voltar a tela de login</Link>
      </Card>
    </Container>
  );
};

export default SignUp;
