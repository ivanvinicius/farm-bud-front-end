import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, SignOutArea, Title } from './styles';

interface IHeaderProps {
  urlBack?: string;
  headerTitle?: string;
}

const Header: React.FC<IHeaderProps> = ({
  urlBack = '/',
  headerTitle = '',
}) => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(async () => {
    signOut();

    history.push('/signin');
  }, [signOut, history]);

  return (
    <Container>
      <Link to={urlBack}>
        <FiArrowLeft size={22} />
      </Link>

      {headerTitle.length > 0 ? (
        <Title>{headerTitle}</Title>
      ) : (
        <Title>{user.name}</Title>
      )}

      <SignOutArea>
        <button type="button" onClick={handleSignOut}>
          <FiPower size={20} />
        </button>
      </SignOutArea>
    </Container>
  );
};

export default Header;
