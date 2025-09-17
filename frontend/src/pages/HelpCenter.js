import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpCenter.css';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const helpCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: 'fas fa-rocket' },
    { id: 'account', name: 'Account Management', icon: 'fas fa-user-cog' },
    { id: 'tenants', name: 'Tenant Management', icon: 'fas fa-users' },
    { id: 'rooms', name: 'Room Management', icon: 'fas fa-home' },
    { id: 'payments', name: 'Payments & Billing', icon: 'fas fa-credit-card' },
    { id: 'reports', name: 'Reports & Analytics', icon: 'fas fa-chart-bar' },
    { id: 'integrations', name: 'Integrations', icon: 'fas fa-plug' },
    { id: 'mobile', name: 'Mobile App', icon: 'fas fa-mobile-alt' }
  ];
  
  const helpArticles = [
    {
      id: 1,
      title: "How to create your PG profile",
      category: "getting-started",
      excerpt: "Learn how to set up your PG profile and add your property details.",
      content: "Creating your PG profile is the first step to using our platform effectively...",
      views: 1245,
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Adding and managing tenants",
      category: "tenants",
      excerpt: "Step-by-step guide to adding new tenants and managing their information.",
      content: "Our tenant management system allows you to easily add, edit, and manage tenant information...",
      views: 987,
      date: "2023-10-10"
    },
    {
      id: 3,
      title: "Setting up payment methods",
      category: "payments",
      excerpt: "Configure payment gateways and set up automatic rent collection.",
      content: "Setting up payment methods is essential for smooth rent collection...",
      views: 876,
      date: "2023-10-05"
    },
    {
      id: 4,
      title: "Understanding your dashboard",
      category: "getting-started",
      excerpt: "A tour of your dashboard and how to use its features effectively.",
      content: "Your dashboard provides an overview of your PG's performance and key metrics...",
      views: 765,
      date: "2023-09-28"
    },
    {
      id: 5,
      title: "Managing room availability",
      category: "rooms",
      excerpt: "How to track room occupancy and manage availability.",
      content: "Room management is a core feature of our platform that helps you maximize occupancy...",
      views: 654,
      date: "2023-09-20"
    },
    {
      id: 6,
      title: "Generating financial reports",
      category: "reports",
      excerpt: "Learn how to generate and customize financial reports for your PG.",
      content: "Our reporting tools provide valuable insights into your PG's financial performance...",
      views: 543,
      date: "2023-09-15"
    },
    {
      id: 7,
      title: "Resetting your password",
      category: "account",
      excerpt: "Steps to reset your account password if you've forgotten it.",
      content: "If you've forgotten your password, you can easily reset it...",
      views: 432,
      date: "2023-09-10"
    },
    {
      id: 8,
      title: "Using the mobile app",
      category: "mobile",
      excerpt: "Getting started with our mobile app for on-the-go management.",
      content: "Our mobile app allows you to manage your PG from anywhere...",
      views: 321,
      date: "2023-09-05"
    }
  ];
  
  const popularArticles = [...helpArticles].sort((a, b) => b.views - a.views).slice(0, 4);
  
  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };
  
  return (
    <div className="help-center-page">
      <div className="help-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Help Center</h1>
          <p className="subtitle">Find answers to your questions and get support</p>
        </div>
      </div>
      
      <div className="help-container container">
        <div className="help-search">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search for help articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="help-content">
          <div className="help-sidebar">
            <div className="sidebar-section">
              <h3>Categories</h3>
              <ul className="category-list">
                <li>
                  <button 
                    className={activeCategory === 'all' ? 'active' : ''} 
                    onClick={() => setActiveCategory('all')}
                  >
                    <i className="fas fa-th-large"></i> All Articles
                  </button>
                </li>
                {helpCategories.map(category => (
                  <li key={category.id}>
                    <button 
                      className={activeCategory === category.id ? 'active' : ''} 
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <i className={category.icon}></i> {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sidebar-section">
              <h3>Popular Articles</h3>
              <ul className="popular-posts">
                {popularArticles.map(article => (
                  <li key={article.id}>
                    <Link to={`/help/article/${article.id}`}>
                      {article.title}
                      <span className="view-count">{article.views} views</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="sidebar-section newsletter">
              <h3>Newsletter</h3>
              <p>Subscribe to our newsletter for helpful tips and product updates.</p>
              {isSubscribed ? (
                <div className="subscribe-success">
                  <i className="fas fa-check-circle"></i>
                  <p>Successfully subscribed!</p>
                </div>
              ) : (
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="sidebar-section contact-support">
              <h3>Still Need Help?</h3>
              <p>Can't find what you're looking for? Our support team is here to help.</p>
              <Link to="/contact" className="btn btn-primary">
                Contact Support
              </Link>
            </div>
          </div>
          
          <div className="help-articles">
            <div className="section-header">
              <h2>Help Articles</h2>
              <div className="article-count">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'} Found
              </div>
            </div>
            
            {filteredArticles.length > 0 ? (
              <div className="articles-list">
                {filteredArticles.map(article => (
                  <div className="article-card" key={article.id}>
                    <div className="article-meta">
                      <span className="article-category">
                        {helpCategories.find(cat => cat.id === article.category)?.name}
                      </span>
                      <span className="article-date">{article.date}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className="article-footer">
                      <Link to={`/help/article/${article.id}`} className="read-more">
                        Read Article <i className="fas fa-arrow-right"></i>
                      </Link>
                      <span className="article-views">
                        <i className="fas fa-eye"></i> {article.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or browse a different category.</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="help-faq">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3>How do I add a new tenant?</h3>
              <p>To add a new tenant, go to the Tenants section in your dashboard and click on "Add New Tenant". Fill in the required information and save.</p>
            </div>
            <div className="faq-item">
              <h3>Can I customize the rent amount for different rooms?</h3>
              <p>Yes, you can set different rent amounts for each room based on size, amenities, and other factors in the Room Management section.</p>
            </div>
            <div className="faq-item">
              <h3>How do I generate a monthly report?</h3>
              <p>Navigate to the Reports section, select the type of report you want, choose the date range, and click "Generate Report".</p>
            </div>
            <div className="faq-item">
              <h3>Is my data secure?</h3>
              <p>Yes, we use enterprise-grade security measures to protect your data, including encryption and regular backups.</p>
            </div>
          </div>
          
          <div className="faq-cta">
            <p>Still have questions?</p>
            <Link to="/contact" className="btn btn-primary">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;