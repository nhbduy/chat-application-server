// get configuration
const { SOCKET_MSG, MSG_TYPE } = require('./config');

const {
  getUser,
  getAllUsersInRoom,
  addUser,
  removeUser
} = require('./controllers/user');

//-----------------------------------------------------------------------
const messageFormat = (user, text, type) => {
  const time = new Date();

  return { user, text, type, time: time.toLocaleString() };
};

function sendRoomData(socketio, room) {
  // send room data (user list)
  socketio.to(room).emit(MSG_TYPE.roomData, {
    room,
    users: getAllUsersInRoom(room)
  });
}

function handleSocketUserJoin(socket, socketio) {
  socket.on(SOCKET_MSG.join, (data, callback) => {
    const currentUser = addUser({
      id: socket.id,
      name: data.user,
      room: data.room
    });

    if (!currentUser) {
      console.log('handleSocketUserJoin:', 'cant add');
      return null;
    }

    const { error, newUser } = currentUser;

    if (error) return callback(error);

    if (!newUser) {
      console.log('handleSocketUserJoin:', 'cant join');
      return null;
    }

    const { name, room } = newUser;

    // send admin welcome message to new user
    socket.emit(
      SOCKET_MSG.message,
      messageFormat(
        'admin',
        `Hi ${name}, welcome to room ${room}`,
        MSG_TYPE.admin
      )
    );

    // send admin broadcast notification to existing users in the same room
    socket.broadcast
      .to(room)
      .emit(
        SOCKET_MSG.message,
        messageFormat('admin', `${name} has joined.`, MSG_TYPE.admin)
      );

    socket.join(room);

    sendRoomData(socketio, room);

    callback();
  });
}

//-----------------------------------------------------------------------
function handleSocketUserSendMessage(socket, socketio) {
  socket.on(SOCKET_MSG.sendMessage, (message, callback) => {
    const currentUser = getUser(socket.id);

    if (!currentUser) {
      console.log('handleSocketUserSendMessage:', 'cant send message');
      return null;
    }
    const { name, room } = currentUser;

    socketio
      .to(room)
      .emit(SOCKET_MSG.message, messageFormat(name, message, MSG_TYPE.sent));

    sendRoomData(socketio, room);

    callback();
  });
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
function handleSocketDisconnect(socket, socketio) {
  socket.on(SOCKET_MSG.disconnect, () => {
    const removedUser = removeUser(socket.id);

    if (!removedUser) {
      console.log('handleSocketDisconnect:', 'cant disconnect');
      return null;
    }

    const { name, room } = removedUser;

    if (removedUser) {
      socketio
        .to(room)
        .emit(
          SOCKET_MSG.message,
          messageFormat('admin', `${name} has left.`, MSG_TYPE.admin)
        );
    }

    console.log('User left.');
  });
}

//-----------------------------------------------------------------------
function handdleSocketOpenConnection(socketio) {
  socketio.on(SOCKET_MSG.connection, socket => {
    console.log('New connection is added.');

    handleSocketUserJoin(socket, socketio);

    handleSocketUserSendMessage(socket, socketio);

    handleSocketDisconnect(socket, socketio);
  });
}

module.exports = {
  handdleSocketOpenConnection
};
