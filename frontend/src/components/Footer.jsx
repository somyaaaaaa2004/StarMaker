import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <span className="footer-logo-icon">🌟</span> Star Maker
            </h3>
            <p>
              Empowering students to reach for the stars and achieve their dreams.
              Your success is our mission!
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#" aria-label="YouTube">
                <span>📺</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Courses</h4>
            <ul>
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
              <li>
                <Link to="/courses">Science Programs</Link>
              </li>
              <li>
                <Link to="/courses">Arts Programs</Link>
              </li>
              <li>
                <Link to="/courses">Competitive Exams</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <span>📍</span> 123 Education Street, Learning City
              </li>
              <li>
                <span>📞</span> +1 (555) 123-4567
              </li>
              <li>
                <span>✉️</span> info@starmaker.edu
              </li>
              <li>
                <span>🕒</span> Mon - Sat: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Star Maker Coaching Institute. All rights reserved. |{' '}
            <Link to="/">Privacy Policy</Link> | <Link to="/">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
