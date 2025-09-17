const Room = require('../models/Room');

// Create a new room
const createRoom = async (req, res) => {
  try {
    let { roomNumber, capacity, rent, amenities, status } = req.body;

    // Validate roomNumber
    if (!roomNumber || typeof roomNumber !== 'string' || roomNumber.trim() === '') {
      return res.status(400).json({ message: 'Valid room number is required' });
    }

    // Normalize roomNumber
    roomNumber = roomNumber.trim().toUpperCase();

    // Check for duplicate room number (case-insensitive)
    const existingRoom = await Room.findOne({
      roomNumber: { $regex: `^${roomNumber}$`, $options: 'i' }
    });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room with this number already exists' });
    }

    // Validate numbers
    capacity = Number(capacity);
    rent = Number(rent);

    if (isNaN(capacity) || capacity < 1) {
      return res.status(400).json({ message: 'Capacity must be a number and at least 1' });
    }
    if (isNaN(rent) || rent < 0) {
      return res.status(400).json({ message: 'Rent must be a valid number and cannot be negative' });
    }

    // Process amenities
    let amenitiesArray = [];
    if (amenities) {
      if (typeof amenities === 'string') {
        amenitiesArray = amenities.split(',').map(a => a.trim()).filter(Boolean);
      } else if (Array.isArray(amenities)) {
        amenitiesArray = amenities.filter(Boolean);
      }
    }

    // Create room
    const room = await Room.create({
      roomNumber,
      capacity,
      rent,
      amenities: amenitiesArray,
      status: status || 'available'
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Create room error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Room with this number already exists' });
    }

    res.status(500).json({ message: 'Failed to create room. Please try again.' });
  }
};

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
};

// Get single room
const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ message: 'Failed to fetch room' });
  }
};

// Update room
const updateRoom = async (req, res) => {
  try {
    let { roomNumber, capacity, rent, amenities, status } = req.body;

    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check for duplicate room number if changing
    if (roomNumber && roomNumber.trim().toUpperCase() !== room.roomNumber) {
      const existingRoom = await Room.findOne({
        roomNumber: { $regex: `^${roomNumber.trim()}$`, $options: 'i' }
      });
      if (existingRoom) {
        return res.status(400).json({ message: 'Room with this number already exists' });
      }
      room.roomNumber = roomNumber.trim().toUpperCase();
    }

    // Update other fields
    if (capacity) room.capacity = Number(capacity);
    if (rent) room.rent = Number(rent);
    if (amenities) room.amenities = Array.isArray(amenities) ? amenities : amenities.split(',').map(a => a.trim());
    if (status) room.status = status;

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    console.error('Update room error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to update room' });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Prevent deletion if room has tenants
    if (room.currentOccupancy > 0) {
      return res.status(400).json({ message: 'Cannot delete room with tenants' });
    }

    await Room.deleteOne({ _id: req.params.id });
    res.json({ message: 'Room removed' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ message: 'Failed to delete room' });
  }
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom
};
