// Server entry point
// Load environment variables FIRST before importing anything else
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from backend root directory (two levels up from src/server.js)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Now import other modules (they can use process.env)
import app from './app.js';
import config from './config/env.js';
import pool from './config/db.js';

const PORT = config.server.port;

// Verify email configuration during startup
if (process.env.EMAIL_USER) {
  console.log('✅ Email service configured - EMAIL_USER found');
  console.log('   Email user:', process.env.EMAIL_USER);
} else {
  console.warn('⚠️  EMAIL_USER not found in .env - Email service will not work');
  console.warn('   Make sure .env file exists in backend/.env with EMAIL_USER and EMAIL_PASS');
}

// Start server
const server = app.listen(PORT, () => {
  console.log('\n🌟 ============================================');
  console.log('   Star Maker Coaching Institute Backend');
  console.log('============================================');
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${config.server.nodeEnv}`);
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