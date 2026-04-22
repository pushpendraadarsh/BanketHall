import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/AboutSection.jsx";
import Services from "./pages/ServicesSection.jsx";
import Blogs from "./pages/BlogSection.jsx";
import Contact from "./components/ContactSection.jsx";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard.jsx";

// Admin imports
import PrivateRoute from "./components/Auth/PrivateRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BookingsManagement from "./components/Admin/BookingsManagement";
import HallsManagement from "./components/Admin/HallsManagement";
import UsersManagement from "./components/Admin/UsersManagement";
import AdminLogin from "./components/Auth/AdminLogin.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>

          <Navbar />

          <div className="min-h-screen bg-gradient-to-br from-[#f4f5f0] via-white to-[#eef0e6] pt-20">
            <Routes>

              <Route path="/admin/login" element={<AdminLogin />} />
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Admin Routes - Protected */}
              <Route path="/admin" element={<PrivateRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bookings" element={<BookingsManagement />} />
                <Route path="halls" element={<HallsManagement />} />
                <Route path="users" element={<UsersManagement />} />
              </Route>
            </Routes>
          </div>

        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;