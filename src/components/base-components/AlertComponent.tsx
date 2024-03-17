import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { AlertProps } from "./types";

const AlertComponent: React.FC<AlertProps> = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <Alert variant={type} onClose={() => setShow(false)} dismissible>
          {message}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
