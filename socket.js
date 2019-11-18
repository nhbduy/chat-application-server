/* eslint-disable no-use-before-define */
// get configuration
const { SOCKET_MSG } = require('./config');

const {
  getOnlineUsers,
  setUserConnect,
  setUserDisconnect
} = require('./controllers/UserController');

const {
  getAvailableRooms,
  setNewRoom,
  setJoinRoom,
  setLeaveRoom
} = require('./controllers/RoomController');

const {
  getAllMessages,
  getMessagesInRoom,
  setNewMessage
} = require('./controllers/MessageController');

//-----------------------------------------------------------------------
function socketUserConnect(client, socket) {
  client.on('userConnect', (name, callback) => {
    const user = setUserConnect(name);

    if (user) {
      callback(user);

      // notify online user list to all users (include sender)
      const userList = getOnlineUsers();
      if (userList) socket.emit('getOnlineUsers', userList);

      // notify available room list to all users (include sender)
      const roomList = getAvailableRooms();
      if (roomList) socket.emit('getAvailableRooms', roomList);
    }
  });
}

//-----------------------------------------------------------------------
function socketUserDisconnect(client, socket) {
  client.on('userDisconnect', name => {
    const user = setUserDisconnect(name);

    if (user) {
      // notify online user list to all users (exclude sender)
      const list = getOnlineUsers();
      if (list) client.broadcast.emit('getOnlineUsers', list);
    }
  });

  client.on(SOCKET_MSG.disconnect, () => {
    console.log('Client is disconnected', client.id);
  });
}

//-----------------------------------------------------------------------
function socketUserCreateRoom(client, socket) {
  client.on('createNewRoom', ({ user, roomName, roomType }, callback) => {
    const room = setNewRoom(user.id, roomName, roomType);

    if (room) {
      callback(room);

      // notify available room (not P2P) list to all users (include sender)
      if (room.room_type === 2) {
        const roomList = getAvailableRooms();
        if (roomList) socket.emit('getAvailableRooms', roomList);
      }
    }
  });
}

//-----------------------------------------------------------------------
function socketUserJoinRoom(client, socket) {
  client.on(SOCKET_MSG.join, ({ user, room }, callback) => {
    const reUserRoom = setJoinRoom(user.id, room.id);

    callback(room);

    // check user already joined
    if (!reUserRoom) {
      // null when existed
      console.log(`${user.name} has already joined in ${room.name}`);
      socketUserGetMessageList(room, client, socket);
      return;
    }

    client.join(room.name);

    // send admin welcome message to new user
    const adminId = 1;
    setNewMessage(
      adminId,
      room.id,
      `Hi ${user.name}, welcome to room ${room.name}`
    );

    socketUserGetMessageList(room, client, socket);
  });
}

//-----------------------------------------------------------------------
function socketUserLeaveRoom(client, socket) {
  client.on(SOCKET_MSG.leave, ({ user, room }, callback) => {
    const reUserRoom = setLeaveRoom(user.id, room.id);

    callback(room);

    // check user already left
    if (!reUserRoom) {
      // null when not existed
      console.log(`${user.name} has already left from ${room.name}`);
      socketUserGetMessageList(room, client, socket);
      return;
    }

    client.leave(room.name);

    // send admin welcome message to new user
    const adminId = 1;
    setNewMessage(
      adminId,
      room.id,
      `${user.name} has left from room ${room.name}`
    );

    socketUserGetMessageList(room, client, socket);
  });
}

//-----------------------------------------------------------------------
function socketUserSendMessage(client, socket) {
  client.on(SOCKET_MSG.sendMessage, ({ user, room, message }, callback) => {
    callback();

    setNewMessage(user.id, room.id, message);

    socketUserGetMessageList(room, client, socket);
  });
}

//-----------------------------------------------------------------------
function socketUserGetMessageList(room, client, socket) {
  const list = getAllMessages();
  // TODO: improve with getMessagesInRoom(room.id);

  socket.emit(SOCKET_MSG.message, list);
}

//-----------------------------------------------------------------------
function handdleSocketOpenConnection(socket) {
  socket.on(SOCKET_MSG.connection, client => {
    console.log('Client is connected.', client.id);

    socketUserConnect(client, socket);
    socketUserCreateRoom(client, socket);
    socketUserJoinRoom(client, socket);
    socketUserLeaveRoom(client, socket);
    socketUserSendMessage(client, socket);
    socketUserDisconnect(client, socket);
  });
}

module.exports = {
  handdleSocketOpenConnection
};
