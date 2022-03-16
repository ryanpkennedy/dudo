import SocketProvider from './Context/SocketProvider';
import GameContextProvider, { GameContext } from './Context/GameContext';
import PlayerContextProvider from './Context/PlayerContext';
import Home from './pages/Home';
import './App.css';
import * as sc from './styled';
import { useContext } from 'react';

function App() {
  const { gameState, setGameState } = useContext(GameContext);
  return (
    <SocketProvider>
      <GameContextProvider>
        <PlayerContextProvider>
          <sc.Title>Dudo</sc.Title>
          <Home></Home>
        </PlayerContextProvider>
      </GameContextProvider>
    </SocketProvider>
  );
}

export default App;
