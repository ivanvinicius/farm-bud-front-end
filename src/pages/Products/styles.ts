import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: var(--color-line-in-white);
`;

export const Content = styled.div``;

export const Table = styled.div`
  display: table;
  width: 100%;
  max-width: 1280px;

  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 0.6rem 0.6rem 0.9rem rgba(0, 0, 0, 0.1);

  overflow: hidden;
  background-color: var(--color-white);
  transition: all 0.3s;

  a {
    color: inherit;
    text-decoration: none;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-line-in-white);
    text-align: left;
    padding: 16px;
  }

  &,
  th,
  td {
    border-collapse: collapse;
  }

  tbody tr:hover {
    color: var(--color-purple);
  }
`;
