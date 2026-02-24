import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">📊</span>
            <span className="logo-text">AdminPro</span>
          </Link>

          {/* Hamburger Menu */}
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/module" className="nav-link" onClick={closeMenu}>Modules</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link lg:hidden md:hidden " onClick={closeMenu}>Login</Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="nav-auth">
            <Link to="/login">
              <button className="btn-login">Log In</button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
