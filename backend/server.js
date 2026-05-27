require('dotenv').config();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const volunteerRoutes = require('./src/routes/volunteerRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const certificateRoutes = require('./src/routes/certificateRoutes');
const donationRoutes = require('./src/routes/donationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
console.log('Server is using DATABASE_URL:', process.env.DATABASE_URL);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/donations', donationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NGO Backend is running' });
});

// API root endpoint for quick verification
app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NGO API root is live',
    routes: ['/api/health', '/api/auth', '/api/gallery', '/api/activities', '/api/volunteers', '/api/contact', '/api/settings', '/api/members', '/api/certificates', '/api/donations'],
  });
});

// Root endpoint for quick backend verification
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'NGO Backend is live',
    info: 'Use /api/health for health checks and /api/* for API routes',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ error: 'Unexpected file field.' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 NGO Backend server running on http://localhost:${PORT}`);
});