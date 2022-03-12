import SocketProvider from './Context/SocketProvider';
import GameContextProvider from './Context/GameContext';
import PlayerContextProvider from './Context/PlayerContext';
import Home from './pages/Home';
import './App.css';
import * as sc from './styled';

function App() {
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
