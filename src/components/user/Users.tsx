import React, { FC, useEffect, useState } from "react";
import { fetchUsers } from "../../actions/user-actions";
import UsersTable from "./UsersTable";
import { User } from "./type";
import { createUser, removeUser, updateUser } from "../../actions/user-actions";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { useNavigate } from "react-router-dom";

const Users: FC<any> = ({ showAlert }) => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const getUsers = async () => {
    setUsers(await fetchUsers());
  };
  useEffect(() => {
    if (user && user.role === "user") {
      navigate("/");
      return;
    }
    getUsers();
  }, []);
  const save = async (user: User) => {
    if (user.id) {
      const updatedUser = await updateUser(user);
      const index = users.findIndex((el) => el.id === user.id);
      users[index] = updatedUser;
      setUsers([...users]);

      showAlert("success", "Data successfully updated!");
    } else {
      const newUser = await createUser(user);
      setUsers([...users, newUser]);
      showAlert("success", "User successfully created!");
    }
  };

  const remove = (id: string) => {
    removeUser(id);
    setUsers(users.filter((user) => user.id !== id));
    showAlert("success", "User successfully deleted!");
  };
  return (
    <div>
      <h2>Users</h2>
      {user && user.role === "admin" && (
        <UsersTable users={users} actions={{ save, remove }} />
      )}
    </div>
  );
};
export default Users;
