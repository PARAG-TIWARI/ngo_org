const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const galleryController = require('../controllers/galleryController');

// GET /api/gallery - Get all gallery items (public)
router.get('/', galleryController.getAll);

// GET /api/gallery/categories - Get distinct categories (public)
router.get('/categories', galleryController.getCategories);

// POST /api/gallery - Upload image and create gallery item (admin only)
router.post('/', auth, upload.single('image'), galleryController.create);

// DELETE /api/gallery/:id - Delete a gallery item (admin only)
router.delete('/:id', auth, galleryController.delete);

module.exports = router;
