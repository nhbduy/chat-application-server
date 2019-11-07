const express = require('express');
const cors = require('cors');

const knex = require('knex');
const socketio = require('socket.io');
const http = require('http');

//------------------------------------------------------
// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = require('dotenv');
//   dotenv.config();
// }
//------------------------------------------------------

// get configuration
const { SERVER_PORT, DB_CONNECTION, SOCKET_MSG } = require('./config');

const router = require('./router');

const { handdleSocketOpenConnection } = require('./socket');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

const server = http.createServer(app);
const socket = socketio(server);

// socket: open new connection
handdleSocketOpenConnection(socket);

// const knexDB = knex(DB_CONNECTION);

server.listen(SERVER_PORT, () => {
  console.log(`Server is started on port ${SERVER_PORT}`);
});
