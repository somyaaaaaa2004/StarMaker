import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌟</span>
          <span className="logo-text">Star Maker</span>
        </Link>

        <button
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="nav-login-btn">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="nav-register-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
