import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin: 0 auto;
  padding: 2rem 10rem;

  background: var(--color-primary);
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;

  a {
    height: 3rem;
    margin: 0 1rem;

    text-decoration: none;
    color: var(--color-text-in-primary);
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }

  div {
    img {
      height: 3rem;
    }
  }
`;

export const SignOutArea = styled.div`
  button {
    height: 3rem;
    border: 0;
    background: transparent;
    color: var(--color-text-in-primary);
    cursor: pointer;

    transition: color 0.2s;

    &:hover {
      color: var(--color-toast-error);
    }
  }
`;
