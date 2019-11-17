/* eslint-disable no-use-before-define */

const { rooms, usersRooms } = require('../mockData');

//--------------------------------------------------------------
// Function: get list
function getAvailableRooms() {
  let list = null;
  list = rooms.filter(u => u.type === 2);

  if (list && list.length > 1) list.sort((a, b) => (a.name > b.name ? 1 : -1));

  return list;
}

//--------------------------------------------------------------
// Function: connect
function setNewRoom(userId, roomName, roomType) {
  // check existed room name
  let p2pReversedName = null;
  if (roomType === 1) {
    p2pReversedName = roomName
      .split('-')
      .reverse()
      .join('-');
  }

  const existedRoom = rooms.filter(
    r => r.name === roomName || r.name === p2pReversedName
  );
  if (existedRoom && existedRoom.length) return null;

  // add new group to room list
  const newRoom = {
    id: rooms.length + 1,
    name: roomName,
    type: roomType
  };
  rooms.push(newRoom);

  return newRoom;
}

function setJoinRoom(userId, roomId) {
  const existed = usersRooms.filter(
    ur => ur.user_id === userId && ur.room_id === roomId
  );

  if (existed && existed.length) return null;

  // add current user to new group
  const reUserRoom = {
    id: usersRooms.length + 1,
    user_id: userId,
    room_id: roomId
  };
  usersRooms.push(reUserRoom);

  return reUserRoom;
}

function setLeaveRoom(userId, roomId) {
  let reUserRoom = null;
  for (let i = 0; i < usersRooms.length; i++) {
    if (usersRooms[i].user_id === userId && usersRooms[i].room_id === roomId) {
      reUserRoom = usersRooms[i];

      usersRooms.splice(i, 1);
      break;
    }
  }

  return reUserRoom;
}

//--------------------------------------------------------------
module.exports = {
  getAvailableRooms,
  setNewRoom,
  setJoinRoom,
  setLeaveRoom
};
