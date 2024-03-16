import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../route/routes";
import MenuNavbar from "../navbar/Navbar";
import { Container } from "react-bootstrap";

const App: FC = () => {
  return (
    <BrowserRouter>
      <MenuNavbar />
      <Container fluid>
        <Routes>
          {routes.map(({ path, Component }, index) => {
            return <Route path={path} element={<Component />} key={index} />;
          })}
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
