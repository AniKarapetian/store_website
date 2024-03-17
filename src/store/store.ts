import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/login-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./types";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
