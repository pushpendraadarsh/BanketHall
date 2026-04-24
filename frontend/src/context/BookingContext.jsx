import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export const useBooking = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const { token } = useAuth();

  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ========================
  // FETCH STATS (Dashboard)
  // ========================
  const fetchStats = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/bookings/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ========================
  // FETCH BOOKINGS (List)
  // ========================
  const fetchBookings = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data || []);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const value = {
    stats,
    bookings,
    loading,
    error,
    fetchStats,
    fetchBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};