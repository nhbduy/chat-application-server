/* eslint-disable import/order */

// const messages = [
//   {
//     id: 1,
//     sender_id: 2,
//     room_id: 1,
//     content: 'Hi guys',
//     created_at: '2019-11-15 19:59:01',
//     seen_by: [1, 2]
//   },
//   {
//     id: 1,
//     sender_id: 2,
//     room_id: 2,
//     content: 'Hey Bob, are you there?',
//     created_at: '2019-11-16 20:00:00',
//     seen_by: [2]
//   }
// ];

const { DB_CONNECTION, DB_TABLES } = require('../config');
const knex = require('knex')(DB_CONNECTION)(DB_TABLES.messages);

async function asyncGetListDB() {
  try {
    return await knex.select();
  } catch (error) {
    console.log(error);
  }
}

async function asyncInsertDB(data) {
  const obj = { ...data };
  if (obj.id) delete obj.id;
  try {
    return await knex.insert(obj).select('LAST_INSERT_ID()');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  asyncGetListDB,
  asyncInsertDB
};
