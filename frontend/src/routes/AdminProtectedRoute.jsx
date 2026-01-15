import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/**
 * AdminProtectedRoute - Protects admin routes from unauthorized access
 * 
 * Reads JWT token from the same storage key used by student login ('token')
 * Decodes token safely and checks if user is admin
 * 
 * Allows access ONLY if:
 *   - decoded.role === 'admin' OR
 *   - decoded.email === 'somya.starmaker@gmail.com'
 * 
 * If unauthorized, redirects to /login
 * 
 * Do not touch student protected routes - this is completely separate
 */
const AdminProtectedRoute = ({ children }) => {
  // Read JWT token from the same storage key used by student login
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode JWT token safely
    const decoded = jwtDecode(token);

    // Check if user is admin:
    // - decoded.role === 'admin' OR
    // - decoded.email === 'somya.starmaker@gmail.com'
    const isAdmin = 
      decoded.role === 'admin' || 
      decoded.email === 'somya.starmaker@gmail.com';

    // If not admin, redirect to login
    if (!isAdmin) {
      return <Navigate to="/login" replace />;
    }

    // User is authorized as admin, render protected content
    return children;
  } catch (error) {
    // Token decode failed (invalid token), redirect to login
    console.error('Error decoding admin token:', error);
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
