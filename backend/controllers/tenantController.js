const Tenant = require('../models/Tenant');
const Room = require('../models/Room');

// Get all tenants
const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate('room', 'roomNumber rent')
      .sort({ createdAt: -1 });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single tenant
const getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id).populate('room', 'roomNumber rent');
    
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create tenant
const createTenant = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      emergencyContact,
      address,
      idProof,
      idNumber,
      room: roomId,
      checkInDate,
      rent
    } = req.body;

    // Check if room exists and has capacity
    const room = await Room.findById(roomId);
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.currentOccupancy >= room.capacity) {
      return res.status(400).json({ message: 'Room is at full capacity' });
    }

    const tenant = await Tenant.create({
      name,
      email,
      phone,
      emergencyContact,
      address,
      idProof,
      idNumber,
      room: roomId,
      checkInDate,
      rent
    });

    // Update room occupancy
    room.currentOccupancy += 1;
    if (room.currentOccupancy === room.capacity) {
      room.status = 'occupied';
    }
    await room.save();

    const populatedTenant = await Tenant.findById(tenant._id).populate('room', 'roomNumber rent');
    
    res.status(201).json(populatedTenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update tenant
const updateTenant = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      emergencyContact,
      address,
      idProof,
      idNumber,
      status
    } = req.body;

    const tenant = await Tenant.findById(req.params.id);

    if (tenant) {
      tenant.name = name || tenant.name;
      tenant.email = email || tenant.email;
      tenant.phone = phone || tenant.phone;
      tenant.emergencyContact = emergencyContact || tenant.emergencyContact;
      tenant.address = address || tenant.address;
      tenant.idProof = idProof || tenant.idProof;
      tenant.idNumber = idNumber || tenant.idNumber;
      tenant.status = status || tenant.status;

      const updatedTenant = await tenant.save();
      const populatedTenant = await Tenant.findById(updatedTenant._id).populate('room', 'roomNumber rent');
      
      res.json(populatedTenant);
    } else {
      res.status(404).json({ message: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete tenant
const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (tenant) {
      // Update room occupancy
      const room = await Room.findById(tenant.room);
      if (room) {
        room.currentOccupancy -= 1;
        if (room.currentOccupancy < room.capacity) {
          room.status = 'available';
        }
        await room.save();
      }

      await Tenant.deleteOne({ _id: req.params.id });
      res.json({ message: 'Tenant removed' });
    } else {
      res.status(404).json({ message: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Checkout tenant
const checkoutTenant = async (req, res) => {
  try {
    const { checkOutDate } = req.body;

    const tenant = await Tenant.findById(req.params.id);

    if (tenant) {
      tenant.checkOutDate = checkOutDate || new Date();
      tenant.status = 'inactive';

      // Update room occupancy
      const room = await Room.findById(tenant.room);
      if (room) {
        room.currentOccupancy -= 1;
        if (room.currentOccupancy < room.capacity) {
          room.status = 'available';
        }
        await room.save();
      }

      const updatedTenant = await tenant.save();
      const populatedTenant = await Tenant.findById(updatedTenant._id).populate('room', 'roomNumber rent');
      
      res.json(populatedTenant);
    } else {
      res.status(404).json({ message: 'Tenant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
  checkoutTenant
};