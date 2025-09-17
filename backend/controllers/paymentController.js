const Payment = require('../models/Payment');
const Tenant = require('../models/Tenant');
const Room = require('../models/Room');
const sendReceiptEmail = require('../services/emailService');

// Create payment
const createPayment = async (req, res) => {
  try {
    const {
      tenant,
      room,
      amount,
      paymentMethod,
      paymentForMonth,
      transactionId,
      notes
    } = req.body;
    
    // Create payment
    const payment = await Payment.create({
      tenant,
      room,
      amount,
      paymentMethod,
      paymentForMonth,
      transactionId,
      notes,
      status: 'completed'
    });
    
    // Populate payment details
    const populatedPayment = await Payment.findById(payment._id)
      .populate('tenant', 'name email phone')
      .populate('room', 'roomNumber');
    
    // Send receipt email
    try {
      await sendReceiptEmail(populatedPayment);
      console.log('Receipt email sent to:', populatedPayment.tenant.email);
    } catch (emailError) {
      console.error('Failed to send receipt email:', emailError);
      // Continue with the response even if email fails
    }
    
    res.status(201).json(populatedPayment);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('tenant', 'name email phone')
      .populate('room', 'roomNumber')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single payment
const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('tenant', 'name email phone')
      .populate('room', 'roomNumber');
    
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  try {
    const {
      amount,
      paymentMethod,
      paymentForMonth,
      status,
      transactionId,
      notes
    } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (payment) {
      payment.amount = amount || payment.amount;
      payment.paymentMethod = paymentMethod || payment.paymentMethod;
      payment.paymentForMonth = paymentForMonth || payment.paymentForMonth;
      payment.status = status || payment.status;
      payment.transactionId = transactionId || payment.transactionId;
      payment.notes = notes || payment.notes;

      const updatedPayment = await payment.save();
      const populatedPayment = await Payment.findById(updatedPayment._id)
        .populate('tenant', 'name email phone')
        .populate('room', 'roomNumber');
      
      res.json(populatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      await Payment.deleteOne({ _id: req.params.id });
      res.json({ message: 'Payment removed' });
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payments by tenant
const getPaymentsByTenant = async (req, res) => {
  try {
    const payments = await Payment.find({ tenant: req.params.tenantId })
      .populate('tenant', 'name email phone')
      .populate('room', 'roomNumber')
      .sort({ paymentDate: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentsByTenant
};
