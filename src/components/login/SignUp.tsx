import React, { ChangeEvent, useState } from "react";
import { signUp } from "../../actions/login-actions";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { Button, Container } from "react-bootstrap";
import { User } from "../user/type";

const SignUp: React.FC<any> = ({ showAlert }) => {
  const [data, setData] = useState<User>({
    id: `${Date.now()}`,
    role: "user",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!data.email || !data.password) {
      setError("Please fill all the fields!");
      return;
    }
    if (data.password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }
    setData({
      id: `${Date.now()}`,
      role: "user",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    });
    setRepeatPassword("");

    await signUp(data);
    showAlert("success", "You successfully registered!");
    setError("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };
  return (
    <Container style={{ width: "450px" }}>
      <h2>Sign Up</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control
            type="text"
            value={data.firstName}
            name="firstName"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Lastname</InputGroup.Text>
          <Form.Control
            type="text"
            value={data.lastName}
            name="lastName"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            type="email"
            value={data.email}
            name="email"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Phone</InputGroup.Text>
          <Form.Control
            type="text"
            value={data.phone}
            name="phone"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Password</InputGroup.Text>
          <Form.Control
            type="password"
            value={data.password}
            name="password"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Repeat Password</InputGroup.Text>
          <Form.Control
            type="password"
            value={repeatPassword}
            name="repeatPassword"
            onChange={handlePasswordChange}
          />
        </InputGroup>
        <Button type="button" onClick={handleSignUp} variant="success">
          SignUp
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
