import { useBooking } from "../context/BookingContext";
import { useEffect } from "react";

const Bookings = () => {
  const { bookings, fetchBookings } = useBooking();

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!bookings) {
    return <p className="p-4">Loading...</p>;
  }

  if (bookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-2">
          No Bookings Yet
        </h2>
        <p>Start booking your banquet hall 🎉</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        My Bookings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h4 className="text-lg font-semibold">
              {b.hallId?.name || "Hall"}
            </h4>

            <p className="text-sm text-gray-500">
              📅 {b.date
                ? new Date(b.date).toDateString()
                : "No date"}
            </p>

            <p className="text-sm text-gray-500">
              🕒 {b.startTime} - {b.endTime}
            </p>

            <p className="font-bold mt-2">
              ₹{b.totalPrice || 0}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
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