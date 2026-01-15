import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { forgotPassword } from '../api/api';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      if (response.success) {
        // Store email for next step
        localStorage.setItem('resetEmail', email);
        // Show success message
        setSuccess(response.message || 'OTP has been sent to your email. Please check your inbox.');
        // Redirect to verify OTP after a short delay
        setTimeout(() => {
          navigate('/verify-otp');
        }, 3000);
      } else {
        setError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to send OTP. Please try again.';
      setError(errorMessage);
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
            <h2>Forgot Password</h2>
            <p>Enter your email to receive an OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <div className="auth-footer">
              <p>
                Remember your password?{' '}
                <Link to="/login" className="auth-link">
                  Login here
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

export default ForgotPassword;
