/* eslint-disable no-use-before-define */

const { asyncGetListDB, asyncInsertDB } = require('../models/messages');

//--------------------------------------------------------------
// get message from DATABASE
let messages = [];
asyncGetListDB().then(list => (messages = list));

//--------------------------------------------------------------
// Function: get messages in room
function getMessagesInRoom(roomId) {
  let list = null;
  list = messages.filter(m => m.room_id === roomId);

  return list;
}

//--------------------------------------------------------------
// Function: new message
function setNewMessage(userId, roomId, content) {
  const seenBy = [1]; // auto seen by admin
  if (userId !== 1) seenBy.push(userId);

  const newMessage = {
    id: messages.length + 1,
    sender_id: userId,
    room_id: roomId,
    content,
    created_at: new Date(),
    seen_by: JSON.stringify(seenBy)
  };

  messages.push(newMessage);
  asyncInsertDB(newMessage);
}

//--------------------------------------------------------------
module.exports = {
  getMessagesInRoom,
  setNewMessage
};
