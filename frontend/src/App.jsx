import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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

// Admin
import PrivateRoute from "./components/Auth/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UsersManagement from "./components/Admin/UsersManagement";
import BookingsManagement from "./components/Admin/BookingsManagement";
import HallsManagement from "./components/Admin/HallsManagement";
import BlogManagement from "./components/Admin/BlogManagement"
import AdminLogin from "./components/Auth/AdminLogin.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Bookings from "./pages/Bookings.jsx";
import Halls from "./pages/Halls.jsx";
import Profile from "./pages/Profile.jsx";
import HallPage from "./pages/HallPage.jsx";


// 👇 Helper to hide Navbar on admin routes
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>

          <LayoutWrapper>
            <div className="min-h-screen bg-gradient-to-br from-[#f4f5f0] via-white to-[#eef0e6] pt-20">
              <Routes>

  {/* Public */}
  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Dashboard */}
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="bookings" element={<Bookings />} />
    <Route path="halls" element={<Halls />} />
    <Route path="profile" element={<Profile />} />
  </Route>

  {/* ✅ Booking route (IMPORTANT FIX) */}
  <Route path="/book/:id" element={<HallPage />} />

  {/* Admin */}
  <Route path="/admin/login" element={<AdminLogin />} />

  <Route path="/admin" element={<PrivateRoute />}>
    <Route element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UsersManagement />} />
      <Route path="bookings" element={<BookingsManagement />} />
      <Route path="halls" element={<HallsManagement />} />
      <Route path="blogs" element={<BlogManagement />} />
    </Route>
  </Route>

</Routes>
            </div>
          </LayoutWrapper>

        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;