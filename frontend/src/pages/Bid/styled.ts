import styled from 'styled-components';

export const TurnContainer = styled.div`
  position: relative;
  width: 300px;
  margin: auto;
  z-index: 4;
  height: 75px;
`;

export const TurnString = styled.div`
  color: white;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 22px;
  text-align: center;
`;

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

export const ActionsContainer = styled.div``;

export const CurrentBidContainer = styled.div`
  display: flex;
  margin: 8px;
  justify-content: center;
`;

export const CurrentBid = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionButtonsContainer = styled.div`
  margin: 16px 0;
  gap: 12px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const DiceCupContainer = styled.div`
  /* width: 80%; */
  width: 200px;
  height: 225px;
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

export const Hint = styled.div`
  text-align: center;
  color: #686868;
`;

export const lastBidContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const RoomDice = styled.div`
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;
