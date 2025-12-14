// server/pollState.js

let currentPoll = null;
let pollHistory = [];

/* =========================
   START POLL
========================= */
export function startPoll(poll) {
  currentPoll = {
    question: poll.question,
    options: poll.options.map((opt) => ({
      text: opt,
      votes: 0,
    })),
    correctOptionIndex: poll.correctOptionIndex ?? null,
    active: true,
    ended: false,
  };
}

/* =========================
   SUBMIT ANSWER
========================= */
export function submitResponse(socketId, optionIndex) {
  if (!currentPoll || currentPoll.ended) return;

  if (!currentPoll.responses) {
    currentPoll.responses = {};
  }

  if (currentPoll.responses[socketId] !== undefined) return;

  currentPoll.responses[socketId] = optionIndex;

  if (currentPoll.options[optionIndex]) {
    currentPoll.options[optionIndex].votes += 1;
  }
}

/* =========================
   CHECK ALL ANSWERED
========================= */
export function allAnswered(totalStudents) {
  if (!currentPoll) return false;
  return Object.keys(currentPoll.responses || {}).length >= totalStudents;
}

/* =========================
   END POLL (DO NOT CLEAR DATA)
========================= */
export function endPoll() {
  if (!currentPoll || currentPoll.ended) return;

  currentPoll.ended = true;
  currentPoll.active = false;

  pollHistory.push({
    question: currentPoll.question,
    options: currentPoll.options,
    correctOptionIndex: currentPoll.correctOptionIndex,
  });
}

/* =========================
   GETTERS
========================= */
export function getCurrentPoll() {
  return currentPoll;
}

export function getPollHistory() {
  return pollHistory;
}

/* =========================
   RESET (OPTIONAL)
========================= */
export function resetPoll() {
  currentPoll = null;
}
