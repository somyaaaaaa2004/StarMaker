// JWT authentication middleware
import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware to verify JWT token in request headers
 * Adds user data to req.user if token is valid
 */
export async function authenticateToken(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required',
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}
