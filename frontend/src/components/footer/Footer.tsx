import { Shield, Twitter, Linkedin, Facebook, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Mail, href: 'mailto:info@votesecure.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Support', href: '/support' }
  ];

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
              Empowering democracy through innovative technology.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Icon className={`social-icon ${hoveredLink === index ? 'icon-hover' : ''}`} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link-item">
                    <ArrowRight className="link-arrow" size={16} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to get updates on upcoming elections and new features.</p>
            <form className="footer-form" onSubmit={handleSubscribe}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="footer-input"
                />
                <button type="submit" className="footer-button">
                  Subscribe
                  <ArrowRight size={18} className="button-icon" />
                </button>
              </div>
            </form>
            {subscribed && (
              <div className="subscription-success">
                <CheckCircle size={18} />
                <span>Successfully subscribed!</span>
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} VoteSecure. All Rights Reserved. Made with ❤️ for democracy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;