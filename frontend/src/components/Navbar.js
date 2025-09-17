import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-left">
            <button 
              className="navbar-menu-toggle" 
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <i className="fas fa-building"></i>
              <span>PG Management</span>
            </Link>
          </div>
          
          <div className="navbar-center">
            <div className="navbar-nav">
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/tenants" 
                className={`nav-link ${location.pathname === '/tenants' ? 'active' : ''}`}
              >
                <i className="fas fa-users"></i>
                <span>Tenants</span>
              </Link>
              <Link 
                to="/rooms" 
                className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
              >
                <i className="fas fa-bed"></i>
                <span>Rooms</span>
              </Link>
              <Link 
                to="/payments" 
                className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}
              >
                <i className="fas fa-money-bill-wave"></i>
                <span>Payments</span>
              </Link>
              <Link 
                to="/reports" 
                className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}
              >
                <i className="fas fa-chart-bar"></i>
                <span>Reports</span>
              </Link>
            </div>
          </div>
          
          <div className="navbar-right">
            <div className="navbar-user">
              <div className="user-info">
                <span className="user-name">Hello, {user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-dropdown">
                <button className="dropdown-toggle">
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <div className={`mobile-nav ${sidebarOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <i className="fas fa-building"></i>
            <span>PG Management</span>
          </div>
          <button className="mobile-nav-close" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mobile-nav-body">
          <div className="mobile-nav-user">
            <div className="mobile-user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="mobile-user-info">
              <div className="mobile-user-name">{user?.name}</div>
              <div className="mobile-user-role">{user?.role}</div>
            </div>
          </div>
          <div className="mobile-nav-menu">
            <Link 
              to="/dashboard" 
              className={`mobile-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/tenants" 
              className={`mobile-nav-link ${location.pathname === '/tenants' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className="fas fa-users"></i>
              <span>Tenants</span>
            </Link>
            <Link 
              to="/rooms" 
              className={`mobile-nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className="fas fa-bed"></i>
              <span>Rooms</span>
            </Link>
            <Link 
              to="/payments" 
              className={`mobile-nav-link ${location.pathname === '/payments' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className="fas fa-money-bill-wave"></i>
              <span>Payments</span>
            </Link>
            <Link 
              to="/reports" 
              className={`mobile-nav-link ${location.pathname === '/reports' ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className="fas fa-chart-bar"></i>
              <span>Reports</span>
            </Link>
          </div>
          <div className="mobile-nav-footer">
            <button className="mobile-logout-btn" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;