import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Header.css';
import logo from "../../assets/logo.png"; 

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
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="signup-btn">Register</Link>
        </div>

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
            <Link to="/login" className="login-btn" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" className="signup-btn" onClick={() => setIsOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
