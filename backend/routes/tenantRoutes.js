const express = require('express');
const { getTenants, getTenant, createTenant, updateTenant, deleteTenant, checkoutTenant } = require('../controllers/tenantController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTenants)
  .post(protect, createTenant);

router.route('/:id')
  .get(protect, getTenant)
  .put(protect, updateTenant)
  .delete(protect, deleteTenant);

router.route('/:id/checkout')
  .put(protect, checkoutTenant);

module.exports = router;