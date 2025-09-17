import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const Features = () => {
  return (
    <div className="features-page">
      {/* Hero Section */}
      <div className="features-hero">
        <div className="container">
          <div className="features-hero-content">
            <div className="features-badge">
              <i className="fas fa-star"></i>
              Powerful Features
            </div>
            <h1 className="features-title">Everything You Need to Manage Your PG</h1>
            <p className="features-subtitle">
              Our comprehensive platform provides all the tools you need to efficiently manage your paying guest accommodation.
            </p>
            <div className="features-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Free
                <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/pricing" className="btn btn-outline">
                View Pricing
                <i className="fas fa-tag"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="features-main">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="feature-title">Tenant Management</h3>
              <p className="feature-description">
                Easily manage tenant information, check-ins, check-outs, and maintain complete tenant records with our intuitive interface.
              </p>
              <ul className="feature-list">
                <li>Complete tenant profiles with personal details</li>
                <li>Easy check-in and check-out process</li>
                <li>Document storage for ID proofs</li>
                <li>Tenant communication history</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bed"></i>
              </div>
              <h3 className="feature-title">Room Management</h3>
              <p className="feature-description">
                Track room availability, occupancy, amenities, and pricing with our comprehensive room management system.
              </p>
              <ul className="feature-list">
                <li>Real-time room availability status</li>
                <li>Detailed room information and amenities</li>
                <li>Dynamic pricing based on occupancy</li>
                <li>Room maintenance tracking</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3 className="feature-title">Payment Tracking</h3>
              <p className="feature-description">
                Monitor rent payments, generate receipts, and track payment history with automated reminders and reports.
              </p>
              <ul className="feature-list">
                <li>Automated rent reminders</li>
                <li>Online payment processing</li>
                <li>Digital receipt generation</li>
                <li>Payment history and reports</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3 className="feature-title">Analytics & Reports</h3>
              <p className="feature-description">
                Generate detailed reports on occupancy, revenue, and performance to make data-driven decisions.
              </p>
              <ul className="feature-list">
                <li>Occupancy rate analysis</li>
                <li>Revenue tracking and forecasting</li>
                <li>Customizable report generation</li>
                <li>Performance dashboards</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">
                Access your PG data from anywhere with our responsive design that works perfectly on all devices.
              </p>
              <ul className="feature-list">
                <li>Fully responsive web application</li>
                <li>Works on all smartphones and tablets</li>
                <li>Mobile-optimized interface</li>
                <li>Offline access to critical data</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-description">
                Your data is protected with enterprise-grade security and regular backups for complete peace of mind.
              </p>
              <ul className="feature-list">
                <li>Bank-level encryption</li>
                <li>Regular data backups</li>
                <li>Secure user authentication</li>
                <li>Compliance with data regulations</li>
              </ul>
              <Link to="/register" className="feature-link">
                Try it now <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="features-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your PG Management?</h2>
            <p className="cta-subtitle">
              Join thousands of PG owners who have streamlined their operations with our platform.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Today
                <i className="fas fa-rocket"></i>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Sales
                <i className="fas fa-phone"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;