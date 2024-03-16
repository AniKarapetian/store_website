import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="footer__section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Information</Link>
            </li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        <p>
          &copy; {new Date().getFullYear()} My Shopping Website. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
