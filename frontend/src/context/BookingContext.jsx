import { createContext, useContext, useState } from "react";
import axios from "axios";

const BookingContext = createContext();

const API = "http://localhost:5000/api";

// ================= HELPER =================
const getToken = () => localStorage.getItem("adminToken");

// ================= PROVIDER =================
export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const token = getToken();

      const res = await axios.get(`${API}/bookings`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.log("FETCH BOOKINGS ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {
      const token = getToken();

      const res = await axios.get(`${API}/bookings`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = res.data;

      setStats({
        totalBookings: data.length,
        pendingBookings: data.filter((b) => b.status === "pending").length,
        confirmedBookings: data.filter((b) => b.status === "confirmed").length,
        cancelledBookings: data.filter((b) => b.status === "cancelled").length,
      });
    } catch (err) {
      console.log("FETCH STATS ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        stats,
        loading,
        fetchBookings,
        fetchStats,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);