const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bannerUrl: String,
  isPublished: { type: Boolean, default: false },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxParticipants: { type: Number, default: 100 },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
