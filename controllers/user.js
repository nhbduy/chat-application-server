// TODO: read from DB later
const users = [
  { id: 1, name: 'A', room: 'room01' },
  { id: 2, name: 'B', room: 'room01' },
  { id: 3, name: 'C', room: 'room02' },
  { id: 4, name: 'D', room: 'room01' }
];

const knex = require('knex');

const { DB_CONNECTION, DB_TABLES } = require('../config');

// Function: get all users online
async function asyncGetOnlineUsers() {
  try {
    return await knex(DB_CONNECTION)(DB_TABLES.users)
      .where('online', 1)
      .select();
  } catch (error) {
    return error;
  }
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
  asyncGetOnlineUsers,
  getUser,
  getAllUsersInRoom,
  addUser,
  removeUser
};
