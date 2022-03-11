import React, { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';

const Results = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  const handleNextRound = () => {
    socket.emit('next-round', { room: playerState.room });
  };
  return (
    <>
      <div>Results</div>
      <div onClick={() => handleNextRound()}>Next Round</div>
    </>
  );
};

export default Results;
