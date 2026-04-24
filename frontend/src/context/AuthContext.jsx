import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // LOAD FROM LOCALSTORAGE
  // ======================
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const adminToken = localStorage.getItem("adminToken");
    const adminRole = localStorage.getItem("adminRole");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    if (adminToken && adminRole) {
      setAdmin({ token: adminToken, role: adminRole });
    }

    setLoading(false);
  }, []);

  // ======================
  // USER LOGIN (CUSTOMER)
  // ======================
  const userLogin = async (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // ======================
  // ADMIN LOGIN (API CALL)
  // ======================
  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const token = response.data.token;
      const role = response.data.role;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminRole", role);

      setAdmin({ token, role });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Login failed",
      };
    }
  };

  // ======================
  // 🔥 FIX: COMMON LOGIN FUNCTION (IMPORTANT)
  // ======================
  const login = async (email, password) => {
    return await adminLogin(email, password);
  };

  // ======================
  // LOGOUT (BOTH USER + ADMIN)
  // ======================
  const logout = () => {
    setUser(null);
    setAdmin(null);

    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        userLogin,
        adminLogin,
        login, // ✅ FIX ADDED HERE
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};