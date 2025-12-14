// pollManager.js

export const pollState = {
  active: false,
  ended: false, // ✅ ADD THIS
  question: "",
  options: [],
  correctOptionIndex: null,
  answers: {},
  timer: 60,
  intervalId: null,
};

/* =========================
   START NEW POLL
========================= */
export function startPoll({ question, options, correctOptionIndex, timer }) {
  resetPoll();

  pollState.active = true;
  pollState.question = question;
  pollState.options = options.map((opt) => ({
    text: opt,
    votes: 0,
  }));
  pollState.correctOptionIndex = correctOptionIndex;
  pollState.timer = timer ?? 60;

  startTimer();
}

/* =========================
   SUBMIT ANSWER
========================= */
export function submitAnswer(socketId, optionIndex) {
  if (!pollState.active) return;
  if (pollState.answers[socketId] !== undefined) return;

  pollState.answers[socketId] = optionIndex;

  if (pollState.options[optionIndex]) {
    pollState.options[optionIndex].votes += 1;
  }
}

/* =========================
   CHECK IF ALL ANSWERED
========================= */
export function haveAllAnswered(studentCount) {
  return Object.keys(pollState.answers).length >= studentCount;
}

/* =========================
   END POLL
========================= */
export function endPoll() {
  if (!pollState.active) return;

  pollState.history.push({
    question: pollState.question,
    options: pollState.options,
    correctOptionIndex: pollState.correctOptionIndex,
    answers: pollState.answers,
  });

  resetPoll();
}

/* =========================
   TIMER LOGIC
========================= */
function startTimer() {
  pollState.intervalId = setInterval(() => {
    pollState.timer -= 1;

    if (pollState.timer <= 0) {
      clearInterval(pollState.intervalId);
      pollState.intervalId = null;
      pollState.active = false;
    }
  }, 1000);
}

/* =========================
   RESET POLL
========================= */
export function resetPoll() {
  pollState.active = false;
  pollState.ended = false; // ✅ RESET
  pollState.question = "";
  pollState.options = [];
  pollState.correctOptionIndex = null;
  pollState.answers = {};
  pollState.timer = 60;

  if (pollState.intervalId) {
    clearInterval(pollState.intervalId);
    pollState.intervalId = null;
  }
}

/* =========================
   GETTERS
========================= */
export function getPollState() {
  return pollState;
}

export function getPollHistory() {
  return pollState.history;
}
