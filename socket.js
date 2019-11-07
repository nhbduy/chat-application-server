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

function handleSocketUserJoin(socket) {
  socket.on(SOCKET_MSG.join, ({ user, room }, callback) => {
    const currentUser = addUser({ id: socket.id, name: user, room });

    if (!currentUser) {
      console.log('handleSocketUserJoin:', 'cant add new user');
      return null;
    }

    const { error, newUser } = currentUser;

    if (error) return callback(error);

    // send admin welcome message to new user
    socket.emit(
      SOCKET_MSG.message,
      messageFormat(
        'admin',
        `Hi ${newUser.name}, welcome to room ${newUser.room}`,
        MSG_TYPE.admin
      )
    );

    // send admin broadcast notification to existing users in the same room
    socket.broadcast
      .to(newUser.room)
      .emit(
        SOCKET_MSG.message,
        messageFormat('admin', `${newUser.name} has joined.`, MSG_TYPE.admin)
      );

    socket.join(newUser.room);

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

    socketio.to(room).emit(SOCKET_MSG.message, {
      user: name,
      text: message,
      type: MSG_TYPE.sent,
      time: new Date()
    });

    callback();
  });
}

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
function handleSocketDisconnect(socket) {
  socket.on(SOCKET_MSG.disconnect, () => {
    console.log('User left.');
  });
}

//-----------------------------------------------------------------------
function handdleSocketOpenConnection(socketio) {
  socketio.on(SOCKET_MSG.connection, socket => {
    console.log('New connection is added.');

    handleSocketUserJoin(socket);

    handleSocketUserSendMessage(socket, socketio);

    handleSocketDisconnect(socket);
  });
}

module.exports = {
  handdleSocketOpenConnection
};
