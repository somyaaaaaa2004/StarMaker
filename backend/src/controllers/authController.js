// Authentication controller - handles all auth-related logic
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { generateToken, generateResetToken, verifyToken } from '../utils/jwt.js';
import { generateOTP, isOTPExpired, getOTPExpiration } from '../utils/otp.js';
import { sendOTPEmail } from '../services/emailService.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    // Generate JWT token
    const token = generateToken({
      id: result.insertId,
      email: email,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: result.insertId,
          name,
          email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login user
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user by email
    const [users] = await pool.execute(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Request password reset OTP
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;

    console.log('📧 Forgot password request received for email:', email);

    // Validate input
    if (!email) {
      console.log('❌ Validation failed: Email is required');
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Check if user exists
    let users;
    try {
      [users] = await pool.execute(
        'SELECT id, email FROM users WHERE email = ?',
        [email]
      );
      console.log('✅ User lookup completed. Found:', users.length > 0 ? 'Yes' : 'No');
    } catch (dbError) {
      console.error('❌ Database error during user lookup:');
      console.error('   Error:', dbError.message);
      console.error('   Stack:', dbError.stack);
      throw new Error('Database error while checking user');
    }

    // For security, don't reveal if user exists or not
    if (users.length === 0) {
      console.log('⚠️  User not found (but returning generic success for security)');
      return res.json({
        success: true,
        message: 'If the email exists, an OTP has been sent to your email.',
      });
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = getOTPExpiration();
    console.log('✅ OTP generated:', otpCode);
    console.log('   Expires at:', expiresAt);

    // Delete any existing unused OTPs for this email
    try {
      await pool.execute(
        'DELETE FROM otps WHERE email = ? AND used = FALSE',
        [email]
      );
      console.log('✅ Old OTPs deleted for email');
    } catch (dbError) {
      console.error('❌ Database error during OTP deletion:');
      console.error('   Error:', dbError.message);
      console.error('   Stack:', dbError.stack);
      // Continue anyway - might be first OTP
    }

    // Insert new OTP
    try {
      await pool.execute(
        'INSERT INTO otps (email, otp_code, expires_at, used) VALUES (?, ?, ?, ?)',
        [email, otpCode, expiresAt, false]
      );
      console.log('✅ OTP stored in database successfully');
    } catch (dbError) {
      console.error('❌ Database error during OTP insertion:');
      console.error('   Error:', dbError.message);
      console.error('   Stack:', dbError.stack);
      console.error('   SQL State:', dbError.code);
      throw new Error('Failed to store OTP in database');
    }

    // Send OTP via email
    try {
      console.log('📧 Attempting to send OTP email...');
      await sendOTPEmail(email, otpCode);
      console.log('✅ OTP email sent successfully');
    } catch (emailError) {
      console.error('❌ Email sending error:');
      console.error('   Error:', emailError.message);
      console.error('   Stack:', emailError.stack);
      throw new Error('Failed to send OTP email. Please try again later.');
    }

    res.json({
      success: true,
      message: 'OTP has been sent to your email. Please check your inbox.',
    });
  } catch (error) {
    console.error('❌ Forgot password error (full details):');
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    console.error('   Error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    // Send user-friendly error
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send OTP. Please try again.',
    });
  }
}

/**
 * Verify OTP and get reset token
 * POST /api/auth/verify-otp
 */
export async function verifyOTP(req, res, next) {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    // Find valid OTP
    const [otps] = await pool.execute(
      'SELECT * FROM otps WHERE email = ? AND otp_code = ? AND used = FALSE ORDER BY created_at DESC LIMIT 1',
      [email, otp]
    );

    if (otps.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    const otpRecord = otps[0];

    // Check if OTP is expired
    if (isOTPExpired(otpRecord.expires_at)) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    // Mark OTP as used
    await pool.execute('UPDATE otps SET used = TRUE WHERE id = ?', [
      otpRecord.id,
    ]);

    // Get user ID
    const [users] = await pool.execute('SELECT id FROM users WHERE email = ?', [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate reset token (short-lived)
    const resetToken = generateResetToken({
      id: users[0].id,
      email: email,
    });

    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        resetToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Reset password with reset token
 * POST /api/auth/reset-password
 */
export async function resetPassword(req, res, next) {
  try {
    const { resetToken, newPassword } = req.body;

    // Validate input
    if (!resetToken || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Reset token and new password are required',
      });
    }

    // Validate password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Verify reset token
    let decoded;
    try {
      decoded = verifyToken(resetToken);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, decoded.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    next(error);
  }
}
