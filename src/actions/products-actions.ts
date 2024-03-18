import { Product } from "../components/product/type";
import api from "./api";

export const getProducts = async (searchItem?: string): Promise<Product[]> => {
  let data = [];
  if (searchItem) {
    data = await api.product.getProducts(searchItem);
  } else {
    data = await api.product.getProducts();
  }
  return data;
};

export const createProduct = async (newData: Product): Promise<Product> => {
  const data = await api.product.createProduct(newData);
  return data;
};

export const updateProduct = async (newData: Product) => {
  const data = await api.product.updateProduct(newData);
  return data;
};

export const removeProduct = async (id: string) => {
  await api.product.removeProduct(id);
};

export const getProductById = async (id: string) => {
  const data = await api.product.getProductById(id);
  return data;
};
