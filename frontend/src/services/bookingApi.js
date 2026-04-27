import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken"); // ✅ FIXED

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= BOOKINGS =================

// GET ALL BOOKINGS
export const fetchBookings = async () => {
  const res = await API.get("/bookings");
  return res.data;
};

// CREATE BOOKING
export const createBooking = async (data) => {
  const res = await API.post("/bookings", data);
  return res.data;
};

// UPDATE STATUS
export const updateBookingStatus = async (id, status) => {
  const res = await API.put(`/bookings/${id}/status`, { status });
  return res.data;
};

export default API;