/* eslint-disable import/order */

// const usersRooms = [
//   { id: 1, user_id: 2, room_id: 1 },
//   { id: 2, user_id: 3, room_id: 1 },
//   { id: 3, user_id: 4, room_id: 1 },
//   { id: 4, user_id: 2, room_id: 2 },
//   { id: 5, user_id: 3, room_id: 2 }
// ];

const { DB_CONNECTION, DB_TABLES } = require('../config');
const knex = require('knex')(DB_CONNECTION)(DB_TABLES.re_users_rooms);

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

async function asyncDeleteDB(data) {
  const obj = { ...data };
  const { id } = obj;
  if (id) delete obj.id;
  try {
    return await knex.where(obj).del();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  asyncGetListDB,
  asyncInsertDB,
  asyncUpdateDB,
  asyncDeleteDB
};
