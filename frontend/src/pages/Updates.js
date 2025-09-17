import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Updates.css';

const updatesData = [
  {
    id: 1,
    title: "New Dashboard Analytics",
    date: "October 15, 2023",
    category: "Feature",
    description: "We've enhanced our dashboard with new analytics widgets and improved data visualization. Track occupancy rates, revenue trends, and tenant satisfaction with our new interactive charts.",
    image: "https://elements-resized.envatousercontent.com/elements-cover-images/e8f5e7bb-f596-422d-9212-919e8649b456?w=433&cf_fit=scale-down&q=85&format=auto&s=df94a9e32666e08c497a348959f38134ff3e014c1abdfb52d5bfff37d40786d8",
    fullContent: `
      <h2>Revolutionary Dashboard Analytics</h2>
      <p>We're excited to announce our most significant dashboard upgrade to date! This comprehensive enhancement transforms how you visualize and interact with your property data.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Interactive Charts:</strong> All charts now support zooming, filtering, and data point selection for deeper analysis.</li>
        <li><strong>Customizable Widgets:</strong> Drag, drop, and resize widgets to create your perfect dashboard layout.</li>
        <li><strong>Real-time Data:</strong> All metrics update in real-time without page refreshes.</li>
        <li><strong>Comparative Analysis:</strong> Compare time periods, properties, or units side-by-side.</li>
      </ul>
      
      <h3>Advanced Metrics:</h3>
      <p>Our new analytics include:</p>
      <ul>
        <li>Occupancy rate trends with seasonal forecasting</li>
        <li>Revenue per available unit (RevPU) calculations</li>
        <li>Tenant satisfaction scores correlated with retention rates</li>
        <li>Maintenance request resolution time analytics</li>
        <li>Utility consumption patterns and cost analysis</li>
      </ul>
      
      <h3>What Our Users Say:</h3>
      <blockquote>"The new dashboard has transformed how we make decisions. We can now spot trends weeks earlier than before!" - Sarah K., Property Manager</blockquote>
      
      <p>This upgrade is part of our commitment to providing data-driven insights that help you optimize your property management operations.</p>
    `
  },
  {
    id: 2,
    title: "Mobile App Launch",
    date: "September 28, 2023",
    category: "Product",
    description: "Our official mobile apps for iOS and Android are now available! Manage your PG on the go with full functionality including tenant management, payment tracking, and more.",
    image: "https://appinventiv.com/wp-content/uploads/2015/08/A-Guide-to-Successful-Mobile-App-Launch.png",
    fullContent: `
      <h2>Introducing Our Mobile Apps</h2>
      <p>We're thrilled to announce the launch of our official mobile applications for both iOS and Android platforms. Now you can manage your properties from anywhere, at any time.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Full Dashboard Access:</strong> View all your key metrics and charts on your mobile device.</li>
        <li><strong>Tenant Management:</strong> Add, edit, and communicate with tenants directly from the app.</li>
        <li><strong>Payment Processing:</strong> Send payment reminders and process payments on the go.</li>
        <li><strong>Maintenance Requests:</strong> Create, assign, and track maintenance requests from anywhere.</li>
        <li><strong>Document Access:</strong> View and share leases, agreements, and other important documents.</li>
      </ul>
      
      <h3>Download Now:</h3>
      <p>Available on the App Store and Google Play Store. Search for "PG Management Pro" to download.</p>
      
      <h3>What's Next:</h3>
      <p>We're already working on version 2.0 which will include offline mode, biometric login, and advanced reporting features.</p>
    `
  },
  {
    id: 3,
    title: "Payment Gateway Integration",
    date: "September 10, 2023",
    category: "Integration",
    description: "We've added support for multiple payment gateways including Razorpay, PayU, and Stripe. Offer your tenants more payment options and get paid faster.",
    image: "https://devathon.com/wp-content/uploads/2020/02/Top-10-Payment-Gateways-Devathon.png",
    fullContent: `
      <h2>Expanded Payment Gateway Options</h2>
      <p>We've significantly expanded our payment processing capabilities by integrating with multiple leading payment gateways. This update gives you and your tenants more flexibility and security in processing payments.</p>
      
      <h3>New Gateway Partners:</h3>
      <ul>
        <li><strong>Razorpay:</strong> India's leading payment solution with support for UPI, credit/debit cards, net banking, and wallets.</li>
        <li><strong>PayU:</strong> Global payment processor with advanced fraud detection and multi-currency support.</li>
        <li><strong>Stripe:</strong> Powerful payment processing with subscription management and advanced reporting.</li>
      </ul>
      
      <h3>Benefits for Property Managers:</h3>
      <ul>
        <li>Reduced payment processing fees through competitive rates</li>
        <li>Faster settlement times - get your money in 24-48 hours</li>
        <li>Automated reconciliation with your accounting system</li>
        <li>Advanced fraud detection and chargeback protection</li>
      </ul>
      
      <h3>Benefits for Tenants:</h3>
      <ul>
        <li>More payment options including UPI, wallets, and international cards</li>
        <li>One-click payments for recurring rent</li>
        <li>Payment reminders and auto-scheduling</li>
        <li>Instant payment confirmation and receipts</li>
      </ul>
      
      <h3>Setup Process:</h3>
      <p>Setting up these new gateways is simple. Go to Settings > Payment Gateways to configure your preferred options. Our support team is available 24/7 to assist with the setup process.</p>
    `
  },
  {
    id: 4,
    title: "Improved User Interface",
    date: "August 22, 2023",
    category: "Design",
    description: "Based on your feedback, we've redesigned our user interface for better usability and a more modern look. Enjoy a cleaner, more intuitive experience.",
    image: "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    fullContent: `
      <h2>A Fresh New Interface</h2>
      <p>After months of research and user testing, we're proud to unveil our completely redesigned user interface. This update focuses on improving usability, accessibility, and visual appeal.</p>
      
      <h3>Design Philosophy:</h3>
      <p>Our new interface is built on three core principles:</p>
      <ul>
        <li><strong>Clarity:</strong> Reduced clutter and improved information hierarchy</li>
        <li><strong>Efficiency:</strong> Fewer clicks to accomplish common tasks</li>
        <li><strong>Accessibility:</strong> Better contrast ratios and keyboard navigation</li>
      </ul>
      
      <h3>Key Improvements:</h3>
      <ul>
        <li><strong>Streamlined Navigation:</strong> Our new sidebar menu organizes features logically with collapsible sections</li>
        <li><strong>Enhanced Dashboard:</strong> More widgets with better data visualization and customization options</li>
        <li><strong>Unified Color Scheme:</strong> Consistent use of colors throughout the application for better visual flow</li>
        <li><strong>Improved Typography:</strong> Better readability with carefully chosen fonts and spacing</li>
        <li><strong>Responsive Design:</strong> Seamless experience across all device sizes</li>
      </ul>
      
      <h3>User Feedback Integration:</h3>
      <p>This redesign incorporates feedback from over 500 property managers and 1,000 tenants. The most requested improvements included:</p>
      <ul>
        <li>Faster access to tenant information (now just one click from the dashboard)</li>
        <li>Better mobile experience (completely redesigned mobile interface)</li>
        <li>More intuitive financial reporting (new visual reports with drill-down capabilities)</li>
      </ul>
      
      <h3>What's Next:</h3>
      <p>We're already working on UI enhancements for our reporting module and tenant portal based on the positive feedback from this update.</p>
    `
  },
  {
    id: 5,
    title: "Advanced Reporting System",
    date: "August 5, 2023",
    category: "Feature",
    description: "Our new reporting system provides deeper insights into your property performance with customizable reports and data export capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    fullContent: `
      <h2>Powerful New Reporting Capabilities</h2>
      <p>We've completely rebuilt our reporting system from the ground up to provide you with deeper insights and more flexibility in analyzing your property performance.</p>
      
      <h3>New Features:</h3>
      <ul>
        <li><strong>Custom Report Builder:</strong> Create personalized reports by selecting data fields, filters, and visualization types</li>
        <li><strong>Scheduled Reports:</strong> Set up automatic report generation and delivery via email</li>
        <li><strong>Advanced Filtering:</strong> Filter by date ranges, property types, tenant categories, and more</li>
        <li><strong>Data Export:</strong> Export reports in multiple formats (PDF, Excel, CSV) with customizable layouts</li>
        <li><strong>Comparative Analysis:</strong> Compare performance across different time periods or properties</li>
      </ul>
      
      <h3>Report Templates:</h3>
      <p>We've included over 20 pre-built report templates for common needs:</p>
      <ul>
        <li>Occupancy and vacancy analysis</li>
        <li>Revenue and expense reports</li>
        <li>Tenant retention metrics</li>
        <li>Maintenance cost analysis</li>
        <li>Lease expiration tracking</li>
        <li>Utility consumption reports</li>
      </ul>
      
      <h3>Data Visualization:</h3>
      <p>Our new visualization engine supports:</p>
      <ul>
        <li>Interactive charts and graphs</li>
        <li>Geographic mapping of properties</li>
        <li>Heat maps for identifying trends</li>
        <li>Pivot tables for multi-dimensional analysis</li>
      </ul>
      
      <h3>Integration Capabilities:</h3>
      <p>The reporting system integrates with:</p>
      <ul>
        <li>Accounting software (QuickBooks, Xero)</li>
        <li>Business intelligence tools (Tableau, Power BI)</li>
        <li>Spreadsheet applications (Excel, Google Sheets)</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "Enhanced Security Features",
    date: "July 18, 2023",
    category: "Security",
    description: "We've implemented advanced security measures including two-factor authentication, encrypted data storage, and improved access controls.",
    image: "https://www.consultcra.com/wp-content/uploads/2024/03/Cybersecurity-Posture.jpg",
    fullContent: `
      <h2>Enterprise-Grade Security</h2>
      <p>Protecting your data is our top priority. We've implemented comprehensive security enhancements to ensure your information remains safe and secure.</p>
      
      <h3>New Security Features:</h3>
      <ul>
        <li><strong>Two-Factor Authentication (2FA):</strong> Optional 2FA using authenticator apps or SMS codes</li>
        <li><strong>End-to-End Encryption:</strong> All data is encrypted both in transit and at rest</li>
        <li><strong>Advanced Access Controls:</strong> Granular permissions for different user roles</li>
        <li><strong>Audit Logging:</strong> Comprehensive tracking of all system activities</li>
        <li><strong>Single Sign-On (SSO):</strong> Integration with corporate identity providers</li>
      </ul>
      
      <h3>Compliance Certifications:</h3>
      <p>Our security measures comply with:</p>
      <ul>
        <li>GDPR (General Data Protection Regulation)</li>
        <li>CCPA (California Consumer Privacy Act)</li>
        <li>ISO 27001 (Information Security Management)</li>
        <li>SOC 2 Type II (Service Organization Control)</li>
      </ul>
      
      <h3>Security Best Practices:</h3>
      <p>We've implemented industry best practices including:</p>
      <ul>
        <li>Regular security audits and penetration testing</li>
        <li>Secure software development lifecycle</li>
        <li>Employee security training programs</li>
        <li>Incident response and disaster recovery plans</li>
      </ul>
      
      <h3>What This Means for You:</h3>
      <p>These enhancements ensure that your sensitive data remains protected while maintaining ease of use and system performance.</p>
    `
  }
];

const Updates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Subscription state
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState('');
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUpdates = updatesData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(updatesData.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Handle subscription form submission
  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setSubscriptionError('');
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would make an API call here
      console.log(`Subscribing email: ${email}`);
      
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };
  
  return (
    <div className="updates-page">
      <div className="updates-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Product Updates</h1>
          <p className="subtitle">Stay up to date with our latest features and improvements</p>
        </div>
      </div>
      
      <div className="updates-container container">
        <div className="updates-intro">
          <div className="intro-content">
            <h2>What's New at PG Management</h2>
            <p>We're constantly improving our platform based on your feedback. Check out our latest updates and see what's coming next.</p>
            
            {/* Subscription form with functionality */}
            <div className="subscribe-section">
              <h3>Subscribe to Updates</h3>
              <p className="subscribe-description">Get the latest product news and features delivered directly to your inbox.</p>
              
              {isSubscribed ? (
                <div className="subscribe-success">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h4>Successfully Subscribed!</h4>
                  <p>Thank you for subscribing. You'll receive our updates at your email address.</p>
                </div>
              ) : (
                <form className="subscribe-form" onSubmit={handleSubscribe}>
                  <div className="form-group">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={subscriptionError ? 'error' : ''}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> Subscribing...
                        </>
                      ) : 'Subscribe'}
                    </button>
                  </div>
                  {subscriptionError && (
                    <div className="error-message">{subscriptionError}</div>
                  )}
                  <p className="privacy-note">
                    <i className="fas fa-lock"></i> We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Updates" />
          </div>
        </div>
        
        <div className="updates-list">
          {currentUpdates.map(update => (
            <div className="update-card" key={update.id}>
              <div className="update-image">
                <img src={update.image} alt={update.title} />
              </div>
              <div className="update-content">
                <div className="update-meta">
                  <span className={`update-category ${update.category.toLowerCase()}`}>{update.category}</span>
                  <span className="update-date">{update.date}</span>
                </div>
                <h3>{update.title}</h3>
                <p>{update.description}</p>
                <Link to={`/updates/${update.id}`} className="read-more">Read More</Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="updates-pagination">
          <button 
            className="pagination-btn prev" 
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <i className="fas fa-arrow-left"></i> Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn next" 
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateDetail = () => {
  const { id } = useParams();
  const update = updatesData.find(u => u.id === parseInt(id));
  
  if (!update) {
    return (
      <div className="update-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Update Not Found</h2>
            <p>The update you're looking for doesn't exist or has been removed.</p>
            <Link to="/updates" className="btn btn-primary">Back to Updates</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="update-detail-page">
      <div className="container">
        <div className="update-detail-header">
          <Link to="/updates" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Updates
          </Link>
          <div className="update-meta">
            <span className="update-category">{update.category}</span>
            <span className="update-date">{update.date}</span>
          </div>
        </div>
        
        <div className="update-detail-content">
          <div className="update-detail-image">
            <img src={update.image} alt={update.title} />
          </div>
          
          <div className="update-detail-body">
            <h1>{update.title}</h1>
            <div 
              className="update-full-content"
              dangerouslySetInnerHTML={{ __html: update.fullContent }}
            />
          </div>
        </div>
        
        <div className="related-updates">
          <h2>Related Updates</h2>
          <div className="related-updates-grid">
            {updatesData
              .filter(u => u.id !== update.id)
              .slice(0, 3)
              .map(relatedUpdate => (
                <div className="related-update-card" key={relatedUpdate.id}>
                  <div className="related-update-image">
                    <img src={relatedUpdate.image} alt={relatedUpdate.title} />
                  </div>
                  <div className="related-update-content">
                    <span className="update-category">{relatedUpdate.category}</span>
                    <h3>{relatedUpdate.title}</h3>
                    <Link to={`/updates/${relatedUpdate.id}`} className="read-more">Read More</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdateDetail };
export default Updates;