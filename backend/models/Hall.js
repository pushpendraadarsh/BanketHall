import mongoose from "mongoose";

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    amenities: {
      type: [String],
      default: [],
    },

    images: {
      type: [String], // store image URLs
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // ⭐ ADD THIS (important for admin UI cards)
    featured: {
      type: Boolean,
      default: false,
    },

    // ⭐ OPTIONAL (useful for filtering/search)
    location: {
      type: String,
      default: "",
    },

    // ⭐ OPTIONAL (future booking control)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hall", hallSchema);