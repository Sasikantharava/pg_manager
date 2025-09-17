import React from 'react';
import { Link } from 'react-router-dom';
import './AnalyticsReports.css';

const AnalyticsReports = () => {
  return (
    <div className="feature-detail-container">
      <div className="feature-header">
        <div className="container">
          <Link to="/features" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Features
          </Link>
          <h1>Analytics & Reports</h1>
          <p className="subtitle">Generate detailed reports on occupancy, revenue, and performance to make data-driven decisions.</p>
        </div>
      </div>
      
      <div className="feature-content container">
        <div className="feature-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Analytics & Reports" />
        </div>
        
        <div className="feature-description">
          <h2>Make Data-Driven Decisions</h2>
          <p>Our analytics and reporting tools provide you with valuable insights into your PG's performance, helping you identify opportunities and optimize operations.</p>
          
          <div className="feature-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="highlight-content">
                <h3>Occupancy Analytics</h3>
                <p>Track occupancy rates by room, floor, or building. Identify trends and seasonal patterns to optimize pricing and marketing.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-money-bill-trend-up"></i>
              </div>
              <div className="highlight-content">
                <h3>Revenue Reports</h3>
                <p>Analyze revenue streams, identify growth opportunities, and track financial performance with detailed reports.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-users-cog"></i>
              </div>
              <div className="highlight-content">
                <h3>Tenant Analytics</h3>
                <p>Understand tenant demographics, stay durations, and satisfaction levels to improve retention and acquisition.</p>
              </div>
            </div>
            
            <div className="highlight-item">
              <div className="highlight-icon">
                <i className="fas fa-file-export"></i>
              </div>
              <div className="highlight-content">
                <h3>Custom Reports</h3>
                <p>Create custom reports tailored to your specific needs. Export data in multiple formats for further analysis.</p>
              </div>
            </div>
          </div>
          
          <div className="feature-benefits">
            <h2>Key Benefits</h2>
            <ul>
              <li>Increase revenue by up to 20% with data-driven pricing strategies</li>
              <li>Improve occupancy rates with targeted marketing campaigns</li>
              <li>Reduce operational costs by identifying inefficiencies</li>
              <li>Make informed decisions with real-time data</li>
              <li>Stay ahead of market trends with predictive analytics</li>
            </ul>
          </div>
          
          <div className="feature-cta">
            <h2>Ready to Unlock Your PG's Potential?</h2>
            <p>Start making smarter decisions with our powerful analytics and reporting tools.</p>
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

export default AnalyticsReports;