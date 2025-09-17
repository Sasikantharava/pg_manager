// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserPlus, FaExclamationCircle, FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'manager'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userData.name || !userData.email || !userData.password || !userData.phone) {
      setError('Please fill in all fields');
      return;
    }
    
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      console.log('Submitting registration form:', userData);
      const result = await register(userData);
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialLogin = (provider) => {
    // This would typically call a function from your auth context
    console.log(`Login with ${provider}`);
    // Example: await socialLogin(provider);
  };

  return (
    <div className="register-page">
      {/* Background shapes */}
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="register-container">
        <div className="register-card">
          <div className="register-card-header">
            <h2 className="register-card-title">Create Account</h2>
            <p className="register-card-subtitle">Join us today and get started</p>
          </div>
          
          <div className="register-card-body">
            <div className="register-logo">
              <FaUserPlus />
            </div>
            
            {error && <div className="alert alert-danger">
              <FaExclamationCircle className="me-2" />
              {error}
            </div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                  />
                  <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                  />
                  <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="terms-checkbox">
                <input type="checkbox" id="agreeTerms" required />
                <label htmlFor="agreeTerms">
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </label>
              </div>
              
              <button type="submit" className="btn-register">
                Create Account
              </button>
            </form>
            
            {/* Divider */}
            <div className="divider">
              <span>or sign up with</span>
            </div>
            
            {/* Social login */}
            <div className="social-login">
              <button 
                type="button" 
                className="btn-social google" 
                onClick={() => handleSocialLogin('google')}
              >
                <FaGoogle /> Google
              </button>
              <button 
                type="button" 
                className="btn-social facebook" 
                onClick={() => handleSocialLogin('facebook')}
              >
                <FaFacebookF /> Facebook
              </button>
            </div>
            
            <div className="login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;