"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const listeners_1 = require("./listeners");
// const io = new Server({ cors: { origin: ['http://localhost:3000'] } });
const io = new socket_io_1.Server({ cors: { origin: '*' } });
let db = {};
io.on('connection', (socket) => (0, listeners_1.registerListeners)(io, socket, db));
io.listen(4000);
