// participants.js

export const participants = [];

/**
 * Add participant (safe against duplicates)
 */
export function addParticipant(socketId, name, role) {
  const exists = participants.find((p) => p.socketId === socketId);
  if (exists) return;

  participants.push({
    socketId,
    name,
    role, // "teacher" | "student"
    joinedAt: Date.now(),
  });
}

/**
 * Remove participant (on disconnect or kick)
 */
export function removeParticipant(socketId) {
  const index = participants.findIndex((p) => p.socketId === socketId);
  if (index !== -1) {
    participants.splice(index, 1);
  }
}

/**
 * Get all participants
 */
export function getParticipants() {
  return participants;
}

/**
 * Get only students (used for poll completion logic)
 */
export function getStudents() {
  return participants.filter((p) => p.role === "student");
}

/**
 * Get participant by socketId (used for chat sender resolution)
 */
export function getParticipantBySocket(socketId) {
  return participants.find((p) => p.socketId === socketId);
}
