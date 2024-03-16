import { Action, ThunkAction } from "@reduxjs/toolkit";
import store from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type StateType<T> = {
  loading: boolean;
  error: string | null;
  data: T[];
  item?: T | null;
};
