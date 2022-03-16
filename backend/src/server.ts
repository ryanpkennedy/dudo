import { Server, Socket } from 'socket.io';
import { registerListeners } from './listeners';

// const io = new Server({ cors: { origin: ['http://localhost:3000'] } });
const io = new Server({ cors: { origin: '*' } });

interface User {
  avatarSelection: string;
  diceRemaining: number;
  currentDice: number[];
  roomLeader?: boolean;
}

interface room {
  open?: boolean;
  users: { [key: string]: User };
  turn: number;
  dice: { [key: number]: number };
  phase: 'bid' | 'results';
  loser: number;
  lastBid: { amount: number; face: number };
  palifico: boolean;
}

let db: { [key: string]: room } = {};

console.log('server restart db: ', JSON.stringify(db));

io.on('connection', (socket) => registerListeners(io, socket, db));

io.listen(4000);
