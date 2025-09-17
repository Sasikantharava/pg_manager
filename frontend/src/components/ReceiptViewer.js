// src/components/ReceiptViewer.js
import React, { useState } from 'react';
import { sendReceiptEmail } from '../services/emailService';
import './ReceiptViewer.css';

const ReceiptViewer = ({ payment, onClose, onPrint }) => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    if (!payment.tenant?.email) {
      setEmailError('Tenant email address not available');
      return;
    }

    setSendingEmail(true);
    setEmailError('');
    
    try {
      await sendReceiptEmail(payment);
      setEmailSent(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    } catch (error) {
      setEmailError('Failed to send receipt email. Please try again.');
    } finally {
      setSendingEmail(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="receipt-viewer">
      <div className="receipt-container print-receipt" id="receipt-content">
        {/* Receipt Header */}
        <div className="receipt-header">
          <div className="receipt-logo">PG</div>
          <div className="receipt-title-section">
            <h2>Payment Receipt</h2>
            <p>PG Management System</p>
            <p className="receipt-date">{formatDate(payment.paymentDate)} at {formatTime(payment.paymentDate)}</p>
          </div>
        </div>
        
        {/* Receipt Body */}
        <div className="receipt-body">
          <div className="receipt-info-section">
            <div className="receipt-info-column">
              <h3>Payment Information</h3>
              <div className="receipt-info-row">
                <span className="receipt-label">Receipt ID</span>
                <span className="receipt-value">{payment.receiptId || payment._id}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Payment Date</span>
                <span className="receipt-value">{formatDate(payment.paymentDate)}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Payment Time</span>
                <span className="receipt-value">{formatTime(payment.paymentDate)}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Payment Method</span>
                <span className="receipt-value">
                  {payment.paymentMethod === 'cash' ? 'Cash' : 
                   payment.paymentMethod === 'bank_transfer' ? 'Bank Transfer' :
                   payment.paymentMethod === 'upi' ? 'UPI' :
                   payment.paymentMethod === 'card' ? 'Card' :
                   payment.paymentMethod}
                </span>
              </div>
              {payment.transactionId && (
                <div className="receipt-info-row">
                  <span className="receipt-label">Transaction ID</span>
                  <span className="receipt-value">{payment.transactionId}</span>
                </div>
              )}
            </div>
            
            <div className="receipt-info-column">
              <h3>Tenant Information</h3>
              <div className="receipt-info-row">
                <span className="receipt-label">Tenant Name</span>
                <span className="receipt-value">{payment.tenant?.name}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Room Number</span>
                <span className="receipt-value">Room {payment.room?.roomNumber}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Payment For</span>
                <span className="receipt-value">{payment.paymentForMonth}</span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-label">Status</span>
                <span className="receipt-value">
                  <span className={`receipt-status-badge ${payment.status}`}>
                    {payment.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Amount Section */}
          <div className="receipt-amount-section">
            <div className="receipt-divider"></div>
            <div className="receipt-amount-row">
              <span className="receipt-label">Total Amount Paid</span>
              <span className="receipt-amount">₹{payment.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Receipt Footer */}
        <div className="receipt-footer">
          <div className="receipt-footer-text">
            <p>Thank you for your payment!</p>
            <p>For any queries, please contact the PG administrator.</p>
          </div>
          <div className="receipt-contact-info">
            <p>PG Management System</p>
            <p>contact@pgmanagement.com</p>
            <p>+91 9876543210</p>
          </div>
        </div>
        
        {/* Watermark */}
        <div className="receipt-watermark">PAID</div>
      </div>
      
      {/* Action Buttons */}
      <div className="receipt-actions no-print">
        <button className="btn btn-primary" onClick={handlePrint}>
          <i className="fas fa-print me-2"></i>Print Receipt
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleSendEmail}
          disabled={sendingEmail}
        >
          <i className={`fas fa-envelope me-2 ${sendingEmail ? 'fa-spin' : ''}`}></i>
          {sendingEmail ? 'Sending...' : 'Email Receipt'}
        </button>
        <button className="btn btn-outline-secondary" onClick={onClose}>
          <i className="fas fa-times me-2"></i>Close
        </button>
      </div>
      
      {/* Email Status Messages */}
      {emailSent && (
        <div className="alert alert-success no-print">
          <i className="fas fa-check-circle me-2"></i>
          Receipt sent successfully to {payment.tenant?.email}
        </div>
      )}
      
      {emailError && (
        <div className="alert alert-danger no-print">
          <i className="fas fa-exclamation-circle me-2"></i>
          {emailError}
        </div>
      )}
    </div>
  );
};

export default ReceiptViewer;