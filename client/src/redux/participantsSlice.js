import { createSlice } from "@reduxjs/toolkit";

const participantsSlice = createSlice({
  name: "participants",
  initialState: [],
  reducers: {
    setParticipants(state, action) {
      // Ensure we always get a valid array
      return Array.isArray(action.payload) ? action.payload : [];
    },

    removeParticipant(state, action) {
      const socketId = action.payload;
      return state.filter((p) => p.socketId !== socketId);
    },

    resetParticipants() {
      return [];
    },
  },
});

export const { setParticipants, removeParticipant, resetParticipants } =
  participantsSlice.actions;

export default participantsSlice.reducer;
