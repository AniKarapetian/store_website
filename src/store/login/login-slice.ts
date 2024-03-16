import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/user/type";

const loggedInUser = localStorage.getItem("user");
const initialState: { isLoggedIn: boolean; user: any | null } = {
  isLoggedIn: !!loggedInUser,
  user: loggedInUser ? JSON.parse(loggedInUser) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    editProfile(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, editProfile } = loginSlice.actions;

export default loginSlice.reducer;
