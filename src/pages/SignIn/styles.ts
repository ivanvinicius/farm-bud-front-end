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
  width: 33%;
  height: 83%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  background: var(--color-background);
  border-radius: 0.8rem;
  box-shadow: 0.6rem 0.6rem 0.6rem rgba(0, 0, 0, 0.3);

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-family: 'MuseoModerno', cursive;
      font-weight: 400;
      letter-spacing: -0.1rem;
    }

    > svg {
      margin-top: -0.6rem;
      color: var(--color-orange);
    }
  }

  form {
    width: 80%;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--color-purple);

    &:hover {
      color: var(--color-purple-dark);
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
