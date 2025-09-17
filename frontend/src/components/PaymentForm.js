import React, { useState, useEffect } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ payment, tenants, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    tenant: '',
    room: '',
    amount: 0,
    paymentMethod: 'cash',
    paymentForMonth: '',
    transactionId: '',
    notes: ''
  });

  useEffect(() => {
    if (payment) {
      setFormData({
        tenant: payment.tenant._id,
        room: payment.room._id,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        paymentForMonth: payment.paymentForMonth,
        transactionId: payment.transactionId || '',
        notes: payment.notes || ''
      });
    } else {
      // Set default payment for month to current month
      const now = new Date();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();
      setFormData(prev => ({
        ...prev,
        paymentForMonth: `${month} ${year}`
      }));
    }
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTenantChange = (e) => {
    const tenantId = e.target.value;
    const selectedTenant = tenants.find(tenant => tenant._id === tenantId);
    setFormData(prev => ({
      ...prev,
      tenant: tenantId,
      room: selectedTenant ? selectedTenant.room._id : '',
      amount: selectedTenant ? selectedTenant.rent : prev.amount
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getCurrentTenants = () => {
    return tenants.filter(tenant => tenant.status === 'active');
  };

  return (
    <div className="payment-form-container">
      <h3>{payment ? 'Edit Payment' : 'Record New Payment'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Tenant *</label>
              <select
                className="form-select"
                name="tenant"
                value={formData.tenant}
                onChange={handleTenantChange}
                required
                disabled={!!payment}
              >
                <option value="">Select Tenant</option>
                {getCurrentTenants().map(tenant => (
                  <option key={tenant._id} value={tenant._id}>
                    {tenant.name} (Room {tenant.room.roomNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Room</label>
              <input
                type="text"
                className="form-control"
                value={tenants.find(t => t._id === formData.tenant)?.room.roomNumber || ''}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Amount (₹) *</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Payment Method *</label>
              <select
                className="form-select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Payment For Month *</label>
              <input
                type="text"
                className="form-control"
                name="paymentForMonth"
                value={formData.paymentForMonth}
                onChange={handleChange}
                placeholder="e.g., January 2023"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Transaction ID</label>
              <input
                type="text"
                className="form-control"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="For digital payments"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {payment ? 'Update' : 'Record'} Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;