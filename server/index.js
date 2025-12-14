import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import {
  startPoll,
  submitResponse,
  allAnswered,
  endPoll,
  getCurrentPoll,
  getPollHistory,
} from "./pollState.js";

import {
  addParticipant,
  removeParticipant,
  getParticipants,
  getStudents,
  getParticipantBySocket,
} from "./participants.js";

import { addMessage, getMessages } from "./chatManager.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  /* =========================
     JOIN
  ========================= */
  socket.on("join", ({ name, role }) => {
    socket.user = { name, role };

    addParticipant(socket.id, name, role);
    io.emit("participants_updated", getParticipants());

    // send chat history
    socket.emit("chat_history", getMessages());

    // if poll already active, send it
    const poll = getCurrentPoll();
    if (poll) {
      socket.emit("new_poll", poll);
    }
  });

  /* =========================
     CHAT
  ========================= */
  socket.on("send_message", ({ message }) => {
    if (!socket.user || !message) return;

    const msg = {
      sender: socket.user.name,
      role: socket.user.role,
      message,
      socketId: socket.id,
    };

    addMessage(msg);
    io.emit("new_message", msg);
  });

  /* =========================
     KICK OUT (TEACHER ONLY)
  ========================= */
  socket.on("kick_user", ({ socketId }) => {
    const requester = getParticipantBySocket(socket.id);
    if (!requester || requester.role !== "teacher") return;

    io.to(socketId).emit("kicked");
    io.sockets.sockets.get(socketId)?.disconnect(true);
  });

  /* =========================
     CREATE POLL (TEACHER)
  ========================= */
  socket.on(
    "create_poll",
    ({ question, options, correctOptionIndex, timer }) => {
      const participants = getParticipants();
      const requester = participants.find((p) => p.socketId === socket.id);

      // 🔒 Only teacher can create poll
      if (!requester || requester.role !== "teacher") return;

      startPoll({
        question,
        options,
        correctOptionIndex,
        timer,
      });

      io.emit("new_poll", getCurrentPoll());
    }
  );

  /* =========================
     SUBMIT ANSWER (STUDENT)
  ========================= */
  socket.on("submit_answer", ({ optionIndex }) => {
    const poll = getCurrentPoll();
    if (!poll) return;

    submitResponse(socket.id, optionIndex);
    io.emit("poll_update", getCurrentPoll());

    if (allAnswered(getStudents().length) && !getCurrentPoll().ended) {
      endPoll();
      io.emit("poll_ended", getCurrentPoll());
    }
  });

  /* =========================
     POLL HISTORY
  ========================= */
  socket.on("get_poll_history", () => {
    socket.emit("poll_history", getPollHistory());
  });

  /* =========================
     DISCONNECT
  ========================= */
  socket.on("disconnect", () => {
    removeParticipant(socket.id);
    io.emit("participants_updated", getParticipants());
    console.log("Disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
