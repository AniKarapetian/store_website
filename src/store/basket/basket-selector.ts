import { RootState } from "../type";

export const basketSelector = (state: RootState) => state.basket.item;
