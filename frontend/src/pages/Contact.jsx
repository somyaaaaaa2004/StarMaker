import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon. ✨',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const contactInfo = [
    { icon: '📍', label: 'Address', value: '123 Education Street, Learning City, 12345' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: '✉️', label: 'Email', value: 'info@starmaker.edu' },
    { icon: '🕒', label: 'Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM' },
  ];

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>
            <span className="hero-icon">📞</span> Contact Us
          </h1>
          <p className="hero-subtitle">
            We'd love to hear from you! Get in touch with our team
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message 💬</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                {status.message && (
                  <div className={`status-message ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span>👤</span> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span>✉️</span> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      <span>📱</span> Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      <span>📋</span> Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <span>💭</span> Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending... ✨' : 'Send Message 🚀'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <h2>Get in Touch 🌟</h2>
              <p className="info-description">
                Whether you have questions, need information, or want to enroll,
                we're here to help!
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.label}</h3>
                      <p>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" aria-label="Facebook" className="social-link">
                    <span>📘</span> Facebook
                  </a>
                  <a href="#" aria-label="Twitter" className="social-link">
                    <span>🐦</span> Twitter
                  </a>
                  <a href="#" aria-label="Instagram" className="social-link">
                    <span>📷</span> Instagram
                  </a>
                  <a href="#" aria-label="YouTube" className="social-link">
                    <span>📺</span> YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
