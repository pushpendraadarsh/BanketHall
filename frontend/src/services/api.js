const API = "http://localhost:5000/api";

export const createBooking = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};