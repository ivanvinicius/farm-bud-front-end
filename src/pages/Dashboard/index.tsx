import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosList, IoIosAdd } from 'react-icons/io';

import Header from '../../components/Header';

import { Container, Content, Title, Section } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <Title>Produtos</Title>
        <Section>
          <Link to="products-measures">
            <IoIosList size={70} />
            <span>Listar meus produtos</span>
          </Link>

          <Link to="products">
            <IoIosAdd size={70} />
            <span>Criar</span>
          </Link>
        </Section>

        <Title>Composições</Title>
        <Section>
          <Link to="compositions">
            <IoIosList size={70} />
            <span>Listar</span>
          </Link>

          <Link to="add-composition">
            <IoIosAdd size={70} />
            <span>Criar</span>
          </Link>
        </Section>
      </Content>
    </Container>
  );
};

export default Dashboard;
