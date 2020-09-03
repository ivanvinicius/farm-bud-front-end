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
  min-width: 470px;
  min-height: 550px;

  width: 27%;
  height: 60%;

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
      font-size: 5rem;
    }

    > svg {
      font-size: 4rem;
      margin-top: -0.6rem;
      color: var(--color-orange);
    }
  }

  form {
    width: 92%;

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
`;
