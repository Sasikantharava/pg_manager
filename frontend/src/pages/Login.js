// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaEye, FaEyeSlash, FaExclamationCircle, FaGoogle, FaFacebookF } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, setError, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await login(credentials);
      if (result.success) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      // Error is handled in the context
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="login-page">
      {/* Background shapes */}
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-header">
            <h2 className="login-card-title">Welcome Back</h2>
            <p className="login-card-subtitle">Sign in to continue to your account</p>
          </div>
          
          <div className="login-card-body">
            <div className="login-logo">
              <FaUserCircle />
            </div>
            
            {error && (
              <div className="alert alert-danger">
                <FaExclamationCircle className="me-2" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Email"
                  />
                  <span className="input-icon">
                    <FaEnvelope />
                  </span>
                </div>
              </div>
              
              {/* Password with toggle */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Password"
                  />
                  <span 
                    className="input-icon toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              
              {/* Remember me & forgot password */}
              <div className="login-options">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
              
              {/* Submit button */}
              <button 
                type="submit" 
                className="btn-login"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            {/* Divider */}
            <div className="divider">
              <span>or continue with</span>
            </div>
            
            {/* Social login */}
            <div className="social-login">
              <button type="button" className="btn-social google">
                <FaGoogle /> Google
              </button>
              <button type="button" className="btn-social facebook">
                <FaFacebookF /> Facebook
              </button>
            </div>
            
            {/* Signup link */}
            <div className="signup-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;