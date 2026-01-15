// API helper file for making HTTP requests
import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
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
export const registerUser = async (name, email, password) => {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post('/auth/verify-otp', { email, otp });
  return response.data;
};

export const resetPassword = async (email, newPassword) => {
  const response = await api.post('/auth/reset-password', {
    email,
    newPassword,
  });
  return response.data;
};

export default api;
