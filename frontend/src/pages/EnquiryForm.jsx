import React, { useState } from "react";
import { motion } from "framer-motion";

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // success/error message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          date: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f8f9f2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Make an <span className="text-[#878C53]">Enquiry</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Let’s plan your perfect event together
          </p>
        </motion.div>

        {/* Status Message */}
        {status && (
          <div
            className={`mb-6 text-center text-sm font-medium ${
              status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {status === "success"
              ? "Enquiry submitted successfully!"
              : status}
          </div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
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
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Corporate</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input"
            required
          />

          <div className="hidden md:block"></div>

          <textarea
            name="message"
            placeholder="Tell us about your event..."
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="input md:col-span-2"
          />

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#878C53] text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </motion.button>
        </motion.form>
      </div>

      {/* Input styles */}
      <style jsx>{`
        .input {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
        }
        .input:focus {
          border-color: #878c53;
          box-shadow: 0 0 0 2px rgba(135, 140, 83, 0.2);
        }
      `}</style>
    </section>
  );
};

export default EnquiryForm;