// Admin authentication routes (separate from student auth)
// DO NOT modify existing student login routes
import express from 'express';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = 'somya.starmaker@gmail.com';
const ADMIN_PASSWORD = '123456';

/**
 * Admin login endpoint
 * POST /api/admin/login
 * Generates JWT token exactly like student token generation
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // Validate admin credentials (hardcoded)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token using existing JWT_SECRET (same as student tokens)
      // Token payload: { email, role: "admin" }
      const token = generateToken({
        email: ADMIN_EMAIL,
        role: 'admin',
      });

      // Return JSON: { token, user: { email, role: "admin" } }
      return res.json({
        token,
        user: {
          email: ADMIN_EMAIL,
          role: 'admin',
        },
      });
    } else {
      // Invalid admin credentials - return 401
      return res.status(401).json({
        message: 'Invalid admin credentials',
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
