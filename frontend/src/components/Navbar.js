// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Css/Navbar.css"; // Import the CSS file for styling (optional)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">CC Food Link</Link>
        </div>

        <div className="menu-icon" onClick={handleMenuToggle}>
          <i className={isMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
        </div>

        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
