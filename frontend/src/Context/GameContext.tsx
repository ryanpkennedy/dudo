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
  roomLeader?: boolean;
  DiceRemaining?: number;
  currentDice?: number[];
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
  turn?: number;
  dice?: Dice;
  phase?: string;
}

interface GameContext {
  gameState?: GameState;
  setGameState?: Dispatch<SetStateAction<GameState>>;
}

export const GameContext = React.createContext<GameContext>({});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState>({
    open: true,
    users: {},
  });

  socket.on('update-state', (state) => {
    console.log('(Home) update-state called');
    setGameState({ ...gameState, users: state.users, open: state.open });
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
