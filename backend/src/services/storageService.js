const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

/**
 * Get the public URL path for an uploaded image
 * @param {string} filename - The filename of the uploaded image
 * @returns {string} The public URL path
 */
const getImageUrl = (filename) => {
  if (!filename) return null;
  return '/uploads/' + filename;
};

/**
 * Delete an image file from the uploads directory
 * @param {string} filename - The filename to delete
 */
const deleteImage = (filename) => {
  if (!filename) return;

  const filePath = path.join(uploadsDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filename}`);
    }
  } catch (error) {
    console.error(`Failed to delete file ${filename}:`, error.message);
  }
};

/**
 * Extract the filename from a stored image URL path
 * @param {string} imageUrl - The image URL (e.g. "/uploads/123-photo.jpg")
 * @returns {string|null} The filename portion
 */
const getFilenameFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  return imageUrl.replace('/uploads/', '');
};

module.exports = {
  getImageUrl,
  deleteImage,
  getFilenameFromUrl,
};
