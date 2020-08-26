import styled from 'styled-components';

import backgroundImg from '../../assets/images/background-img.jpg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Card = styled.div`
  width: 35%;
  height: 93%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  border-radius: 0.8rem;
  background-color: var(--color-background);
  box-shadow: 0.6rem 0.6rem 0.6rem rgba(0, 0, 0, 0.3);

  form {
    display: flex;
    flex-direction: column;
    width: 90%;

    > button {
      width: 85%;
      align-self: center;
    }
  }

  a {
    margin-top: 3rem;
    text-decoration: none;
    color: var(--color-purple);

    &:hover {
      color: var(--color-purple-dark);
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
    background: var(--color-purple);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;
