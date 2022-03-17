import styled from 'styled-components';

export const NavBar = styled.div`
  background: #e8886a;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 8px 16px;
`;

export const NavMenuContainer = styled.div`
  margin-top: 24px;
  position: absolute;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const NavMenu = styled.div`
  padding: 16px;
  background: white;
  box-shadow: 0 0 50px black;
  width: 80vw;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const NavToggle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

export const MenuLine = styled.div`
  margin: 3px;
  background: #383838;
  width: 24px;
  height: 3px;
  border-radius: 3px;
`;

export const Filler = styled.div`
  height: 5px;
  width: 5px;
  background: #e8886a;
`;

export const Title = styled.div`
  justify-content: center;
  font-size: 28px;
  text-align: center;
  display: flex;
  align-items: center;
`;

export const NavButton = styled.div`
  padding: 8px 16px;
  margin: 32px auto;
  border-radius: 8px;
  border: 1px solid gray;
  text-align: center;
  cursor: pointer;
`;
