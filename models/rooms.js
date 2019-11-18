/* eslint-disable import/order */

// const rooms = [
//   { id: 1, name: 'Group 01', room_type: 2 },
//   { id: 2, name: 'P2P 01', room_type: 1 }
// ];

const { DB_CONNECTION, DB_TABLES } = require('../config');
const knex = require('knex')(DB_CONNECTION)(DB_TABLES.rooms);

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

async function asyncUpdateDB(data) {
  const obj = { ...data };
  const { id } = obj;
  if (id) delete obj.id;
  try {
    return await knex.where({ id }).update(obj);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  asyncGetListDB,
  asyncInsertDB,
  asyncUpdateDB
};
