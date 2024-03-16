import React, { useState } from "react";
import { User } from "./type";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import UserModal from "./UserModal";
import { Button } from "react-bootstrap";
import { Icon } from "../base-components/Icon";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import { updateProfile } from "../../store/login/actions";

export const UserProfile: React.FC = () => {
  const user = useSelector(userSelector);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (user: User) => {
    updateProfile(user);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Image src={user.imageUrl} roundedCircle fluid />

            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <Button variant="secondary" onClick={toggleModal}>
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
      {showModal && user && (
        <UserModal
          data={{ ...user }}
          onSave={handleSave}
          onCancel={toggleModal}
        />
      )}
    </div>
  );
};
