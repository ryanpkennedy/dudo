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

  const handleLogout = () => {
    socket.emit('logout', { id: localStorage.getItem('id') });
    localStorage.clear();
    //@ts-ignore
    setPlayerState({});
  };

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
      <div style={{ margin: '48px' }}>Room: {playerState?.room}</div>
      {userArray.map((user: any) => {
        return (
          <sc.UserContainer key={user}>
            <sc.UserName>{user}</sc.UserName>
            {gameState?.users[user].roomLeader &&
            user === playerState?.username ? (
              <sc.StartButton
                onClick={() => {
                  handleStartGame();
                }}>
                Party Ready
              </sc.StartButton>
            ) : (
              <></>
            )}
            {/* <Avatar type={gameState?.users[user].avatarSelection}></Avatar> */}
          </sc.UserContainer>
        );
      })}
      <sc.LogoutButton
        onClick={() => {
          handleLogout();
        }}>
        Logout
      </sc.LogoutButton>
    </div>
  );
};

export default Lobby;
