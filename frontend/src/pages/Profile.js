import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        profileImage: null
      });
      // If user has a profile image, set it as preview
      if (user.profileImage) {
        setPreviewImage(user.profileImage);
      }
    }
  }, [user]);

  useEffect(() => {
    // Handle errors from AuthContext
    if (error) {
      setUpdateError(error);
      // Clear the error after displaying it
      const timer = setTimeout(() => {
        clearError();
        setUpdateError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateError(null);
    
    try {
      // Create a copy of form data without the image file
      const { profileImage, ...userData } = formData;
      
      // If there's a new image, convert it to base64
      if (profileImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          // Update user with image as base64 string
          const result = await updateUser({
            ...userData,
            profileImage: reader.result
          });
          
          if (result.success) {
            setIsEditing(false);
          } else {
            setUpdateError(result.error);
          }
          setIsSubmitting(false);
        };
        reader.readAsDataURL(profileImage);
      } else {
        // Update user without changing the image
        const result = await updateUser(userData);
        if (result.success) {
          setIsEditing(false);
        } else {
          setUpdateError(result.error);
        }
        setIsSubmitting(false);
      }
    } catch (err) {
      setIsSubmitting(false);
      setUpdateError('An unexpected error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdateError(null);
    setPreviewImage(user?.profileImage || null);
    // Reset form to current user data
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      profileImage: null
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          disabled={isSubmitting}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {updateError && (
        <div className="alert alert-danger">
          {updateError}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-image-section">
            <div className="profile-image-container">
              {previewImage ? (
                <img src={previewImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-placeholder">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <div className="image-upload">
                  <label htmlFor="profile-image-upload" className="upload-btn">
                    <i className="fas fa-camera"></i>
                  </label>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>
            <h2>{user?.name}</h2>
            <p className="profile-role">{user?.role}</p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
                rows={3}
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-card">
          <h3>Account Information</h3>
          <div className="info-item">
            <span className="info-label">Account Status:</span>
            <span className="info-value active">Active</span>
          </div>
          <div className="info-item">
            <span className="info-label">Member Since:</span>
            <span className="info-value">January 15, 2023</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Login:</span>
            <span className="info-value">Today, 09:30 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;