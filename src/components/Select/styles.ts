import styled, { css } from 'styled-components';

interface IContainerProps {
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<IContainerProps>`
  border: 0.1rem solid;
  border-color: var(--color-line-in-white);
  border-radius: 0.8rem;

  ${(props) =>
    props.isFilled &&
    css`
      svg {
        color: var(--color-purple);
      }
    `}

  ${(props) =>
    props.hasError &&
    css`
      border-color: var(--color-orange);

      svg {
        color: var(--color-orange);
      }
    `}

  &:focus-within {
    border-color: var(--color-purple);

    svg {
      color: var(--color-purple);
    }
  }
`;
