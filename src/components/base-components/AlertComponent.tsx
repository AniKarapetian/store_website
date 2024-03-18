import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { AlertProps } from "./types";

const AlertComponent: React.FC<AlertProps> = ({ message, type }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <Alert
          variant={type}
          onClose={() => setShow(false)}
          dismissible
          style={{ position: "fixed", top: 0, right: 0, zIndex: 1300 }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
