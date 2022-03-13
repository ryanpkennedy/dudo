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
  width: 150px;
  padding: 8px;
  margin: 16px auto;
  border-radius: 8px;
  border: 1px solid gray;
  cursor: pointer;
  text-align: center;
`;
