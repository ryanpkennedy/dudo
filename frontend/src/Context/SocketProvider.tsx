import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface ContextInterface {
  socket: Socket;
}

const id = localStorage.getItem('id');

const socket = io('http://localhost:4000', { query: { id: id } });

export const SocketContext = React.createContext<ContextInterface>({ socket });

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
