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
  width: 33%;
  height: 83%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  background: var(--color-background);
  border-radius: 0.8rem;
  box-shadow: 0 0.6rem 0.3rem 0 rgba(0, 0, 0, 0.3);

  form {
    width: 80%;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--color-primary-darker);

    &:hover {
      color: var(--color-primary);
    }
  }

  /* acima de 1369px aplicar regra */
  @media (min-width: 1369px) {
    & {
      width: 27%;
      height: 65%;
      padding: 2rem 0;
    }
  }
`;
