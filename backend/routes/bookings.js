import express from "express";
import auth from "../middleware/auth.js";
import {
  createBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// protected route
router.post("/", auth, createBooking);

// admin or user view
router.get("/", auth, getBookings);

export default router;