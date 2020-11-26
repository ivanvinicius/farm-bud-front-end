import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  margin: 0 auto;
  padding: 1rem 15rem;

  background: var(--color-gray-header);

  > a {
    display: flex;
    align-items: center;

    text-decoration: none;
    cursor: pointer;
    color: var(--color-white);
    transition: color 0.2s;

    &:hover {
      color: var(--color-line-in-white);
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const UserName = styled.p`
  font-size: 20px;
  color: var(--color-white);

  &:hover {
    color: var(--color-line-in-white);
  }
`;

export const SignOutArea = styled.div`
  button {
    display: flex;
    align-items: center;

    height: 3rem;
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
