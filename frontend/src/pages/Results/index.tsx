import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';

const Results = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { gameState, setGameState } = useContext(GameContext);

  const usersArray = Object.getOwnPropertyNames(gameState.users);

  const handleNextRound = () => {
    socket.emit('next-round', { room: playerState.room });
  };

  return (
    <>
      <div>Results</div>
      <div>{usersArray[gameState.turn]} lost a die!</div>
      <div onClick={() => handleNextRound()}>Next Round</div>
    </>
  );
};

export default Results;
