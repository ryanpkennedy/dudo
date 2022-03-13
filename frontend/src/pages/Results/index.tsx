import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const Results = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { gameState, setGameState } = useContext(GameContext);

  const usersArray = Object.getOwnPropertyNames(gameState.users);

  const handleNextRound = () => {
    socket.emit('next-round', { room: playerState.room });
  };

  return (
    <sc.Results>
      <sc.UserString>
        {usersArray[gameState.turn] === playerState.username
          ? 'You'
          : usersArray[gameState.turn]}{' '}
        lost a die!
      </sc.UserString>
      <sc.Button onClick={() => handleNextRound()}>Next Round</sc.Button>
    </sc.Results>
  );
};

export default Results;
