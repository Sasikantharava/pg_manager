import React from 'react';
import { Link } from 'react-router-dom';
import './SecureReliable.css';

const SecureReliable = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Secure & Reliable</h1>
          <p className="subtitle">Your data is protected with enterprise-grade security and regular backups for complete peace of mind.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Secure & Reliable" />
        </div>
        
        <div className="feature-description">
          <h2>Your Data Is Safe With Us</h2>
          <p>We take data security seriously. Our platform is built with enterprise-grade security measures to protect your sensitive information and ensure business continuity.</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="highlight-content">
                <h3>End-to-End Encryption</h3>
                <p>All data is encrypted in transit and at rest using industry-standard encryption protocols. Your information is always protected.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="highlight-content">
                <h3>Role-Based Access</h3>
                <p>Control who can access what information with our granular permission system. Ensure sensitive data is only visible to authorized personnel.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <div className="highlight-content">
                <h3>Regular Backups</h3>
                <p>Your data is backed up automatically every day to multiple secure locations. Never worry about losing your information.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="highlight-content">
                <h3>Compliance Certified</h3>
                <p>Our platform complies with industry standards and regulations including GDPR, CCPA, and more. Stay compliant effortlessly.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Protect sensitive tenant and financial information</li>
              <li>Prevent unauthorized access to your data</li>
              <li>Ensure business continuity with reliable backups</li>
              <li>Stay compliant with data protection regulations</li>
              <li>Build trust with tenants through data security</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready for Complete Peace of Mind?</h2>
            <p>Experience the security and reliability of enterprise-grade PG management.</p>
            <Link to="/register" className="btn btn-primary">
              Get Started Today
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureReliable;