const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const memberController = require('../controllers/memberController');

// Public route
router.get('/', memberController.getAllMembers);

// Protected routes
router.post('/', auth, upload.single('image'), memberController.createMember);
router.put('/:id', auth, upload.single('image'), memberController.updateMember);
router.delete('/:id', auth, memberController.deleteMember);

module.exports = router;
