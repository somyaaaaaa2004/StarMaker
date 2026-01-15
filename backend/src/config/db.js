// MySQL database connection configuration
import mysql from 'mysql2/promise';
import config from './env.js';

// Create connection pool for better performance
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Initialize database connection on startup
// Don't block startup if DB is not available (Railway may set DB later)
testConnection().catch((error) => {
  console.warn('⚠️  Database connection test failed (will retry on first request):', error.message);
});

export default pool;