const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { login, verify } = require('../controllers/authController');

// POST /api/auth/login - Authenticate admin
router.post('/login', login);

// GET /api/auth/verify - Verify token validity
router.get('/verify', auth, verify);

module.exports = router;
