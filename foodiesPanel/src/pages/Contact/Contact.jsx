import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-page-title">Get in Touch</h1>
          <p className="contact-page-subtitle">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="contact-section">
        <div className="container">
          <div className="row g-4">
            {/* Contact Info Cards */}
            <div className="col-lg-4">
              <div className="contact-info-wrapper">
                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <h3 className="info-title">Email Us</h3>
                  <p className="info-text">support@foodhub.com</p>
                  <p className="info-text">info@foodhub.com</p>
                </div>

                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <h3 className="info-title">Call Us</h3>
                  <p className="info-text">+91 1234567890</p>
                  <p className="info-text">Mon-Fri 9am-6pm</p>
                </div>

                <div className="contact-info-card">
                  <div className="info-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <h3 className="info-title">Visit Us</h3>
                  <p className="info-text">123 Food Street</p>
                  <p className="info-text">Mumbai, India 400001</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8">
              <div className="contact-form-card">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-input"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-input"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-input"
                          placeholder="john.doe@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Your Message</label>
                        <textarea
                          name="message"
                          className="form-textarea"
                          rows="6"
                          placeholder="Tell us what you're thinking about..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn-submit-contact">
                        <i className="bi bi-send"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;