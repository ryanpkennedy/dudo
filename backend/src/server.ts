import { Server, Socket } from 'socket.io';

// const io = new Server({ cors: { origin: ['http://localhost:3000'] } });
const io = new Server({ cors: { origin: '*' } });

interface user {
  avatarSelection: string;
  diceRemaining?: number;
  currentDice?: number[];
  room?: string;
  roomLeader?: boolean;
}

interface room {
  open?: boolean;
  users: { [key: string]: user };
}

let maxRoomSize = 8;
let minRoomSize = 2;

let db: { [key: string]: room } = {
  ASDF: {
    open: true,
    users: {
      Ryan: {
        avatarSelection: 'male',
      },
      Bob: {
        avatarSelection: 'female',
      },
      Joe: {
        avatarSelection: 'male',
      },
    },
  },
  JFJF: { users: {} },
  ROOM: { users: {} },
};

let activeConnections: { [key: string]: {} } = {};

io.on('connection', (socket) => {
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
      let newUser: user = {
        avatarSelection: user.avatarSelection,
        room: user.room,
        roomLeader: false,
      };

      //if room exists. If so is it open? If not, send back closed response. Is username taken? If so, send response. If room doesn't exist, create room
      if (db[user.room] && !db[user.room].open) {
        callback({ status: 'room closed' });
      } else if (db[user.room] && db[user.room]['users'][user.username]) {
        callback({ status: 'username taken' });
      } else {
        if (!db[user.room]) {
          db[user.room] = { open: true, users: {} };
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
      console.log('sending update-state event');
      io.to(room).emit('update-state', db[room]);
    }
  });

  socket.on('user-roll', ({ id, roll }) => {
    let idArray = id.split('_');
    let room = idArray[0];
    let oldId = idArray[1];
    console.log(roll);
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
