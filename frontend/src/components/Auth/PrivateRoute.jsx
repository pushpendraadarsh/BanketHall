import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if admin is authenticated
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('adminRole');
  
  // Check if token exists and user has admin role
  const isAuthenticated = token !== null && token !== undefined;
  const isAdmin = role === 'admin' || role === 'superadmin';
  
  console.log('PrivateRoute check:', { isAuthenticated, isAdmin, token, role }); // Debug log
  
  if (!isAuthenticated || !isAdmin) {
    // Redirect to admin login page
    return <Navigate to="/admin/login" replace />;
  }
  
  // Render child routes
  return <Outlet />;
};

export default PrivateRoute;