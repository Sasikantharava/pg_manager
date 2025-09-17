import React from 'react';
import { Link } from 'react-router-dom';
import './MobileFriendly.css';

const MobileFriendly = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Mobile Friendly</h1>
          <p className="subtitle">Access your PG data from anywhere with our responsive design that works perfectly on all devices.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://www.dataplugs.com/wp-content/uploads/2019/09/mobile_blog.jpg" alt="Mobile Friendly" />
        </div>
        
        <div className="feature-description">
          <h2>Manage Your PG On The Go</h2>
          <p>Our mobile-friendly platform ensures you can manage your PG from anywhere, at any time, using any device. No more being tied to your desk!</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <div className="highlight-content">
                <h3>Responsive Design</h3>
                <p>Our platform adapts perfectly to any screen size, from desktops to tablets to smartphones. Enjoy a consistent experience across all devices.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-download"></i>
              </div>
              <div className="highlight-content">
                <h3>Mobile Apps</h3>
                <p>Download our dedicated mobile apps for iOS and Android. Get push notifications for important events and updates.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-wifi"></i>
              </div>
              <div className="highlight-content">
                <h3>Offline Access</h3>
                <p>Access critical information even when you're offline. Changes sync automatically when you reconnect to the internet.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-qrcode"></i>
              </div>
              <div className="highlight-content">
                <h3>QR Code Check-ins</h3>
                <p>Enable contactless check-ins with QR codes. Tenants can scan codes to access their rooms and common areas.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Save time by managing tasks on the go</li>
              <li>Respond to tenant requests faster</li>
              <li>Monitor your PG even when you're away</li>
              <li>Improve tenant satisfaction with mobile convenience</li>
              <li>Reduce paperwork with digital processes</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready to Manage Your PG From Anywhere?</h2>
            <p>Experience the freedom of mobile-friendly PG management today.</p>
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

export default MobileFriendly;