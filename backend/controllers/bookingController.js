import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      hallId,
      date,
      startTime,
      endTime,
      guests,
      eventType,
      paymentMethod,
      paymentStatus,
      specialRequests,
    } = req.body;

    const booking = await Booking.create({
      userId: req.user.userId,
      hallId,
      date,
      startTime,
      endTime,
      guests,
      eventType,
      paymentMethod,
      paymentStatus,
      specialRequests,
      status: "pending",
    });

    res.json({
      msg: "Booking created",
      booking,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= GET BOOKINGS =================
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("hallId", "name images")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ================= UPDATE STATUS =================
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({
      msg: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};