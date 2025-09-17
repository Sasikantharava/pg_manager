import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentForm from '../components/PaymentForm';
import ReceiptViewer from '../components/ReceiptViewer';
import './Payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [viewingPayment, setViewingPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsRes, tenantsRes] = await Promise.all([
        axios.get('/api/payments'),
        axios.get('/api/tenants')
      ]);
      setPayments(paymentsRes.data);
      setTenants(tenantsRes.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleCreatePayment = () => {
    setEditingPayment(null);
    setShowForm(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowForm(true);
  };

  const handleViewReceipt = (payment) => {
    setViewingPayment(payment);
    setShowReceipt(true);
  };

  const handleSubmitPayment = async (paymentData) => {
    try {
      if (editingPayment) {
        await axios.put(`/api/payments/${editingPayment._id}`, paymentData);
      } else {
        await axios.post('/api/payments', paymentData);
      }
      setShowForm(false);
      setEditingPayment(null);
      fetchData();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save payment');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`/api/payments/${paymentId}`);
        fetchData();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete payment');
      }
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPayment(null);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setViewingPayment(null);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning text-dark';
      case 'failed':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cash':
        return 'Cash';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'upi':
        return 'UPI';
      case 'card':
        return 'Card';
      default:
        return method;
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading payments...</div>;
  }

  return (
    <div className="payments-container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Payment Management</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleCreatePayment}
          disabled={tenants.filter(t => t.status === 'active').length === 0}
        >
          <i className="fas fa-plus me-2"></i>Record Payment
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {showForm ? (
        <div className="card">
          <div className="card-body">
            <PaymentForm
              payment={editingPayment}
              tenants={tenants}
              onSubmit={handleSubmitPayment}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      ) : showReceipt ? (
        <ReceiptViewer
          payment={viewingPayment}
          onClose={handleCloseReceipt}
          onPrint={handlePrintReceipt}
        />
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Room</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>For Month</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment._id}>
                    <td>{payment.tenant?.name}</td>
                    <td>Room {payment.room?.roomNumber}</td>
                    <td>₹{payment.amount}</td>
                    <td>{getPaymentMethodText(payment.paymentMethod)}</td>
                    <td>{payment.paymentForMonth}</td>
                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadge(payment.status)}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleViewReceipt(payment)}
                          title="View Receipt"
                        >
                          <i className="fas fa-receipt"></i>
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEditPayment(payment)}
                          title="Edit Payment"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeletePayment(payment._id)}
                          title="Delete Payment"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {payments.length === 0 && (
            <div className="text-center mt-5">
              <i className="fas fa-money-bill-wave fa-3x text-muted mb-3"></i>
              <p>No payments found. Record your first payment to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Payments;