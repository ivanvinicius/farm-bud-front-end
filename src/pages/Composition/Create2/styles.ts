import styled from 'styled-components';

export const ListItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 700px;
  background-color: var(--color-white);
  border-radius: 8px;
  margin: 10px auto;
  padding: 15px 30px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-top: 50px;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  p {
    margin-left: 10px;
  }
`;
export const Info = styled.div`
  width: 250px;
`;

export const InputArea = styled.div`
  width: 50%;

  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Content = styled.div`
  width: 700px;
  margin: 10px auto;
`;
