import React, {
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { GameContext } from './GameContext';
import { SocketContext } from './SocketProvider';

interface PlayerState {
  id?: string | null;
  username?: string | null;
  room?: string | null;
  avatar?: 'male' | 'female' | null;
  phase?: 'bid' | 'results';
}

interface PlayerContext {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
}

export const PlayerContext = React.createContext<PlayerContext>({
  playerState: {},
  setPlayerState: () => true,
});

const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useContext(SocketContext);
  const { gameState, setGameState } = useContext(GameContext);

  const [playerState, setPlayerState] = useState<PlayerState>({
    phase: 'bid',
  });

  useEffect(() => {
    socket.on('update-state', (state) => {
      console.log('(GameContext) update-state called');
      setGameState({
        ...gameState,
        users: state.users,
        open: state.open,
        turn: state.turn,
        dice: state.dice,
        phase: state.phase,
        loser: state.loser,
        lastBid: state.lastBid,
      });
      let idArray = localStorage.getItem('id')?.split('_');
      let username = idArray ? idArray[1] : undefined;
      let room = idArray ? idArray[0] : undefined;
      console.log('playerState from update-state event: ', playerState);
      let newPlayerState = {
        username: username,
        room: room,
        phase: state.phase,
      };
      setPlayerState(newPlayerState);
    });

    socket.on('next-turn', () => {
      console.log('(Game Context) next turn event received');
      let oldTurn = gameState.turn;
      setGameState({ ...gameState, turn: oldTurn + 1 });
    });
  }, []);

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
