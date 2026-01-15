import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser, adminLogin } from '../api/api';
import './Auth.css';

// Hardcoded admin credentials (for login detection only)
const ADMIN_EMAIL = 'somya.starmaker@gmail.com';
const ADMIN_PASSWORD = '123456';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ Check BEFORE student login: If admin credentials, do admin login instead
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        // Admin login - calls POST "/admin/login" (axios baseURL is http://localhost:5001/api)
        // Final URL: http://localhost:5001/api/admin/login
        try {
          const adminResponse = await adminLogin(formData.email, formData.password);
          
          // Admin login response: { token, user: { email, role: "admin" } }
          if (adminResponse.token && adminResponse.user) {
            // ✅ Store JWT token in the SAME storage key used for student token
            localStorage.setItem('token', adminResponse.token);
            localStorage.setItem('user', JSON.stringify(adminResponse.user));
            
            // ✅ Optionally store role "admin" if needed
            localStorage.setItem('role', 'admin');
            
            // ✅ Redirect to /admin/dashboard
            navigate('/admin/dashboard');
            return; // Exit early on success
          } else {
            setError('Admin login failed. Please check credentials.');
            setLoading(false);
            return;
          }
        } catch (adminErr) {
          // ✅ If admin login fails show: "Admin login failed. Please check credentials."
          setError('Admin login failed. Please check credentials.');
          setLoading(false);
          return; // Exit on admin login error
        }
      } else {
        // ✅ If NOT admin credentials → run existing student login function exactly the same
        // ✅ Student login flow stays EXACTLY SAME as before (OTP + DB + JWT working)
        const response = await loginUser(formData.email, formData.password);
        
        if (response.success) {
          // Store token and user data (existing student login logic - unchanged)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Redirect to dashboard (existing student flow - unchanged)
          navigate('/dashboard');
        }
      }
    } catch (err) {
      // Handle errors for student login (existing error handling - unchanged)
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🌟 Star Maker</h1>
            <h2>Coaching Institute</h2>
            <p>Welcome back! Please login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
