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
  width: 530px;
  height: 600px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  border-radius: 0.8rem;
  background-color: var(--color-white);
  box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.1);

  form {
    width: 90%;

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
    color: var(--color-orange);

    &:hover {
      color: var(--color-orange-dark);
    }
  }
`;

export const AddressGroup = styled.div`
  margin-top: 1.5rem;

  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 1.5rem;
`;
