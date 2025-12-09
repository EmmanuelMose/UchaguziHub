import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Header.css';
import logo from "../../assets/logo.png"; //  Import your logo

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="header">
      <div className="header-container">

        {/* ✅ Logo inserted here */}
        <Link to="/" className="logo">
          <img src={logo} alt="UchaguziHub Logo" className="header-logo" />
          <span className="logo-text">UchaguziHub</span>
        </Link>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="auth-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>

        {/* Mobile toggle */}
        <div className="mobile-menu-toggle">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}

          <div className="mobile-auth-buttons">
            <button className="login-btn">Log In</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
