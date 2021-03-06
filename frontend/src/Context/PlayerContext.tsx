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

export type Phase = 'bid' | 'results' | 'winner';

interface PlayerState {
  id?: string | null;
  username?: string | null;
  room?: string | null;
  avatar?: 'male' | 'female' | null;
  currentBid: { amount: number; face: number };
  phase: Phase;
}

interface PlayerContext {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
}

export const PlayerContext = React.createContext<PlayerContext>({
  playerState: { currentBid: { amount: 0, face: 0 }, phase: 'bid' },
  setPlayerState: () => true,
});

const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
  console.log('(PlayerContext) Player Context Provider rendered');
  const { socket } = useContext(SocketContext);
  const { gameState, setGameState } = useContext(GameContext);
  let idArray = localStorage.getItem('id')?.split('_');
  let username = idArray ? idArray[1] : undefined;
  let room = idArray ? idArray[0] : undefined;

  const [playerState, setPlayerState] = useState<PlayerState>({
    username: username,
    room: room,
    // phase: 'bid',
    phase: 'bid',
    currentBid: { amount: 0, face: 0 },
  });

  const updatePhase = (state: PlayerState, phase: Phase) => {
    setPlayerState({
      username: state.username,
      room: state.room,
      currentBid: state.currentBid,
      phase: phase,
    });
  };

  useEffect(() => {
    socket.on('update-state', (state) => {
      console.log('(GameContext) update-state called');
      setGameState({
        // ...gameState,
        users: state.users,
        open: state.open,
        turn: state.turn,
        dice: state.dice,
        phase: state.phase,
        loser: state.loser,
        lastBid: state.lastBid,
        palifico: state.palifico,
      });
    });

    // socket.on('next-turn', () => {
    //   console.log('(Game Context) next turn event received');
    //   let oldTurn = gameState.turn;
    //   setGameState({ ...gameState, turn: oldTurn + 1 });
    // });
  }, []);

  useEffect(() => {
    if (gameState.phase === 'results') {
      updatePhase(playerState, gameState.phase);
    } else if (gameState.phase === 'winner' && playerState.phase === 'bid') {
      updatePhase(playerState, gameState.phase);
    }
  }, [gameState]);

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
