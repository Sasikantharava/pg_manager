import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹199',
      period: 'month',
      description: 'Perfect for small PGs just getting started',
      features: [
        'Up to 10 rooms',
        'Up to 20 tenants',
        'Basic payment tracking',
        'Email support',
        'Mobile app access'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '₹299',
      period: 'month',
      description: 'For growing PGs with more complex needs',
      features: [
        'Up to 50 rooms',
        'Up to 100 tenants',
        'Advanced payment tracking',
        'Priority support',
        'Analytics & reports',
        'Mobile app access'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹399',
      period: 'month',
      description: 'For large PG chains with multiple properties',
      features: [
        'Unlimited rooms',
        'Unlimited tenants',
        'Advanced payment tracking',
        '24/7 dedicated support',
        'Advanced analytics',
        'Custom integrations',
        'White-label options'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqData = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, all plans come with a 30-day free trial. No credit card required to start your trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and PayPal. For Enterprise plans, we also accept bank transfers."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <div className="pricing-hero">
        <div className="container">
          <div className="pricing-hero-content">
            <div className="pricing-badge">
              <i className="fas fa-tag"></i>
              Simple, Transparent Pricing
            </div>
            <h1 className="pricing-title">Choose the Perfect Plan for Your PG</h1>
            <p className="pricing-subtitle">
              No hidden fees. Cancel anytime. 30-day free trial on all plans.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-plans">
        <div className="container">
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">/{plan.period}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="pricing-card-body">
                  <ul className="plan-features">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="plan-feature">
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card-footer">
                  <Link to="/register" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}>
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pricing-faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <h3 
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <i className="fas fa-chevron-down"></i>
                </h3>
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pricing-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Still have questions?</h2>
            <p className="cta-subtitle">
              Our support team is here to help you find the perfect plan for your needs.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Support
              <i className="fas fa-headset"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;