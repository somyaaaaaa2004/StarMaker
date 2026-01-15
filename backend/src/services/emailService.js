// Email service for sending OTP emails using Gmail SMTP
import nodemailer from 'nodemailer';

// Note: dotenv should already be loaded by server.js before this module is imported
// If dotenv.config() hasn't been called yet, we'll load it here as a fallback
if (!process.env.EMAIL_USER && !process.env.DB_HOST) {
  // Only load dotenv here if it hasn't been loaded (no other env vars present)
  import('dotenv').then((dotenv) => {
    dotenv.default.config();
  });
}

// Create email transporter
let transporter = null;

/**
 * Initialize email transporter with Gmail SMTP
 */
function initTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailFrom = process.env.EMAIL_FROM || emailUser;

  // Check if email credentials are configured
  if (!emailUser || !emailPass) {
    console.error('❌ Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env file');
    console.error('   Current working directory:', process.cwd());
    console.error('   EMAIL_USER exists:', !!emailUser);
    console.error('   EMAIL_PASS exists:', !!emailPass);
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass, // Gmail App Password
      },
    });

    console.log('✅ Email transporter configured successfully');
    console.log('   Using email:', emailUser);
    return transporter;
  } catch (error) {
    console.error('❌ Error creating email transporter:', error.message);
    return null;
  }
}

// Initialize transporter when module loads (if env vars are available)
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  initTransporter();
}

/**
 * Send OTP email to user
 * @param {string} email - Recipient email address
 * @param {string} otp - OTP code to send
 * @returns {Promise<Object>} Email send result
 */
export async function sendOTPEmail(email, otp) {
  try {
    // Initialize transporter if not already done
    if (!transporter) {
      transporter = initTransporter();
    }

    // Check if transporter is available
    if (!transporter) {
      throw new Error('Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env file');
    }

    const emailUser = process.env.EMAIL_USER;
    const emailFrom = process.env.EMAIL_FROM || emailUser;

    // Email content
    const mailOptions = {
      from: `"Star Maker Coaching Institute" <${emailFrom}>`,
      to: email,
      subject: 'Password Reset OTP - Star Maker Coaching Institute',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #667eea; text-align: center; margin-bottom: 20px;">🌟 Star Maker Coaching Institute</h1>
            <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Password Reset OTP</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Hello! You have requested to reset your password. Please use the following OTP code:
            </p>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h1 style="margin: 0; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              This OTP will expire in 5 minutes. If you didn't request this, please ignore this email.
            </p>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
              © 2024 Star Maker Coaching Institute. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
        Star Maker Coaching Institute - Password Reset OTP
        
        Your OTP code is: ${otp}
        
        This OTP will expire in 5 minutes.
        If you didn't request this, please ignore this email.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully to:', email);
    console.log('📧 Message ID:', info.messageId);
    
    return { 
      success: true, 
      messageId: info.messageId 
    };
  } catch (error) {
    console.error('❌ Error sending OTP email (full details):');
    console.error('   Error message:', error.message);
    console.error('   Error code:', error.code);
    console.error('   Error response:', error.response);
    console.error('   Stack trace:', error.stack);
    console.error('   Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw error;
  }
}
