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
  width: 43%;
  height: 93%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  border-radius: 0.8rem;
  background-color: var(--color-background);
  box-shadow: 0 0.5rem 0.4rem 0 rgba(0, 0, 0, 0.3);

  form {
    width: 90%;
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
      width: 35%;
      height: 75%;
    }
  }
`;

export const Adress = styled.div`
  margin-top: 1.5rem;

  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 1.5rem;
`;

export const SelectBlock = styled.div`
  position: relative;

  label {
    font-size: 1.4rem;
  }

  &:focus-within::after {
    content: '';
    width: calc(100% - 3.2rem);
    height: 2px;
    background: var(--color-primary-light);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;
