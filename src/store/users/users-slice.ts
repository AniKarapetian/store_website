import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/user/type";

const initialState: User[] = [];
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    editUser(state, action: PayloadAction<User>) {
      const userIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      state[userIndex] = action.payload;
      console.log("state", state);
      return state;
    },

    deleteUser(state, action: PayloadAction<string>) {
      const userIndex = state.findIndex((user) => user.id === action.payload);
      state.splice(userIndex, 1);
    },

    getUsers(_, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
});

export const { addUser, editUser, deleteUser, getUsers } = userSlice.actions;

export default userSlice.reducer;
