import React, { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../route/routes";
import MenuNavbar from "../navbar/Navbar";
import { Container } from "react-bootstrap";
import classes from "./styles.module.css";
import Footer from "../footer/Footer";
import AlertComponent from "../base-components/AlertComponent";
import { AlertType } from "../base-components/types";

const App: FC = () => {
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
    <BrowserRouter>
      <MenuNavbar />
      <Container fluid className={classes.appContainer}>
        <Routes>
          {routes.map(({ path, Component }, index) => {
            return (
              <Route
                path={path}
                element={<Component showAlert={showAlertMsg} />}
                key={index}
              />
            );
          })}
        </Routes>
      </Container>
      {showAlert && (
        <AlertComponent type={showAlert.type} message={showAlert.message} />
      )}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
