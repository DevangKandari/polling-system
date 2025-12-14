import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./roleSlice";
import pollReducer from "./pollSlice";
import participantsReducer from "./participantsSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    role: roleReducer,
    poll: pollReducer,
    participants: participantsReducer,
    chat: chatReducer,
  },
});
