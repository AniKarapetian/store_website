import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { users: any[] } = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      state.users.push(action.payload);
    },
    editUser(state, action: PayloadAction<any>) {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[userIndex] = action.payload;
    },
    deleteUser(state, action: PayloadAction<string>) {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users.splice(userIndex, 1);
    },

    getUsers(state, action: PayloadAction<any[]>) {
      state.users = action.payload;
    },
  },
});

export const { addUser, editUser, deleteUser, getUsers } = userSlice.actions;

export default userSlice.reducer;
