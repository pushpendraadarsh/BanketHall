import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass =
    "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#6f7445] transition";

  const activeClass = "bg-[#6f7445]";

  return (
    <div className="flex h-screen font-sans">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#878C53] text-white flex flex-col p-5">
        <h2 className="text-xl font-bold mb-8">🍽️ Banquet</h2>

        <nav className="flex flex-col gap-3 flex-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            📅 Bookings
          </NavLink>

          <NavLink
            to="/dashboard/halls"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            🏛️ Halls
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            👤 Profile
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-gray-900 hover:bg-black transition px-3 py-2 rounded-lg font-semibold"
        >
          🚪 Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <div className="h-14 bg-gray-100 flex items-center px-5 border-b">
          <h3 className="font-semibold">Welcome to Banquet Dashboard</h3>
        </div>

        {/* CONTENT */}
        <div className="p-5 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;