import styled from 'styled-components';

export const RollButton = styled.div`
  padding: 8px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
`;

export const DiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export const Die = styled.div`
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid gray;
`;
