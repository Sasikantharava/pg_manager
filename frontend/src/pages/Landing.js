import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-brand">
                        <i className="fas fa-building"></i>
                        Guest Ease
                    </Link>

                    <div className="navbar-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/features" className="nav-link">Features</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="navbar-cta">
                        <Link to="/login" className="btn btn-outline">Log In</Link>
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <i className="fas fa-star"></i>
                        #1 PG Management Solution
                    </div>

                    <h1 className="hero-title">
                        Simplify Your <span>PG Management</span> with Our All-in-One Platform
                    </h1>

                    <p className="hero-subtitle">
                        Streamline operations, manage tenants, track payments, and generate reports - all from one intuitive dashboard designed for modern PG accommodations.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">
                            Get Started Free
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                        <Link to="/features" className="btn btn-outline">
                            View Features
                            <i className="fas fa-eye"></i>
                        </Link>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="hero-image-wrapper">
                        <div className="hero-dots"></div>
                        <div className="hero-shape hero-shape-1"></div>
                        <div className="hero-shape hero-shape-2"></div>
                        <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="PG Management Dashboard"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <div className="section-badge">
                            <i className="fas fa-lightbulb"></i>
                            Powerful Features
                        </div>
                        <h2 className="section-title">Everything You Need to Manage Your PG</h2>
                        <p className="section-subtitle">
                            Our comprehensive platform provides all the tools you need to efficiently manage your paying guest accommodation.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3 className="feature-title">Tenant Management</h3>
                            <p className="feature-description">
                                Easily manage tenant information, check-ins, check-outs, and maintain complete tenant records with our intuitive interface.
                            </p>
                            <Link to="/tenant-management" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
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
                            <Link to="/room-management" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
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
                            <Link to="/payment-tracking" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
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
                            <Link to="/analytics-reports" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
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
                            <Link to="/mobile-friendly" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
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
                            <Link to="/secure-reliable" className="feature-link">
                                Learn more <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stats-shape stats-shape-1"></div>
                    <div className="stats-shape stats-shape-2"></div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">5000+</div>
                            <div className="stat-label">Active Users</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-value">10,000+</div>
                            <div className="stat-label">Properties Managed</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-value">50,000+</div>
                            <div className="stat-label">Tenants Managed</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-value">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <div className="section-header">
                        <div className="section-badge">
                            <i className="fas fa-quote-left"></i>
                            Testimonials
                        </div>
                        <h2 className="section-title">What Our Users Say</h2>
                        <p className="section-subtitle">
                            Hear from PG owners and managers who have transformed their operations with our platform.
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                This platform has completely transformed how I manage my PG. The tenant management and payment tracking features save me hours every week!
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">RK</div>
                                <div className="testimonial-info">
                                    <h4>Rahul Kumar</h4>
                                    <p>PG Owner, Bangalore</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                The analytics and reporting features helped me identify areas for improvement. My occupancy rate increased by 30% in just 3 months!
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">AS</div>
                                <div className="testimonial-info">
                                    <h4>Anita Sharma</h4>
                                    <p>PG Manager, Delhi</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                Simple, intuitive, and powerful. The mobile app lets me manage everything on the go. Highly recommended for any PG owner!
                            </p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">MP</div>
                                <div className="testimonial-info">
                                    <h4>Mohan Patel</h4>
                                    <p>PG Owner, Mumbai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <div className="cta-shape cta-shape-1"></div>
                    <div className="cta-shape cta-shape-2"></div>

                    <h2 className="cta-title">Ready to Transform Your PG Management?</h2>
                    <p className="cta-subtitle">
                        Join thousands of PG owners who have streamlined their operations with our platform.
                    </p>

                    <Link to="/register" className="cta-button">
                        Get Started Today
                        <i className="fas fa-rocket"></i>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <div className="footer-logo">
                                <i className="fas fa-building"></i>
                                PG Management
                            </div>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                                The all-in-one solution for managing your paying guest accommodation efficiently and effectively.
                            </p>
                            <div className="social-links">
                                <a href="https://www.facebook.com/profile.php?id=61580062179272" className="social-link" target='_blank'>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="https://x.com/EaseGuest" className="social-link" target='_blank'>
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/guest-ease-719508382/" className="social-link" target='_blank'>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="https://www.instagram.com/guest_ease2025/" className="social-link" target='_blank'>
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        <div className="footer-column">
                            <h3>Product</h3>
                            <ul>
                                <li><a href="/features">Features</a></li>
                                <li><a href="/pricing">Pricing</a></li>
                                <li><a href="/integrations">Integrations</a></li>
                                <li><a href="/updates">Updates</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Company</h3>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/careers">Careers</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/press">Press</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="/help-center">Help Center</a></li>
                                <li><a href="/contact">Contact Us</a></li>
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/terms-of-service">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2025 PG Management System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;