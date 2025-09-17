import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "5 Ways to Increase Your PG Occupancy Rate",
      excerpt: "Discover proven strategies to fill your rooms faster and keep them occupied year-round.",
      author: "Rahul Sharma",
      date: "October 10, 2023",
      category: "Management",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Digital Transformation in PG Management",
      excerpt: "How technology is revolutionizing the way PG owners manage their properties and interact with tenants.",
      author: "Priya Patel",
      date: "September 25, 2023",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Understanding PG Regulations in India",
      excerpt: "A comprehensive guide to the legal requirements and regulations for running a PG in different Indian cities.",
      author: "Amit Kumar",
      date: "September 12, 2023",
      category: "Legal",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Creating a Welcoming Environment for Tenants",
      excerpt: "Tips and ideas to make your PG feel like home for your tenants and improve retention rates.",
      author: "Sneha Reddy",
      date: "August 30, 2023",
      category: "Tenant Experience",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const categories = ["All", "Management", "Technology", "Legal", "Tenant Experience"];

  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>PG Management Blog</h1>
          <p className="subtitle">Insights, tips, and best practices for PG owners and managers</p>
        </div>
      </div>
      
      <div className="blog-container container">
        <div className="blog-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to="#" className={index === 0 ? 'active' : ''}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Popular Posts</h3>
            <ul className="popular-posts">
              <li>
                <Link to="#">How to Set the Right Rent for Your PG</Link>
              </li>
              <li>
                <Link to="#">Tenant Screening Best Practices</Link>
              </li>
              <li>
                <Link to="#">Reducing Vacancy Rates in Competitive Markets</Link>
              </li>
              <li>
                <Link to="#">Essential Amenities for Modern PGs</Link>
              </li>
            </ul>
          </div>
          
          <div className="sidebar-section newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get the latest insights and tips delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="blog-content">
          <div className="blog-posts">
            {blogPosts.map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-info">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-author">
                    <span>By {post.author}</span>
                    <Link to="#" className="read-more">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="blog-pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn next">
              Next <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;