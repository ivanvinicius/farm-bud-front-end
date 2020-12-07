import styled from 'styled-components';

export const ModalContent = styled.div`
  width: 500px;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 50px;

    button {
      border: 0;
      background: transparent;
      color: var(--color-purple);
      transition: all 0.2s;

      & + button {
        margin-left: 56px;
      }

      &:hover {
        color: var(--color-orange);
      }
    }
  }
`;

export const Container = styled.header`
  width: 100%;
  height: 46px;

  display: flex;
  justify-content: center;

  background-color: var(--color-gray-header);
`;

export const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1350px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const BackLinkArea = styled.div`
  > a {
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: var(--color-white);
    transition: color 0.2s;
    &:hover {
      color: var(--color-orange);
    }
    svg {
      margin-right: 10px;
    }
  }
`;

export const Title = styled.span`
  font-size: 16px;
  color: var(--color-white);
  &:hover {
    color: var(--color-line-in-white);
  }
`;

export const SignOutArea = styled.div`
  button {
    display: flex;
    align-items: center;
    height: 30px;
    border: 0;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--color-orange);
    }

    svg {
      margin-left: 10px;
    }
  }
`;
