import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosList, IoIosAdd } from 'react-icons/io';

import Header from '../../components/Header';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <Link to="my-compositions">
          <IoIosList size={90} />
          <span> Minhas composições</span>
        </Link>

        <Link to="my-compositions">
          <IoIosAdd size={90} />
          <span>Criar Composição</span>
        </Link>
      </Content>
    </Container>
  );
};

export default Dashboard;
