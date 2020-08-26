import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  margin: 0 auto;
  padding: 1rem 15rem;

  background: var(--color-gray-header);
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;

  a {
    height: 3rem;
    margin: 0 1rem;

    text-decoration: none;
    color: var(--color-white);
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.6;
    }
  }

  div {
    svg {
      color: var(--color-white);
      transition: color 0.2s;

      &:hover {
        color: var(--color-orange);
      }
    }
  }
`;

export const SignOutArea = styled.div`
  button {
    height: 3rem;
    border: 0;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;

    transition: color 0.2s;

    &:hover {
      color: var(--color-orange-dark);
    }
  }
`;
