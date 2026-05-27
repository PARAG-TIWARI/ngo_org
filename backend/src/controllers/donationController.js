const prisma = require('../prisma');

/**
 * POST /api/donations
 * Submit a new donation record (public)
 */
const submit = async (req, res) => {
  try {
    const { donorName, email, phone, amount, transactionId, paymentDate, paymentMethod, message } = req.body;

    if (!donorName || !phone || !amount || !transactionId || !paymentDate) {
      return res.status(400).json({
        error: 'Donor name, phone, amount, transaction ID, and payment date are required.',
      });
    }

    const donation = await prisma.donation.create({
      data: {
        donorName,
        email: email || null,
        phone,
        amount,
        transactionId,
        paymentDate,
        paymentMethod: paymentMethod || 'Bank Transfer',
        message: message || null,
      },
    });

    res.status(201).json({
      message: 'Thank you! Your donation has been recorded successfully. We will verify it shortly.',
      donation,
    });
  } catch (error) {
    console.error('Donation submit error:', error);
    res.status(500).json({ error: 'Failed to submit donation record.' });
  }
};

/**
 * GET /api/donations
 * Get all donations (admin only)
 */
const getAll = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(donations);
  } catch (error) {
    console.error('Donation getAll error:', error);
    res.status(500).json({ error: 'Failed to fetch donations.' });
  }
};

/**
 * PATCH /api/donations/:id/verify
 * Toggle verified status (admin only)
 */
const toggleVerify = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Donation not found.' });
    }

    const updated = await prisma.donation.update({
      where: { id: parseInt(id) },
      data: { isVerified: !existing.isVerified },
    });

    res.json(updated);
  } catch (error) {
    console.error('Donation toggleVerify error:', error);
    res.status(500).json({ error: 'Failed to update donation status.' });
  }
};

/**
 * DELETE /api/donations/:id
 * Delete a donation record (admin only)
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.donation.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Donation deleted successfully.' });
  } catch (error) {
    console.error('Donation delete error:', error);
    res.status(500).json({ error: 'Failed to delete donation.' });
  }
};

module.exports = {
  submit,
  getAll,
  toggleVerify,
  remove,
};
