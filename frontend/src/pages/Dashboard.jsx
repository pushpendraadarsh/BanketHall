import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Dashboard = () => {
  const { bookings, fetchBookings, loading } = useBooking();
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-4">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600">Welcome back, {user?.role}!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div className="glossy-card p-8 rounded-3xl text-center" whileHover={{ scale: 1.02 }}>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2">Bookings</h3>
              <p className="text-4xl font-bold text-gray-900">{bookings.length}</p>
            </motion.div>
            <motion.div className="glossy-card p-8 rounded-3xl text-center" whileHover={{ scale: 1.02 }}>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-2">Active</h3>
              <p className="text-4xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p>
            </motion.div>
          </div>

          <div className="glossy-card p-8 rounded-3xl overflow-hidden">
            <h3 className="text-2xl font-bold mb-6">Recent Bookings</h3>
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No bookings yet. Book your first hall!</div>
            ) : (
              <div className="space-y-4">
                {bookings.slice(0, 3).map((booking) => (
                  <motion.div key={booking._id} className="flex justify-between items-center p-6 bg-white/50 rounded-2xl" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <div>
                      <h4 className="font-semibold">{booking.hallId?.name || 'Hall'}</h4>
                      <p className="text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()} | {booking.startTime} - {booking.endTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">${booking.totalPrice}</span>
                      <p className="text-sm text-gray-600 capitalize">{booking.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

