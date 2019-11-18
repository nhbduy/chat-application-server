const {
  asyncGetListDB,
  asyncInsertDB,
  asyncUpdateDB
} = require('../models/users');

//--------------------------------------------------------------
// get users from DATABASE
let users = [];
asyncGetListDB().then(list => (users = list));

//--------------------------------------------------------------
// Function: login or register
function checkUserLogin(req, res) {
  const { name } = req.body;
  let currentUser = {};

  const existedUser = users.filter(u => u.name === name);

  // not existed
  if (existedUser && existedUser.length) currentUser = { ...existedUser[0] };
  else {
    currentUser = {
      id: users.length + 1,
      name,
      online: 0,
      joined: new Date(),
      last_active: new Date()
    };

    users.push(currentUser);
    asyncInsertDB(currentUser);
  }

  try {
    return res.status(200).json({
      status: 200,
      message: 'handleCheckLogin ok',
      user: currentUser
    });
  } catch (error) {
    console.log('user handleCheckLogin', error);
    return res.status(400).json({
      status: 400,
      message: 'handleCheckLogin ko'
    });
  }
}

//--------------------------------------------------------------
// Function: connect
function getOnlineUsers() {
  let list = null;
  list = users.filter(u => u.online === 1 && u.name !== 'admin');

  if (list && list.length > 1) list.sort((a, b) => (a.name > b.name ? 1 : -1));

  return list;
}

//--------------------------------------------------------------
// Function: connect
function setUserConnect(name) {
  let currentUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      users[i] = { ...users[i], online: 1, last_active: new Date() };

      currentUser = users[i];
      asyncUpdateDB(currentUser);

      break;
    }
  }

  return currentUser;
}

//--------------------------------------------------------------
// Function: disconnect
function setUserDisconnect(name) {
  let currentUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      users[i] = { ...users[i], online: 0, last_active: new Date() };

      currentUser = users[i];
      asyncUpdateDB(currentUser);
      break;
    }
  }

  return currentUser;
}

//--------------------------------------------------------------
module.exports = {
  checkUserLogin,
  getOnlineUsers,
  setUserConnect,
  setUserDisconnect
};
