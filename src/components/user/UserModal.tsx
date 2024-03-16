import React, { ChangeEvent, useState } from "react";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { User } from "./type";
interface ModalProps {
  data: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserModal: FC<ModalProps> = ({ data, onCancel, onSave }) => {
  const [user, setUser] = useState<User>({ ...data });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <Form.Control
              type="text"
              value={user.firstName}
              name="firstName"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Lastname</InputGroup.Text>
            <Form.Control
              type="text"
              value={user.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <Form.Control
              type="email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Phone</InputGroup.Text>
            <Form.Control
              type="string"
              value={user.phone}
              name="phone"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Role</InputGroup.Text>
            <Form.Control
              type="string"
              value={user.role}
              disabled
              name="role"
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onSave(user)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserModal;
