import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  height: 2rem;
  margin-left: 1.6rem;

  span {
    position: absolute;

    width: 16rem;
    padding: 0.8rem;
    bottom: calc(100% + 1.2rem);

    background: var(--color-orange);
    color: var(--color-white);

    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;

    left: 50%;
    transform: translateX(-50%);

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    &::before {
      content: '';

      position: absolute;

      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-style: solid;
      border-color: var(--color-orange) transparent;
      border-width: 0.6rem 0.6rem 0 0.6rem;
    }
  }

  &:hover span {
    opacity: 0.8;
    visibility: visible;
  }
`;
