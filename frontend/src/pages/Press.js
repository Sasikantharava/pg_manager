import React from 'react';
import { Link } from 'react-router-dom';
import './Press.css';

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "PG Management Raises $5M in Series A Funding",
      date: "October 5, 2023",
      excerpt: "Leading PG management platform secures funding to expand across India and enhance product offerings.",
      content: "PG Management, India's leading platform for managing paying guest accommodations, today announced it has raised $5 million in Series A funding led by Vertex Ventures with participation from existing investors. The funding will be used to expand the company's presence across India, enhance its product offerings, and grow its team."
    },
    {
      id: 2,
      title: "PG Management Launches Mobile App for iOS and Android",
      date: "September 28, 2023",
      excerpt: "New mobile app enables PG owners to manage their properties from anywhere, anytime.",
      content: "PG Management today launched its official mobile applications for iOS and Android devices. The new apps provide full functionality of the web platform, allowing PG owners and managers to handle tenant management, payment tracking, room allocation, and more while on the go."
    },
    {
      id: 3,
      title: "PG Management Reaches 10,000 Properties Milestone",
      date: "August 15, 2023",
      excerpt: "Platform continues rapid growth as more PG owners adopt digital management solutions.",
      content: "PG Management today announced that it has reached the milestone of 10,000 properties using its platform across India. This represents a 200% growth over the past year, highlighting the increasing adoption of digital solutions in the PG management sector."
    }
  ];

  const mediaCoverage = [
    {
      id: 1,
      publication: "TechCrunch",
      title: "How PG Management is Digitizing India's Paying Guest Sector",
      date: "September 20, 2023",
      excerpt: "An in-depth look at how the startup is transforming the fragmented PG market with technology.",
      link: "#"
    },
    {
      id: 2,
      publication: "Economic Times",
      title: "PG Management: The Startup Helping PG Owners Go Digital",
      date: "August 30, 2023",
      excerpt: "Feature on how the platform is solving real problems for PG owners across India.",
      link: "#"
    },
    {
      id: 3,
      publication: "YourStory",
      title: "From Idea to 10,000 Properties: The PG Management Journey",
      date: "August 18, 2023",
      excerpt: "Interview with the founders on their journey and vision for the future.",
      link: "#"
    }
  ];

  return (
    <div className="press-page">
      <div className="press-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Press & Media</h1>
          <p className="subtitle">Latest news and updates about PG Management</p>
        </div>
      </div>
      
      <div className="press-container container">
        <div className="press-intro">
          <div className="intro-content">
            <h2>Media Resources</h2>
            <p>Welcome to the PG Management press room. Here you'll find our latest press releases, media coverage, and resources for journalists and content creators.</p>
            <div className="media-kit">
              <h3>Media Kit</h3>
              <p>Download our media kit for logos, product screenshots, and company information.</p>
              <button className="btn btn-outline">
                <i className="fas fa-download"></i> Download Media Kit
              </button>
            </div>
          </div>
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Press" />
          </div>
        </div>
        
        <div className="press-sections">
          <div className="press-releases">
            <h2>Press Releases</h2>
            <div className="releases-list">
              {pressReleases.map(release => (
                <div className="release-card" key={release.id}>
                  <div className="release-date">{release.date}</div>
                  <h3>{release.title}</h3>
                  <p className="release-excerpt">{release.excerpt}</p>
                  <Link to="#" className="read-more">Read Full Release</Link>
                </div>
              ))}
            </div>
          </div>
          
          <div className="media-coverage">
            <h2>Media Coverage</h2>
            <div className="coverage-list">
              {mediaCoverage.map(coverage => (
                <div className="coverage-card" key={coverage.id}>
                  <div className="coverage-header">
                    <h3>{coverage.publication}</h3>
                    <span className="coverage-date">{coverage.date}</span>
                  </div>
                  <h4>{coverage.title}</h4>
                  <p>{coverage.excerpt}</p>
                  <Link to={coverage.link} className="read-more" target="_blank" rel="noopener noreferrer">
                    Read Article <i className="fas fa-external-link-alt"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="press-contact">
          <h2>Media Inquiries</h2>
          <p>For media inquiries, interview requests, or additional information, please contact our PR team.</p>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>press@pgmanagement.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;