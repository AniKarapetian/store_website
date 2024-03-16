import { BasketItem } from "../basket/type";
import { Product } from "../product/type";

export type Order = {
  id?: string;
  userId: string;
  date: string;
  items: BasketItem[];
};

export interface OrderProps {
  order: Order;
}
