import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { useAuth } from '../../hooks/auth';

import { Container, Menu, SignOutArea } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(async () => {
    await signOut();

    history.push('/');
  }, [signOut, history]);

  return (
    <Container>
      <Menu>
        <div>
          <Link to="/">
            <IoIosArrowRoundBack size={31} />
          </Link>
        </div>

        <Link to="/">Produtos</Link>

        <Link to="/">Composições</Link>
      </Menu>

      <SignOutArea>
        <button type="button" onClick={handleSignOut}>
          Sair
        </button>
      </SignOutArea>
    </Container>
  );
};

export default Header;
