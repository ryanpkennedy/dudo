import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

let mode = 'prod';
let socketUrl =
  mode === 'dev' ? 'http://192.168.1.139:4000' : 'https://www.rykennedy.com';

interface ContextInterface {
  socket: Socket;
}

const id = localStorage.getItem('id');

//to test on mobile while running dev server, need this url to have the IP of server device
const socket = io(socketUrl, { query: { id: id } });

export const SocketContext = React.createContext<ContextInterface>({ socket });

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  console.log('(Socket Provider) Socket Provider rendered');
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
