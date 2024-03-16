import React, { FC, useEffect } from "react";

import { useSelector } from "react-redux";
import { usersSelector } from "../../store/users/users-selector";

import { fetchUsers } from "../../store/users/actions";
import UsersTable from "./UsersTable";

const Users: FC = () => {
  const users = useSelector(usersSelector);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <UsersTable users={users} />
    </div>
  );
};
export default Users;
