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
    if (gameState.phase === 'results') {
      socket.emit('next-round', { room: playerState.room });
    }
    setPlayerState({ ...playerState, phase: 'bid' });
  };

  let loser =
    gameState.loser === -1
      ? 'No One'
      : usersArray[gameState.turn] === playerState.username
      ? 'You'
      : usersArray[gameState.turn];

  return (
    <sc.Results>
      <sc.UserString>{loser} lost a die!</sc.UserString>
      <sc.Button onClick={() => handleNextRound()}>Next Round</sc.Button>
    </sc.Results>
  );
};

export default Results;
