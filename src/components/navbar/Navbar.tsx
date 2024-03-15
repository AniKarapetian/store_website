import React, { FC } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { routes } from "../../route/routes";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/login/actions";
import { useSelector } from "react-redux";
import { loginSelector } from "../../store/login/login-selector";

const MenuNavbar: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(loginSelector);
  const onLogout = () => {
    signOut();
    navigate("/sign-in");
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          {routes.map(({ path, name }, index) => (
            <Nav.Link href={path} key={index}>
              {name}
            </Nav.Link>
          ))}
          {!isLoggedIn && <Nav.Link href="/sign-in">Sign In</Nav.Link>}
          {!isLoggedIn && <Nav.Link href="/sign-up">Sign Up</Nav.Link>}
        </Nav>
        <Nav>
          {isLoggedIn && <Nav.Link onClick={onLogout}>Sign Out</Nav.Link>}
        </Nav>
        <Nav>{isLoggedIn && <Nav.Link href="/profile">Profile</Nav.Link>}</Nav>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
