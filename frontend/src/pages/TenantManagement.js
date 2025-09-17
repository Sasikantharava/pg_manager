import React from 'react';
import { Link } from 'react-router-dom';
import './TenantManagement.css';

const TenantManagement = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Tenant Management</h1>
          <p className="subtitle">Easily manage tenant information, check-ins, check-outs, and maintain complete tenant records with our intuitive interface.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://hotelweb.io/blog/wp-content/uploads/2023/05/Property-Management-System.png" alt="Tenant Management" />
        </div>
        
        <div className="feature-description">
          <h2>Streamline Your Tenant Management Process</h2>
          <p>Our tenant management system provides you with all the tools you need to efficiently manage your paying guest accommodations. From tenant onboarding to check-out, we've got you covered.</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="highlight-content">
                <h3>Easy Onboarding</h3>
                <p>Quickly add new tenants with our simple registration process. Collect all necessary information, documents, and payments in one go.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <div className="highlight-content">
                <h3>Digital Agreements</h3>
                <p>Create, sign, and store rental agreements digitally. No more paperwork hassles or lost documents.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-history"></i>
              </div>
              <div className="highlight-content">
                <h3>Complete History</h3>
                <p>Access complete tenant history including payments, complaints, requests, and interactions at any time.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-door-open"></i>
              </div>
              <div className="highlight-content">
                <h3>Seamless Check-outs</h3>
                <p>Process check-outs efficiently with automated calculations for security deposits, pending payments, and refunds.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Reduce administrative workload by up to 70%</li>
              <li>Minimize errors in tenant records and documentation</li>
              <li>Improve tenant satisfaction with faster response times</li>
              <li>Stay compliant with local regulations and requirements</li>
              <li>Access tenant information anytime, anywhere</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready to Transform Your Tenant Management?</h2>
            <p>Join thousands of PG owners who have streamlined their operations with our platform.</p>
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

export default TenantManagement;