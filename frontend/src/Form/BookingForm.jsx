import React, { useState } from "react";

const BookingForm = ({ hallId }) => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    guests: "",
    eventType: "",
    paymentMethod: "online",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    // STEP 1: CREATE ORDER FROM BACKEND
    const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: 1000, // you can calculate dynamically
      }),
    });

    const order = await orderRes.json();

    // STEP 2: OPEN RAZORPAY
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "Hall Booking",
      order_id: order.id,

      handler: async function (response) {
        // STEP 3: PAYMENT SUCCESS → NOW SAVE BOOKING

        const bookingRes = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            hallId,
            date: form.date,
            startTime: form.startTime,
            endTime: form.endTime,
            guests: Number(form.guests),
            eventType: form.eventType,
            paymentMethod: "online",
            paymentStatus: "paid", // 🔥 IMPORTANT
            specialRequests: form.specialRequests,
          }),
        });

        const data = await bookingRes.json();

        setStatus("Payment + Booking Successful 🎉");
        console.log(data);
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (err) {
    console.log(err);
    setStatus("Payment failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Book Your Hall</h2>

      {status && <p className="mb-3 text-sm">{status}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4">

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={form.guests}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="eventType"
          value={form.eventType}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Event Type</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Corporate">Corporate</option>
        </select>

        {/* 🔥 NEW FIELD ADDED */}
        <textarea
          name="specialRequests"
          placeholder="Special Requests"
          value={form.specialRequests}
          onChange={handleChange}
          className="input"
        />

        <div className="border p-4 rounded-lg">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={form.paymentMethod === "online"}
              onChange={handleChange}
            />
            {" "}Pay Online
          </label>

          <label className="ml-4">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={handleChange}
            />
            {" "}Pay Later
          </label>
        </div>

        <button
          disabled={loading}
          className="bg-green-600 text-white py-3 rounded"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>

      <style>{`
        .input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;