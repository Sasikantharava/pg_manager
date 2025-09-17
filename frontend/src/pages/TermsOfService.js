import React from 'react';
import { Link } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-page">
      <div className="terms-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Terms of Service</h1>
          <p className="subtitle">Last updated: October 1, 2025</p>
        </div>
      </div>
      
      <div className="terms-container container">
        <div className="terms-content">
          <div className="terms-intro">
            <h2>Terms of Service for PG Management</h2>
            <p>Welcome to PG Management! These Terms of Service ("Terms") govern your use of our platform, website, and services (collectively, the "Service"). By using our Service, you agree to be bound by these Terms.</p>
            <p>Please read these Terms carefully before using our Service. If you do not agree to these Terms, you may not use the Service.</p>
          </div>
          
          <div className="terms-sections">
            <div className="terms-section">
              <h3>1. Acceptance of Terms</h3>
              <p>By creating an account and using our Service, you agree to comply with and be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you may not use our Service.</p>
            </div>
            
            <div className="terms-section">
              <h3>2. Description of Service</h3>
              <p>PG Management provides a software platform designed to help paying guest (PG) owners and managers manage their properties, tenants, payments, and other aspects of their business. Our Service includes features such as:</p>
              <ul>
                <li>Tenant management and tracking</li>
                <li>Room availability and occupancy management</li>
                <li>Payment processing and receipt generation</li>
                <li>Reporting and analytics</li>
                <li>Mobile applications for on-the-go management</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h3>3. User Accounts</h3>
              <p>To use certain features of our Service, you must create an account. When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h3>4. Subscription and Payment</h3>
              <p>Our Service is offered on a subscription basis with different pricing plans. By subscribing to our Service, you agree to pay the subscription fees as specified on our website.</p>
              <p>Payments are processed automatically according to the billing cycle you select. You are responsible for providing accurate payment information and authorizing us to charge your payment method for the subscription fees.</p>
              <p>We reserve the right to change our pricing at any time, but we will provide you with advance notice of any price changes.</p>
            </div>
            
            <div className="terms-section">
              <h3>5. User Responsibilities</h3>
              <p>As a user of our Service, you agree to:</p>
              <ul>
                <li>Use the Service only for lawful purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use the Service to infringe on the rights of others</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use the Service to transmit malware or other harmful code</li>
                <li>Not interfere with or disrupt the Service or servers</li>
              </ul>
            </div>
            
            <div className="terms-section">
              <h3>6. Data and Content</h3>
              <p>You retain ownership of all data and content you upload or input into our Service. By using our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such data for the purpose of providing and improving our Service.</p>
              <p>You are responsible for ensuring that you have the necessary rights to upload and use any content you submit to our Service.</p>
            </div>
            
            <div className="terms-section">
              <h3>7. Intellectual Property</h3>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of PG Management and its licensors. Our Service is protected by copyright, trademark, and other laws of India and foreign countries.</p>
              <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service without our prior written consent.</p>
            </div>
            
            <div className="terms-section">
              <h3>8. Termination</h3>
              <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p>Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service or contact us at support@pgmanagement.com.</p>
            </div>
            
            <div className="terms-section">
              <h3>9. Disclaimer</h3>
              <p>THE SERVICE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. PG MANAGEMENT DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
              <p>WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICE'S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SERVICE.</p>
            </div>
            
            <div className="terms-section">
              <h3>10. Limitation of Liability</h3>
              <p>IN NO EVENT SHALL PG MANAGEMENT, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.</p>
            </div>
            
            <div className="terms-section">
              <h3>11. Governing Law</h3>
              <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
            </div>
            
            <div className="terms-section">
              <h3>12. Changes to Terms</h3>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Service.</p>
            </div>
            
            <div className="terms-section">
              <h3>13. Contact Us</h3>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> legal@pgmanagement.com</p>
                <p><strong>Address:</strong> PG Management Pvt. Ltd., 123 Tech Park, Bangalore, Karnataka 560001, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;