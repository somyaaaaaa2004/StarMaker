import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { resetPassword } from '../api/api';
import './Auth.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // If no email found, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [navigate]);

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
    setSuccess('');

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!email) {
      setError('Email not found. Please start over.');
      navigate('/forgot-password');
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword(email, formData.newPassword);

      if (response.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        // Clear reset data
        localStorage.removeItem('resetEmail');
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
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
            <h2>Reset Password</h2>
            <p>Enter your new password</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
