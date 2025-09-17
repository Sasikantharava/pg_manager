import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I get started with PG Management System?",
      answer: "Getting started is easy! Simply sign up for an account, complete the onboarding process, and you can start managing your PG right away. We also offer a free trial period for new users."
    },
    {
      question: "What pricing plans do you offer?",
      answer: "We offer flexible pricing plans to suit different needs, from small PGs to large chains. Our plans start at just $9/month with a 30-day free trial. Check our pricing page for detailed information."
    },
    {
      question: "Is my data secure with PG Management System?",
      answer: "Absolutely! We use bank-level encryption to protect your data and perform regular backups. Our system is compliant with all major data protection regulations."
    },
    {
      question: "Can I access PG Management System on my mobile device?",
      answer: "Yes! Our platform is fully responsive and works on all devices. You can manage your PG from your smartphone, tablet, or computer anytime, anywhere."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <div className="contact-badge">
              <i className="fas fa-envelope"></i>
              Contact Us
            </div>
            <h1 className="contact-title">Get in Touch</h1>
            <p className="contact-subtitle">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <div className="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2 className="info-title">Contact Information</h2>
              <p className="info-subtitle">
                Reach out to us through any of these channels. We're here to help!
              </p>
              
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <h3 className="info-card-title">Our Location</h3>
                  <p className="info-card-text">
                    123 Business Avenue<br />
                    Suite 100, Tech City<br />
                    Bangalore, 560001
                  </p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <h3 className="info-card-title">Phone Number</h3>
                  <p className="info-card-text">
                    +91 6361429359<br />
                    Mon-Fri: 9am-6pm
                  </p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3 className="info-card-title">Email Address</h3>
                  <p className="info-card-text">
                    support@pgmanagement.com<br />
                    sales@pgmanagement.com
                  </p>
                </div>
                
                <div className="info-card">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3 className="info-card-title">Business Hours</h3>
                  <p className="info-card-text">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2 className="form-title">Send Us a Message</h2>
              
              {formSubmitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3 className="success-title">Thank You!</h3>
                  <p className="success-message">
                    Your message has been sent successfully. We'll get back to you soon.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Send Message
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="contact-faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
              >
                <h3 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <i className="fas fa-chevron-down"></i>
                </h3>
                <p className="faq-answer">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;