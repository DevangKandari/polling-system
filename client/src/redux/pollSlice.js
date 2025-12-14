import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // poll lifecycle
  active: false, // poll is currently running
  ended: false, // poll has ended (results shown)

  // poll data
  question: "",
  options: [], // [{ text, votes }]
  correctOptionIndex: null,

  // history
  history: [],
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    /* =========================
       NEW POLL STARTED
    ========================= */
    setPoll(state, action) {
      const poll = action.payload;

      state.active = true;
      state.ended = false;

      state.question = poll.question;
      state.options = poll.options ?? [];
      state.correctOptionIndex = poll.correctOptionIndex ?? null;
    },

    /* =========================
       LIVE VOTE UPDATE
    ========================= */
    updatePoll(state, action) {
      state.options = action.payload.options ?? state.options;
    },

    /* =========================
       POLL ENDED
    ========================= */
    pollEnded(state) {
      state.active = false;
      state.ended = true;
    },

    /* =========================
       POLL HISTORY
    ========================= */
    setPollHistory(state, action) {
      state.history = action.payload ?? [];
    },

    addPollToHistory(state, action) {
      state.history.push(action.payload);
    },

    /* =========================
       FULL RESET (RARE)
    ========================= */
    resetPoll() {
      return initialState;
    },
  },
});

export const {
  setPoll,
  updatePoll,
  pollEnded,
  setPollHistory,
  addPollToHistory,
  resetPoll,
} = pollSlice.actions;

export default pollSlice.reducer;
