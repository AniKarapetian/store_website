import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../route/routes";
import MenuNavbar from "../navbar/Navbar";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";

const App: FC = () => {
  return (
    <BrowserRouter>
      <MenuNavbar />
      <Container fluid className="mt-2">
        <Routes>
          {routes.map(({ path, Component }, index) => {
            return <Route path={path} element={<Component />} key={index} />;
          })}
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
