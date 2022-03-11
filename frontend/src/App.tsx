import SocketProvider from './Context/SocketProvider';
import GameContextProvider from './Context/GameContext';
import PlayerContextProvider from './Context/PlayerContext';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <GameContextProvider>
        <PlayerContextProvider>
          <Home></Home>
        </PlayerContextProvider>
      </GameContextProvider>
    </SocketProvider>
  );
}

export default App;
