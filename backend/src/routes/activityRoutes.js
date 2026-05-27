const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const activityController = require('../controllers/activityController');

// GET /api/activities - Get all activities (public)
router.get('/', activityController.getAll);

// GET /api/activities/:id - Get a single activity (public)
router.get('/:id', activityController.getById);

// POST /api/activities - Create a new activity (admin only)
router.post('/', auth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'extraImages', maxCount: 10 }]), activityController.create);

// PUT /api/activities/:id - Update an activity (admin only)
router.put('/:id', auth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'extraImages', maxCount: 10 }]), activityController.update);

// DELETE /api/activities/:id - Delete an activity (admin only)
router.delete('/:id', auth, activityController.delete);

module.exports = router;
