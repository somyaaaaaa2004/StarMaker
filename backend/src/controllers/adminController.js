// Admin controller - handles admin authentication (separate from student auth)
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Admin login - validates against environment variables
 * POST /api/admin/login
 * This is separate from student login - does NOT touch user database
 */
export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD;

    // Check if admin credentials are configured
    if (!adminEmail || !adminPassword) {
      return res.status(500).json({
        success: false,
        message: 'Admin credentials not configured',
      });
    }

    // Validate admin credentials
    if (email === adminEmail && password === adminPassword) {
      // Admin login successful
      // Set admin_session flag (client-side will handle localStorage)
      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          admin: {
            email: adminEmail,
          },
        },
      });
    } else {
      // Invalid admin credentials
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }
  } catch (error) {
    next(error);
  }
}
