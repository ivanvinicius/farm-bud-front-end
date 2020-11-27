import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: var(--color-line-in-white);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  display: flex;
  align-self: flex-start;
  margin: 30px 0 30px 0;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: row;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 270px;
    height: 260px;

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
      margin-left: 30px;
    }

    &:hover {
      color: var(--color-purple);
      box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.2);
    }

    svg {
      margin-bottom: 30px;
    }

    span {
      font-size: 18px;
    }
  }
`;
