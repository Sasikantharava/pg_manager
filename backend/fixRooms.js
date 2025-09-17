// backend/fixRooms.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./models/Room');
const Tenant = require('./models/Tenant');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixRooms = async () => {
  try {
    console.log('Fixing room occupancy and status...');

    // Get all rooms
    const rooms = await Room.find({});

    // Reset all rooms occupancy and status
    for (const room of rooms) {
      room.currentOccupancy = 0;
      room.status = 'available';
      await room.save();
    }

    // Get all active tenants
    const tenants = await Tenant.find({ status: 'active' });

    // Update room occupancy based on active tenants
    for (const tenant of tenants) {
      const room = await Room.findById(tenant.room);
      if (room) {
        room.currentOccupancy += 1;
        if (room.currentOccupancy >= room.capacity) {
          room.status = 'occupied';
        }
        await room.save();
      }
    }

    console.log('Room occupancy and status fixed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

fixRooms();