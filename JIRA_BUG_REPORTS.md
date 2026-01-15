# 🐛 JIRA Bug Reports - StarMaker Website

## Bug Report Template

**Project:** StarMaker Coaching Institute  
**Component:** Authentication / UI / Backend  
**Environment:** Development / Production  
**Reporter:** QA Team  
**Date:** 2024-12-XX

---

## BUG #1: Password Validation Mismatch on Registration Page

### **Title:**
Registration form accepts passwords when "Password" and "Confirm Password" fields don't match

### **Priority:** 🔴 High  
### **Severity:** Major

### **Component:** Frontend - Registration

### **Steps to Reproduce:**
1. Navigate to `/register` page
2. Fill in the Name field with "John Doe"
3. Fill in the Email field with "john@example.com"
4. Enter "password123" in the Password field
5. Enter "password456" in the Confirm Password field (different password)
6. Click on "Register" button

### **Expected Result:**
- Form validation should prevent submission
- Error message should display: "Passwords do not match"
- User should not be able to register until passwords match

### **Actual Result:**
- Form allows submission with mismatched passwords
- No client-side validation error is shown for password mismatch
- API call is made with mismatched password fields
- Backend may reject the request, but user experience is poor due to late error detection

### **Screenshots/Evidence:**
- [Attach screenshot showing mismatched passwords being accepted]
- Console shows API call being made despite mismatch

### **Additional Notes:**
- Password validation exists for length but not for matching
- This should be validated before API call to improve UX
- Validation check exists in code but may not be triggered properly

---

## BUG #2: Email Field Accepts Invalid Format in Forgot Password Page

### **Title:**
Forgot Password page accepts email addresses without @ symbol or domain extension

### **Priority:** 🟡 Medium  
### **Severity:** Minor

### **Component:** Frontend - Forgot Password

### **Steps to Reproduce:**
1. Navigate to `/forgot-password` page
2. Enter invalid email format: "invalidemail" (no @ symbol)
3. Click "Send OTP" button
4. Observe the behavior

### **Expected Result:**
- HTML5 email validation should trigger
- Error message: "Please enter a valid email address"
- API call should not be made

### **Actual Result:**
- Invalid email format is accepted
- API call is made to backend
- Backend returns error: "Invalid email format"
- Error message appears only after server response (poor UX)

### **Screenshots/Evidence:**
- [Screenshot showing invalid email being submitted]
- Network tab shows unnecessary API call

### **Additional Notes:**
- Client-side validation should catch this before API call
- Backend validation works correctly, but frontend should prevent invalid requests

---

## BUG #3: JWT Token Stored in localStorage Not Expired After 7 Days

### **Title:**
User can still access dashboard with expired JWT token stored in localStorage

### **Priority:** 🔴 High  
### **Severity:** Critical

### **Component:** Frontend - Authentication / Backend - JWT Validation

### **Steps to Reproduce:**
1. Log in to the application successfully
2. Note the token expiration is set to 7 days in backend
3. Manually modify localStorage token to simulate an old/expired token
4. OR wait for token to expire (if testing environment allows)
5. Navigate to `/dashboard` page
6. Attempt to make an API call that requires authentication

### **Expected Result:**
- Frontend should check token expiration before allowing access
- If token is expired, user should be automatically redirected to `/login`
- Error message: "Session expired. Please login again"
- localStorage should be cleared

### **Actual Result:**
- Expired token remains in localStorage
- User can access dashboard UI (no redirect)
- API calls with expired token return 401, but UI doesn't handle it consistently
- Token expiration check only happens on API response, not on page load

### **Screenshots/Evidence:**
- [Screenshot showing expired token still present in localStorage]
- Console logs showing 401 responses

### **Additional Notes:**
- Security concern: Users with expired sessions can still see protected pages
- Token expiration check should happen on protected route load
- Interceptor handles 401 but redirect may not be immediate

---

## BUG #4: OTP Verification Page Redirects to Forgot Password When Email Not in localStorage

### **Title:**
Verify OTP page automatically redirects to forgot-password if email not found in localStorage, even if email was just entered

### **Priority:** 🟡 Medium  
### **Severity:** Minor

### **Component:** Frontend - Verify OTP

### **Steps to Reproduce:**
1. Navigate to `/forgot-password` page
2. Enter email and click "Send OTP"
3. OTP is sent successfully
4. Before automatic redirect, manually navigate to `/verify-otp` by typing URL
5. Clear localStorage using browser DevTools: `localStorage.clear()`
6. Refresh the page
7. Observe the behavior

### **Expected Result:**
- Page should maintain email context from previous step
- If email is missing, should show a message asking user to enter email again
- OR should allow user to enter email manually on Verify OTP page
- Should not automatically redirect (breaks user flow)

### **Actual Result:**
- Page automatically redirects to `/forgot-password` immediately
- User loses context of OTP verification step
- If user already received OTP email, they need to request new OTP
- Poor user experience

### **Screenshots/Evidence:**
- [Screenshot showing redirect happening]
- Network tab shows unnecessary redirect

### **Additional Notes:**
- Verify OTP page should have email input field as fallback
- Or should persist email in sessionStorage instead of localStorage
- Auto-redirect is too aggressive

---

## BUG #5: Error Message Not Displayed When Database Connection Fails During Registration

### **Title:**
Registration fails silently when database connection is unavailable - no user-friendly error message displayed

### **Priority:** 🔴 High  
### **Severity:** Major

### **Component:** Backend - Registration / Frontend - Error Handling

### **Steps to Reproduce:**
1. Stop MySQL database service
2. Ensure backend server is running
3. Navigate to `/register` page
4. Fill in all required fields with valid data
5. Click "Register" button
6. Observe the behavior

### **Expected Result:**
- Backend should catch database connection error
- User-friendly error message should be displayed: "Service temporarily unavailable. Please try again later."
- Error should be logged on backend for debugging
- HTTP status should be 503 (Service Unavailable)

### **Actual Result:**
- Request hangs or times out
- Generic error message: "Registration failed. Please try again."
- No specific indication that it's a database issue
- Console shows technical error but user sees unhelpful message
- User doesn't know if the issue is with their input or server

### **Screenshots/Evidence:**
- [Screenshot showing generic error]
- Backend console logs showing database connection error
- Network tab showing failed/timed out request

### **Additional Notes:**
- Error handling needs improvement to differentiate between client errors and server errors
- Database connection pool errors should be caught and handled gracefully
- Retry mechanism could be considered for transient database issues

---

## BUG #6: Loading Spinner Not Hidden on Login When Network Request Fails

### **Title:**
Login page loading spinner remains visible indefinitely when network request fails or times out

### **Priority:** 🟡 Medium  
### **Severity:** Minor

### **Component:** Frontend - Login

### **Steps to Reproduce:**
1. Navigate to `/login` page
2. Fill in email and password fields
3. Open browser DevTools → Network tab
4. Set network throttling to "Offline" or block network requests
5. Click "Login" button
6. Observe the loading spinner

### **Expected Result:**
- Loading spinner should appear initially
- After request timeout/failure, spinner should be hidden
- Error message should be displayed
- User should be able to retry login

### **Actual Result:**
- Loading spinner appears and remains visible indefinitely
- Button shows "Logging in..." state permanently
- No error message is displayed
- User cannot retry login (button is disabled)
- Page appears frozen/broken

### **Screenshots/Evidence:**
- [Screenshot showing loading spinner stuck]
- Console shows network error but UI doesn't update

### **Additional Notes:**
- Error handling in catch block may not be executing
- Need to ensure finally block always runs to hide spinner
- Add timeout handling for API calls
- Consider implementing retry logic with visual feedback

---

## BUG #7: Success Message Displays After Registration But User Cannot See It Due to Immediate Redirect

### **Title:**
Registration success message appears for < 1 second before redirect, making it invisible to users

### **Priority:** 🟢 Low  
### **Severity:** Trivial

### **Component:** Frontend - Registration

### **Steps to Reproduce:**
1. Navigate to `/register` page
2. Fill in all required fields with new email address
3. Click "Register" button
4. Observe the success message display duration
5. Check if redirect happens immediately

### **Expected Result:**
- Success message should be clearly visible for at least 2-3 seconds
- Message: "Registration successful! Please login."
- User should be able to read the confirmation before redirect
- OR redirect should be delayed to allow reading

### **Actual Result:**
- Success message appears for less than 1 second
- Immediate redirect to `/login` page
- Most users cannot read the success message
- User may be confused about registration status
- Success state passed via route state may not be visible

### **Screenshots/Evidence:**
- [Video recording showing brief flash of success message]
- Login page may show success message from route state, but timing is off

### **Additional Notes:**
- Registration uses `navigate('/login', { state: { message: '...' } })`
- Delay should be added before redirect
- Or success message should be more prominent with auto-dismiss

---

## BUG #8: OTP Email Not Received When Gmail SMTP Credentials Are Incorrect in .env File

### **Title:**
Forgot password flow fails silently when EMAIL_USER or EMAIL_PASS in .env is incorrect - user sees success but no email arrives

### **Priority:** 🔴 High  
### **Severity:** Major

### **Component:** Backend - Email Service

### **Steps to Reproduce:**
1. Modify `backend/.env` file
2. Set incorrect `EMAIL_PASS` (wrong Gmail App Password)
3. Keep `EMAIL_USER` correct
4. Restart backend server
5. Navigate to `/forgot-password` page
6. Enter a registered email address
7. Click "Send OTP"
8. Check email inbox (including spam)

### **Expected Result:**
- Backend should detect email sending failure immediately
- User should see error message: "Failed to send OTP. Please try again."
- Backend should log detailed error about SMTP authentication failure
- OTP should not be saved to database if email fails

### **Actual Result:**
- Backend shows "Email transporter configured successfully" on startup
- User sees success message: "OTP has been sent to your email"
- No email is received
- OTP is saved in database but email was never sent
- Backend logs show SMTP authentication error but doesn't propagate to user
- User waits indefinitely for email that will never arrive

### **Screenshots/Evidence:**
- [Backend console logs showing SMTP 535 authentication error]
- [Screenshot showing success message on frontend]
- [Email inbox showing no OTP email]

### **Additional Notes:**
- Email service error handling needs improvement
- Error should be caught and returned to user in API response
- Email transporter verification on startup doesn't validate credentials
- OTP should be rolled back if email sending fails

---

## BUG #9: Reset Password Page Allows Submission Without Valid Reset Token in localStorage

### **Title:**
Reset password page accepts password change request even when resetToken is missing or invalid in localStorage

### **Priority:** 🔴 High  
### **Severity:** Major

### **Component:** Frontend - Reset Password / Backend - Password Reset

### **Steps to Reproduce:**
1. Navigate directly to `/reset-password` page (bypassing forgot password flow)
2. OR complete forgot password flow but clear localStorage: `localStorage.removeItem('resetToken')`
3. Enter new password: "newpassword123"
4. Enter confirm password: "newpassword123"
5. Click "Reset Password" button
6. Observe the API request and response

### **Expected Result:**
- Page should check for resetToken in localStorage before allowing form submission
- If token is missing, should show error: "Invalid or missing reset token. Please request password reset again."
- Should redirect user to `/forgot-password` page
- API call should not be made without valid token

### **Actual Result:**
- Form allows submission without token
- API call is made with `resetToken: null` or `resetToken: undefined`
- Backend returns error: "Reset token and new password are required"
- Error message appears but user experience is confusing
- User doesn't understand why they need to go back to forgot password

### **Screenshots/Evidence:**
- [Screenshot showing form submitted without token]
- [Network tab showing API request with null token]
- [Backend response showing validation error]

### **Additional Notes:**
- Frontend should validate token existence before API call
- Page load should check for token and redirect if missing
- Better user guidance needed for password reset flow

---

## BUG #10: Dashboard Page Shows User Data Even After Token is Removed from localStorage

### **Title:**
Dashboard displays cached user information after logout or token removal, until page refresh

### **Priority:** 🟡 Medium  
### **Severity:** Minor

### **Component:** Frontend - Dashboard

### **Steps to Reproduce:**
1. Log in successfully to the application
2. Navigate to `/dashboard` page
3. User data is displayed correctly
4. Open browser DevTools → Application tab → Local Storage
5. Manually delete the 'token' key from localStorage
6. OR click logout button (if implemented)
7. Observe the dashboard page without refreshing

### **Expected Result:**
- Dashboard should immediately detect token removal
- User data should be cleared from display
- Page should redirect to `/login` automatically
- Protected content should not be visible

### **Actual Result:**
- Dashboard continues to display user information
- User data from localStorage is still visible
- No automatic redirect occurs
- User can still see protected content
- Only after manual page refresh does the authentication check trigger
- Logout doesn't clear all user state immediately

### **Screenshots/Evidence:**
- [Screenshot showing user data still visible after token removal]
- [localStorage showing token removed but user data remains]
- Console may show 401 on next API call, but UI doesn't update immediately

### **Additional Notes:**
- Need to implement real-time token validation
- Logout should clear all auth-related localStorage items
- Protected routes should check token on component mount, not just on initial load
- Consider using React context or state management for auth state

---

## 📊 Bug Summary Statistics

| Priority | Count | Severity Distribution |
|----------|-------|----------------------|
| 🔴 High  | 4     | Critical: 1, Major: 3 |
| 🟡 Medium| 5     | Minor: 5 |
| 🟢 Low   | 1     | Trivial: 1 |
| **Total**| **10** | |

### Areas Affected:
- **Frontend Authentication**: 6 bugs
- **Backend Authentication**: 2 bugs
- **Email Service**: 1 bug
- **Database**: 1 bug
- **UI/UX**: 4 bugs
- **Error Handling**: 5 bugs

---

## 🎯 Recommended Fix Priority

1. **Immediate (Sprint 1):**
   - Bug #3: JWT Token Expiration Check (Security)
   - Bug #5: Database Error Handling (User Experience)
   - Bug #8: Email Service Error Propagation (User Experience)

2. **Short Term (Sprint 2):**
   - Bug #1: Password Validation Mismatch
   - Bug #9: Reset Token Validation
   - Bug #6: Loading Spinner on Network Failure

3. **Medium Term (Sprint 3):**
   - Bug #2: Email Format Validation
   - Bug #4: OTP Page Redirect Logic
   - Bug #10: Dashboard Token Validation

4. **Low Priority (Backlog):**
   - Bug #7: Success Message Display Duration

---

## 📝 JIRA Submission Notes

### For JIRA Field Mapping:

**Issue Type:** Bug  
**Project:** StarMaker  
**Components:** Frontend, Backend, Authentication  
**Labels:** authentication, validation, error-handling, security, ui-ux  
**Epic Link:** Authentication System  
**Sprint:** [Assign to appropriate sprint based on priority]

### Additional JIRA Fields:

**Acceptance Criteria:**
- [Define what needs to be fixed]
- [Define test cases for verification]
- [Define expected behavior after fix]

**Attachments:**
- Screenshots
- Video recordings
- Console logs
- Network request/response logs
- Backend logs

**Related Issues:**
- Link to related bugs or stories

**Fix Version:**
- Assign target release version

---

**Report Generated:** 2024-12-XX  
**QA Engineer:** [Your Name]  
**Reviewed By:** [QA Lead]
