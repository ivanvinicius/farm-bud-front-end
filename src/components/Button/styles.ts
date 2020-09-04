import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 5.6rem;
  margin-top: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 0.8rem;
  text-decoration: none;
  font: 700 1.6rem Archivo;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  cursor: pointer;

  color: var(--color-button-text);
  background: var(--color-purple);
  box-shadow: 0 0.6rem 0.6rem 0 rgba(0, 0, 0, 0.2);

  transition: background 0.3s;

  &:hover {
    background: var(--color-purple-dark);
  }
`;
