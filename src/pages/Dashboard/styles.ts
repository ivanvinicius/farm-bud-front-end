import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-line-in-white);

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 500px;
    height: 500px;

    background-color: var(--color-white);
    color: var(--color-gray-header);

    text-decoration: none;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-line-in-white);
    border-radius: 10px;
    transition: all 0.3s;
    box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.1);

    & + a {
      margin-left: 16px;
    }

    &:hover {
      color: var(--color-purple);

      box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.2);
    }

    svg {
      margin-bottom: 100px;
    }

    span {
      font-size: 26px;
    }
  }
`;
