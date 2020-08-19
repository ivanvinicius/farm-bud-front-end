import React from 'react';

import Header from '../../components/Header';

import { Container, Content } from './styles';

const Dashbord: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>
        <h1>Dashboard Page</h1>
      </Content>
    </Container>
  );
};

export default Dashbord;
