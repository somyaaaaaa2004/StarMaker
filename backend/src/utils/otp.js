// OTP (One-Time Password) utilities
import crypto from 'crypto';

/**
 * Generate a 6-digit random OTP
 * @returns {string} 6-digit OTP code
 */
export function generateOTP() {
  // Generate random 6-digit number
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Check if OTP is expired
 * @param {Date} expiresAt - Expiration timestamp
 * @returns {boolean} True if expired
 */
export function isOTPExpired(expiresAt) {
  return new Date() > new Date(expiresAt);
}

/**
 * OTP expiration time (5 minutes from now)
 * @returns {Date} Expiration timestamp
 */
export function getOTPExpiration() {
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 5);
  return expiration;
}
