import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import Avatar from '../../atoms/Avatar';
import * as sc from './styled';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';

const Lobby = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const userArray = Object.getOwnPropertyNames(gameState?.users);

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
              <sc.StartContainer>
                <sc.StartButton
                  onClick={() => {
                    handleStartGame();
                  }}>
                  Party Ready
                </sc.StartButton>
              </sc.StartContainer>
            ) : (
              <></>
            )}
            {/* <Avatar type={gameState?.users[user].avatarSelection}></Avatar> */}
          </sc.UserContainer>
        );
      })}
    </div>
  );
};

export default Lobby;
