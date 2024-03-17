import React, { FC } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/login/actions";
import { useSelector } from "react-redux";
import { loginSelector, userSelector } from "../../store/login/login-selector";

const MenuNavbar: FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(loginSelector);
  const user = useSelector(userSelector);
  const onLogout = () => {
    signOut();
    navigate("/sign-in");
  };
  return (
    <Navbar bg="secondary" data-bs-theme="dark" fixed="top">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          {user?.role === "admin" && <Nav.Link href="/users">Users</Nav.Link>}
          <Nav.Link href="/home"></Nav.Link>
          <Nav.Link href="/home"></Nav.Link>
        </Nav>
        {isLoggedIn ? (
          <Nav>
            <Nav.Link href="/basket">Basket</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={onLogout}>Sign Out</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/sign-in">Sign In</Nav.Link>
            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
