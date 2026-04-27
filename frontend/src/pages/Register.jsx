import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          email: form.email,
          phone: form.phone,   // ✅ ADDED
          password: form.password,
        }
      );

      alert("Registration successful!");
      console.log(res.data);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">

      <div className="w-[350px] bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-5">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* EMAIL */}
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#878C53]"
          />

          {/* PHONE */}
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#878C53]"
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#878C53]"
          />

          {/* CONFIRM PASSWORD */}
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#878C53]"
          />

          {/* BUTTON */}
          <button
            className="w-full bg-[#878C53] hover:bg-[#6f7445] text-white py-2 rounded"
          >
            Register
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register; 