import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);

export default router;

