import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { verifyOtp } from '../api/api';
import './Auth.css';

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await verifyOtp(email, otp);

      if (response.success) {
        // OTP verified, redirect to reset password
        navigate('/reset-password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
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
            <h2>Verify OTP</h2>
            <p>Enter the 6-digit OTP sent to your email</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="otp">OTP Code</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="auth-footer">
              <p>
                Didn't receive OTP?{' '}
                <Link to="/forgot-password" className="auth-link">
                  Request again
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

export default VerifyOTP;
