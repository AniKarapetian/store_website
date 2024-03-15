import React, { ChangeEvent, useState } from "react";
// import { SignInData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../store/login/actions";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { Button, Container } from "react-bootstrap";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!data.email || !data.password) {
      setError("Please enter both email and password");
      return;
    }
    setData({
      email: "",
      password: "",
    });
    const err = await signIn(data);
    if (err) {
      setError(err);
      return;
    }

    navigate("/");
    setError("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Container style={{ width: "450px" }}>
      <h2>Sign In</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form>
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
          <InputGroup.Text>Password</InputGroup.Text>
          <Form.Control
            type="password"
            value={data.password}
            name="password"
            onChange={handleChange}
          />
        </InputGroup>
        <Button type="button" onClick={handleSignIn} variant="success">
          SignIn
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
