import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import Login from '../../pages/Login';
import Room from '../Room';
import * as sc from './styled';

const Home = React.memo(() => {
  console.log('(Home) Home Component rendered');
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
  }, []);

  useEffect(() => {
    setId(localStorage.getItem('id'));
  }, [playerState]);

  return (
    <>
      <sc.AppContainer>
        <sc.HomeContainer>
          {id ? <Room></Room> : <Login></Login>}
        </sc.HomeContainer>
      </sc.AppContainer>
      <div style={{ fontSize: '14px' }}>
        <div style={{ fontSize: '14px' }}>
          gameState: {JSON.stringify(gameState)}
        </div>
        <div style={{ fontSize: '14px' }}>
          playerState: {JSON.stringify(playerState)}
        </div>
        <div style={{ fontSize: '14px' }}>id: {id ? id : ''}</div>
      </div>
    </>
  );
});

export default Home;
