import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  amenities: [String],
  images: [String],
  description: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Hall', hallSchema);

