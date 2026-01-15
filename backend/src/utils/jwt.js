// JWT token utilities
import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Generate JWT token for user authentication
 * @param {Object} payload - User data to encode in token
 * @returns {string} JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}

/**
 * Generate short-lived token for password reset
 * @param {Object} payload - User data to encode in token
 * @returns {string} JWT token (expires in 15 minutes)
 */
export function generateResetToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: '15m', // Short-lived token for security
  });
}

/**
 * Verify and decode JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
