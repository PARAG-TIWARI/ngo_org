const prisma = require('../prisma');

const mapMessage = (msg) => ({
  ...msg,
  _id: msg.id,
  status: msg.isRead ? 'read' : 'unread',
});

/**
 * POST /api/contact
 * Submit a new contact message (public)
 */
const submit = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required.',
      });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json({
      message: 'Your message has been sent successfully. We will get back to you soon!',
      contactMessage: mapMessage(contactMessage),
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ error: 'Failed to submit contact message.' });
  }
};

/**
 * GET /api/contact
 * Get all contact messages (admin only)
 */
const getAll = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(messages.map(mapMessage));
  } catch (error) {
    console.error('Contact getAll error:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages.' });
  }
};

/**
 * PATCH /api/contact/:id/read
 * Toggle the isRead status of a contact message (admin only)
 */
const markRead = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.contactMessage.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }

    let isRead = !existing.isRead;
    if (status !== undefined) {
      isRead = status === 'read';
    }

    const updated = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead },
    });

    res.json(mapMessage(updated));
  } catch (error) {
    console.error('Contact markRead error:', error);
    res.status(500).json({ error: 'Failed to update message status.' });
  }
};

module.exports = {
  submit,
  getAll,
  markRead,
};
