// API service for making HTTP requests
import axios from 'axios';

// VITE_API_URL should be base URL (e.g., https://starmaker-production.up.railway.app)
// We append /api to create the full API base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = `${BASE_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Request password reset OTP
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // Reset password
  resetPassword: async (resetToken, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      resetToken,
      newPassword,
    });
    return response.data;
  },
};

// Contact API function
export const submitContact = async (fullName, email, phone, subject, message) => {
  const response = await api.post('/contact', {
    fullName,
    email,
    phone,
    subject,
    message,
  });
  return response.data;
};

// Admin API function
export const adminLogin = async (email, password) => {
  const response = await api.post('/admin/login', {
    email,
    password,
  });
  return response.data;
};

export default api;
