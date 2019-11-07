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
  sendMessage: 'sendMessage'
};

module.exports = {
  SERVER_PORT,
  DB_CONNECTION,
  SOCKET_MSG
};
