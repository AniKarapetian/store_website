import React, { FC, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "../../route/routes";
import MenuNavbar from "../navbar/Navbar";
import { Container } from "react-bootstrap";
import classes from "./styles.module.css";
import Footer from "../footer/Footer";
import AlertComponent from "../base-components/AlertComponent";
import { AlertType } from "../base-components/types";
import { useSelector } from "react-redux";
import { loginSelector } from "../../store/login/login-selector";
import SignIn from "../login/SignIn";
import { Home } from "../home/Home";

const App: FC = () => {
  const isAuthenticated = useSelector(loginSelector);
  const [showAlert, setShowAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const showAlertMsg = (type: AlertType, message: string) => {
    setShowAlert({ type, message });
    setTimeout(() => {
      setShowAlert(null);
    }, 2000);
  };
  return (
    <Router>
      <MenuNavbar />
      <Container fluid className={classes.appContainer}>
        <Routes>
          {routes.map(({ path, Component, type }, index) => {
            if (type === "no-auth") {
              return !isAuthenticated ? (
                <Route
                  path={path}
                  element={<Component showAlert={showAlertMsg} />}
                  key={index}
                />
              ) : (
                <Route path={path} element={<Home />} key={index} />
              );
            } else if (type === "public" || type === "no-auth") {
              return (
                <Route
                  path={path}
                  element={<Component showAlert={showAlertMsg} />}
                  key={index}
                />
              );
            } else if (type === "private") {
              return isAuthenticated ? (
                <Route
                  path={path}
                  element={<Component showAlert={showAlertMsg} />}
                  key={index}
                />
              ) : (
                <Route path={path} element={<SignIn />} key={index} />
              );
            }
            return null;
          })}
        </Routes>
      </Container>
      {showAlert && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
      <Footer />
    </Router>
  );
};

export default App;
