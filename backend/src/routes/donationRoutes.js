const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { submit, getAll, toggleVerify, remove } = require('../controllers/donationController');

// POST /api/donations - Submit a new donation (public)
router.post('/', submit);

// GET /api/donations - Get all donations (admin only)
router.get('/', auth, getAll);

// PATCH /api/donations/:id/verify - Toggle verified status (admin only)
router.patch('/:id/verify', auth, toggleVerify);

// DELETE /api/donations/:id - Delete a donation (admin only)
router.delete('/:id', auth, remove);

module.exports = router;
