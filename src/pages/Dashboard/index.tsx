import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';
import { GiCorkedTube } from 'react-icons/gi';

import Header from '../../components/Header';
import { useMeasureContext } from '../../hooks/measure';

import { Container, Menu, Info } from './styles';

const Dashboard: React.FC = () => {
  const { measures, setMeasures } = useMeasureContext();

  useEffect(() => {
    if (measures.length === 0) {
      setMeasures();
    }
  }, [measures, setMeasures]);

  return (
    <Container>
      <Header />

      <Menu>
        <Link to="/portfolio">
          <FaBoxes size={100} />
          <Info>
            <strong>Portfólio</strong>
            <span>
              Cadastre e altere os produtos do portfólio deste estabelecimento.
            </span>
          </Info>
        </Link>

        <Link to="/#">
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
