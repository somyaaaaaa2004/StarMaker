# 📧 Gmail OTP Email Setup Guide

Complete guide to enable real OTP email sending using Gmail SMTP for Star Maker project.

---

## ✅ Files Updated

1. ✅ `backend/src/services/emailService.js` - Email service with Gmail SMTP
2. ✅ `backend/controllers/authController.js` - Updated forgot-password controller
3. ✅ `backend/index.js` - Updated CORS to allow frontend ports
4. ✅ `backend/.env.example` - Added email configuration

---

## 🔧 Setup Steps

### Step 1: Install Nodemailer (if not already installed)

```bash
cd backend
npm install nodemailer
```

**Note:** Nodemailer is already in package.json, so just run:
```bash
npm install
```

---

### Step 2: Get Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the setup process
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Star Maker Backend" as the name
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this!)

---

### Step 3: Configure Environment Variables

1. **Create/Update `.env` file** in `backend/` folder:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=starmaker_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_email@gmail.com
```

2. **Replace the values**:
   - `EMAIL_USER`: Your Gmail address (e.g., `john.doe@gmail.com`)
   - `EMAIL_PASS`: The 16-character App Password from Step 2
   - `EMAIL_FROM`: Usually same as EMAIL_USER (optional)

---

### Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connected successfully!
✅ Email transporter configured successfully
✅ Server running on http://localhost:5000
```

---

## 🧪 Testing

### Test Forgot Password Flow

1. **Make sure a user is registered** (use Register endpoint)
2. **Call Forgot Password endpoint**:
   ```
   POST http://localhost:5000/api/auth/forgot-password
   Body: { "email": "registered_user@example.com" }
   ```
3. **Check the response**:
   ```json
   {
     "success": true,
     "message": "OTP has been sent to your email. Please check your inbox."
   }
   ```
4. **Check your email inbox** for the OTP code
5. **Use the OTP** in the Verify OTP endpoint

---

## 🔍 Troubleshooting

### Error: "Email credentials not configured"

**Solution:**
- Make sure `.env` file exists in `backend/` folder
- Check that `EMAIL_USER` and `EMAIL_PASS` are set
- Restart the server after adding environment variables

---

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google Account
- Double-check the App Password (no spaces, all 16 characters)

---

### Error: "Connection timeout" or "ECONNREFUSED"

**Solution:**
- Check your internet connection
- Verify firewall isn't blocking port 587
- Try using port 465 with `secure: true` (requires code change)

---

### Email not received

**Possible causes:**
- Check **Spam/Junk folder**
- Verify the recipient email address is correct
- Check backend console for error messages
- Verify OTP was stored in database:
  ```sql
  SELECT * FROM otp_verification WHERE email = 'your_email@example.com';
  ```

---

### CORS Error on Frontend

**Solution:**
- The CORS has been updated to allow ports 5173, 5174, 5175
- Make sure frontend is running on one of these ports
- Restart backend server after CORS changes

---

## 📝 Code Changes Summary

### 1. Email Service (`backend/src/services/emailService.js`)
- ✅ Created email service using Nodemailer
- ✅ Configured Gmail SMTP (smtp.gmail.com:587)
- ✅ Beautiful HTML email template
- ✅ Error handling

### 2. Auth Controller (`backend/controllers/authController.js`)
- ✅ Updated `forgotPassword` function
- ✅ Generates 6-digit OTP
- ✅ Stores OTP in database with 5-minute expiry
- ✅ Sends OTP via email (doesn't return OTP in response)
- ✅ Proper error handling

### 3. CORS Configuration (`backend/index.js`)
- ✅ Added support for ports 5173, 5174, 5175
- ✅ Keeps existing port 3000 support

---

## 🔐 Security Notes

1. **Never commit `.env` file** to Git
2. **Use App Passwords**, not regular passwords
3. **OTP expires in 5 minutes** (configurable)
4. **OTP is NOT returned in API response** (security best practice)
5. **Each email gets only one active OTP** (old ones are deleted)

---

## ✅ Checklist

Before testing, ensure:
- [ ] Gmail App Password is generated
- [ ] `.env` file has `EMAIL_USER` and `EMAIL_PASS`
- [ ] Backend server is running (`npm run dev`)
- [ ] Database is connected
- [ ] At least one user is registered
- [ ] Frontend can connect to backend (CORS working)

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Backend console shows**:
   ```
   ✅ Email transporter configured successfully
   ✅ OTP email sent successfully to: user@example.com
   📧 Message ID: <xxx@mail.gmail.com>
   ```

2. **Email received** with:
   - Subject: "Password Reset OTP - Star Maker Coaching Institute"
   - 6-digit OTP code
   - Beautiful HTML formatting

3. **API response**:
   ```json
   {
     "success": true,
     "message": "OTP has been sent to your email. Please check your inbox."
   }
   ```

---

## 🚀 You're Ready!

Your OTP email system is now configured and ready to use! Users will receive OTP codes via email when they request a password reset.

**Happy Coding! 🌟**
