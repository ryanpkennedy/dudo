import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import Login from '../../pages/Login';
import Room from '../Room';
import * as sc from './styled';

const Home = () => {
  let [id, setId] = useState(localStorage.getItem('id'));
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setId(localStorage.getItem('id'));
    if (id) {
      console.log('(Home) call get state');
      socket.emit('get-state', { id }, (response: any) => {
        if (response.status === 'user-room combo does not exist') {
          localStorage.clear();
          setId(localStorage.getItem('id'));
        }
      });
    }
  }, [playerState]);

  socket.on('update-state', (users) => {
    console.log('(Home) update-state called');
    //@ts-ignore
    setGameState({ ...gameState, users });
  });

  return (
    <>
      <sc.HomeContainer>
        {id ? <Room></Room> : <Login></Login>}
        <div>gameState: {JSON.stringify(gameState)}</div>
        <div>playerState: {JSON.stringify(playerState)}</div>
        <div>id: {id ? id : ''}</div>
      </sc.HomeContainer>
    </>
  );
};

export default Home;
