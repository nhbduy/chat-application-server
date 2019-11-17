const SERVER_PORT = process.env.PORT || 5000;

const DB_CONNECTION = {
  client: 'mysql',
  connection: {
    connectionString: process.env.DATABASE_URL || '127.0.0.1',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ChatApplication'
  }
};

const DB_TABLES = {
  users: 'TA_USERS',
  rooms: 'TA_ROOMS',
  messages: 'TA_MESSAGES',
  re_users_rooms: 'RE_USERS_ROOMS'
};

const SOCKET_MSG = {
  connection: 'connection',
  disconnect: 'disconnect',
  setOnline: 'setOnline',
  join: 'join',
  message: 'message',
  sendMessage: 'sendMessage',
  roomData: 'roomData',
  onlineUsers: 'onlineUsers'
};

const MSG_TYPE = {
  admin: 0,
  sent: 1,
  received: 2
};

module.exports = {
  SERVER_PORT,
  DB_CONNECTION,
  DB_TABLES,
  SOCKET_MSG,
  MSG_TYPE
};
