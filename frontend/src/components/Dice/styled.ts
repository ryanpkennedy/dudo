import styled from 'styled-components';

export const DiceContainer = styled.div`
  /* height: 250px;
  width: 500px; */
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 90px;
  left: 15px;
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
  top: -20px;
  left: -13px;
  /* border: 1px solid red; */
  height: 30px;
  width: 50px;
  z-index: 0;
`;

export const DieContainer = styled('div')<{ offset: number }>`
  height: 70px;
  width: 70px;
  position: absolute;
  transform: ${(props) =>
    `translate(${props.offset * 36}px, ${props.offset * 22}px)`};
`;
