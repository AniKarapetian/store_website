import { User } from "../../components/user/type";
import store from "../store";
import api from "../users/api";
import { editProfile, login, logout } from "./login-slice";

const url = "http://localhost:8080/users";
export const signIn = async (data: Partial<User>) => {
  const users = await api.fetchUsers();

  const account = users.find(
    (user: User) => user.email === data.email && user.password === data.password
  );
  if (account) {
    store.dispatch(login(account));
    localStorage.setItem("user", JSON.stringify(account));
  } else {
    return "User not found";
  }
};

export const signOut = () => {
  store.dispatch(logout());
  localStorage.removeItem("user");
};
export const updateProfile = async (data: User) => {
  const res = await api.updateUser(data);
  store.dispatch(editProfile(res));
};
