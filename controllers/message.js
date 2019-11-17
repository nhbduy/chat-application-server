/* eslint-disable no-use-before-define */

const { messages } = require('../mockData');

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

  const time = new Date();

  const newMessage = {
    id: messages.length + 1,
    sender_id: userId,
    room_id: roomId,
    content,
    create_at: time.toLocaleString(),
    seen_by: seenBy
  };

  messages.push(newMessage);
}

//--------------------------------------------------------------
module.exports = {
  getMessagesInRoom,
  setNewMessage
};
