import { Basket } from "../basket/type";

export type Product = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
};

export interface IProductPageProps {
  product: Product;
  basket: Basket;
}

export interface ModalProps {
  data: Product;
  onSave: (user: Product) => void;
  onCancel: () => void;
}
