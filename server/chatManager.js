// chatManager.js

export const messages = [];

/**
 * Add a new chat message
 * @param {Object} param0
 * @param {string} param0.sender - Name of sender
 * @param {string} param0.role - student | teacher
 * @param {string} param0.message - Message text
 * @param {string} param0.socketId - Sender socket id
 */
export function addMessage({ sender, role, message, socketId }) {
  if (!sender || !message || !socketId) return;

  messages.push({
    sender,
    role,
    message,
    socketId,
    timestamp: Date.now(),
  });
}

/**
 * Get all chat messages
 */
export function getMessages() {
  return messages;
}

/**
 * (Optional future use)
 * Clear chat messages – useful when session ends
 */
export function resetChat() {
  messages.length = 0;
}
