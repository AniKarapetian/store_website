import { Item } from "../product/type";

export type Order = {
  id: string;
  date: string;
  items: Item[];
};
