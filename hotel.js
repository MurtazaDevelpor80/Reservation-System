const express = require('express');
const Hotel = require('../models/Hotel');
const router = express.Router();

// Add a hotel (admin only)
router.post('/add', async (req, res) => {
    const { name, location, description, rooms } = req.body;
    const hotel = new Hotel({ name, location, description, rooms });
    await hotel.save();
    res.status(201).send('Hotel added');
});

// Get available hotels
router.get('/', async (req, res) => {
    const hotels = await Hotel.find();
    res.send(hotels);
});

// Check available rooms
router.get('/:id/rooms', async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    const availableRooms = hotel.rooms.filter(room => room.available);
    res.send(availableRooms);
});

module.exports = router;
