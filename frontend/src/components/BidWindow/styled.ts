import styled from 'styled-components';

export const BidWindowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BidWindow = styled.div`
  /* position: absolute; */
  /* top: 150px; */
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 250px;
  height: 300px;
  background: white;
  padding: 16px;
  z-index: 5;
  box-shadow: 0 0 100px black;
  border-radius: 8px;
`;

export const Button = styled.div`
  padding: 4px 16px;
  /* margin: 16px auto; */
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
  text-align: center;
`;

export const DiceFaces = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  justify-content: center;
`;

export const DiceFaceOption = styled('div')<{ selected: boolean }>`
  cursor: pointer;
  padding: 4px;
  margin: 4px;
  width: 50px;
  height: 50px;
  background: ${(props) => (props.selected ? '#aaaaaa' : 'none')};
  border-radius: 8px;
`;
