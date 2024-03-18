import { User } from "../components/user/type";
import store from "../store/store";
import api from "./api";
import { editProfile, login, logout } from "../store/login/login-slice";

export const signIn = async (data: Partial<User>) => {
  const users = await api.user.fetchUsers();

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

export const signUp = async (data: User) => {
  await api.user.createUser(data);
};

export const signOut = () => {
  store.dispatch(logout());
  localStorage.removeItem("user");
};
export const updateProfile = async (data: User) => {
  const res = await api.user.updateUser(data);
  store.dispatch(editProfile(res));
  localStorage.setItem("user", JSON.stringify(res));
};
