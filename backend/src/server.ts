import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { registerListeners } from './listeners';

let mode = 'prod';
let socketCors = mode === 'dev' ? '*' : 'https://rykennedy.com';

const app = express();
const httpServer = createServer(app);

// app.use('/', express.static(path.resolve(__dirname, '../../frontend/build')));

app.use(
  '/dudo',
  express.static(path.resolve(__dirname, '../../frontend/build'))
);

console.log(__dirname);

let io = new Server(httpServer, {
  cors: { origin: socketCors },
});

interface User {
  diceRemaining: number;
  currentDice: number[];
  roomLeader?: boolean;
}

interface room {
  open?: boolean;
  users: { [key: string]: User };
  turn: number;
  dice: { [key: number]: number };
  phase: 'bid' | 'results' | 'winner';
  loser: string;
  lastBid: { amount: number; face: number };
  palifico: boolean;
  settings: {};
}

let db: { [key: string]: room } = {};

console.log('server restart db: ', JSON.stringify(db));

io.on('connection', (socket) => registerListeners(io, socket, db));

httpServer.listen(4000);
// io.listen(4000);
