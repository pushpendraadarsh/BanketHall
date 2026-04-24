import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String, // keep simple: "YYYY-MM-DD"
    required: true,
  },
  startTime: {
    type: String, // "10:00"
    required: true,
  },
  endTime: {
    type: String, // "12:00"
    required: true,
  },
  guests: Number,
  eventType: String,
  paymentMethod: String,
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);