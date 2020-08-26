import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;

  & + & {
    margin-top: 1.5rem;
  }

  label {
    font-size: 1.4rem;
  }

  input {
    width: 100%;
    height: 5.6rem;
    margin-top: 0.8rem;
    border-radius: 0.8rem;
    background: var(--color-white);
    border: 0.1rem solid var(--color-line-in-white);
    outline: 0;
    padding: 0 1.6rem;
    font: 1.6rem Archivo;

    &::placeholder {
      color: var(--color-text-complement);
    }
  }

  &:focus-within::after {
    content: '';

    width: calc(100% - 3.2rem);
    height: 2px;
    background: var(--color-purple);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;
