# 📊 Simplified Flowcharts for draw.io - StarMaker Project

## 🎯 Quick Visual Guide

---

## 1. REGISTRATION FLOW

```
START
  ↓
Display Registration Form
  ↓
User Fills: Name, Email, Password, Confirm Password
  ↓
User Clicks "Register"
  ↓
Validate: Name empty? ──YES──► [Error: "Name required"] ──► END
  └─NO─►
Validate: Email empty? ──YES──► [Error: "Email required"] ──► END
  └─NO─►
Validate: Email format valid? ──NO──► [Error: "Invalid email"] ──► END
  └─YES─►
Validate: Password empty? ──YES──► [Error: "Password required"] ──► END
  └─NO─►
Validate: Password < 6 chars? ──YES──► [Error: "Password too short"] ──► END
  └─NO─►
Validate: Passwords match? ──NO──► [Error: "Passwords don't match"] ──► END
  └─YES─►
Show Loading: "Registering..."
  ↓
API Call: POST /api/auth/register
  ├─ Request: { name, email, password }
  ↓
[BACKEND] Validate Input
  ↓
[BACKEND] Check: Email exists in DB? ──YES──► [Error: 409 "User exists"] ──► END
  └─NO─►
[BACKEND] Hash Password (bcrypt)
  ↓
[BACKEND] INSERT INTO users table
  ↓
[BACKEND] Generate JWT Token
  ↓
[BACKEND] Response: { success: true, data: { user, token } }
  ↓
Store: localStorage.setItem('token', token)
Store: localStorage.setItem('user', user)
  ↓
Hide Loading
  ↓
Display: Success Message
  ↓
Redirect: Navigate to /login
  ↓
END
```

---

## 2. LOGIN FLOW

```
START
  ↓
Display Login Form
  ├─ Fields: Email, Password
  └─ Link: "Forgot Password?"
  ↓
User Fills: Email, Password
  ↓
User Clicks "Login"
  ↓
Validate: Email empty? ──YES──► [Error: "Email required"] ──► END
  └─NO─►
Validate: Password empty? ──YES──► [Error: "Password required"] ──► END
  └─YES─►
Show Loading: "Logging in..."
  ↓
API Call: POST /api/auth/login
  ├─ Request: { email, password }
  ↓
[BACKEND] Validate Input
  ↓
[BACKEND] SELECT * FROM users WHERE email = ?
  ↓
User Found? ──NO──► [Error: 404 "User not found"] ──► END
  └─YES─►
[BACKEND] Compare Password (bcrypt.compare)
  ↓
Password Valid? ──NO──► [Error: 401 "Invalid password"] ──► END
  └─YES─►
[BACKEND] Generate JWT Token
  ↓
[BACKEND] Response: { success: true, data: { user, token } }
  ↓
Store: localStorage.setItem('token', token)
Store: localStorage.setItem('user', user)
  ↓
Hide Loading
  ↓
Redirect: Navigate to /dashboard
  ↓
END
```

---

## 3. FORGOT PASSWORD + OTP FLOW (Complete)

```
╔═══════════════════════════════════════════════════════════════╗
║               PART 1: FORGOT PASSWORD                         ║
╚═══════════════════════════════════════════════════════════════╝

START
  ↓
User Clicks "Forgot Password?" on Login Page
  ↓
Redirect: Navigate to /forgot-password
  ↓
Display Forgot Password Form
  ├─ Field: Email
  └─ Button: "Send OTP"
  ↓
User Enters Email
  ↓
User Clicks "Send OTP"
  ↓
Validate: Email empty? ──YES──► [Error: "Email required"] ──► END
  └─NO─►
Validate: Email format valid? ──NO──► [Error: "Invalid email"] ──► END
  └─YES─►
Show Loading: "Sending OTP..."
  ↓
API Call: POST /api/auth/forgot-password
  ├─ Request: { email }
  ↓
[BACKEND] Validate Email
  ↓
[BACKEND] SELECT * FROM users WHERE email = ?
  ↓
User Exists? ──NO──► [Response: Generic success for security]
                      └─► Display: "OTP sent (if email exists)"
                      └─► END
  └─YES─►
[BACKEND] Generate 6-Digit OTP (random: 100000-999999)
  ↓
[BACKEND] Calculate Expiration (current time + 5 minutes)
  ↓
[BACKEND] DELETE old OTPs WHERE email = ? AND used = FALSE
  ↓
[BACKEND] INSERT INTO otps (email, otp_code, expires_at, used)
  ↓
[BACKEND] Send Email via Gmail SMTP
  ├─ Configure: EMAIL_USER, EMAIL_PASS, EMAIL_FROM
  ├─ To: User's email
  ├─ Subject: "Password Reset OTP"
  └─ Body: HTML email with OTP code
  ↓
Email Sent? ──NO──► [Error: "Failed to send email"] ──► END
  └─YES─►
[BACKEND] Response: { success: true, message: "OTP sent" }
  ↓
Store: localStorage.setItem('resetEmail', email)
  ↓
Display: Success Message
  ↓
Wait: 3 seconds
  ↓
Redirect: Navigate to /verify-otp


╔═══════════════════════════════════════════════════════════════╗
║               PART 2: VERIFY OTP                              ║
╚═══════════════════════════════════════════════════════════════╝

Display Verify OTP Form
  ├─ Field: OTP (6 digits)
  └─ Button: "Verify OTP"
  ↓
User Enters OTP from Email
  ↓
User Clicks "Verify OTP"
  ↓
Validate: OTP empty? ──YES──► [Error: "OTP required"] ──► END
  └─NO─►
Validate: OTP = 6 digits? ──NO──► [Error: "OTP must be 6 digits"] ──► END
  └─YES─►
Show Loading: "Verifying OTP..."
  ↓
API Call: POST /api/auth/verify-otp
  ├─ Request: { email, otp }
  └─ email: from localStorage.getItem('resetEmail')
  ↓
[BACKEND] Validate Input
  ↓
[BACKEND] SELECT * FROM otps 
          WHERE email = ? AND otp_code = ? AND used = FALSE
          ORDER BY created_at DESC LIMIT 1
  ↓
OTP Found? ──NO──► [Error: 400 "Invalid OTP"] ──► END
  └─YES─►
[BACKEND] Check: Current time > expires_at?
  ↓
OTP Expired? ──YES──► [Error: 400 "OTP expired"] ──► END
  └─NO─►
[BACKEND] UPDATE otps SET used = TRUE WHERE id = ?
  ↓
[BACKEND] SELECT id FROM users WHERE email = ?
  ↓
[BACKEND] Generate Reset Token (JWT, expires: 15 min)
  ↓
[BACKEND] Response: { success: true, data: { resetToken } }
  ↓
Store: localStorage.setItem('resetToken', resetToken)
  ↓
Hide Loading
  ↓
Redirect: Navigate to /reset-password


╔═══════════════════════════════════════════════════════════════╗
║               PART 3: RESET PASSWORD                          ║
╚═══════════════════════════════════════════════════════════════╝

Display Reset Password Form
  ├─ Field: New Password
  ├─ Field: Confirm Password
  └─ Button: "Reset Password"
  ↓
User Enters New Password
  ↓
User Clicks "Reset Password"
  ↓
Validate: Password empty? ──YES──► [Error: "Password required"] ──► END
  └─NO─►
Validate: Password < 6 chars? ──YES──► [Error: "Password too short"] ──► END
  └─NO─►
Validate: Passwords match? ──NO──► [Error: "Passwords don't match"] ──► END
  └─YES─►
Show Loading: "Resetting password..."
  ↓
API Call: POST /api/auth/reset-password
  ├─ Request: { resetToken, newPassword }
  └─ resetToken: from localStorage.getItem('resetToken')
  ↓
[BACKEND] Validate Input
  ↓
[BACKEND] Verify Reset Token (JWT verify)
  ↓
Token Valid? ──NO──► [Error: 400 "Invalid/expired token"] ──► END
  └─YES─►
[BACKEND] Validate: Password < 6 chars? ──YES──► [Error: "Password too short"] ──► END
  └─NO─►
[BACKEND] Hash New Password (bcrypt)
  ↓
[BACKEND] UPDATE users SET password = ? WHERE id = ?
  ↓
User Updated? ──NO──► [Error: 404 "User not found"] ──► END
  └─YES─►
[BACKEND] Response: { success: true, message: "Password reset successfully" }
  ↓
Clear: localStorage.removeItem('resetEmail')
Clear: localStorage.removeItem('resetToken')
  ↓
Hide Loading
  ↓
Display: Success Message
  ↓
Wait: 2 seconds
  ↓
Redirect: Navigate to /login
  ↓
END
```

---

## 🎨 Draw.io Shape Recommendations

| Step Type | Draw.io Shape | Color |
|-----------|--------------|-------|
| Start/End | Oval | Green |
| Process | Rectangle | Blue |
| Decision | Diamond | Yellow |
| Input/Display | Parallelogram | Light Blue |
| API Call | Rounded Rectangle | Orange |
| Database | Cylinder | Purple |
| Error | Rectangle (red border) | Red |
| Storage | Cylinder | Gray |

---

## 📐 Layout Suggestions for draw.io

1. **Top-to-Bottom Flow**: Start at top, flow downward
2. **Swimlanes**: Separate Frontend (left) and Backend (right)
3. **Decision Points**: Use diamonds, label Yes/No paths clearly
4. **Error Handling**: Branch errors to the right or bottom
5. **Grouping**: Group related steps with containers/boxes
6. **Labels**: Add descriptive labels on all connectors

---

## 🔄 Alternative: Swimlane Format

### Registration Flow (Swimlane View)

```
┌───────────────┬─────────────────────────────────────────┐
│   FRONTEND    │              BACKEND                     │
├───────────────┼─────────────────────────────────────────┤
│ Display Form  │                                         │
│ User Input    │                                         │
│ Validate Form │                                         │
│               │──API Call──────────────────────────────>│
│               │                                         │
│               │ Validate Input                          │
│               │ Check Email Exists                      │
│               │ Hash Password                           │
│               │ INSERT INTO users                       │
│               │ Generate JWT                            │
│               │<────────────────Response────────────────│
│ Store Token   │                                         │
│ Redirect      │                                         │
└───────────────┴─────────────────────────────────────────┘
```

---

**🎉 Ready to create professional flowcharts in draw.io!**
