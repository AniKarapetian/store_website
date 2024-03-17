import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p>
          &copy; {new Date().getFullYear()} AK Shopping Website. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
