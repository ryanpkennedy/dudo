import React, { useContext, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import Avatar from '../../atoms/Avatar';
import * as sc from './styled';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import LobbyFooter from '../../components/LobbyFooter';
import SettingsWindow from '../../components/SettingsWindow';

const Lobby = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [showSettings, setShowSettings] = useState(false);
  const userArray = Object.getOwnPropertyNames(gameState?.users);

  const toggleSettings = () => {
    console.log('toggle settings window');
    setShowSettings((prev) => !prev);
  };

  return (
    <div>
      <sc.Section>
        <sc.RoomHeader>Room</sc.RoomHeader>
        <sc.Room>{playerState?.room}</sc.Room>
      </sc.Section>
      <sc.PlayersHeader>Players</sc.PlayersHeader>
      {userArray.map((user: any) => {
        return (
          <sc.UserContainer key={user}>
            <sc.UserName>{user}</sc.UserName>
            {gameState?.users[user].roomLeader &&
            user === playerState?.username ? (
              <LobbyFooter toggleSettings={toggleSettings}></LobbyFooter>
            ) : (
              <></>
            )}
            {/* <Avatar type={gameState?.users[user].avatarSelection}></Avatar> */}
          </sc.UserContainer>
        );
      })}
      {showSettings ? (
        <SettingsWindow toggleSettings={toggleSettings}></SettingsWindow>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Lobby;
