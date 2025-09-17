const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Valid room number is required'],
    trim: true,
    uppercase: true
  },
  capacity: { type: Number, required: true, min: 1 },
  currentOccupancy: { type: Number, default: 0, min: 0 },
  rent: { type: Number, required: true, min: 0 },
  amenities: [{ type: String, trim: true }],
  status: { type: String, enum: ['available','occupied','maintenance'], default: 'available' }
}, { timestamps: true });

// Only one unique index, ignoring null or empty strings
roomSchema.index(
  { roomNumber: 1 },
  { unique: true, partialFilterExpression: { roomNumber: { $exists: true, $nin: [null, ""] } } }
);

module.exports = mongoose.model('Room', roomSchema);
