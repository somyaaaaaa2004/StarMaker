import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (token exists)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      // No token, redirect to login
      navigate('/login');
      return;
    }

    // Token exists, load user data
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>🌟 Welcome to Star Maker!</h1>
            <h2>Coaching Institute</h2>
          </div>

          <div className="dashboard-content">
            <div className="user-info">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <div className="dashboard-message">
              <p>🎉 Congratulations! You have successfully logged in.</p>
              <p>Your account is ready to use.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
