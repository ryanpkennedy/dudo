import React, { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const EvenButton = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  const handleEven = () => {
    socket.emit('even', { room: playerState.room });
  };

  return (
    <>
      <sc.Button
        onClick={() => {
          handleEven();
        }}>
        Even
      </sc.Button>
    </>
  );
};

export default EvenButton;
