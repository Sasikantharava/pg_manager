import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TenantForm from '../components/TenantForm';
import './Tenants.css';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tenantsRes, roomsRes] = await Promise.all([
        axios.get('/api/tenants'),
        axios.get('/api/rooms')
      ]);
      setTenants(tenantsRes.data);
      setRooms(roomsRes.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleCreateTenant = () => {
    setEditingTenant(null);
    setShowForm(true);
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setShowForm(true);
  };

  const handleSubmitTenant = async (tenantData) => {
    try {
      if (editingTenant) {
        await axios.put(`/api/tenants/${editingTenant._id}`, tenantData);
      } else {
        await axios.post('/api/tenants', tenantData);
      }
      setShowForm(false);
      setEditingTenant(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save tenant');
    }
  };

  const handleDeleteTenant = async (tenantId) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await axios.delete(`/api/tenants/${tenantId}`);
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete tenant');
      }
    }
  };

  const handleCheckoutTenant = async (tenantId) => {
    if (window.confirm('Are you sure you want to checkout this tenant?')) {
      try {
        await axios.put(`/api/tenants/${tenantId}/checkout`, {
          checkOutDate: new Date().toISOString()
        });
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to checkout tenant');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTenant(null);
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'badge bg-success' 
      : 'badge bg-secondary';
  };

  if (loading) {
    return <div className="text-center mt-5">Loading tenants...</div>;
  }

  return (
    <div className="tenants-container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Tenant Management</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleCreateTenant}
          disabled={rooms.filter(r => r.status === 'available').length === 0}
        >
          <i className="fas fa-plus me-2"></i>Add New Tenant
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm ? (
        <div className="card">
          <div className="card-body">
            <TenantForm
              tenant={editingTenant}
              rooms={rooms}
              onSubmit={handleSubmitTenant}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Room</th>
                  <th>Rent</th>
                  <th>Check-in Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(tenant => (
                  <tr key={tenant._id}>
                    <td>{tenant.name}</td>
                    <td>
                      <div>{tenant.phone}</div>
                      <small className="text-muted">{tenant.email}</small>
                    </td>
                    <td>Room {tenant.room.roomNumber}</td>
                    <td>₹{tenant.rent}</td>
                    <td>{new Date(tenant.checkInDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadge(tenant.status)}>
                        {tenant.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEditTenant(tenant)}
                        >
                          Edit
                        </button>
                        {tenant.status === 'active' && (
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleCheckoutTenant(tenant._id)}
                          >
                            Checkout
                          </button>
                        )}
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteTenant(tenant._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tenants.length === 0 && (
            <div className="text-center mt-5">
              <i className="fas fa-users fa-3x text-muted mb-3"></i>
              <p>No tenants found. Add your first tenant to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tenants;