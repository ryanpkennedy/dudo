import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import Lobby from '../Lobby';
import Game from '../Game';

const Room = () => {
  const { gameState, setGameState } = useContext(GameContext);
  console.log('(Room) room component rendered');
  return (
    <>
      <>{gameState?.open ? <Lobby></Lobby> : <Game></Game>}</>
    </>
  );
};

export default Room;
