import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentTracking.css';

const PaymentTracking = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Payment Tracking</h1>
          <p className="subtitle">Monitor rent payments, generate receipts, and track payment history with automated reminders and reports.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://dokka.com/wp-content/uploads/2024/03/How-To-Keep-Track-Of-Invoices-And-Payments-1Asset-2@2x-1024x618.png" alt="Payment Tracking" />
        </div>
        
        <div className="feature-description">
          <h2>Simplify Your Payment Management</h2>
          <p>Our payment tracking system automates the entire payment process, from invoicing to receipt generation, saving you time and reducing errors.</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <div className="highlight-content">
                <h3>Automated Invoicing</h3>
                <p>Generate and send invoices automatically on the due date. Customize invoices with your branding and payment terms.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="highlight-content">
                <h3>Payment Reminders</h3>
                <p>Send automated reminders to tenants before and after the due date. Reduce late payments by up to 80%.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-receipt"></i>
              </div>
              <div className="highlight-content">
                <h3>Instant Receipts</h3>
                <p>Generate and send receipts automatically when payments are received. Keep digital records of all transactions.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="highlight-content">
                <h3>Payment Analytics</h3>
                <p>Track payment patterns, identify defaulters, and forecast cash flow with detailed reports and analytics.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Reduce late payments by up to 80%</li>
              <li>Save 10+ hours per month on payment administration</li>
              <li>Improve cash flow with predictable payment cycles</li>
              <li>Maintain complete financial records for tax purposes</li>
              <li>Identify and address payment issues proactively</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready to Streamline Your Payment Tracking?</h2>
            <p>Stop chasing payments and start focusing on growing your business.</p>
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

export default PaymentTracking;