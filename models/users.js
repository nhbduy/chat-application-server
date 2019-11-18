/* eslint-disable import/order */

// const users = [
//   { id: 1, name: 'admin', online: 1, joined: '', last_active: '' },
//   { id: 2, name: 'andy', online: 0, joined: '', last_active: '' },
//   { id: 3, name: 'bob', online: 0, joined: '', last_active: '' },
//   { id: 4, name: 'cindy', online: 0, joined: '', last_active: '' }
// ];

const { DB_CONNECTION, DB_TABLES } = require('../config');
const knex = require('knex')(DB_CONNECTION)(DB_TABLES.users);

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
