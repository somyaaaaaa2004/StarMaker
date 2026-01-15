// Admin configuration
// Admin credentials from environment variables with fallback for local development only

export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'somya.starmaker@gmail.com';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '123456';
