import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 1.6rem;

  background: var(--color-white);
  color: var(--color-text-complement);

  border-radius: 0.8rem;
  border: 0.1rem solid;
  border-color: var(--color-line-in-white);

  ${(props) =>
    props.hasError &&
    css`
      color: var(--color-orange);
      border-color: var(--color-orange);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--color-purple);
      color: var(--color-purple);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--color-purple);
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: var(--color-text-complement);
    }
  }

  svg {
    margin-right: 1.6rem;
  }

  & + & {
    margin-top: 1.6rem;
  }
`;
