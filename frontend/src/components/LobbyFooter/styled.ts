import styled from 'styled-components';

export const LobbyFooter = styled.div`
  position: absolute;
  width: 100%;
  height: 75px;
  bottom: 0;
  left: 0;
  background: #9f9f9f;
  /* padding: 16px 0; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartButton = styled.div`
  /* position: absolute;
  width: 100%; */
  /* bottom: 0;
  left: 0; */

  text-align: center;
  background: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  /* border: 1px solid gray; */
  cursor: pointer;
`;

export const Settings = styled.div`
  width: 35px;
  height: 100%;
  position: absolute;
  right: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
`;
