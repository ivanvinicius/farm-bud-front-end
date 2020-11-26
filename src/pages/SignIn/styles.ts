import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-line-in-white);
`;

export const Card = styled.div`
  width: 470px;
  height: 600px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  background: var(--color-white);
  border-radius: 0.8rem;
  box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.1);

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
    width: 90%;

    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: var(--color-orange);

    &:hover {
      color: var(--color-orange-dark);
    }
  }
`;
