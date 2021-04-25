import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const TopInfo = styled.div`
  width: 1270px;
  height: 90px;
  padding: 15px 250px;
  margin: 50px auto 0 auto;

  display: grid;
  grid-template-rows: 2fr 2fr;
  grid-template-columns: 1fr 1fr;
  column-gap: 190px;

  align-items: center;
  justify-content: center;

  border-radius: 8px;
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--color-white);
`;
