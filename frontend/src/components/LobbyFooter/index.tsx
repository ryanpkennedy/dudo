import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import SettingsIcon from '../../atoms/SettingsIcon';
import * as sc from './styled';

interface LobbyFooterProps {
  toggleSettings: Function;
}

const LobbyFooter = ({ toggleSettings }: LobbyFooterProps) => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);

  const handleStartGame = () => {
    socket.emit('close-room', { room: playerState.room }, (response: any) => {
      if (response.status === '200') {
        socket.emit('update-all', { room: playerState.room });
      } else {
        alert(response.status);
      }
    });
  };

  return (
    <sc.LobbyFooter>
      <sc.StartButton
        onClick={() => {
          handleStartGame();
        }}>
        Party Ready
      </sc.StartButton>
      <sc.Settings
        onClick={() => {
          toggleSettings();
        }}>
        <SettingsIcon></SettingsIcon>
      </sc.Settings>
    </sc.LobbyFooter>
  );
};

export default LobbyFooter;
