const express = require('express');
const { getPayments, getPayment, createPayment, updatePayment, deletePayment, getPaymentsByTenant } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getPayments)
  .post(protect, createPayment);

router.route('/:id')
  .get(protect, getPayment)
  .put(protect, updatePayment)
  .delete(protect, deletePayment);

router.route('/tenant/:tenantId')
  .get(protect, getPaymentsByTenant);

module.exports = router;