import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sasi Kanth Arava",
      role: "CEO & Founder",
      bio: "Former PG owner with 5+ years of experience in property management.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-badge">
              <i className="fas fa-info-circle"></i>
              About Us
            </div>
            <h1 className="about-title">Our Mission to Simplify PG Management</h1>
            <p className="about-subtitle">
              We're dedicated to providing the most comprehensive and user-friendly PG management solution for property owners and managers.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="about-story">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title">Our Story</h2>
            <div className="story-grid">
              <div className="story-text">
                <p>
                  Founded in 2020, PG Management System was born out of a simple observation: managing paying guest accommodations was unnecessarily complicated. Our founders, experienced PG owners themselves, struggled with multiple disconnected systems for tenant management, rent collection, and maintenance tracking.
                </p>
                <p>
                  After years of frustration with existing solutions, they decided to build a platform that would address all these challenges in one integrated system. Today, we serve thousands of PG owners across the country, helping them save time, reduce errors, and improve their bottom line.
                </p>
              </div>
              <div className="story-image">
                <img 
                  src="https://thumbs.dreamstime.com/b/team-teamwork-goals-strategy-vision-business-support-concept-50274164.jpg" 
                  alt="Our Team" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-mission">
        <div className="container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission & Vision</h2>
            <div className="mission-cards">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 className="mission-title">Mission</h3>
                <p className="mission-description">
                  To empower PG owners with intuitive, comprehensive, and affordable management tools that simplify operations and maximize profitability.
                </p>
              </div>
              
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3 className="mission-title">Vision</h3>
                <p className="mission-description">
                  To become the global leader in PG management solutions, setting the standard for innovation and customer satisfaction.
                </p>
              </div>
              
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h3 className="mission-title">Values</h3>
                <p className="mission-description">
                  Innovation, simplicity, customer focus, integrity, and continuous improvement guide everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team">
        <div className="container">
          <div className="team-content">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Meet the passionate individuals dedicated to revolutionizing PG management.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-avatar">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    <a href="https://www.linkedin.com/in/guest-ease-719508382/" aria-label="LinkedIn">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://x.com/EaseGuest" aria-label="Twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" aria-label="Email">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Growing Community</h2>
            <p className="cta-subtitle">
              Be part of thousands of PG owners who have transformed their business with our platform.
            </p>
            <Link to="/register" className="btn btn-primary">
              Get Started Today
              <i className="fas fa-rocket"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;