import { Basket } from "../components/basket/type";

import api from "./api";

export const getBasketByUserId = async (userId: string): Promise<Basket> => {
  const data = await api.basket.getBasketByUserId(userId);
  return data;
};

export const createBasket = async (basket: Basket) => {
  const data = await api.basket.createBasket(basket);
  return data;
};

export const updateBasket = async (basket: Basket) => {
  const data = await api.basket.updateBasket(basket);
  return data;
};
