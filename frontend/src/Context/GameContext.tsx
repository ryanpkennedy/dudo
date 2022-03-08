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
}

interface GameState {
  room?: string;
  users: { [key: string]: User };
}

interface GameContext {
  gameState?: GameState;
  setGameState?: Dispatch<SetStateAction<GameState>>;
}

export const GameContext = React.createContext<GameContext>({});

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useContext(SocketContext);
  const [gameState, setGameState] = useState<GameState>({
    users: {},
  });

  socket.on('new-user', (users) => {
    console.log('new user event receieved');
    let newUsers = users;
    setGameState({ ...gameState, users: newUsers });
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
