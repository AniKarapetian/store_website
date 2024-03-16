import { RootState } from "../type";

export const ordersSelector = (state: RootState) => state.orders.data;
