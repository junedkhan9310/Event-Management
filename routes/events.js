const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authenticate = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// File upload config (JPEG/PNG, max 2MB)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const fileFilter = (req, file, cb) => {
  const allowed = ['.jpeg', '.jpg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// ➕ Create Event (protected)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { title, description, location, startTime, endTime, maxParticipants } = req.body;
    const event = await Event.create({
      title,
      description,
      location,
      startTime,
      endTime,
      createdBy: req.user.id,
      maxParticipants,
    });
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

// 📥 Upload banner image
router.post('/:id/upload', authenticate, upload.single('banner'), async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    event.bannerUrl = `/uploads/${req.file.filename}`;
    await event.save();
    res.json({ message: 'Banner uploaded', bannerUrl: event.bannerUrl });
  } catch (err) {
    next(err);
  }
});

// 📃 Get all events
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// 🔍 Get event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// ✏️ Update event (creator only)
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// ❌ Delete event
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
