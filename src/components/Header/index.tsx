import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosArrowRoundBack, IoIosLogOut } from 'react-icons/io';

import { useAuth } from '../../hooks/auth';

import { Container, SignOutArea, UserName } from './styles';

interface IHeaderProps {
  urlBack?: string;
}

const Header: React.FC<IHeaderProps> = ({ urlBack = '/' }) => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(async () => {
    signOut();

    history.push('/signin');
  }, [signOut, history]);

  return (
    <Container>
      <Link to={urlBack}>
        <IoIosArrowRoundBack size={31} />
        Voltar
      </Link>

      <UserName>{user.name}</UserName>

      <SignOutArea>
        <button type="button" onClick={handleSignOut}>
          Sair
          <IoIosLogOut size={31} />
        </button>
      </SignOutArea>
    </Container>
  );
};

export default Header;
