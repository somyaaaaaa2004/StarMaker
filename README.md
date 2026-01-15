# Star Maker Coaching Institute

A complete full-stack application with React frontend and Node.js/Express backend with MySQL database.

<img width="1891" height="866" alt="Screenshot 2026-01-15 104838" src="https://github.com/user-attachments/assets/ae640346-e4c1-4a45-863a-2edaaa90f1c3" />

## Project Structure

```
StarMaker/
├── frontend/          # React application
├── backend/           # Node.js/Express server
└── README.md
```

## Features

- ✅ User Registration
- ✅ JWT Authentication (Login)
- ✅ OTP-based Forgot Password System
- ✅ Secure Password Reset
- ✅ MySQL Database Integration
- ✅ Colorful and Fun UI

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE starmaker_db;
   ```

2. Run the schema file:
   ```bash
   mysql -u root -p starmaker_db < backend/database/schema.sql
   ```

### 2. Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `env.example`:
   ```bash
   copy env.example .env
   ```
   (On Linux/Mac: `cp env.example .env`)

4. Update `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=starmaker_db
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   PORT=5000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to frontend folder (in a new terminal):
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `env.example`:
   ```bash
   copy env.example .env
   ```
   (On Linux/Mac: `cp env.example .env`)

4. Update `.env` with backend URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP and get reset token
- `POST /api/auth/reset-password` - Reset password with token

## Technologies Used

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs
- nodemailer
- dotenv

## Development

- Backend runs on port 5000
- Frontend runs on port 5173
- Make sure MySQL is running before starting the backend

## License

MIT
