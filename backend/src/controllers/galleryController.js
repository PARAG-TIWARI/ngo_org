const prisma = require('../prisma');
const { uploadToPersistentStorage, deleteImage } = require('../services/storageService');

const mapItem = (item) => ({
  ...item,
  _id: item.id,
  image: item.imageUrl,
});

/**
 * GET /api/gallery
 * Get all gallery items, optionally filtered by category
 */
const getAll = async (req, res) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category && category !== 'all') {
      where.category = category;
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(items.map(mapItem));
  } catch (error) {
    console.error('Gallery getAll error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery items.' });
  }
};

/**
 * GET /api/gallery/categories
 * Get distinct categories from gallery items
 */
const getCategories = async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    const categories = items.map((item) => item.category);

    res.json(categories);
  } catch (error) {
    console.error('Gallery getCategories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
};

/**
 * POST /api/gallery
 * Upload an image and create a gallery item (admin only)
 */
const create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const { caption, category } = req.body;

    if (!category) {
      return res.status(400).json({ error: 'Category is required.' });
    }

    const imageUrl = await uploadToPersistentStorage(req.file);

    const item = await prisma.galleryItem.create({
      data: {
        imageUrl,
        caption: caption || null,
        category,
      },
    });

    res.status(201).json(mapItem(item));
  } catch (error) {
    console.error('Gallery create error:', error);
    res.status(500).json({ error: 'Failed to create gallery item.' });
  }
};

/**
 * DELETE /api/gallery/:id
 * Delete a gallery item and its image file (admin only)
 */
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.galleryItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!item) {
      return res.status(404).json({ error: 'Gallery item not found.' });
    }

    await deleteImage(item.imageUrl);

    // Delete the record from database
    await prisma.galleryItem.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Gallery item deleted successfully.' });
  } catch (error) {
    console.error('Gallery delete error:', error);
    res.status(500).json({ error: 'Failed to delete gallery item.' });
  }
};

module.exports = {
  getAll,
  getCategories,
  create,
  delete: remove,
};
