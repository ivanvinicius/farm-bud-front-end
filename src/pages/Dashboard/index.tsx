import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';
import { GiCorkedTube } from 'react-icons/gi';

import Header from '../../components/Header';

import { Container, Menu, Info } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />

      <Menu>
        <Link to="/products-menu">
          <FaBoxes size={100} />
          <Info>
            <strong>Produtos</strong>
            <span>
              Cadastre, liste e altere os produtos deste estabelecimento.
            </span>
          </Info>
        </Link>

        <Link to="/compositions-menu">
          <GiCorkedTube size={100} />
          <Info>
            <strong>Composições</strong>
            <span>
              Cadastre, liste e altere as composições deste estabelecimento
            </span>
          </Info>
        </Link>
      </Menu>
    </Container>
  );
};

export default Dashboard;
