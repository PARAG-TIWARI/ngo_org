const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getPublic, update } = require('../controllers/settingsController');

// GET /api/settings - Get all settings (public)
router.get('/', getPublic);

// PUT /api/settings/:key - Update a setting by key (admin only)
router.put('/:key', auth, update);

module.exports = router;
