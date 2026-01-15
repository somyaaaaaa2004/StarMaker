// Server entry point
// Load environment variables FIRST before importing anything else
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from backend root directory (two levels up from src/server.js)
// In Railway/production, env vars are set directly, so this is optional
const envPath = path.resolve(__dirname, '../../.env');
try {
  dotenv.config({ path: envPath });
} catch (error) {
  // Ignore if .env file doesn't exist (Railway uses environment variables directly)
  console.log('ℹ️  .env file not found, using environment variables directly');
}

// Now import other modules (they can use process.env)
import app from './app.js';
import config from './config/env.js';
import pool from './config/db.js';

// Railway requires process.env.PORT, with fallback to config or 3000
const PORT = process.env.PORT || config.server.port || 3000;

// Verify email configuration during startup
if (process.env.EMAIL_USER) {
  console.log('✅ Email service configured - EMAIL_USER found');
  console.log('   Email user:', process.env.EMAIL_USER);
} else {
  console.warn('⚠️  EMAIL_USER not found in .env - Email service will not work');
  console.warn('   Make sure .env file exists in backend/.env with EMAIL_USER and EMAIL_PASS');
}

// Start server
// Railway requires binding to 0.0.0.0 to accept external connections
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n🌟 ============================================');
  console.log('   Star Maker Coaching Institute Backend');
  console.log('============================================');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Environment: ${config.server.nodeEnv || process.env.NODE_ENV || 'production'}`);
  console.log(`🌐 Listening on: 0.0.0.0:${PORT}`);
  console.log('============================================\n');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await pool.end();
    console.log('Database connections closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await pool.end();
    console.log('Database connections closed');
    process.exit(0);
  });
});