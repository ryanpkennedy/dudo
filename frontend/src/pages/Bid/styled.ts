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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DiceCupContainer = styled.div`
  /* width: 80%; */
  width: 200px;
  height: 400px;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const CupContainer = styled('div')<{ showDice: boolean }>`
  /* height: 100px; */
  position: absolute;
  width: 100%;
  z-index: 3;
  bottom: -10px;
  left: 3px;
  transition: all 1s ease;
  ${(props) => (props.showDice ? 'transform: translateY(-150px);' : '')}
`;

export const CupUpContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;
