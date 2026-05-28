const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
const getBackendBaseUrl = () => {
  const configured = process.env.BACKEND_BASE_URL || process.env.RENDER_EXTERNAL_URL || process.env.PUBLIC_BACKEND_URL;
  return configured ? configured.replace(/\/$/, '') : '';
};
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Get the public URL path for an uploaded image
 * @param {string} filename - The filename of the uploaded image
 * @returns {string} The public URL path
 */
const getImageUrl = (filename) => {
  if (!filename) return null;

  if (typeof filename === 'string' && /^https?:\/\//i.test(filename)) {
    return filename;
  }

  const baseUrl = getBackendBaseUrl();
  return baseUrl
    ? `${baseUrl}/uploads/${filename}`
    : '/uploads/' + filename;
};

const isCloudinaryUrl = (imageUrl) => typeof imageUrl === 'string' && imageUrl.includes('res.cloudinary.com');

const getCloudinaryPublicId = (imageUrl) => {
  if (!isCloudinaryUrl(imageUrl)) return null;

  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/i);
  return match ? match[1].replace(/^v\d+\//, '') : null;
};

const uploadToPersistentStorage = async (file) => {
  if (!file) return null;

  try {
    if (isCloudinaryConfigured) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'ngo-org/gallery',
        resource_type: 'image',
      });

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return result.secure_url;
    }

    return getImageUrl(file.filename);
  } catch (error) {
    console.error('Persistent image upload failed, falling back to local storage:', error.message);
    return getImageUrl(file.filename);
  }
};

/**
 * Delete an image file from the uploads directory or Cloudinary
 * @param {string} imageUrl - The image url to delete
 */
const deleteImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const publicId = getCloudinaryPublicId(imageUrl);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted Cloudinary image: ${publicId}`);
      return;
    }

    const filename = getFilenameFromUrl(imageUrl);
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted local file: ${filename}`);
    }
  } catch (error) {
    console.error(`Failed to delete image ${imageUrl}:`, error.message);
  }
};

/**
 * Extract the filename from a stored image URL path
 * @param {string} imageUrl - The image URL (e.g. "/uploads/123-photo.jpg")
 * @returns {string|null} The filename portion
 */
const getFilenameFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) {
    const url = new URL(imageUrl);
    return url.pathname.split('/').filter(Boolean).pop() || null;
  }
  return imageUrl.replace('/uploads/', '');
};

module.exports = {
  getImageUrl,
  uploadToPersistentStorage,
  deleteImage,
  getFilenameFromUrl,
};
