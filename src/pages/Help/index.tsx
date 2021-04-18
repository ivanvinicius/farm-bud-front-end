/* eslint-disable */

import React from 'react';

import Header from '../../components/Header';

import { Container, HelpContainer } from './styles';

const Help: React.FC = () => {
  return (
    <Container>
      <Header urlBack="/" headerTitle="Ajuda" />

      <HelpContainer>
        <h2>Produtos</h2>
        <p>
          A aplicação conta com uma listagem padronizada de produtos, esses
          produtos podem ser adicionados ao portfólio do estabelecimento quantas
          vezes for necessário.
        </p>

        <h2>Portfólio</h2>
        <p>
          O portfólio do estabelecimento contém os produtos cadastrados anteriormente,
          prontos para uso.
        </p>

        <h2>Cadastrar Produto no Portfólio</h2>
        <p>
          Para cadastrar um produto ao portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma tabela de
          listagem, acima existe a opção <strong>Adicionar produtos ao portfólio</strong>,
          acessando a mesma, basta selecionar um produto e clicar
          em <strong>cadastrar</strong>, informe os campos faltantes no
           formulário e finalize o cadastro.
        </p>

        <h2>Alterar Produto do Portfólio</h2>
        <p>
          Para alterar um produto do portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma listagem de
          produtos, basta selecionar um dos produtos e clicar em atualizar,
          preencha os campos com as novas informações e finalize clicando
          em <strong>atualizar</strong>.
        </p>

        <h2>Deletar Produtos do Portfólio</h2>
        <p>
          Para deletar um ou mais produtos do portfólio, basta acessar a
          aba <strong>Portfólio</strong> na tela incial. Você verá uma listagem de
          produtos, basta selecionar os produtos e clicar
          em <strong>excluir</strong>, confirme a ação, e os produtos serão apagados.
        </p>
        <p>
          <strong>
            OBS: Não será possível excluir produtos que
            estão em uso nas composições do estabelecimento.
          </strong>
        </p>
      </HelpContainer>
    </Container>
  );
};

export default Help;
