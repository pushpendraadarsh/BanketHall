import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAuthenticated = !!token;

  const isAdmin = role === "admin" || role === "superadmin";

  console.log("PrivateRoute check:", {
    isAuthenticated,
    isAdmin,
    token,
    role,
  });

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;