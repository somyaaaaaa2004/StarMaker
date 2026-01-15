// Environment configuration loader
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
// Note: PORT is optional - Railway/cloud platforms set it automatically
const requiredEnvVars = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'JWT_SECRET',
  // PORT is not required - will use process.env.PORT or fallback to 3000
];

// Check for missing environment variables
// Don't exit during build - Railway sets env vars at runtime
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  // Only warn, don't exit - Railway sets env vars at runtime, not during build
  if (process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT) {
    console.warn('⚠️  Missing environment variables (will be validated at runtime):');
    missingVars.forEach(varName => console.warn(`   - ${varName}`));
  } else {
    // In development, still show error but don't exit during module load
    console.warn('⚠️  Missing environment variables:');
    missingVars.forEach(varName => console.warn(`   - ${varName}`));
    console.warn('Please set these in Railway environment variables or .env file');
  }
  // Don't exit - let the app start and fail gracefully on first request if needed
}

// Export configuration
export default {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
