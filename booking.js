const express = require('express');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const router = express.Router();

// Book a room
router.post('/book', async (req, res) => {
    const { userId, hotelId, roomNumber, checkIn, checkOut } = req.body;

    const hotel = await Hotel.findById(hotelId);
    const room = hotel.rooms.find(room => room.number === roomNumber);
    if (!room || !room.available) return res.status(400).send('Room not available');

    const booking = new Booking({ user: userId, hotel: hotelId, roomNumber, checkIn, checkOut });
    await booking.save();

    room.available = false;
    await hotel.save();

    res.status(201).send('Room booked');
});

module.exports = router;
