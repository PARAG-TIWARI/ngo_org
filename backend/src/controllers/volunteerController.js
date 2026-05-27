const prisma = require('../prisma');

const mapVolunteer = (volunteer) => ({
  ...volunteer,
  _id: volunteer.id,
});

/**
 * POST /api/volunteers
 * Register a new volunteer (public)
 */
const register = async (req, res) => {
  try {
    const { fullName, email, phone, skills, availability, areaOfInterest } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        error: 'Full name, email, and phone are required.',
      });
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName,
        email,
        phone,
        skills: skills || null,
        availability: availability || null,
        areaOfInterest: areaOfInterest || null,
      },
    });

    res.status(201).json({
      message: 'Volunteer registration successful. Thank you for your interest!',
      volunteer,
    });
  } catch (error) {
    console.error('Volunteer register error:', error);
    res.status(500).json({ error: 'Failed to register volunteer.' });
  }
};

/**
 * GET /api/volunteers
 * Get all registered volunteers (admin only)
 */
const getAll = async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(volunteers.map(mapVolunteer));
  } catch (error) {
    console.error('Volunteer getAll error:', error);
    res.status(500).json({ error: 'Failed to fetch volunteers.' });
  }
};

module.exports = {
  register,
  getAll,
};
