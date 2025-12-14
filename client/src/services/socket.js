import { io } from "socket.io-client";
import { store } from "../redux/store";

import { setPoll, updatePoll, pollEnded } from "../redux/pollSlice";
import { setParticipants } from "../redux/participantsSlice";
import { setMessages, addMessage } from "../redux/chatSlice";
import { addPollToHistory } from "../redux/pollSlice";

export const socket = io("http://localhost:3001");

/* =========================
   POLL EVENTS
========================= */

// new poll started

socket.on("new_poll", (poll) => {
  store.dispatch(setPoll(poll));
});

// poll live updates (votes)
socket.on("poll_update", (poll) => {
  store.dispatch(updatePoll(poll));
});

// poll ended
socket.on("poll_ended", (finalPoll) => {
  console.log("SOCKET poll_ended RECEIVED", finalPoll);
  store.dispatch(setPoll(finalPoll));
  store.dispatch(pollEnded());
});

/* =========================
   PARTICIPANTS
========================= */
socket.on("participants_updated", (list) => {
  store.dispatch(setParticipants(list));
});

/* =========================
   CHAT
========================= */
socket.on("chat_history", (msgs) => {
  store.dispatch(setMessages(msgs));
});

socket.on("new_message", (msg) => {
  store.dispatch(addMessage(msg));
});

/* =========================
   KICKED
========================= */
socket.on("kicked", () => {
  window.location.href = "/student/kicked";
});

/* =========================
   JOIN (ONCE ONLY)
========================= */
let joined = false;

export const joinSocket = (name, role) => {
  if (joined) return;
  socket.emit("join", { name, role });
  joined = true;
};

socket.on("poll_history", (history) => {
  history.forEach((poll) => {
    store.dispatch(addPollToHistory(poll));
  });
});
