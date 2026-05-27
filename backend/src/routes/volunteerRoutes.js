const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, getAll } = require('../controllers/volunteerController');

// POST /api/volunteers - Register as a volunteer (public)
router.post('/', register);

// GET /api/volunteers - Get all volunteers (admin only)
router.get('/', auth, getAll);

module.exports = router;
