import express from "express";
import auth from "../middleware/auth.js";
import { adminOnly } from "../middleware/adminOnly.js";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// user creates booking
router.post("/", auth, createBooking);

// admin/superadmin only
router.get("/", auth, adminOnly, getBookings);

router.put("/:id/status", auth, adminOnly, updateBookingStatus);

export default router;