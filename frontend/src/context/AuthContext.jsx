import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('adminRole');
    
    if (token && role) {
      setAdmin({ token, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      // Check if response exists and has data
      if (response && response.data) {
        // Handle different response structures
        const token = response.data.token || response.data.data?.token;
        const role = response.data.role || response.data.data?.role;
        
        if (token && role) {
          localStorage.setItem('adminToken', token);
          localStorage.setItem('adminRole', role);
          setAdmin({ token, role });
          return { success: true };
        } else {
          return { success: false, message: 'Invalid response from server' };
        }
      } else {
        return { success: false, message: 'No response from server' };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        const message = error.response.data?.msg || error.response.data?.message || 'Login failed';
        return { success: false, message };
      } else if (error.request) {
        // Request was made but no response
        return { success: false, message: 'Cannot connect to server. Make sure backend is running on port 5000' };
      } else {
        // Something else happened
        return { success: false, message: error.message || 'Login failed' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};