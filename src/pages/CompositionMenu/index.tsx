import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';

import Header from '../../components/Header';

import { Container, Menu, Info } from './styles';

const CompositionMenu: React.FC = () => {
  return (
    <Container>
      <Header headerTitle="Menu de Composições" />

      <Menu>
        <Link to="/#">
          <BsPlus size={100} />
          <Info>
            <strong>Criar Composição</strong>
            <span>
              Para cadastrar uma nova composição, basta selecionar um item na
              lista e preencher as informações faltantes
            </span>
          </Info>
        </Link>

        <Link to="/#">
          <BsReverseLayoutTextSidebarReverse size={100} />
          <Info>
            <strong>Listar Composições</strong>
            <span>
              Liste e altere as composições cadastradas no estabelecimento
            </span>
          </Info>
        </Link>
      </Menu>
    </Container>
  );
};

export default CompositionMenu;
