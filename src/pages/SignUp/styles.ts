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
  flex-direction: column;
  justify-content: space-evenly;

  border-radius: 0.8rem;
  background-color: var(--color-background);
  box-shadow: 0.6rem 0.6rem 0.6rem rgba(0, 0, 0, 0.3);

  form {
    width: 92%;

    display: flex;
    flex-direction: column;

    > button {
      width: 90%;
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
`;

export const AdressGroup = styled.div`
  margin-top: 1.5rem;

  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 1.5rem;
`;
