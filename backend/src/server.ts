import { Server, Socket } from 'socket.io';

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
  lastBid: { amount: number; face: number };
}

let maxRoomSize = 8;
let minRoomSize = 2;

let db: { [key: string]: room } = {};

let activeConnections: { [key: string]: {} } = {};

const countDice = (room: string) => {
  let allUsersRolled = true;

  let usersArray = Object.getOwnPropertyNames(db[room].users);
  for (let user of usersArray) {
    if (db[room].users[user].currentDice.length === 0) {
      allUsersRolled = false;
    }
  }

  if (!allUsersRolled) {
    db[room].dice = {};
  } else {
    let newDice: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    for (let user of usersArray) {
      for (let i of db[room].users[user].currentDice) {
        if (i !== 0) {
          newDice[i] += 1;
        }
      }
    }
    db[room].dice = newDice;
    console.log('game dice count: ', newDice);
  }
};

io.on('connection', async (socket) => {
  let liveSockets = await io.allSockets();
  console.log('current connections: ', liveSockets);
  socket.on('disconnect', async () => {
    console.log('socket disconnect');
    liveSockets = await io.allSockets();
    console.log('current connections: ', liveSockets);
  });
  if (socket.handshake.query.id !== 'null') {
    // @ts-ignore
    let idArray = socket.handshake.query.id.split('_');
    let room = idArray[0];
    if (db[room]) {
      console.log(`joining room ${room}`);
      console.log(`current people in room ${room}`, db[room].users);
      socket.join(room);
    }
  }
  console.log('Socket ID: \n', socket.id);

  socket.on('get-state', ({ id }, callback) => {
    let idArray = id.split('_');
    let room = idArray[0];
    //verify that room exists and username exists in room
    if (db[room] && db[room]['users'][idArray[1]]) {
      socket.join(room);
      console.log('update state called from get-state listener');
      io.to(room).emit('update-state', db[room]);
      callback({ status: '200' });
    } else {
      callback({ status: `user-room combo does not exist` });
    }
  });

  socket.on(
    'login',
    (
      user: {
        username: string;
        avatarSelection: string;
        room: string;
      },
      callback
    ) => {
      let newUser: User = {
        avatarSelection: user.avatarSelection,
        diceRemaining: 6,
        currentDice: [],
        roomLeader: false,
      };

      //if room exists. If so is it open? If not, send back closed response. Is username taken? If so, send response. If room doesn't exist, create room
      if (db[user.room] && !db[user.room].open) {
        callback({ status: 'room closed' });
      } else if (db[user.room] && db[user.room]['users'][user.username]) {
        callback({ status: 'username taken' });
      } else {
        if (!db[user.room]) {
          db[user.room] = {
            open: true,
            users: {},
            turn: 0,
            dice: {},
            phase: 'bid',
            lastBid: { amount: 0, face: 0 },
          };
          // this means this is the first user for this room, so make them the party leader
          newUser.roomLeader = true;
        }

        let usersArray = Object.getOwnPropertyNames(db[user.room].users);

        //check if the room is full
        if (usersArray.length === maxRoomSize) {
          console.log('room is full');
          callback({ status: 'room is full' });
        } else {
          socket.join(user.room);
          db[user.room].users = {
            ...db[user.room].users,
            [user.username]: newUser,
          };
          // const clients = io.sockets.adapter.rooms.get('R');

          console.log(`all users in room ${user.room}`, db[user.room].users);
          console.log('update state called from login listener');
          io.to(user.room).emit('update-state', db[user.room]);
          callback({ status: '200' });
        }
      }
    }
  );

  socket.on('close-room', ({ room }) => {
    console.log('close-room event received for room', room);
    if (db[room]) {
      db[room].open = false;
      console.log('update state called from login listener');
      io.to(room).emit('update-state', db[room]);
    }
  });

  socket.on('user-roll', ({ id, roll }) => {
    let idArray = id.split('_');
    let room = idArray[0];
    let username = idArray[1];
    db[room]['users'][username].currentDice = roll;
    countDice(room);
    io.to(room).emit('update-state', db[room]);
  });

  socket.on('place-bid', ({ bid, room }) => {
    db[room].lastBid = bid;
    io.to(room).emit('update-state', db[room]);
  });

  socket.on('dudo', ({ room }) => {
    if (db[room]) {
      let bidAmount = db[room].lastBid.amount;
      let bidFace = db[room].lastBid.face;
      let roomAmount = db[room].dice[bidFace!];
      let usersArray = Object.getOwnPropertyNames(db[room]['users']);
      if (bidAmount! <= roomAmount) {
        // person who called dudo loses die
        let loser = usersArray[db[room].turn];
        db[room]['users'][loser].diceRemaining -= 1;
      } else {
        // person who made last bid loses die
        db[room].turn =
          db[room].turn === 0 ? usersArray.length - 1 : db[room].turn - 1;
        let loser = usersArray[db[room].turn];
        db[room]['users'][loser].diceRemaining -= 1;
      }
      // reset everyones dice for the next round
      for (let k of usersArray) {
        db[room]['users'][k].currentDice = [];
      }
      db[room].lastBid = { amount: 0, face: 0 };
      db[room].phase = 'results';
      io.to(room).emit('update-state', db[room]);
    }
  });

  socket.on('even', ({ room }) => {
    if (db[room]) {
      console.log('check even');
    }
  });

  socket.on('next-round', ({ room }) => {
    db[room].phase = 'bid';
    io.to(room).emit('update-state', db[room]);
  });

  socket.on('increment-turn', ({ room }) => {
    let roomSize = Object.getOwnPropertyNames(db[room]['users']).length - 1;
    if (db[room].turn === roomSize) {
      db[room].turn = 0;
    } else {
      db[room].turn += 1;
    }
    io.to(room).emit('update-state', db[room]);
  });

  //holy shit this is embarrassing
  socket.on('logout', ({ id }) => {
    let idArray = id.split('_');
    let room = idArray[0];
    let oldId = idArray[1];
    if (db[room] && db[room].users[oldId]) {
      delete db[room].users[oldId];
    }
  });
});

io.listen(4000);
