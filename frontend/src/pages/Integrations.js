import React from 'react';
import { Link } from 'react-router-dom';
import './Integrations.css';

const Integrations = () => {
  const integrationCategories = [
    {
      name: "Payment Gateways",
      description: "Seamlessly integrate with popular payment solutions",
      integrations: [
        { name: "Razorpay", icon: "fas fa-credit-card", description: "Accept payments online with India's leading payment gateway" },
        { name: "PayU", icon: "fas fa-money-check-alt", description: "Secure payment processing with multiple payment options" },
        { name: "Stripe", icon: "fas fa-credit-card", description: "Global payment processing for international tenants" },
        { name: "PayPal", icon: "fab fa-paypal", description: "Accept payments from tenants worldwide" }
      ]
    },
    {
      name: "Communication Tools",
      description: "Stay connected with your tenants",
      integrations: [
        { name: "WhatsApp", icon: "fab fa-whatsapp", description: "Send notifications and updates via WhatsApp" },
        { name: "Twilio", icon: "fas fa-sms", description: "Send SMS notifications and reminders" },
        { name: "Email", icon: "fas fa-envelope", description: "Send professional emails with customizable templates" },
        { name: "Slack", icon: "fab fa-slack", description: "Team collaboration and internal communication" }
      ]
    },
    {
      name: "Accounting Software",
      description: "Sync your financial data with accounting tools",
      integrations: [
        { name: "QuickBooks", icon: "fas fa-file-invoice-dollar", description: "Automate your bookkeeping and financial reporting" },
        { name: "Zoho Books", icon: "fas fa-receipt", description: "Manage invoices, expenses, and accounting" },
        { name: "Tally", icon: "fas fa-calculator", description: "Popular accounting software for Indian businesses" },
        { name: "Xero", icon: "fas fa-chart-line", description: "Cloud-based accounting for small businesses" }
      ]
    },
    {
      name: "Marketing Tools",
      description: "Promote your PG and attract new tenants",
      integrations: [
        { name: "Google Ads", icon: "fab fa-google", description: "Create and manage advertising campaigns" },
        { name: "Facebook", icon: "fab fa-facebook", description: "Social media marketing and tenant acquisition" },
        { name: "Mailchimp", icon: "fas fa-mail-bulk", description: "Email marketing campaigns and newsletters" },
        { name: "Google Analytics", icon: "fab fa-google", description: "Track website traffic and user behavior" }
      ]
    }
  ];

  return (
    <div className="integrations-page">
      <div className="integrations-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Powerful Integrations</h1>
          <p className="subtitle">Connect PG Management with your favorite tools and services</p>
        </div>
      </div>
      
      <div className="integrations-container container">
        <div className="integrations-intro">
          <div className="intro-content">
            <h2>Seamless Connections</h2>
            <p>Our platform integrates with the tools you already use, creating a unified ecosystem for your PG management. Save time, reduce errors, and improve efficiency with our powerful integrations.</p>
            <Link to="/register" className="btn btn-primary">
              Get Started with Integrations
            </Link>
          </div>
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Integrations" />
          </div>
        </div>
        
        <div className="integration-categories">
          {integrationCategories.map((category, index) => (
            <div className="category-section" key={index}>
              <div className="category-header">
                <h2>{category.name}</h2>
                <p>{category.description}</p>
              </div>
              
              <div className="integration-grid">
                {category.integrations.map((integration, idx) => (
                  <div className="integration-card" key={idx}>
                    <div className="integration-icon">
                      <i className={integration.icon}></i>
                    </div>
                    <h3>{integration.name}</h3>
                    <p>{integration.description}</p>
                    <button className="integration-btn">
                      <i className="fas fa-link"></i> Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="integrations-cta">
          <h2>Don't see your favorite tool?</h2>
          <p>We're constantly adding new integrations. Let us know what you'd like to see next!</p>
          <Link to="/contact" className="btn btn-outline">
            Suggest an Integration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Integrations;