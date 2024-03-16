import api from "./api";
import { addUser, deleteUser, editUser, getUsers } from "./users-slice";
import store from "../store";
import { Basket } from "../../components/basket/type";
import { createBasket } from "../basket/basket-slice";
import { User } from "../../components/user/type";

export const fetchUsers = async () => {
  const res = await api.fetchUsers();
  store.dispatch(getUsers(res));
};

export const createUser = async (data: User) => {
  const res = await api.createUser({ ...data, id: `${Date.now()}` });
  store.dispatch(addUser(res));
  const basket: Basket = {
    userId: res.id,
    items: [],
  };
  store.dispatch(createBasket(basket));
};

export const removeUser = async (id: string) => {
  await api.removeUser(id);
  store.dispatch(deleteUser(id));
};

export const updateUser = async (data: User) => {
  const res = await api.updateUser(data);
  store.dispatch(editUser(res));
};
