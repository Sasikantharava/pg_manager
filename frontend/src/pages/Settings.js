import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Default settings
  const defaultSettings = {
    general: {
      language: 'en',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY'
    },
    notifications: {
      emailNotifications: true,
      paymentReminders: true,
      maintenanceAlerts: true,
      newTenantAlerts: false,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: 30
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium'
    }
  };
  
  // Initialize settings from localStorage or defaults
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Apply theme on initial load and when theme changes
  useEffect(() => {
    applyTheme(settings.appearance.theme);
    
    // Listen for system theme changes if using system theme
    if (settings.appearance.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.appearance.theme]);
  
  // Apply theme to the document
  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', theme);
    }
  };
  
  // Handle general settings changes
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: value
      }
    }));
  };
  
  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };
  
  // Handle security settings changes
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [name]: val
      }
    }));
  };
  
  // Handle appearance settings changes
  const handleAppearanceChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'radio' ? value : value;
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [name]: val
      }
    }));
  };
  
  // Save all settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setIsLoading(false);
      setSaveSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  // Reset settings to defaults
  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings(defaultSettings);
      applyTheme(defaultSettings.appearance.theme);
    }
  };
  
  // Change password functionality
  const handleChangePassword = () => {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      // In a real app, you would send this to your backend
      alert('Password changed successfully!');
    }
  };
  
  // Download user data
  const handleDownloadData = () => {
    // In a real app, you would fetch and download actual user data
    const userData = {
      user: user,
      settings: settings,
      // Add other user data as needed
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'pg-management-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Delete account functionality
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, you would send a request to your backend
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };
  
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <i className="fas fa-cog"></i>
            General
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-shield-alt"></i>
            Security
          </button>
          <button 
            className={`tab-btn ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <i className="fas fa-palette"></i>
            Appearance
          </button>
        </div>
        
        <div className="settings-main">
          {activeTab === 'general' && (
            <div className="settings-card">
              <h2>General Settings</h2>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select 
                  id="language" 
                  name="language"
                  value={settings.general.language}
                  onChange={handleGeneralChange}
                  className="form-control"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timezone">Timezone</label>
                <select 
                  id="timezone" 
                  name="timezone"
                  value={settings.general.timezone}
                  onChange={handleGeneralChange}
                  className="form-control"
                >
                  <option value="UTC-8">(UTC-08:00) Pacific Time</option>
                  <option value="UTC-5">(UTC-05:00) Eastern Time</option>
                  <option value="UTC+0">(UTC+00:00) London</option>
                  <option value="UTC+5:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dateFormat">Date Format</label>
                <select 
                  id="dateFormat" 
                  name="dateFormat"
                  value={settings.general.dateFormat}
                  onChange={handleGeneralChange}
                  className="form-control"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="settings-card">
              <h2>Notification Preferences</h2>
              <div className="form-group checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="emailNotifications">Email Notifications</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="paymentReminders"
                    name="paymentReminders"
                    checked={settings.notifications.paymentReminders}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="paymentReminders">Payment Reminders</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="maintenanceAlerts"
                    name="maintenanceAlerts"
                    checked={settings.notifications.maintenanceAlerts}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="maintenanceAlerts">Maintenance Alerts</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="newTenantAlerts"
                    name="newTenantAlerts"
                    checked={settings.notifications.newTenantAlerts}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="newTenantAlerts">New Tenant Alerts</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    name="marketingEmails"
                    checked={settings.notifications.marketingEmails}
                    onChange={handleNotificationChange}
                  />
                  <label htmlFor="marketingEmails">Marketing Emails</label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="settings-card">
              <h2>Security Settings</h2>
              <div className="form-group checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onChange={handleSecurityChange}
                  />
                  <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                </div>
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="loginAlerts"
                    name="loginAlerts"
                    checked={settings.security.loginAlerts}
                    onChange={handleSecurityChange}
                  />
                  <label htmlFor="loginAlerts">Login Alerts</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={settings.security.sessionTimeout}
                  onChange={handleSecurityChange}
                  className="form-control"
                  min="5"
                  max="120"
                />
              </div>
              <div className="security-actions">
                <button className="btn btn-secondary" onClick={handleChangePassword}>
                  Change Password
                </button>
                <button className="btn btn-secondary" onClick={handleDownloadData}>
                  Download My Data
                </button>
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="settings-card">
              <h2>Appearance Settings</h2>
              <div className="form-group">
                <label>Theme</label>
                <div className="theme-options">
                  <div className="theme-option">
                    <input 
                      type="radio" 
                      id="light-theme" 
                      name="theme" 
                      value="light"
                      checked={settings.appearance.theme === 'light'}
                      onChange={handleAppearanceChange}
                    />
                    <label htmlFor="light-theme">
                      <div className="theme-preview light"></div>
                      Light
                    </label>
                  </div>
                  <div className="theme-option">
                    <input 
                      type="radio" 
                      id="dark-theme" 
                      name="theme" 
                      value="dark"
                      checked={settings.appearance.theme === 'dark'}
                      onChange={handleAppearanceChange}
                    />
                    <label htmlFor="dark-theme">
                      <div className="theme-preview dark"></div>
                      Dark
                    </label>
                  </div>
                  <div className="theme-option">
                    <input 
                      type="radio" 
                      id="system-theme" 
                      name="theme" 
                      value="system"
                      checked={settings.appearance.theme === 'system'}
                      onChange={handleAppearanceChange}
                    />
                    <label htmlFor="system-theme">
                      <div className="theme-preview system"></div>
                      System Default
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="fontSize">Font Size</label>
                <select 
                  id="fontSize" 
                  name="fontSize"
                  value={settings.appearance.fontSize}
                  onChange={handleAppearanceChange}
                  className="form-control"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="settings-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : 'Save Settings'}
            </button>
            <button className="btn btn-secondary" onClick={handleResetSettings}>
              Reset to Defaults
            </button>
            {saveSuccess && (
              <div className="save-success">
                <i className="fas fa-check-circle"></i> Settings saved successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;