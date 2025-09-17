const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Room = require('./models/Room');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pg_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@pg.com',
      password: hashedPassword,
      phone: '1234567890',
      role: 'admin'
    });

    // Create sample rooms
    const rooms = await Room.insertMany([
      {
        roomNumber: '101',
        capacity: 2,
        rent: 8000,
        amenities: ['Wi-Fi', 'AC', 'Attached Bathroom'],
        status: 'available'
      },
      {
        roomNumber: '102',
        capacity: 3,
        rent: 10000,
        amenities: ['Wi-Fi', 'Non-AC', 'Attached Bathroom'],
        status: 'available'
      },
      {
        roomNumber: '103',
        capacity: 2,
        rent: 7500,
        amenities: ['Wi-Fi', 'AC', 'Common Bathroom'],
        status: 'available'
      },
      {
        roomNumber: '201',
        capacity: 1,
        rent: 6000,
        amenities: ['Wi-Fi', 'Non-AC', 'Common Bathroom'],
        status: 'available'
      }
    ]);

    console.log('Data seeded successfully');
    console.log('Admin credentials:');
    console.log('Email: admin@pg.com');
    console.log('Password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();