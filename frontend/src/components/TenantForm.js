import React, { useState, useEffect } from 'react';
import './TenantForm.css';

const TenantForm = ({ tenant, rooms, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: { name: '', phone: '' },
    address: { street: '', city: '', state: '', zipCode: '' },
    idProof: '',
    idNumber: '',
    room: '',
    checkInDate: new Date().toISOString().split('T')[0],
    rent: 0
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        emergencyContact: tenant.emergencyContact || { name: '', phone: '' },
        address: tenant.address || { street: '', city: '', state: '', zipCode: '' },
        idProof: tenant.idProof,
        idNumber: tenant.idNumber,
        room: tenant.room._id,
        checkInDate: tenant.checkInDate.split('T')[0],
        rent: tenant.rent
      });
    } else if (rooms.length > 0) {
      const availableRoom = rooms.find(room => room.status === 'available');
      if (availableRoom) {
        setFormData(prev => ({
          ...prev,
          room: availableRoom._id,
          rent: availableRoom.rent
        }));
      }
    }
  }, [tenant, rooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    const selectedRoom = rooms.find(room => room._id === roomId);
    setFormData(prev => ({
      ...prev,
      room: roomId,
      rent: selectedRoom ? selectedRoom.rent : prev.rent
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="tenant-form-container">
      <h3>{tenant ? 'Edit Tenant' : 'Add New Tenant'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">ID Proof Type *</label>
              <select
                className="form-select"
                name="idProof"
                value={formData.idProof}
                onChange={handleChange}
                required
              >
                <option value="">Select ID Proof</option>
                <option value="Aadhar">Aadhar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">ID Number *</label>
              <input
                type="text"
                className="form-control"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Room *</label>
              <select
                className="form-select"
                name="room"
                value={formData.room}
                onChange={handleRoomChange}
                required
              >
                <option value="">Select Room</option>
                {rooms.filter(room => room.status === 'available').map(room => (
                  <option key={room._id} value={room._id}>
                    Room {room.roomNumber} (₹{room.rent}/month)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Check-in Date *</label>
              <input
                type="date"
                className="form-control"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Rent (₹) *</label>
              <input
                type="number"
                className="form-control"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Emergency Contact Name</label>
              <input
                type="text"
                className="form-control"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Emergency Contact Phone</label>
              <input
                type="tel"
                className="form-control"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="State"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="ZIP Code"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {tenant ? 'Update' : 'Create'} Tenant
          </button>
        </div>
      </form>
    </div>
  );
};

export default TenantForm;