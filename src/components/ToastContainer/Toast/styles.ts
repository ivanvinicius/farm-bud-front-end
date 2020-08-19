import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface IContainerProps {
  type?: 'info' | 'success' | 'error';
  hasDescription: boolean;
}

const toastTypeVariation = {
  info: css`
    background: var(--color-toast-info);
    color: var(--color-button-text);
  `,
  success: css`
    background: var(--color-toast-success);
    color: var(--color-button-text);
  `,
  error: css`
    background: var(--color-toast-error);
    color: var(--color-button-text);
  `,
};

export const Container = styled(animated.div)<IContainerProps>`
  display: flex;

  width: 36rem;

  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 0.8rem;
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 0.8rem;
  }

  ${(props) => toastTypeVariation[props.type || 'info']}

  div {
    flex: 1;

    p {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      line-height: 2rem;
    }
  }

  button {
    position: absolute;
    right: 0.8rem;
    top: 1.9rem;
    background: transparent;
    color: inherit;
    border: 0;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`;
