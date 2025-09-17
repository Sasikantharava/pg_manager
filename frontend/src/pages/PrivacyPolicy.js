import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="policy-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Privacy Policy</h1>
          <p className="subtitle">Last updated: October 15, 2023</p>
        </div>
      </div>
      
      <div className="policy-container container">
        <div className="policy-content">
          <div className="policy-intro">
            <h2>Our Commitment to Privacy</h2>
            <p>At PG Management, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
            <p>Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.</p>
          </div>
          
          <div className="policy-sections">
            <div className="policy-section">
              <h3>1. Information We Collect</h3>
              <p>We collect several types of information from and about users of our platform, including:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information when you register or use our services.</li>
                <li><strong>Tenant Information:</strong> Details about tenants you manage through our platform, including their contact information and rental agreements.</li>
                <li><strong>Property Information:</strong> Details about the PG properties you manage, including room details, amenities, and pricing.</li>
                <li><strong>Usage Information:</strong> Information about how you use our platform, such as features accessed, time spent, and actions taken.</li>
                <li><strong>Device Information:</strong> Information about the device you use to access our platform, including IP address, browser type, and operating system.</li>
              </ul>
            </div>
            
            <div className="policy-section">
              <h3>2. How We Use Your Information</h3>
              <p>We use the information we collect for various purposes, including:</p>
              <ul>
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and send related information</li>
                <li>To send technical notices and support messages</li>
                <li>To respond to your comments and questions</li>
                <li>To monitor and analyze trends and usage</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>
            
            <div className="policy-section">
              <h3>3. How We Share Your Information</h3>
              <p>We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:</p>
              <ul>
                <li><strong>With Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf.</li>
                <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your explicit consent.</li>
              </ul>
            </div>
            
            <div className="policy-section">
              <h3>4. Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Secure servers and databases</li>
                <li>Regular security assessments</li>
                <li>Employee training on data protection</li>
                <li>Restricted access to personal information</li>
              </ul>
            </div>
            
            <div className="policy-section">
              <h3>5. Your Rights</h3>
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccuracies in your information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
              <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
            </div>
            
            <div className="policy-section">
              <h3>6. International Data Transfers</h3>
              <p>Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
              <p>If you are located outside India and choose to provide information to us, please note that we transfer the information, including personal information, to India and process it there.</p>
            </div>
            
            <div className="policy-section">
              <h3>7. Children's Privacy</h3>
              <p>Our platform is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.</p>
            </div>
            
            <div className="policy-section">
              <h3>8. Changes to This Privacy Policy</h3>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.</p>
              <p>You are advised to review this Privacy Policy periodically for any changes.</p>
            </div>
            
            <div className="policy-section">
              <h3>9. Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@pgmanagement.com</p>
                <p><strong>Address:</strong> PG Management Pvt. Ltd., 123 Tech Park, Bangalore, Karnataka 560001, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;