# 📮 Postman Testing Guide for Star Maker Backend API

Complete step-by-step guide for testing all backend endpoints using Postman.

---

## 📋 Prerequisites

Before testing, make sure:

1. ✅ **Backend server is running** on `http://localhost:5000`
   ```bash
   cd backend
   npm start
   ```

2. ✅ **MySQL database is set up** and tables are created
   ```bash
   mysql -u root -p < database.sql
   ```

3. ✅ **Postman is installed** (Download from [postman.com](https://www.postman.com/downloads/))

4. ✅ **Environment variables are configured** in `backend/.env`

---

## 🎯 Base URL

All API endpoints use this base URL:
```
http://localhost:5000/api
```

---

## 📍 All Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register new student |
| POST | `/api/auth/login` | Login and get JWT token |
| POST | `/api/auth/forgot-password` | Request OTP for password reset |
| POST | `/api/auth/verify-otp` | Verify OTP code |
| POST | `/api/auth/reset-password` | Reset password with new password |

---

## 🧪 Step-by-Step Testing Instructions

### 1️⃣ Health Check (Test Server Connection)

**Request:**
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/health`
- **Headers:** None required
- **Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Star Maker API is running! 🌟",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**How to test:**
1. Open Postman
2. Create a new request
3. Select `GET` method
4. Enter URL: `http://localhost:5000/api/health`
5. Click **Send**
6. You should see a success message

---

### 2️⃣ Register New Student

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

**How to test:**
1. Create new request in Postman
2. Select `POST` method
3. Enter URL: `http://localhost:5000/api/auth/register`
4. Go to **Headers** tab
5. Add header: `Content-Type: application/json`
6. Go to **Body** tab
7. Select **raw** and **JSON** from dropdown
8. Paste the JSON body above
9. Click **Send**

**⚠️ Note:** Save the email and password - you'll need them for login!

---

### 3️⃣ Login (Get JWT Token)

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcwNTMyNzAwMCwiZXhwIjoxNzA1OTMxODAwfQ.xxxxxxxxxxxxx",
    "student": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

**How to test:**
1. Create new request
2. Select `POST` method
3. Enter URL: `http://localhost:5000/api/auth/login`
4. Add header: `Content-Type: application/json`
5. Add JSON body with email and password
6. Click **Send**

**🔑 Saving Token for Future Requests:**

After successful login, copy the `token` value from the response. You can:
- **Option 1:** Copy token manually and add to Authorization header in other requests
- **Option 2:** Use Postman's "Tests" tab to auto-save token:

  1. After sending login request, go to **Tests** tab
  2. Add this script:
  ```javascript
  if (pm.response.code === 200) {
      const response = pm.response.json();
      pm.environment.set("auth_token", response.data.token);
  }
  ```
  3. Then use `{{auth_token}}` in Authorization header

---

### 4️⃣ Forgot Password (Generate OTP)

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/forgot-password`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "email": "john.doe@example.com"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP generated successfully",
  "data": {
    "otp": "123456",
    "expiresAt": "2024-01-15T10:40:00.000Z"
  }
}
```

**How to test:**
1. Create new request
2. Select `POST` method
3. Enter URL: `http://localhost:5000/api/auth/forgot-password`
4. Add header: `Content-Type: application/json`
5. Add JSON body with email (must be registered email)
6. Click **Send**

**⚠️ Important:** Save the OTP from the response! You'll need it for the next step. The OTP expires in 10 minutes.

---

### 5️⃣ Verify OTP

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/verify-otp`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**How to test:**
1. Create new request
2. Select `POST` method
3. Enter URL: `http://localhost:5000/api/auth/verify-otp`
4. Add header: `Content-Type: application/json`
5. Add JSON body with email and OTP (from previous step)
6. Click **Send**

**⚠️ Note:** Use the OTP from the forgot-password response. OTP expires after 10 minutes!

---

### 6️⃣ Reset Password

**Request:**
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/reset-password`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (raw JSON):**
```json
{
  "email": "john.doe@example.com",
  "newPassword": "newpassword123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**How to test:**
1. Create new request
2. Select `POST` method
3. Enter URL: `http://localhost:5000/api/auth/reset-password`
4. Add header: `Content-Type: application/json`
5. Add JSON body with email and new password
6. Click **Send**

**✅ Test the new password:** Try logging in with the new password using the login endpoint!

---

## 🔄 Complete Testing Flow Example

Here's a complete flow to test the entire authentication system:

### Step 1: Register a New User
```
POST /api/auth/register
Body: { "name": "Test User", "email": "test@example.com", "password": "test123" }
```

### Step 2: Login with Registered Credentials
```
POST /api/auth/login
Body: { "email": "test@example.com", "password": "test123" }
Save the token from response!
```

### Step 3: Request Password Reset
```
POST /api/auth/forgot-password
Body: { "email": "test@example.com" }
Save the OTP from response!
```

### Step 4: Verify OTP
```
POST /api/auth/verify-otp
Body: { "email": "test@example.com", "otp": "123456" }
```

### Step 5: Reset Password
```
POST /api/auth/reset-password
Body: { "email": "test@example.com", "newPassword": "newtest123" }
```

### Step 6: Login with New Password
```
POST /api/auth/login
Body: { "email": "test@example.com", "password": "newtest123" }
```

---

## ❌ Common Errors and Solutions

### 1. **Connection Error / Cannot Reach Server**

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```

**Solution:**
- ✅ Make sure backend server is running: `cd backend && npm start`
- ✅ Check if port 5000 is available
- ✅ Verify URL is correct: `http://localhost:5000/api/...`

---

### 2. **400 Bad Request - Missing Fields**

**Error:**
```json
{
  "success": false,
  "message": "Name, email, and password are required"
}
```

**Solution:**
- ✅ Check that all required fields are in the JSON body
- ✅ Verify JSON syntax is correct (no trailing commas)
- ✅ Make sure `Content-Type: application/json` header is set

---

### 3. **409 Conflict - Email Already Exists**

**Error:**
```json
{
  "success": false,
  "message": "Student with this email already exists"
}
```

**Solution:**
- ✅ Use a different email address
- ✅ Or use the existing email to login instead

---

### 4. **401 Unauthorized - Invalid Credentials**

**Error:**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Solution:**
- ✅ Check email and password are correct
- ✅ Make sure you registered the user first
- ✅ Verify password matches the one used during registration

---

### 5. **404 Not Found - Student Not Found**

**Error:**
```json
{
  "success": false,
  "message": "Student not found"
}
```

**Solution:**
- ✅ Make sure the email is registered first
- ✅ Check for typos in the email address

---

### 6. **400 Bad Request - Invalid OTP**

**Error:**
```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

**Solution:**
- ✅ Use the OTP from the forgot-password response
- ✅ Make sure OTP is 6 digits
- ✅ Check that OTP hasn't expired (10 minutes)

---

### 7. **400 Bad Request - OTP Expired**

**Error:**
```json
{
  "success": false,
  "message": "OTP has expired"
}
```

**Solution:**
- ✅ Request a new OTP using forgot-password endpoint
- ✅ Use the new OTP within 10 minutes

---

### 8. **500 Internal Server Error**

**Error:**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

**Solution:**
- ✅ Check backend console for detailed error messages
- ✅ Verify database connection is working
- ✅ Check that database tables exist
- ✅ Verify environment variables are set correctly

---

### 9. **Database Connection Error**

**Error:**
```
❌ Database connection failed
```

**Solution:**
- ✅ Make sure MySQL is running
- ✅ Check database credentials in `.env` file
- ✅ Verify database `starmaker_db` exists
- ✅ Run database.sql to create tables

---

## 💡 Pro Tips

1. **Create a Postman Collection:**
   - Save all requests in a collection for easy access
   - Name requests clearly (e.g., "1. Register", "2. Login")

2. **Use Environment Variables:**
   - Create an environment with base URL: `{{base_url}} = http://localhost:5000/api`
   - Use `{{base_url}}/auth/login` in requests

3. **Save Variables:**
   - Use Tests tab to save token, email, etc. for reuse

4. **Test Error Cases:**
   - Try missing fields
   - Try invalid emails
   - Try wrong passwords
   - Try expired OTPs

5. **Use Pre-request Scripts:**
   - Auto-generate test data
   - Set timestamps
   - Generate random emails

---

## 📝 Sample Test Scripts for Postman

### Auto-save Token After Login:

In the **Tests** tab of Login request:
```javascript
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    pm.environment.set("jwt_token", jsonData.data.token);
    pm.environment.set("user_email", jsonData.data.student.email);
    console.log("Token saved:", jsonData.data.token);
}
```

### Auto-save OTP After Forgot Password:

In the **Tests** tab of Forgot Password request:
```javascript
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    pm.environment.set("otp_code", jsonData.data.otp);
    console.log("OTP saved:", jsonData.data.otp);
}
```

Then use `{{jwt_token}}` and `{{otp_code}}` in other requests!

---

## ✅ Checklist

Before testing, ensure:
- [ ] Backend server is running (`npm start` in backend folder)
- [ ] MySQL database is running
- [ ] Database tables are created
- [ ] Environment variables are configured
- [ ] Postman is installed
- [ ] Base URL is correct: `http://localhost:5000/api`

---

## 🎉 You're Ready!

You now have everything you need to test your Star Maker backend API with Postman. Start with the health check, then work through each endpoint in order.

**Happy Testing! 🚀**
