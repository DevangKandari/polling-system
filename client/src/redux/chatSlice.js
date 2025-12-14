import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    setMessages(state, action) {
      // Replace entire chat history safely
      return action.payload ?? [];
    },

    addMessage(state, action) {
      const msg = action.payload;

      // 🔒 Safety checks
      if (!msg || !msg.message || !msg.socketId) return;

      // ❌ prevent accidental duplicates
      const exists = state.find(
        (m) => m.socketId === msg.socketId && m.timestamp === msg.timestamp
      );

      if (exists) return;

      state.push(msg);
    },

    resetChat() {
      return [];
    },
  },
});

export const { setMessages, addMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
