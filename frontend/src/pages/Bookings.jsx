import { useBooking } from "../context/BookingContext";
import { useEffect } from "react";

const Bookings = () => {
  const { bookings, fetchBookings } = useBooking();

  useEffect(() => {
    fetchBookings();
  }, []); // ✅ safer (prevents repeated calls)

  if (!bookings) {
    return <p className="p-4">Loading...</p>;
  }

  if (bookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2">No Bookings Yet</h2>
        <p>Start booking your banquet hall for your special events 🎉</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">

      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        My Bookings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
          >

            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {b.hallId?.name || "Banquet Hall"}
            </h4>

            <p className="text-sm text-gray-500 mb-1">
              📅 {b.date ? new Date(b.date).toDateString() : "No date"}
            </p>

            <p className="text-sm text-gray-500 mb-2">
              🕒 {b.startTime || "--"} - {b.endTime || "--"}
            </p>

            <p className="font-semibold text-gray-800 mb-3">
              ₹{b.totalPrice || 0}
            </p>

            <span
              className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                b.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : b.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : b.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {b.status || "pending"}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;