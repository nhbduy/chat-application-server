const SERVER_PORT = process.env.PORT || 5000;

const DB_CONNECTION = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};

const SOCKET_MSG = {
  connection: 'connection',
  disconnect: 'disconnect',
  join: 'join',
  message: 'message',
  sendMessage: 'sendMessage',
  roomData: 'roomData'
};

const MSG_TYPE = {
  admin: 0,
  sent: 1,
  received: 2
};

module.exports = {
  SERVER_PORT,
  DB_CONNECTION,
  SOCKET_MSG,
  MSG_TYPE
};
