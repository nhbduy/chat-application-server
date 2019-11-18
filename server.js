const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const { checkUserLogin } = require('./controllers/UserController');

//------------------------------------------------------
// if (process.env.NODE_ENV !== 'production') {
//   const dotenv = require('dotenv');
//   dotenv.config();
// }
//------------------------------------------------------

// get configuration
const { SERVER_PORT } = require('./config');

const router = require('./router');

const { handdleSocketOpenConnection } = require('./socket');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

//-------------------------------------------------
// API

// check login on Welcome screen => login or register
app.post('/checkLogin', checkUserLogin);

//-------------------------------------------------
// SOCKET
const server = http.createServer(app);

// socket: open new connection
handdleSocketOpenConnection(socketio(server));

server.listen(SERVER_PORT, () => {
  console.log(`Server is started on port ${SERVER_PORT}`);
});
