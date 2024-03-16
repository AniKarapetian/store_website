import React, { useState } from "react";
import { User } from "./type";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import { updateUser, createUser } from "../../store/users/actions";
import UserModal from "./UserModal";
import { Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";

interface ProfileProps {
  user: User;
}

export const UserProfile: React.FC<ProfileProps> = ({}) => {
  const user = {
    id: 11112,
    firstName: "Test",
    lastName: "User",
    imageUrl:
      "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    email: "user@test.com",
    password: "1234",
    phone: "+00000000000",
    role: "user",
  };
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<User>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
  });
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
    setUserData({
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
  const handleEdit = (user: User) => {
    setUserData({ ...user });
    toggleModal();
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Image src={user.imageUrl} roundedCircle fluid />

            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <Button
              variant="secondary"
              onClick={() => {
                handleEdit(userData);
              }}
            >
              <Icon iconName="Pencil" />
            </Button>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  value={user.phone}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter role"
                  value={user.role}
                  disabled
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      {showModal && (
        <UserModal
          data={userData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};
