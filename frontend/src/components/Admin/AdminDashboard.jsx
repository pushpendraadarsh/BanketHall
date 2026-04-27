import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import { useBooking } from "../../context/BookingContext";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { stats, bookings, fetchStats, fetchBookings, loading } = useBooking();
  const { user } = useAuth();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, [fetchStats, fetchBookings]);

  useEffect(() => {
    if (stats?.monthlyBookings) {
      setChartData(
        stats.monthlyBookings.map((item) => ({
          month: `${item._id.month}/${item._id.year}`,
          bookings: item.count,
        }))
      );
    }
  }, [stats]);

  const safeStats = stats || {
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
  };

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back, {user?.email || "Admin"} 👋
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-[#878C53] text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">
            {safeStats.totalBookings}
          </h2>
        </div>

        <div className="bg-[#a3a86b] text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Pending</p>
          <h2 className="text-3xl font-bold mt-2">
            {safeStats.pendingBookings}
          </h2>
        </div>

        <div className="bg-[#6f7445] text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Confirmed</p>
          <h2 className="text-3xl font-bold mt-2">
            {safeStats.confirmedBookings}
          </h2>
        </div>

        <div className="bg-[#4f5330] text-white p-5 rounded-xl shadow">
          <p className="text-sm opacity-80">Cancelled</p>
          <h2 className="text-3xl font-bold mt-2">
            {safeStats.cancelledBookings}
          </h2>
        </div>

      </div>

      {/* CHART + BOOKINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-4">
            Booking Trends
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#878C53"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RECENT BOOKINGS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-lg mb-4">
            Recent Bookings
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : safeBookings.length === 0 ? (
            <p className="text-gray-400">No bookings yet</p>
          ) : (
            <div className="space-y-4">
              {safeBookings.slice(0, 5).map((b) => (
                <div
                  key={b._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {b.hallId?.name || "Hall"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(b.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{b.totalPrice || 0}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded
                      ${b.status === "confirmed"
                        ? "bg-green-200 text-green-800"
                        : b.status === "cancelled"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"}
                    `}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;