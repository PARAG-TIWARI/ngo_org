const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const certificateController = require('../controllers/certificateController');

// Public route
router.get('/', certificateController.getAllCertificates);

// Protected routes
router.post('/', auth, upload.single('image'), certificateController.createCertificate);
router.put('/:id', auth, upload.single('image'), certificateController.updateCertificate);
router.delete('/:id', auth, certificateController.deleteCertificate);

module.exports = router;
