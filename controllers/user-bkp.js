// TODO: read from DB later
const users = [
  { id: 1, name: 'A', room: 'room01' },
  { id: 2, name: 'B', room: 'room01' },
  { id: 3, name: 'C', room: 'room02' },
  { id: 4, name: 'D', room: 'room01' }
];

const knex = require('knex');

const { DB_CONNECTION, DB_TABLES } = require('../config');

// Function: login or register
function loginOrRegister(req, res) {
  const { name } = req.body;

  return knex(DB_CONNECTION)(DB_TABLES.users)
    .where({ name })
    .then(response => {
      if (response[0]) {
        res.status(200).json({
          status: 200,
          message: 'login ok',
          user: response[0]
        });
      } else {
        knex(DB_CONNECTION)(DB_TABLES.users)
          .insert({
            name,
            joined: new Date()
          })
          .select('LAST_INSERT_ID()')
          .then(response2 =>
            res.status(200).json({
              status: 200,
              message: 'register ok',
              user: { id: response2[0], name }
            })
          )
          .catch(error2 =>
            res.status(400).json({ status: 400, message: 'register ko' })
          );
      }
    })
    .catch(error => res.status(400).json({ status: 400, message: 'login ko' }));
}

// Function: check user already online
function checkUserAlreadyOnline(name) {
  return knex(DB_CONNECTION)(DB_TABLES.users)
    .where({ name, online: 1 })
    .then(response => response[0])
    .catch(error => console.log(error));
}

// Function: set user online
function setUserOnlineOrOffline(data, callback) {
  return knex(DB_CONNECTION)(DB_TABLES.users)
    .where({ name: data.name })
    .update({ online: data.online, last_active: new Date() })
    .select()
    .then(user => {
      if (user) callback(user.online);
    })
    .catch(error => console.log(error));
}

// Function: get all users online
function getOnlineUsers(data, callback) {
  return knex(DB_CONNECTION)(DB_TABLES.users)
    .where('online', 1)
    .select()
    .then(list => {
      // send online users list to current user
      if (list && list.length) callback(list);
    })
    .catch(error => console.log(error));
}

// Functipn: get an existing user
const getUser = id => users.find(u => u.id === id);

// Function: get all users in a room
const getAllUsersInRoom = room => users.filter(u => u.room === room);

// Function: add new user
const addUser = ({ id, name, room }) => {
  const nameFormatted = name.trim().toLowerCase();
  const roomFormatted = room.trim().toLowerCase();

  const isExistingUser = users.find(
    u => u.name === nameFormatted && u.room === roomFormatted
  );

  if (isExistingUser) return { error: 'Username is already taken.' };

  // add new user to database
  const newUser = { id, name: nameFormatted, room: roomFormatted };
  users.push(newUser);

  return { newUser };
};

// Function: remove existing user
const removeUser = id => {
  const index = users.findIndex(u => u.id === id);

  // remove if user found
  if (index !== -1) {
    const removedUser = users.splice(index, 1)[0];
    return removedUser;
  }
};

module.exports = {
  loginOrRegister,
  checkUserAlreadyOnline,
  setUserOnlineOrOffline,
  getOnlineUsers,
  getUser,
  getAllUsersInRoom,
  addUser,
  removeUser
};
