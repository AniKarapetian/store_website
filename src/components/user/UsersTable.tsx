import React, { FC, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { createUser, removeUser, updateUser } from "../../store/user/actions";
import UserModal from "./UserModal";
import { User } from "./type";
type TableProps = {
  users: User[];
};

const UsersTable: FC<TableProps> = ({ users }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<User>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
  });

  const handleAdd = () => {
    toggleModal();
  };

  const handleSave = (user: User) => {
    if (user.id) {
      updateUser(user);
    } else {
      createUser(user);
    }
    handleCancel();
  };
  const handleCancel = () => {
    toggleModal();
    setUser({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "",
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (id: string) => {
    removeUser(id);
  };

  const handleEdit = (user: User) => {
    setUser({ ...user });
    toggleModal();
  };
  return (
    <div>
      <Button onClick={handleAdd} variant="success" className="mb-2">
        Add
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleEdit(user);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {showModal && (
        <UserModal data={user} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default UsersTable;
