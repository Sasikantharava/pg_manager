import React from 'react';
import { Link } from 'react-router-dom';
import './RoomManagement.css';

const RoomManagement = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Room Management</h1>
          <p className="subtitle">Track room availability, occupancy, amenities, and pricing with our comprehensive room management system.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Room Management" />
        </div>
        
        <div className="feature-description">
          <h2>Optimize Your Room Utilization</h2>
          <p>Our room management system helps you maximize occupancy and revenue by providing complete visibility and control over your property's rooms.</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-th-large"></i>
              </div>
              <div className="highlight-content">
                <h3>Visual Room Layout</h3>
                <p>View all your rooms in an intuitive visual layout. See occupancy status, amenities, and pricing at a glance.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="highlight-content">
                <h3>Availability Tracking</h3>
                <p>Track room availability in real-time. Set up alerts for when rooms become available or need maintenance.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <div className="highlight-content">
                <h3>Amenity Management</h3>
                <p>Manage room amenities like AC, furniture, appliances, and more. Track maintenance schedules and costs.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-tags"></i>
              </div>
              <div className="highlight-content">
                <h3>Dynamic Pricing</h3>
                <p>Set different prices for rooms based on size, amenities, location, and season. Implement discounts and offers easily.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Increase occupancy rates by up to 25%</li>
              <li>Reduce time spent on room management by 60%</li>
              <li>Optimize pricing strategies for maximum revenue</li>
              <li>Improve maintenance scheduling and reduce costs</li>
              <li>Enhance tenant experience with better room allocation</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready to Optimize Your Room Management?</h2>
            <p>Start managing your rooms more efficiently and increase your revenue today.</p>
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

export default RoomManagement;