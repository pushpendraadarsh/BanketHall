import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EnquiryForm from "../pages/EnquiryForm.jsx";
import BookingForm from "../Form/BookingForm.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const dropdownRef = useRef();
  const location = useLocation();
  const { user, logout } = useAuth();

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close profile on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact Us", path: "/contact" },
  ];

  const getInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed w-full z-40 transition-all duration-300 border-b border-gray-100 ${
          scrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <nav className="flex justify-between items-center">

            {/* LOGO */}
            <Link to="/" className="text-2xl font-bold text-[#878C53]">
              Eventro
            </Link>

            {/* NAV LINKS */}
            <div className="hidden lg:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-1 rounded-full transition ${
                    location.pathname === item.path
                      ? "bg-[#878C53] text-white"
                      : "text-gray-600 hover:text-[#878C53]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

              {/* BOOK NOW */}
              <button
                onClick={() => setOpenBooking(true)}
                className="bg-[#878C53] text-white px-4 py-2 rounded-full text-sm hover:bg-[#6b6f42]"
              >
                Book Now
              </button>

              {/* USER */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenProfile(!openProfile);
                    }}
                    className="w-10 h-10 rounded-full bg-[#878C53] text-white flex items-center justify-center font-bold"
                  >
                    {getInitials(user.email)}
                  </button>

                  {openProfile && (
                    <div className="absolute right-0 top-12 w-52 bg-white border rounded-xl shadow-xl overflow-hidden">

                      <div className="p-3 border-b">
                        <p className="text-sm font-semibold">{user.email}</p>
                        <span className="text-xs text-gray-500">
                          {user.role || "User"}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setOpenProfile(false)}
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => setOpenProfile(false)}
                      >
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setOpenProfile(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-[#878C53]"
                >
                  Login
                </Link>
              )}

              {/* MOBILE MENU */}
              <button
                className="lg:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>
          </nav>

          {/* MOBILE NAV */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 border-t pt-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block text-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ================= BOOKING MODAL ================= */}
     {/* ================= BOOKING MODAL ================= */}
{openBooking && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
    onClick={() => setOpenBooking(false)}
  >
    <div
      className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE */}
      <button
        onClick={() => setOpenBooking(false)}
        className="absolute top-3 right-3 text-xl"
      >
        ✖
      </button>

      {/* BOOKING FORM */}
      <BookingForm />
    </div>
  </div>
)}
    </>
  );
};

export default Navbar;