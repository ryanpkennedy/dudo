import React, {
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { SocketContext } from './SocketProvider';

interface PlayerState {
  id?: string | null;
  username?: string | null;
  room?: string | null;
  avatar?: 'male' | 'female' | null;
}

interface PlayerContext {
  playerState?: PlayerState;
  setPlayerState?: Dispatch<SetStateAction<PlayerState>>;
}

export const PlayerContext = React.createContext<PlayerContext>({});

const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useContext(SocketContext);
  let idArray = localStorage.getItem('id')?.split('_');
  let username = idArray ? idArray[1] : undefined;
  let room = idArray ? idArray[0] : undefined;
  const [playerState, setPlayerState] = useState<PlayerState>({
    username: username,
    room: room,
  });

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
