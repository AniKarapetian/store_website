import { AlertType } from "../base-components/types";
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
  showAlert: (type: AlertType, message: string) => void;
  handleDelete: (id: string) => void;
  handleSave: (product: Product) => void;
}

export interface ModalProps {
  data: Product;
  onSave: (user: Product) => void;
  onCancel: () => void;
}
