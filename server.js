const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// get configuration
const { SERVER_PORT } = require('./config');

const app = express();
const server = http.createServer(app);
const socket = socketio(server);

server.listen(SERVER_PORT, () => {
  console.log(`Server is started on port ${SERVER_PORT}`);
});
