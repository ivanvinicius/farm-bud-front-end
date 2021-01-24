import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs';

import Header from '../../../components/Header';

import { Container, Menu, Info } from './styles';

const ProductMenu: React.FC = () => {
  return (
    <Container>
      <Header headerTitle="Menu de Produtos" />

      <Menu>
        <Link to="/products">
          <BsPlus size={100} />
          <Info>
            <strong>Criar Produto</strong>
            <span>
              Para cadastrar um novo produto, basta selecionar um item na lista
              e preencher as informações faltantes
            </span>
          </Info>
        </Link>

        <Link to="/products-measures">
          <BsReverseLayoutTextSidebarReverse size={100} />
          <Info>
            <strong>Listar Produtos</strong>
            <span>
              Liste e altere os produtos cadastrados no estabelecimento
            </span>
          </Info>
        </Link>
      </Menu>
    </Container>
  );
};

export default ProductMenu;
