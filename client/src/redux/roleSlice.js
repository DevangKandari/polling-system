import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null, // "student" | "teacher"
  name: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload.role;
      state.name =
        action.payload.name !== undefined ? action.payload.name : state.name;
    },

    resetRole() {
      return initialState;
    },
  },
});

export const { setRole, resetRole } = roleSlice.actions;
export default roleSlice.reducer;
