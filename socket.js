// get configuration
const { SOCKET_MSG } = require('./config');

const {
  getUser,
  getAllUsersInRoom,
  addUser,
  removeUser
} = require('./controllers/user');

//-----------------------------------------------------------------------
function handleSocketUserJoin(socket) {
  socket.on(SOCKET_MSG.join, ({ user, room }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, name: user, room });

    if (error) return callback(error);

    // send admin welcome message to new user
    socket.emit(SOCKET_MSG.message, {
      user: 'admin',
      text: `Hi ${newUser.name}, welcome to room ${newUser.room}`
    });

    // send admin broadcast notification to existing users in the same room
    socket.broadcast.to(newUser.room).emit(SOCKET_MSG.message, {
      user: 'admin',
      text: `${newUser.name} has joined.`
    });

    socket.join(newUser.room);

    callback();
  });
}

//-----------------------------------------------------------------------
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
function handdleSocketOpenConnection(socket) {
  socket.on(SOCKET_MSG.connection, currentSocket => {
    console.log('New connection is added.');

    handleSocketUserJoin(currentSocket);

    handleSocketUserSendMessage(currentSocket);

    handleSocketDisconnect(currentSocket);
  });
}

module.exports = {
  handdleSocketOpenConnection
};
