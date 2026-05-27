const prisma = require('../prisma');
const { getImageUrl, deleteImage, getFilenameFromUrl } = require('../services/storageService');

exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

exports.createMember = async (req, res) => {
  try {
    const { name, designation, profession } = req.body;
    if (!name || !designation) {
      return res.status(400).json({ error: 'Name and designation are required' });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = getImageUrl(req.file.filename);
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const member = await prisma.member.create({
      data: {
        name,
        designation,
        profession: profession || null,
        imageUrl,
      },
    });
    res.status(201).json(member);
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({ error: 'Failed to create member' });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, profession, imageUrl: bodyImageUrl } = req.body;

    const existingMember = await prisma.member.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    let imageUrl = existingMember.imageUrl;

    if (req.file) {
      // New file uploaded
      imageUrl = getImageUrl(req.file.filename);
      // Delete old local file if it exists
      if (existingMember.imageUrl && existingMember.imageUrl.startsWith('/uploads/')) {
        const oldFilename = getFilenameFromUrl(existingMember.imageUrl);
        deleteImage(oldFilename);
      }
    } else if (bodyImageUrl !== undefined) {
      // If client explicitly passed a different imageUrl
      imageUrl = bodyImageUrl || null;
      if (existingMember.imageUrl && existingMember.imageUrl !== bodyImageUrl && existingMember.imageUrl.startsWith('/uploads/')) {
        const oldFilename = getFilenameFromUrl(existingMember.imageUrl);
        deleteImage(oldFilename);
      }
    }

    const member = await prisma.member.update({
      where: { id: parseInt(id) },
      data: {
        name,
        designation,
        profession: profession || null,
        imageUrl,
      },
    });
    res.json(member);
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Failed to update member' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const existingMember = await prisma.member.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Delete image file from disk if it was an uploaded file
    if (existingMember.imageUrl && existingMember.imageUrl.startsWith('/uploads/')) {
      const filename = getFilenameFromUrl(existingMember.imageUrl);
      deleteImage(filename);
    }

    await prisma.member.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: 'Failed to delete member' });
  }
};
