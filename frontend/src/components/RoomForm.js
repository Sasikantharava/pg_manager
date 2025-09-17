import React, { useState, useEffect } from 'react';
import './RoomForm.css';

const RoomForm = ({ room, onSubmit, onCancel, error }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    capacity: 1,
    rent: 0,
    amenities: [],
    status: 'available'
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber || '',
        capacity: room.capacity || 1,
        rent: room.rent || 0,
        amenities: room.amenities || [],
        status: room.status || 'available'
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddAmenity = () => {
    const amenity = amenityInput.trim();
    if (amenity && !formData.amenities.includes(amenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
      }));
      setAmenityInput('');
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roomNumber || formData.roomNumber.trim() === '') {
      newErrors.roomNumber = 'Room number is required';
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = 'Capacity must be at least 1';
    }

    if (formData.rent < 0) {
      newErrors.rent = 'Rent cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const submitData = {
      ...formData,
      roomNumber: formData.roomNumber.trim().toUpperCase(),
      capacity: Number(formData.capacity),
      rent: Number(formData.rent),
      amenities: formData.amenities
    };

    onSubmit(submitData);
  };

  return (
    <div className="room-form-container">
      <h3>{room ? 'Edit Room' : 'Add New Room'}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            className={`form-control ${errors.roomNumber ? 'is-invalid' : ''}`}
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Enter room number"
          />
          {errors.roomNumber && <div className="invalid-feedback">{errors.roomNumber}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Capacity</label>
          <input
            type="number"
            name="capacity"
            className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
            value={formData.capacity}
            onChange={handleChange}
            min="1"
          />
          {errors.capacity && <div className="invalid-feedback">{errors.capacity}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Rent (₹)</label>
          <input
            type="number"
            name="rent"
            className={`form-control ${errors.rent ? 'is-invalid' : ''}`}
            value={formData.rent}
            onChange={handleChange}
            min="0"
          />
          {errors.rent && <div className="invalid-feedback">{errors.rent}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Amenities</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add amenity"
            />
            <button type="button" className="btn btn-outline-secondary" onClick={handleAddAmenity}>
              Add
            </button>
          </div>
          {formData.amenities.length > 0 && (
            <div className="amenities-list mt-2">
              {formData.amenities.map((amenity, index) => (
                <span key={index} className="badge bg-primary me-1">
                  {amenity}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-1"
                    onClick={() => handleRemoveAmenity(amenity)}
                    style={{ fontSize: '0.6rem' }}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {room ? 'Update' : 'Create'} Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;
