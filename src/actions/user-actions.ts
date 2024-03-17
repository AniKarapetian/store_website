import api from "./api";
import { Basket } from "../components/basket/type";
import { User } from "../components/user/type";
import { createBasket } from "./basket-actions";

export const fetchUsers = async () => {
  return await api.user.fetchUsers();
};

export const createUser = async (data: User) => {
  const user = await api.user.createUser({ ...data, id: `${Date.now()}` });

  const basket: Basket = {
    userId: user.id,
    items: [],
  };
  await createBasket(basket);

  return user;
};

export const removeUser = async (id: string) => {
  await api.user.removeUser(id);
};

export const updateUser = async (data: User) => {
  return await api.user.updateUser(data);
};
