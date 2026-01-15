// Express application setup
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
  ],
  credentials: true,
})); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Star Maker Coaching Institute API is running! 🌟',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

export default app;
