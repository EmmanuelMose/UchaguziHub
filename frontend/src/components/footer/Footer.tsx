import { Shield, Twitter, Linkedin, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield className="footer-logo-icon" />
              <span className="footer-logo-text">VoteSecure</span>
            </div>
            <p className="footer-description">
              Secure, transparent, and accessible online voting for all citizens.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link"><Twitter /></a>
              <a href="#" className="footer-social-link"><Linkedin /></a>
              <a href="#" className="footer-social-link"><Facebook /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to get updates on upcoming elections and new features.</p>
            <form className="footer-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 VoteSecure. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
