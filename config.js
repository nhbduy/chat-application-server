const SERVER_PORT = process.env.PORT || 5000;

const DB_MODE = 3; // 1-MySQL, 2-PG, 3-PG-PROD

const DB_CONNECTION_MYSQL = {
  client: 'mysql',
  connection: {
    connectionString: process.env.DATABASE_URL || '127.0.0.1',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'ChatApplication'
  }
};

const DB_CONNECTION_PG = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL || '127.0.0.1',
    user: process.env.DATABASE_USER || 'nhbduy',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'chat-application'
  }
};

const DB_CONNECTION_PG_PROD = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};

const DB_TABLES = {
  users: 'ta_users',
  rooms: 'ta_rooms',
  re_users_rooms: 're_users_rooms',
  messages: 'ta_messages'
};

const SOCKET_MSG = {
  connection: 'connection',
  disconnect: 'disconnect',
  setOnline: 'setOnline',
  join: 'join',
  leave: 'leave',
  message: 'message',
  sendMessage: 'sendMessage',
  roomData: 'roomData',
  onlineUsers: 'onlineUsers'
};

const MSG_TYPE = {
  admin: 1,
  sent: 2,
  received: 3
};

module.exports = {
  SERVER_PORT,
  DB_MODE,
  DB_CONNECTION: (() => {
    if (DB_MODE === 1) return DB_CONNECTION_MYSQL;
    if (DB_MODE === 2) return DB_CONNECTION_PG;
    if (DB_MODE === 3) return DB_CONNECTION_PG_PROD;

    // default
    return DB_CONNECTION_MYSQL;
  })(),
  DB_TABLES,
  SOCKET_MSG,
  MSG_TYPE
};
