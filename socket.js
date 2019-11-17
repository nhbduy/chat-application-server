// get configuration
const { SOCKET_MSG, MSG_TYPE } = require('./config');

const {
  getOnlineUsers,
  setUserConnect,
  setUserDisconnect
  // handleGetAvailableUsers,
  // handleCreateRoom,
  // handleJoinRoom,
  // handleLeaveRoom,
  // handleSendMessage,
  // handleGetAvailableRooms,
} = require('./controllers/user');

const {
  getAvailableRooms,
  setNewRoom,
  setJoinRoom,
  setLeaveRoom
} = require('./controllers/room');

const { setNewMessage } = require('./controllers/message');

// const {
//   checkUserAlreadyOnline,
//   setUserOnlineOrOffline,
//   getOnlineUsers,
//   getUser,
//   getAllUsersInRoom,
//   addUser,
//   removeUser
// } = require('./controllers/user');

// //-----------------------------------------------------------------------
// const messageFormat = (id, user, text, type) => {
//   const time = new Date();

//   return { id, user, text, type, time: time.toLocaleString() };
// };

// function sendRoomData(socketio, room) {
//   // send room data (user list)
//   socketio.to(room).emit(MSG_TYPE.roomData, {
//     room,
//     users: getAllUsersInRoom(room)
//   });
// }

// function handleSocketConnect(socket) {
//   socket.on(SOCKET_MSG.setOnline, setUserOnlineOrOffline);
// }

// function handleSocketOnlineUsersList(socket) {
//   socket.on(SOCKET_MSG.onlineUsers, getOnlineUsers);
// }

// function handleSocketUserJoin(socket, socketio) {
//   socket.on(SOCKET_MSG.join, (data, callback) => {
//     const currentUser = addUser({
//       id: socket.id,
//       name: data.user
//     });

//     if (!currentUser) {
//       console.log('handleSocketUserJoin:', 'cant add');
//       return null;
//     }

//     const { error, newUser } = currentUser;

//     if (error) return callback(error);

//     if (!newUser) {
//       console.log('handleSocketUserJoin:', 'cant join');
//       return null;
//     }

//     const { name, room } = newUser;

//     // send admin welcome message to new user
//     socket.emit(
//       SOCKET_MSG.message,
//       messageFormat(
//         socket.id,
//         'admin',
//         `Hi ${name}, welcome to room ${room}`,
//         MSG_TYPE.admin
//       )
//     );

//     // send admin broadcast notification to existing users in the same room
//     socket.broadcast
//       .to(room)
//       .emit(
//         SOCKET_MSG.message,
//         messageFormat(socket.id, 'admin', `${name} has joined.`, MSG_TYPE.admin)
//       );

//     socket.join(room);

//     sendRoomData(socketio, room);

//     callback();
//   });
// }

// //-----------------------------------------------------------------------
// function handleSocketUserSendMessage(socket, socketio) {
//   socket.on(SOCKET_MSG.sendMessage, (message, callback) => {
//     const currentUser = getUser(socket.id);

//     if (!currentUser) {
//       console.log('handleSocketUserSendMessage:', 'cant send message');
//       return null;
//     }
//     const { name, room } = currentUser;

//     socketio
//       .to(room)
//       .emit(
//         SOCKET_MSG.message,
//         messageFormat(socket.id, name, message, MSG_TYPE.sent)
//       );

//     sendRoomData(socketio, room);

//     callback();
//   });
// }

// //-----------------------------------------------------------------------
// //-----------------------------------------------------------------------
// //-----------------------------------------------------------------------
// //-----------------------------------------------------------------------
// //-----------------------------------------------------------------------

// //-----------------------------------------------------------------------
// function handleSocketDisconnect(socket, socketio) {
//   socket.on(SOCKET_MSG.disconnect, () => {
//     const removedUser = removeUser(socket.id);

//     if (!removedUser) {
//       console.log('handleSocketDisconnect:', 'cant disconnect');
//       return null;
//     }

//     const { name, room } = removedUser;

//     if (removedUser) {
//       socketio
//         .to(room)
//         .emit(
//           SOCKET_MSG.message,
//           messageFormat(socket.id, 'admin', `${name} has left.`, MSG_TYPE.admin)
//         );
//     }

//     console.log('User left.');
//   });
// }

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

function socketUserCreateRoom(client, socket) {
  client.on('createNewRoom', ({ user, roomName, roomType }, callback) => {
    const room = setNewRoom(user.id, roomName, roomType);

    if (room) {
      callback(room);

      // notify available room list to all users (include sender)
      const roomList = getAvailableRooms();
      if (roomList) socket.emit('getAvailableRooms', roomList);
    }
  });
}

function socketUserJoinRoom(client, socket) {
  client.on(SOCKET_MSG.join, ({ user, room }) => {
    const adminId = 1;

    // send admin welcome message to new user
    const welcomeMessage = setNewMessage(
      adminId,
      room.id,
      `Hi ${user.name}, welcome to room ${room.name}`,
      MSG_TYPE.admin
    );
    client.emit(SOCKET_MSG.message, welcomeMessage);

    // send admin broadcast notification to existing users in the same room (except sender)
    const notificationMessage = setNewMessage(
      adminId,
      room.id,
      `${user.name} has joined`,
      MSG_TYPE.admin
    );
    client.broadcast
      .to(room.name)
      .emit(SOCKET_MSG.message, notificationMessage);

    client.join(room.name);
  });
}

function socketUserSendMessage(client, socket) {
  client.on(SOCKET_MSG.sendMessage, ({ user, room, message }, callback) => {
    const newMessage = setNewMessage(user.id, room.id, message, MSG_TYPE.sent);

    // send message to all user in current room
    socket.in(room.name).emit(SOCKET_MSG.message, newMessage);

    callback();
  });
}

//-----------------------------------------------------------------------
function handdleSocketOpenConnection(socket) {
  socket.on(SOCKET_MSG.connection, client => {
    console.log('Client is connected.', client.id);

    socketUserConnect(client, socket);

    socketUserCreateRoom(client, socket);

    socketUserJoinRoom(client, socket);

    socketUserSendMessage(client, socket);

    // notify online user list to all users (include sender)
    // setTimeout(() => {
    //   handleOnlineUsers().then(response =>
    //     socket.emit('getOnlineUsers', response)
    //   );
    // }, 1000);

    // client.on('getOnlineUsers', handleOnlineUsers);

    // client.on('availableUsers', handleGetAvailableUsers);

    // client.on('createRoom', handleCreateRoom);

    // client.on('joinRoom', handleJoinRoom);

    // client.on('leaveRoom', handleLeaveRoom);

    // client.on('sendMessage', handleSendMessage);

    // client.on('availableRooms', handleGetAvailableRooms);

    socketUserDisconnect(client, socket);

    // client.on('alreadyOnline', (name, callback) => {
    //   const data = checkUserAlreadyOnline(name);
    //   callback(data);
    // });

    // // each user must have max 1 connection
    // handleSocketConnect(client);

    // handleSocketOnlineUsersList(client, socket);

    // handleSocketUserJoin(client, socket);

    // handleSocketUserSendMessage(client, socket);

    // handleSocketDisconnect(client, socket);
  });
}

module.exports = {
  handdleSocketOpenConnection
};
