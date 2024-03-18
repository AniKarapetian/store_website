import React, { FC, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UserModal from "./UserModal";
import { User } from "./type";
import { Icon } from "../base-components/Icon";
type TableProps = {
  users: User[];
  actions: {
    remove: (id: string) => void;
    save: (user: User) => void;
  };
};

const UsersTable: FC<TableProps> = ({ users, actions }) => {
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
    actions.save(user);
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
    actions.remove(id);
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
                    <Icon iconName="Pencil" />
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="danger"
                  >
                    <Icon iconName="X" />
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
