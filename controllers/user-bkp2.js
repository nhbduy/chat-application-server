/* eslint-disable import/order */

const { DB_CONNECTION, DB_TABLES } = require('../config');
const knex = require('knex')(DB_CONNECTION);

//--------------------------------------------------------------
// Function: login or register
function handleCheckLogin(req, res) {
  const { name } = req.body;

  return knex(DB_TABLES.rooms)
    .where({ name })
    .then(existedUser => {
      if (existedUser[0]) {
        res.status(200).json({
          status: 200,
          message: 'login ok',
          user: existedUser[0]
        });
      } else {
        knex(DB_TABLES.rooms)
          .insert({
            name,
            joined: new Date()
          })
          .select('LAST_INSERT_ID()')
          .then(newUser =>
            res.status(200).json({
              status: 200,
              message: 'register ok',
              user: { id: newUser[0], name }
            })
          )
          .catch(error => {
            console.log('user register handleCheckLogin', error);
            return res
              .status(400)
              .json({ status: 400, message: 'register ko' });
          });
      }
    })
    .catch(error => {
      console.log('user login handleCheckLogin', error);
      return res.status(400).json({ status: 400, message: 'login ko' });
    });
}

//--------------------------------------------------------------
// Function: connect
function handleUserConnect(data) {
  return knex
    .transaction(trx => {
      trx(DB_TABLES.rooms)
        .where({ name: data })
        .update({ online: 1, last_active: new Date() })
        .then(count => {
          return trx(DB_TABLES.rooms)
            .where({ name: data })
            .then(user => user);
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(response => console.log(response))
    .catch(error => console.log('user handleUserConnect', error));
}

//--------------------------------------------------------------
// Function: connect
function handleOnlineUsers() {
  return knex(DB_TABLES.rooms)
    .where({ online: 1 })
    .select()
    .then(user => {
      if (user) return user;
      else console.log('user handleOnlineUsers: query not found');
    })
    .catch(error => console.log('user handleOnlineUsers', error));
}

//--------------------------------------------------------------
// Function: disconnect
function handleUserDisconnect(data) {
  return knex
    .transaction(trx => {
      trx(DB_TABLES.rooms)
        .where({ name: data })
        .update({ online: 0, last_active: new Date() })
        .then(count => {
          return trx(DB_TABLES.rooms)
            .where({ name: data })
            .then(user => console.log('user disconnected', user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(response => console.log(response))
    .catch(error => console.log('user handleUserDisconnect', error));
}

//--------------------------------------------------------------
module.exports = {
  handleCheckLogin,
  handleUserConnect,
  handleOnlineUsers,
  handleUserDisconnect
};
