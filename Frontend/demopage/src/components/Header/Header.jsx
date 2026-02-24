import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">CMS</span>
        </Link>

        {/* Navigation */}
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className="nav-link">
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className="nav-link">
              Blog
            </NavLink>
          </li>
        </ul>

        {/* Auth Button */}
        <div className="nav-auth">
          <Link to="/login" className="auth-btn">
            Login / Register
          </Link>
        </div>
      </div>
    </header>
  );
}