/* eslint-disable no-use-before-define */

const { messages } = require('../mockData');

//--------------------------------------------------------------
const getMessageFormat = (id, sender, room, content, time, type) => ({
  id,
  sender,
  room,
  content,
  time: time.toLocaleString(),
  type
});
// Function: new message
function setNewMessage(userId, roomId, content, type) {
  const seenBy = [1]; // auto seen by admin
  seenBy.push(userId);

  const newMessage = {
    id: messages.length + 1,
    sender_id: userId,
    room_id: roomId,
    content,
    create_at: new Date(),
    seen_by: seenBy
  };

  messages.push(newMessage);

  return getMessageFormat(
    newMessage.id,
    newMessage.sender_id,
    newMessage.room_id,
    newMessage.content,
    newMessage.create_at,
    type
  );
}

//--------------------------------------------------------------
module.exports = {
  getMessageFormat,
  setNewMessage
};
