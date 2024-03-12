import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loggedInUser = localStorage.getItem("user");
const initialState: { isLoggedIn: boolean; user: any | null } = {
  isLoggedIn: !!loggedInUser,
  user: loggedInUser ? JSON.parse(loggedInUser) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
