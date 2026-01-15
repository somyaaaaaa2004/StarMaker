// Global error handler middleware
export function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

// 404 Not Found handler
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
}
