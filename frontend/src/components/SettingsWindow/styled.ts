import styled from 'styled-components';

export const SettingsContainer = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  bottom: 150px;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
`;

export const SettingsWindow = styled.div`
  width: 80%;
  background: white;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 0 100px black;
  padding: 16px;
`;

export const DiceCountControl = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 16px;
  align-items: center;
`;

export const Enter = styled.div`
  border: 1px solid gray;
  border-radius: 8px;
  padding: 8px 16px;
  text-align: center;
  cursor: pointer;
`;
