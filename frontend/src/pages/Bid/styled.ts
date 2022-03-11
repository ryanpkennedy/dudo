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

export const Button = styled.div`
  padding: 8px;
  margin: 16px;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
`;

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

export const DiceCupContainer = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  padding: 32px;
`;

export const CupContainer = styled('div')<{ showDice: boolean }>`
  /* height: 100px; */
  position: absolute;
  width: 120px;
  z-index: 3;
  bottom: -10px;
  left: 3px;
  transition: all 1s ease;
  ${(props) => (props.showDice ? 'transform: translateY(-100px);' : '')}
`;
