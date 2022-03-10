import React, { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const DudoButton = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  const handleDudo = () => {
    socket.emit('dudo', { room: playerState.room });
  };

  return (
    <>
      <sc.Button
        onClick={() => {
          handleDudo();
        }}>
        Dudo
      </sc.Button>
    </>
  );
};

export default DudoButton;
