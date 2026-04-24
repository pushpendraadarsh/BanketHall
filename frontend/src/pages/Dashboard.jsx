import { useAuth } from "../context/AuthContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();

  const {
    stats,
    bookings,
    fetchStats,
    fetchBookings,
    loading,
  } = useBooking();

  // ✅ FIXED: proper dependency array
  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, [fetchStats, fetchBookings]);

  // ✅ safety checks
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const safeStats = stats || {
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome 👋
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {user?.email || "User"}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">

          <motion.div whileHover={{ scale: 1.03 }} className="p-5 sm:p-6 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {safeStats.totalBookings}
            </h2>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-5 sm:p-6 bg-yellow-100 rounded-xl shadow">
            <p className="text-yellow-700 text-sm">Pending</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {safeStats.pendingBookings}
            </h2>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-5 sm:p-6 bg-green-100 rounded-xl shadow">
            <p className="text-green-700 text-sm">Confirmed</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {safeStats.confirmedBookings}
            </h2>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-5 sm:p-6 bg-red-100 rounded-xl shadow">
            <p className="text-red-700 text-sm">Cancelled</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {safeStats.cancelledBookings}
            </h2>
          </motion.div>

        </div>

        {/* BOOKINGS SECTION */}
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">

          <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
            Recent Bookings
          </h2>

          {/* LOADING */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          ) : safeBookings.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No bookings yet</p>
              <p className="text-sm">Start by booking a hall 🎉</p>
            </div>
          ) : (
            safeBookings.slice(0, 5).map((b) => (
              <div
                key={b._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-4 gap-2"
              >

                {/* LEFT */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {b.hallId?.name || "Hall"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(b.date).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="sm:text-right">
                  <p className="font-bold">
                    ₹{b.totalPrice || 0}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      b.status === "confirmed"
                        ? "bg-green-200 text-green-800"
                        : b.status === "cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {b.status || "pending"}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;