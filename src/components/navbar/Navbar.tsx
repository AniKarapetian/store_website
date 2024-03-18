import React, { FC } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../actions/login-actions";
import { useSelector } from "react-redux";
import { loginSelector, userSelector } from "../../store/login/login-selector";
import { Link } from "react-router-dom";
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
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          {user?.role === "admin" && (
            <Link to="/users" className="nav-link">
              Users
            </Link>
          )}
          <Link to="/home" className="nav-link"></Link>
          <Link to="/home" className="nav-link"></Link>
        </Nav>
        {isLoggedIn ? (
          <Nav>
            <Link to="/basket" className="nav-link">
              Basket
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Nav.Link onClick={onLogout}>Sign Out</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Link to="/sign-in" className="nav-link">
              Sign In
            </Link>
            <Link to="/sign-up" className="nav-link">
              Sign Up
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
