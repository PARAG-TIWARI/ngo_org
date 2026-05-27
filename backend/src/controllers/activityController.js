const prisma = require('../prisma');
const { getImageUrl, deleteImage, getFilenameFromUrl } = require('../services/storageService');

const mapActivity = (activity) => ({
  ...activity,
  _id: activity.id,
  image: activity.imageUrl,
  extraImages: activity.images || [],
});

/**
 * GET /api/activities
 * Get all activities ordered by creation date
 */
const getAll = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      include: { images: true },
    });

    res.json(activities.map(mapActivity));
  } catch (error) {
    console.error('Activity getAll error:', error);
    res.status(500).json({ error: 'Failed to fetch activities.' });
  }
};

/**
 * GET /api/activities/:id
 * Get a single activity by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found.' });
    }

    res.json(mapActivity(activity));
  } catch (error) {
    console.error('Activity getById error:', error);
    res.status(500).json({ error: 'Failed to fetch activity.' });
  }
};

/**
 * POST /api/activities
 * Create a new activity with optional image (admin only)
 */
const create = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({
        error: 'Title, description, date, and location are required.',
      });
    }

    const imageUrl = req.files && req.files['image'] ? getImageUrl(req.files['image'][0].filename) : null;
    
    let captions = [];
    if (req.body.captions) {
      captions = Array.isArray(req.body.captions) ? req.body.captions : [req.body.captions];
    }

    const imagesData = req.files && req.files['extraImages'] 
      ? req.files['extraImages'].map((f, i) => ({
          imageUrl: getImageUrl(f.filename),
          caption: captions[i] || null
        }))
      : [];

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        date,
        location,
        imageUrl,
        images: {
          create: imagesData
        },
      },
      include: { images: true },
    });

    res.status(201).json(mapActivity(activity));
  } catch (error) {
    console.error('Activity create error:', error);
    res.status(500).json({ error: 'Failed to create activity.' });
  }
};

/**
 * PUT /api/activities/:id
 * Update an activity, optionally replacing its image (admin only)
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location } = req.body;

    const existing = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: 'Activity not found.' });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (date) updateData.date = date;
    if (location) updateData.location = location;

    // If a new image was uploaded, delete the old one and use the new one
    if (req.files && req.files['image']) {
      if (existing.imageUrl) {
        const oldFilename = getFilenameFromUrl(existing.imageUrl);
        deleteImage(oldFilename);
      }
      updateData.imageUrl = getImageUrl(req.files['image'][0].filename);
    }

    if (req.files && req.files['extraImages']) {
      // First, delete old files from disk
      const existingImages = await prisma.activityImage.findMany({ where: { activityId: parseInt(id) }});
      existingImages.forEach(img => {
        const oldFilename = getFilenameFromUrl(img.imageUrl);
        deleteImage(oldFilename);
      });
      // Delete old records from DB
      await prisma.activityImage.deleteMany({ where: { activityId: parseInt(id) }});

      let captions = [];
      if (req.body.captions) {
        captions = Array.isArray(req.body.captions) ? req.body.captions : [req.body.captions];
      }

      const imagesData = req.files['extraImages'].map((f, i) => ({
        imageUrl: getImageUrl(f.filename),
        caption: captions[i] || null
      }));

      updateData.images = {
        create: imagesData
      };
    }

    const activity = await prisma.activity.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { images: true },
    });

    res.json(mapActivity(activity));
  } catch (error) {
    console.error('Activity update error:', error);
    res.status(500).json({ error: 'Failed to update activity.' });
  }
};

/**
 * DELETE /api/activities/:id
 * Delete an activity and its image file (admin only)
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
    });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found.' });
    }

    // Delete the image file from disk
    if (activity.imageUrl) {
      const filename = getFilenameFromUrl(activity.imageUrl);
      deleteImage(filename);
    }

    // Delete extra images from disk
    const existingImages = await prisma.activityImage.findMany({ where: { activityId: parseInt(id) }});
    existingImages.forEach(img => {
      const filename = getFilenameFromUrl(img.imageUrl);
      deleteImage(filename);
    });

    // Delete the record from database
    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Activity deleted successfully.' });
  } catch (error) {
    console.error('Activity delete error:', error);
    res.status(500).json({ error: 'Failed to delete activity.' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};
