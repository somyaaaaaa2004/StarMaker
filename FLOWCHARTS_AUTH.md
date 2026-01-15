# 🔄 Authentication Flowcharts - StarMaker Project

**Text-based flowcharts for draw.io recreation**

---

## 📋 Flowchart Symbols Reference

```
[START]          = Start/End Node (Oval)
[PROCESS]        = Process/Action (Rectangle)
[DECISION]       = Decision/Diamond (Yes/No)
[INPUT]          = User Input (Parallelogram)
[DISPLAY]        = Display Message (Rectangle)
[STORAGE]        = Database/LocalStorage (Cylinder)
[API]            = API Call (Rectangle with rounded corners)
[ERROR]          = Error Message (Rectangle with red outline)
```

---

## 1️⃣ REGISTRATION FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOWCHART                           │
└─────────────────────────────────────────────────────────────────────┘

[START]
   │
   ▼
[User navigates to /register page]
   │
   ▼
[DISPLAY: Registration Form]
   │
   ├─ Fields: Name, Email, Password
   │
   ▼
[User fills form and clicks "Register"]
   │
   ▼
[Validate form fields]
   │
   ├─ Name empty? ──YES──► [ERROR: "Name is required"] ──► [END]
   │   │
   │   NO
   │   │
   ├─ Email empty? ──YES──► [ERROR: "Email is required"] ──► [END]
   │   │
   │   NO
   │   │
   ├─ Email format valid? ──NO──► [ERROR: "Invalid email format"] ──► [END]
   │   │
   │   YES
   │   │
   ├─ Password empty? ──YES──► [ERROR: "Password is required"] ──► [END]
   │   │
   │   NO
   │   │
   └─ Password < 6 chars? ──YES──► [ERROR: "Password must be at least 6 characters"] ──► [END]
       │
       NO
       │
       ▼
[Show loading spinner: "Registering..."]
   │
   ▼
[API CALL: POST /api/auth/register]
   │
   ├─ Request Body: { name, email, password }
   │
   ▼
[BACKEND: authController.register()]
   │
   ▼
[Validate input fields]
   │
   ▼
[Check if email already exists in users table]
   │
   ├─ User exists? ──YES──► [API ERROR: 409 "User with this email already exists"]
   │   │                       │
   │   │                       ▼
   │   │                   [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   NO
   │   │
   ▼
[Hash password using bcrypt (salt rounds: 10)]
   │
   ▼
[INSERT INTO users table]
   │
   ├─ Fields: name, email, password (hashed)
   │
   ▼
[Generate JWT token]
   │
   ├─ Payload: { id: user.id, email: user.email }
   │
   ▼
[API RESPONSE: 201 Created]
   │
   ├─ { success: true, message: "User registered successfully", data: { user, token } }
   │
   ▼
[STORE: Save token and user data to localStorage]
   │
   ├─ localStorage.setItem('token', token)
   │   localStorage.setItem('user', JSON.stringify(user))
   │
   ▼
[DISPLAY: Success message "Registration successful! Please login."]
   │
   ▼
[REDIRECT: Navigate to /login page]
   │
   ▼
[END]

═══════════════════════════════════════════════════════════════════════

ERROR HANDLING BRANCHES:

[API CALL fails] ──► [CATCH ERROR]
                        │
                        ├─ Network error? ──YES──► [ERROR: "Network error. Please check connection"]
                        │
                        ├─ 409 Conflict? ──YES──► [ERROR: "User with this email already exists"]
                        │
                        ├─ 400 Bad Request? ──YES──► [ERROR: Response message from backend]
                        │
                        └─ Other? ──YES──► [ERROR: "Registration failed. Please try again."]
                            │
                            ▼
                        [Hide loading spinner]
                            │
                            ▼
                        [Display error message on form]
                            │
                            ▼
                        [END]
```

---

## 2️⃣ LOGIN FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGIN FLOWCHART                               │
└─────────────────────────────────────────────────────────────────────┘

[START]
   │
   ▼
[User navigates to /login page]
   │
   ▼
[DISPLAY: Login Form]
   │
   ├─ Fields: Email, Password
   │   Link: "Forgot Password?"
   │
   ▼
[User fills form and clicks "Login"]
   │
   ▼
[Validate form fields]
   │
   ├─ Email empty? ──YES──► [ERROR: "Email is required"] ──► [END]
   │   │
   │   NO
   │   │
   └─ Password empty? ──YES──► [ERROR: "Password is required"] ──► [END]
       │
       NO
       │
       ▼
[Show loading spinner: "Logging in..."]
   │
   ▼
[API CALL: POST /api/auth/login]
   │
   ├─ Request Body: { email, password }
   │
   ▼
[BACKEND: authController.login()]
   │
   ▼
[Validate input fields]
   │
   ▼
[QUERY: SELECT * FROM users WHERE email = ?]
   │
   ├─ User found? ──NO──► [API ERROR: 404 "User not found"]
   │   │                   │
   │   │                   ▼
   │   │               [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[Compare password with bcrypt.compare()]
   │
   ├─ Password matches? ──NO──► [API ERROR: 401 "Invalid password"]
   │   │                          │
   │   │                          ▼
   │   │                      [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[Generate JWT token]
   │
   ├─ Payload: { id: user.id, email: user.email }
   │   Expires: 7 days
   │
   ▼
[API RESPONSE: 200 OK]
   │
   ├─ { success: true, message: "Login successful", data: { user: { id, name, email }, token } }
   │
   ▼
[STORE: Save token and user data to localStorage]
   │
   ├─ localStorage.setItem('token', token)
   │   localStorage.setItem('user', JSON.stringify(user))
   │
   ▼
[Hide loading spinner]
   │
   ▼
[REDIRECT: Navigate to /dashboard]
   │
   ▼
[END]

═══════════════════════════════════════════════════════════════════════

DASHBOARD PROTECTION:

[User tries to access /dashboard]
   │
   ▼
[Check: localStorage.getItem('token')]
   │
   ├─ Token exists? ──NO──► [REDIRECT: Navigate to /login]
   │   │                      │
   │   │                      ▼
   │   │                  [END]
   │   │
   │   YES
   │   │
   ▼
[Attach token to API requests]
   │
   ├─ Header: Authorization: Bearer {token}
   │
   ▼
[Load Dashboard page]
   │
   ├─ Display user info
   │   Show logout button
   │
   ▼
[END]

═══════════════════════════════════════════════════════════════════════

ERROR HANDLING BRANCHES:

[API CALL fails] ──► [CATCH ERROR]
                        │
                        ├─ 404 Not Found? ──YES──► [ERROR: "User not found"]
                        │
                        ├─ 401 Unauthorized? ──YES──► [ERROR: "Invalid password"]
                        │
                        ├─ Network error? ──YES──► [ERROR: "Network error. Please check connection"]
                        │
                        └─ Other? ──YES──► [ERROR: "Login failed. Please try again."]
                            │
                            ▼
                        [Hide loading spinner]
                            │
                            ▼
                        [Display error message on form]
                            │
                            ▼
                        [END]
```

---

## 3️⃣ FORGOT PASSWORD + OTP FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│              FORGOT PASSWORD + OTP FLOWCHART                        │
└─────────────────────────────────────────────────────────────────────┘

[START]
   │
   ▼
[User clicks "Forgot Password?" on login page]
   │
   ▼
[REDIRECT: Navigate to /forgot-password]
   │
   ▼
[DISPLAY: Forgot Password Form]
   │
   ├─ Field: Email
   │   Button: "Send OTP"
   │
   ▼
[User enters email and clicks "Send OTP"]
   │
   ▼
[Validate email field]
   │
   ├─ Email empty? ──YES──► [ERROR: "Email is required"] ──► [END]
   │   │
   │   NO
   │   │
   └─ Email format valid? ──NO──► [ERROR: "Invalid email format"] ──► [END]
       │
       YES
       │
       ▼
[Show loading spinner: "Sending OTP..."]
   │
   ▼
[API CALL: POST /api/auth/forgot-password]
   │
   ├─ Request Body: { email }
   │
   ▼
[BACKEND: authController.forgotPassword()]
   │
   ▼
[Validate email input]
   │
   ▼
[QUERY: SELECT id, email FROM users WHERE email = ?]
   │
   ├─ User exists? ──NO──► [RESPONSE: 200 OK with generic message]
   │   │                   │
   │   │                   ├─ { success: true, message: "If the email exists, an OTP has been sent to your email." }
   │   │                   │
   │   │                   ▼
   │   │               [DISPLAY: Success message (generic for security)]
   │   │                   │
   │   │                   ▼
   │   │               [END]
   │   │
   │   YES
   │   │
   ▼
[Generate 6-digit OTP]
   │
   ├─ Method: crypto.randomInt(100000, 999999)
   │   Format: String (e.g., "123456")
   │
   ▼
[Calculate expiration time]
   │
   ├─ Current time + 5 minutes
   │   Format: TIMESTAMP
   │
   ▼
[DELETE old unused OTPs]
   │
   ├─ DELETE FROM otps WHERE email = ? AND used = FALSE
   │
   ▼
[INSERT new OTP into database]
   │
   ├─ INSERT INTO otps (email, otp_code, expires_at, used)
   │   VALUES (email, otpCode, expiresAt, false)
   │
   ▼
[CALL: emailService.sendOTPEmail()]
   │
   ├─ Configure Nodemailer with Gmail SMTP
   │   ├─ EMAIL_USER from .env
   │   ├─ EMAIL_PASS from .env
   │   └─ EMAIL_FROM from .env
   │
   ▼
[Send email via Gmail SMTP]
   │
   ├─ To: User's email
   │   From: "Star Maker Coaching Institute" <EMAIL_FROM>
   │   Subject: "Password Reset OTP - Star Maker Coaching Institute"
   │   Body: HTML formatted email with OTP code
   │
   ▼
[Email sent successfully?]
   │
   ├─ NO ──► [ERROR: "Failed to send OTP email"]
   │   │       │
   │   │       ▼
   │   │   [API ERROR: 500]
   │   │       │
   │   │       ▼
   │   │   [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[API RESPONSE: 200 OK]
   │
   ├─ { success: true, message: "OTP has been sent to your email. Please check your inbox." }
   │
   ▼
[STORE: Save email to localStorage]
   │
   ├─ localStorage.setItem('resetEmail', email)
   │
   ▼
[DISPLAY: Success message]
   │
   ├─ "OTP has been sent to your email. Please check your inbox."
   │
   ▼
[Wait 3 seconds]
   │
   ▼
[REDIRECT: Navigate to /verify-otp]
   │
   ▼
[DISPLAY: Verify OTP Form]
   │
   ├─ Field: OTP (6 digits)
   │   Button: "Verify OTP"
   │
   ▼
[User enters OTP from email and clicks "Verify OTP"]
   │
   ▼
[Validate OTP field]
   │
   ├─ OTP empty? ──YES──► [ERROR: "OTP is required"] ──► [END]
   │   │
   │   NO
   │   │
   └─ OTP = 6 digits? ──NO──► [ERROR: "OTP must be 6 digits"] ──► [END]
       │
       YES
       │
       ▼
[Show loading spinner: "Verifying OTP..."]
   │
   ▼
[API CALL: POST /api/auth/verify-otp]
   │
   ├─ Request Body: { email, otp }
   │   email: Retrieved from localStorage.getItem('resetEmail')
   │
   ▼
[BACKEND: authController.verifyOTP()]
   │
   ▼
[Validate input fields]
   │
   ▼
[QUERY: SELECT * FROM otps WHERE email = ? AND otp_code = ? AND used = FALSE ORDER BY created_at DESC LIMIT 1]
   │
   ├─ OTP found? ──NO──► [API ERROR: 400 "Invalid OTP"]
   │   │                   │
   │   │                   ▼
   │   │               [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[Check if OTP is expired]
   │
   ├─ Current time > expires_at? ──YES──► [API ERROR: 400 "OTP has expired. Please request a new one."]
   │   │                                     │
   │   │                                     ▼
   │   │                                 [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   NO
   │   │
   ▼
[Mark OTP as used]
   │
   ├─ UPDATE otps SET used = TRUE WHERE id = ?
   │
   ▼
[Get user ID from email]
   │
   ├─ SELECT id FROM users WHERE email = ?
   │
   ▼
[Generate reset token (short-lived JWT)]
   │
   ├─ Payload: { id: user.id, email: email }
   │   Expires: 15 minutes (for password reset)
   │
   ▼
[API RESPONSE: 200 OK]
   │
   ├─ { success: true, message: "OTP verified successfully", data: { resetToken } }
   │
   ▼
[STORE: Save reset token to localStorage]
   │
   ├─ localStorage.setItem('resetToken', resetToken)
   │
   ▼
[REDIRECT: Navigate to /reset-password]
   │
   ▼
[DISPLAY: Reset Password Form]
   │
   ├─ Field: New Password
   │   Field: Confirm Password
   │   Button: "Reset Password"
   │
   ▼
[User enters new password and clicks "Reset Password"]
   │
   ▼
[Validate password fields]
   │
   ├─ New password empty? ──YES──► [ERROR: "New password is required"] ──► [END]
   │   │
   │   NO
   │   │
   ├─ Password < 6 chars? ──YES──► [ERROR: "Password must be at least 6 characters"] ──► [END]
   │   │
   │   NO
   │   │
   └─ Passwords match? ──NO──► [ERROR: "Passwords do not match"] ──► [END]
       │
       YES
       │
       ▼
[Show loading spinner: "Resetting password..."]
   │
   ▼
[API CALL: POST /api/auth/reset-password]
   │
   ├─ Request Body: { resetToken, newPassword }
   │   resetToken: Retrieved from localStorage.getItem('resetToken')
   │
   ▼
[BACKEND: authController.resetPassword()]
   │
   ▼
[Validate input fields]
   │
   ▼
[Verify reset token (JWT)]
   │
   ├─ Token valid? ──NO──► [API ERROR: 400 "Invalid or expired reset token"]
   │   │                    │
   │   │                    ▼
   │   │                [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[Validate password length]
   │
   ├─ Password < 6 chars? ──YES──► [API ERROR: 400 "Password must be at least 6 characters long"]
   │   │                              │
   │   │                              ▼
   │   │                          [DISPLAY ERROR on frontend] ──► [END]
   │   │
   │   NO
   │   │
   ▼
[Hash new password using bcrypt]
   │
   ├─ Salt rounds: 10
   │
   ▼
[UPDATE user password in database]
   │
   ├─ UPDATE users SET password = ? WHERE id = ?
   │
   ├─ User found? ──NO──► [API ERROR: 404 "User not found"] ──► [END]
   │   │
   │   YES
   │   │
   ▼
[API RESPONSE: 200 OK]
   │
   ├─ { success: true, message: "Password reset successfully" }
   │
   ▼
[CLEAR: Remove reset data from localStorage]
   │
   ├─ localStorage.removeItem('resetEmail')
   │   localStorage.removeItem('resetToken')
   │
   ▼
[DISPLAY: Success message]
   │
   ├─ "Password reset successfully! Please login with your new password."
   │
   ▼
[Wait 2 seconds]
   │
   ▼
[REDIRECT: Navigate to /login]
   │
   ▼
[END]

═══════════════════════════════════════════════════════════════════════

ERROR HANDLING BRANCHES:

[FORGOT PASSWORD API CALL fails] ──► [CATCH ERROR]
                                        │
                                        ├─ Network error? ──YES──► [ERROR: "Network error. Please check connection"]
                                        │
                                        ├─ 500 Server Error? ──YES──► [ERROR: "Failed to send OTP. Please try again."]
                                        │
                                        └─ Other? ──YES──► [ERROR: "Failed to send OTP. Please try again."]
                                            │
                                            ▼
                                        [Hide loading spinner]
                                            │
                                            ▼
                                        [Display error message on form]
                                            │
                                            ▼
                                        [END]

[VERIFY OTP API CALL fails] ──► [CATCH ERROR]
                                    │
                                    ├─ 400 Bad Request? ──YES──► [ERROR: "Invalid OTP" or "OTP has expired"]
                                    │
                                    ├─ Network error? ──YES──► [ERROR: "Network error. Please check connection"]
                                    │
                                    └─ Other? ──YES──► [ERROR: "Failed to verify OTP. Please try again."]
                                        │
                                        ▼
                                    [Hide loading spinner]
                                        │
                                        ▼
                                    [Display error message on form]
                                        │
                                        ▼
                                    [END]

[RESET PASSWORD API CALL fails] ──► [CATCH ERROR]
                                        │
                                        ├─ 400 Bad Request? ──YES──► [ERROR: "Invalid or expired reset token"]
                                        │
                                        ├─ Network error? ──YES──► [ERROR: "Network error. Please check connection"]
                                        │
                                        └─ Other? ──YES──► [ERROR: "Failed to reset password. Please try again."]
                                            │
                                            ▼
                                        [Hide loading spinner]
                                            │
                                            ▼
                                        [Display error message on form]
                                            │
                                            ▼
                                        [END]
```

---

## 📊 QUICK REFERENCE: All Flow Summary

### Registration Flow Summary:
```
START → Form Input → Validate → API Call → Check Email Exists → Hash Password → 
Insert User → Generate Token → Store Token → Redirect to Login → END
```

### Login Flow Summary:
```
START → Form Input → Validate → API Call → Find User → Verify Password → 
Generate Token → Store Token → Redirect to Dashboard → END
```

### Forgot Password Flow Summary:
```
START → Email Input → Validate → API Call → Find User → Generate OTP → 
Store OTP in DB → Send Email → Verify OTP → Generate Reset Token → 
Reset Password → Hash New Password → Update DB → Redirect to Login → END
```

---

## 🎨 Draw.io Design Tips

### Color Coding:
- **Green**: Success/End points
- **Blue**: Process steps
- **Yellow**: Decision points
- **Red**: Error paths
- **Purple**: Database operations
- **Orange**: API calls

### Shape Recommendations:
- **Oval**: Start/End
- **Rectangle**: Process/Display
- **Diamond**: Decision/Validation
- **Parallelogram**: Input/Output
- **Cylinder**: Database/Storage
- **Rounded Rectangle**: API calls

### Layout Suggestions:
- Use **top-to-bottom** flow (easier to read)
- Group related steps together
- Use **swimlanes** for Frontend/Backend separation
- Add **notes** for complex logic
- Use **connectors** with labels for Yes/No paths

---

**🎨 Ready to create professional flowcharts in draw.io!**
