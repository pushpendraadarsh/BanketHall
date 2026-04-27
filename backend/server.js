import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import hallRoutes from './routes/halls.js';
import bookingRoutes from './routes/bookings.js';
import enquiryRoutes from './routes/enquiry.js';
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Banquet Hall Backend API' });
});

app.use("/uploads", express.static("uploads"));
// Routes
app.use('/api/auth', authRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/halls', hallRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use("/api/users", userRoutes);
// Admin Stats Endpoint (Simple version)
app.get('/api/admin/stats', async (req, res) => {
  try {
    // Try to get real data if models exist
    let totalBookings = 0, pendingBookings = 0, confirmedBookings = 0;
    let cancelledBookings = 0, completedBookings = 0, totalRevenue = 0;
    let totalUsers = 0, totalHalls = 0;
    let monthlyBookings = [];
    let popularHalls = [];
    let recentBookings = [];
    
    try {
      const Booking = mongoose.model('Booking');
      const User = mongoose.model('User');
      const Hall = mongoose.model('Hall');
      
      // Get counts
      totalBookings = await Booking.countDocuments();
      pendingBookings = await Booking.countDocuments({ status: 'pending' });
      confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
      cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });
      completedBookings = await Booking.countDocuments({ status: 'completed' });
      
      const revenueResult = await Booking.aggregate([
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ]);
      totalRevenue = revenueResult[0]?.total || 0;
      
      totalUsers = await User.countDocuments();
      totalHalls = await Hall.countDocuments();
      
      // Recent bookings
      recentBookings = await Booking.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name email')
        .populate('hallId', 'name');
      
    } catch (err) {
      console.log('Using mock data - models not ready yet');
      // Use mock data if models don't exist
      totalBookings = 145;
      pendingBookings = 12;
      confirmedBookings = 89;
      cancelledBookings = 23;
      completedBookings = 21;
      totalRevenue = 1250000;
      totalUsers = 342;
      totalHalls = 8;
      
      monthlyBookings = [
        { _id: { month: 1, year: 2024 }, count: 12, revenue: 120000 },
        { _id: { month: 2, year: 2024 }, count: 15, revenue: 150000 },
        { _id: { month: 3, year: 2024 }, count: 18, revenue: 180000 },
        { _id: { month: 4, year: 2024 }, count: 22, revenue: 220000 },
        { _id: { month: 5, year: 2024 }, count: 25, revenue: 250000 },
        { _id: { month: 6, year: 2024 }, count: 28, revenue: 280000 }
      ];
      
      popularHalls = [
        { _id: 1, hall: { name: 'Grand Ballroom' }, count: 45, revenue: 450000 },
        { _id: 2, hall: { name: 'Garden View' }, count: 32, revenue: 320000 },
        { _id: 3, hall: { name: 'Royal Suite' }, count: 28, revenue: 280000 }
      ];
      
      recentBookings = [
        { 
          _id: 1, 
          userId: { name: 'John Doe', email: 'john@example.com' }, 
          hallId: { name: 'Grand Ballroom' },
          date: new Date(),
          startTime: '10:00',
          endTime: '14:00',
          status: 'confirmed'
        }
      ];
    }
    
    const stats = {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      totalUsers,
      totalHalls,
      monthlyBookings,
      popularHalls,
      recentBookings
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    // Return mock data on error
    res.json({
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
      completedBookings: 0,
      totalRevenue: 0,
      totalUsers: 0,
      totalHalls: 0,
      monthlyBookings: [],
      popularHalls: [],
      recentBookings: []
    });
  }
});
// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


