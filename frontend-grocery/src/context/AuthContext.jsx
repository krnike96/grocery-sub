import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Set the token for all future API calls
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedUser.token}`;
    }
    setLoading(false);
  }, []);

  // Login API Call
  const login = async (email, password) => {
    const { data } = await API.post("/users/login", { email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  };

  // Register API Call
  const register = async (name, email, password) => {
    const { data } = await API.post("/users", { name, email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        userRole: user?.isAdmin ? "admin" : "user", // Basic role mapping
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
