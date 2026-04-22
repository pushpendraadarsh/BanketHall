import Booking from '../models/Booking.js';
import Hall from '../models/Hall.js';

export const createBooking = async (req, res) => {
  const { hallId, date, startTime, endTime } = req.body;
  const userId = req.user;

  try {
    // Simple availability check (expand later)
    const hall = await Hall.findById(hallId);
    if (!hall || !hall.isAvailable) {
      return res.status(400).json({ msg: 'Hall not available' });
    }

    const duration = parseInt(endTime.split(':')[0]) - parseInt(startTime.split(':')[0]);
    const totalPrice = duration * hall.pricePerHour;

    const booking = new Booking({ userId, hallId, date, startTime, endTime, totalPrice });
    await booking.save();

    // Update hall availability (simplified)
    hall.isAvailable = false;
    await hall.save();

    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getBookings = async (req, res) => {
  const userId = req.user;
  try {
    const bookings = await Booking.find({ userId }).populate('hallId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

