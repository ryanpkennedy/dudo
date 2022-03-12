import styled from 'styled-components';

export const DiceContainer = styled.div`
  /* height: 250px;
  width: 500px; */
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 50px;
  left: 0;
  /* border: 1px solid blue; */
`;

export const FirstDice = styled.div`
  position: relative;
  /* border: 1px solid red; */
  height: 30px;
  width: 50px;
  z-index: 1;
`;

export const SecondDice = styled.div`
  position: relative;
  top: -15px;
  left: -25px;
  /* border: 1px solid red; */
  height: 30px;
  width: 50px;
  z-index: 0;
`;

export const DieContainer = styled('div')<{ offset: number }>`
  height: 50px;
  width: 50px;
  position: absolute;
  transform: ${(props) =>
    `translate(${props.offset * 25}px, ${props.offset * 15}px)`};
`;
