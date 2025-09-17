import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-md-none" 
          onClick={onClose}
        ></div>
      )}
      
      <div className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                to="/dashboard"
                onClick={onClose}
              >
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/tenants' ? 'active' : ''}`}
                to="/tenants"
                onClick={onClose}
              >
                <i className="fas fa-users me-2"></i>
                Tenants
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}
                to="/rooms"
                onClick={onClose}
              >
                <i className="fas fa-bed me-2"></i>
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}
                to="/payments"
                onClick={onClose}
              >
                <i className="fas fa-money-bill-wave me-2"></i>
                Payments
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`}
                to="/reports"
                onClick={onClose}
              >
                <i className="fas fa-chart-bar me-2"></i>
                Reports
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;