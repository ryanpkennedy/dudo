import React, {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  lastBid?: { amount: number; face: number };
}

interface GameContext {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

export const GameContext = React.createContext<GameContext>({
  gameState: { users: {}, turn: 0 },
  setGameState: () => true,
});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    open: true,
    users: {},
    turn: 0,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
