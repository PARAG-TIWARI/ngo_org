const prisma = require('../prisma');
const { getImageUrl, deleteImage, getFilenameFromUrl } = require('../services/storageService');

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const { title, verifiedBy } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = getImageUrl(req.file.filename);
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const certificate = await prisma.certificate.create({
      data: { title, verifiedBy, imageUrl },
    });
    res.status(201).json(certificate);
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ error: 'Failed to create certificate' });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, verifiedBy, imageUrl: bodyImageUrl } = req.body;

    const existingCertificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCertificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    let imageUrl = existingCertificate.imageUrl;

    if (req.file) {
      // New file uploaded
      imageUrl = getImageUrl(req.file.filename);
      // Delete old local file if it exists
      if (existingCertificate.imageUrl && existingCertificate.imageUrl.startsWith('/uploads/')) {
        const oldFilename = getFilenameFromUrl(existingCertificate.imageUrl);
        deleteImage(oldFilename);
      }
    } else if (bodyImageUrl !== undefined) {
      // If client explicitly passed a different imageUrl
      imageUrl = bodyImageUrl || null;
      if (existingCertificate.imageUrl && existingCertificate.imageUrl !== bodyImageUrl && existingCertificate.imageUrl.startsWith('/uploads/')) {
        const oldFilename = getFilenameFromUrl(existingCertificate.imageUrl);
        deleteImage(oldFilename);
      }
    }

    const certificate = await prisma.certificate.update({
      where: { id: parseInt(id) },
      data: { title, verifiedBy, imageUrl },
    });
    res.json(certificate);
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Failed to update certificate' });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCertificate = await prisma.certificate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCertificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    // Delete image file from disk if it was an uploaded file
    if (existingCertificate.imageUrl && existingCertificate.imageUrl.startsWith('/uploads/')) {
      const filename = getFilenameFromUrl(existingCertificate.imageUrl);
      deleteImage(filename);
    }

    await prisma.certificate.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
};
