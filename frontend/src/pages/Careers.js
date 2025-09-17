import React from 'react';
import { Link } from 'react-router-dom';
import './Careers.css';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      description: "We're looking for an experienced frontend developer to help build our next-generation PG management platform.",
      requirements: [
        "5+ years of experience with React and JavaScript",
        "Experience with modern CSS frameworks",
        "Knowledge of state management (Redux, Context API)",
        "Familiarity with RESTful APIs",
        "Strong problem-solving skills"
      ]
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai",
      type: "Full-time",
      description: "Join our product team to help shape the future of PG management software.",
      requirements: [
        "3+ years of product management experience",
        "Experience with SaaS products",
        "Strong analytical and communication skills",
        "Ability to work with cross-functional teams",
        "Experience with agile development methodologies"
      ]
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Delhi",
      type: "Full-time",
      description: "Help our customers get the most out of our platform and ensure their success.",
      requirements: [
        "2+ years of customer success or account management experience",
        "Excellent communication and interpersonal skills",
        "Experience with SaaS or B2B products",
        "Ability to understand customer needs and provide solutions",
        "Strong problem-solving abilities"
      ]
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Drive our marketing efforts to reach more PG owners and managers across India.",
      requirements: [
        "2+ years of marketing experience",
        "Experience with digital marketing channels",
        "Strong writing and communication skills",
        "Knowledge of SEO and content marketing",
        "Ability to analyze marketing metrics"
      ]
    }
  ];

  return (
    <div className="careers-page">
      <div className="careers-header">
        <div className="container">
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <h1>Join Our Team</h1>
          <p className="subtitle">Help us revolutionize PG management in India</p>
        </div>
      </div>
      
      <div className="careers-container container">
        <div className="careers-intro">
          <div className="intro-content">
            <h2>Why Work With Us?</h2>
            <p>At PG Management, we're building the future of property management technology. We offer a dynamic work environment, competitive benefits, and the opportunity to make a real impact.</p>
            
            <div className="benefits-grid">
              <div className="benefit-item">
                <i className="fas fa-heart"></i>
                <h3>Health & Wellness</h3>
                <p>Comprehensive health insurance and wellness programs</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-graduation-cap"></i>
                <h3>Learning & Development</h3>
                <p>Continuous learning opportunities and professional growth</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-home"></i>
                <h3>Flexible Work</h3>
                <p>Remote work options and flexible schedules</p>
              </div>
              <div className="benefit-item">
                <i className="fas fa-users"></i>
                <h3>Inclusive Culture</h3>
                <p>Diverse team with equal opportunities for all</p>
              </div>
            </div>
          </div>
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team" />
          </div>
        </div>
        
        <div className="open-positions">
          <h2>Open Positions</h2>
          <div className="jobs-grid">
            {jobOpenings.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span><i className="fas fa-building"></i> {job.department}</span>
                    <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                    <span><i className="fas fa-clock"></i> {job.type}</span>
                  </div>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="careers-cta">
          <h2>Don't See What You're Looking For?</h2>
          <p>We're always looking for talented people to join our team. Send us your resume and let us know how you can contribute.</p>
          <Link to="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Careers;