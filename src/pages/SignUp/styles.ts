import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-primary);
`;

export const Card = styled.div`
  width: 40%;
  height: 95%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  border-radius: 0.8rem;
  background-color: var(--color-background);
  box-shadow: 0 0.5rem 0.4rem 0 rgba(0, 0, 0, 0.3);

  form {
    width: 90%;

    button {
      background: var(--color-secundary);
      color: var(--color-button-text);
      border: 0;

      &:hover {
        background: var(--color-secundary-dark);
      }
    }
  }

  a {
    text-decoration: none;
    color: var(--color-primary-darker);

    &:hover {
      color: var(--color-primary);
    }
  }
`;

export const Adress = styled.div`
  margin-top: 1.5rem;

  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 1.5rem;
`;
