import React, { useContext, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const NavBar = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    socket.emit('logout', { id: localStorage.getItem('id') });
    localStorage.clear();
    //@ts-ignore
    setPlayerState({});
  };

  let navMenuElement = showMenu ? (
    <sc.NavMenuContainer>
      <sc.NavMenu>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}>
          X
        </div>
        <sc.NavButton>Rules</sc.NavButton>
        <sc.NavButton
          onClick={() => {
            handleLogout();
            setShowMenu((prev) => !prev);
          }}>
          Leave Room
        </sc.NavButton>
      </sc.NavMenu>
    </sc.NavMenuContainer>
  ) : (
    <></>
  );

  return (
    <sc.NavBar>
      <sc.NavToggle
        onClick={() => {
          setShowMenu((prev) => !prev);
        }}>
        <sc.MenuLine />
        <sc.MenuLine />
        <sc.MenuLine />
      </sc.NavToggle>
      <sc.Title>Dudo</sc.Title>
      <sc.Filler></sc.Filler>
      {navMenuElement}
    </sc.NavBar>
  );
};

export default NavBar;
