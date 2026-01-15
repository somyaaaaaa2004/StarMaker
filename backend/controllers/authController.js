// Authentication controller
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { sendOTPEmail } from '../src/services/emailService.js';

// Register new student
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Check if student already exists
    const [existingStudents] = await pool.execute(
      'SELECT id FROM students WHERE email = ?',
      [email]
    );

    if (existingStudents.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new student
    const [result] = await pool.execute(
      'INSERT INTO students (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Login student
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find student by email
    const [students] = await pool.execute(
      'SELECT id, name, email, password FROM students WHERE email = ?',
      [email]
    );

    if (students.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const student = students[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student.id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Forgot password - generate OTP and send via email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if student exists
    const [students] = await pool.execute(
      'SELECT id FROM students WHERE email = ?',
      [email]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration time (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Delete any existing OTPs for this email
    await pool.execute(
      'DELETE FROM otp_verification WHERE email = ?',
      [email]
    );

    // Insert new OTP
    await pool.execute(
      'INSERT INTO otp_verification (email, otp, expires_at) VALUES (?, ?, ?)',
      [email, otp, expiresAt]
    );

    // Send OTP via email
    try {
      await sendOTPEmail(email, otp);
      
      res.json({
        success: true,
        message: 'OTP has been sent to your email. Please check your inbox.',
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Still return success (for security - don't reveal email issues)
      // But log the error for debugging
      res.json({
        success: true,
        message: 'OTP has been sent to your email. Please check your inbox.',
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    // Find OTP record
    const [otpRecords] = await pool.execute(
      'SELECT * FROM otp_verification WHERE email = ? AND otp = ? ORDER BY id DESC LIMIT 1',
      [email, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    const otpRecord = otpRecords[0];

    // Check if OTP is expired
    const now = new Date();
    const expiresAt = new Date(otpRecord.expires_at);
    if (now > expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    // OTP is valid
    res.json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email and new password are required',
      });
    }

    // Check if student exists
    const [students] = await pool.execute(
      'SELECT id FROM students WHERE email = ?',
      [email]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.execute(
      'UPDATE students SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );

    // Delete used OTPs for this email
    await pool.execute(
      'DELETE FROM otp_verification WHERE email = ?',
      [email]
    );

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
