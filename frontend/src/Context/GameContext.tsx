import React, {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { SocketContext } from './SocketProvider';

type Avatar = 'male' | 'female' | undefined;

interface User {
  avatarSelection?: Avatar;
  diceRemaining: number;
  currentDice: number[];
  roomLeader?: boolean;
}

interface Dice {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

interface GameState {
  room?: string;
  open?: boolean;
  users: { [key: string]: User };
  turn: number;
  dice?: Dice;
  phase?: string;
}

interface GameContext {
  gameState: GameState;
  setGameState?: Dispatch<SetStateAction<GameState>>;
}

export const GameContext = React.createContext<GameContext>({
  gameState: { users: {}, turn: 0 },
});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState>({
    open: true,
    users: {},
    turn: 0,
  });

  socket.on('update-state', (state) => {
    console.log('(GameContext) update-state called');
    setGameState({
      ...gameState,
      users: state.users,
      open: state.open,
      turn: state.turn,
    });
  });

  socket.on('next-turn', () => {
    console.log('(Game Context) next turn event received');
    let oldTurn = gameState.turn;
    setGameState({ ...gameState, turn: oldTurn + 1 });
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
