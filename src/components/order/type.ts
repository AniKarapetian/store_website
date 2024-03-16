import { Product } from "../product/type";

export type Order = {
  id: string;
  date: string;
  items: Product[];
};

export interface OrderProps {
  order: Order;
}
