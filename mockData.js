const users = [
  { id: 1, name: 'admin', online: 1, joined: '', last_active: '' },
  { id: 2, name: 'andy', online: 0, joined: '', last_active: '' },
  { id: 3, name: 'bob', online: 0, joined: '', last_active: '' },
  { id: 4, name: 'cindy', online: 0, joined: '', last_active: '' }
];

const rooms = [
  { id: 1, name: 'Group 01', type: 2 },
  { id: 2, name: 'P2P 01', type: 1 }
];

const usersRooms = [
  // { id: 1, user_id: 2, room_id: 1 },
  // { id: 2, user_id: 3, room_id: 1 },
  // { id: 3, user_id: 4, room_id: 1 },
  // { id: 4, user_id: 2, room_id: 2 },
  // { id: 5, user_id: 3, room_id: 2 }
];

const messages = [
  // {
  //   id: 1,
  //   sender_id: 2,
  //   room_id: 1,
  //   content: 'Hi guys',
  //   create_at: '2019-11-15 19:59:01',
  //   seen_by: [1, 2]
  // },
  // {
  //   id: 1,
  //   sender_id: 2,
  //   room_id: 2,
  //   content: 'Hey Bob, are you there?',
  //   create_at: '2019-11-16 20:00:00',
  //   seen_by: [2]
  // }
];

module.exports = {
  users,
  rooms,
  usersRooms,
  messages
};
