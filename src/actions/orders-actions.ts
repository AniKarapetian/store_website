import { Order } from "../components/order/type";
import api from "./api";

export const getOrders = async (userId: string): Promise<Order[]> => {
  const data = await api.order.getOrders(userId);
  return data;
};

export const createOrder = async (order: Order) => {
  const data = await api.order.createOrder(order);
  return data;
};

export const getOrderById = async (id: string) => {
  const data = await api.order.getOrderById(id);
  return data;
};
