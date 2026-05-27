const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { submit, getAll, markRead } = require('../controllers/contactController');

// POST /api/contact - Submit a contact message (public)
router.post('/', submit);

// GET /api/contact - Get all contact messages (admin only)
router.get('/', auth, getAll);

// PATCH /api/contact/:id/read - Toggle read status (admin only)
router.patch('/:id/read', auth, markRead);

// PATCH /api/contacts/:id - Update status (admin only)
router.patch('/:id', auth, markRead);

module.exports = router;
