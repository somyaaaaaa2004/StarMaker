// Contact form controller
/**
 * Handle contact form submission
 * POST /api/contact
 */
export async function submitContact(req, res, next) {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validate input
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, subject, and message are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Log contact submission (in production, you might save to database or send email)
    console.log('📧 Contact form submission received:');
    console.log('   Name:', fullName);
    console.log('   Email:', email);
    console.log('   Phone:', phone || 'Not provided');
    console.log('   Subject:', subject);
    console.log('   Message:', message);

    // Return success response
    res.json({
      success: true,
      message: 'Message received ✅',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    next(error);
  }
}
