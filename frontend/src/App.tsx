import SocketProvider from './Context/SocketProvider';
import GameContextProvider, { GameContext } from './Context/GameContext';
import PlayerContextProvider from './Context/PlayerContext';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <GameContextProvider>
        <PlayerContextProvider>
          <NavBar></NavBar>
          <Home></Home>
        </PlayerContextProvider>
      </GameContextProvider>
    </SocketProvider>
  );
}

export default App;
