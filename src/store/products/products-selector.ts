import { RootState } from "../type";

export const productsSelector = (state: RootState) => state.products.data;
