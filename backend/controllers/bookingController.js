import Booking from "../models/Booking.js";

// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    const { hallId, date, startTime, endTime, totalPrice } = req.body;

    console.log("REQ BODY:", req.body);

    if (!hallId || !date || !startTime || !endTime) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // safer date conversion
    const bookingDate = new Date(date);

    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ msg: "Invalid date" });
    }

    // IMPORTANT: convert hallId to ObjectId if using MongoDB
    const mongoose = await import("mongoose");

    const hallObjectId = new mongoose.default.Types.ObjectId(hallId);

    const existingBooking = await Booking.findOne({
      hallId: hallObjectId,
      date: bookingDate,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ msg: "Hall not available" });
    }

    const booking = new Booking({
      userId: req.user.userId,
      hallId: hallObjectId,
      date: bookingDate,
      startTime,
      endTime,
      totalPrice: totalPrice || 0,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      msg: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("🔥 Booking Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Get Bookings (User/Admin)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hallId", "name")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Fetch Booking Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};