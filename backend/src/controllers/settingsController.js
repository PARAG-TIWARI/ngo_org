const prisma = require('../prisma');

/**
 * GET /api/settings
 * Get all settings as a key-value object (public)
 */
const getPublic = async (req, res) => {
  try {
    const settings = await prisma.setting.findMany();

    // Convert array of { key, value } to a plain object
    const settingsObj = {};
    for (const setting of settings) {
      settingsObj[setting.key] = setting.value;
    }

    res.json(settingsObj);
  } catch (error) {
    console.error('Settings getPublic error:', error);
    res.status(500).json({ error: 'Failed to fetch settings.' });
  }
};

/**
 * PUT /api/settings/:key
 * Update a setting by key (admin only)
 */
const update = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined || value === null) {
      return res.status(400).json({ error: 'Value is required.' });
    }

    const existing = await prisma.setting.findUnique({
      where: { key },
    });

    if (!existing) {
      // Create the setting if it doesn't exist
      const setting = await prisma.setting.create({
        data: { key, value: String(value) },
      });
      return res.status(201).json(setting);
    }

    const setting = await prisma.setting.update({
      where: { key },
      data: { value: String(value) },
    });

    res.json(setting);
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ error: 'Failed to update setting.' });
  }
};

module.exports = {
  getPublic,
  update,
};
