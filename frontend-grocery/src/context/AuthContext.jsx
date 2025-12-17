import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to sync latest user data from DB
  const fetchUserProfile = async (token) => {
    try {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { data } = await API.get("/users/profile");
      // Merge the fresh data with the existing token
      const updatedUser = { ...data, token };
      setUser(updatedUser);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to sync user profile", error);
      // If token is invalid or request fails, logout
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.token) {
          fetchUserProfile(parsedUser.token);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        localStorage.removeItem("userInfo");
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/users/login", { email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  };

  /**
   * UPDATED: register now accepts a userData object
   * to handle name, email, password, isAdmin, and defaultAddress
   */
  const register = async (userData) => {
    // userData contains { name, email, password, isAdmin, defaultAddress }
    const { data } = await API.post("/users", userData);

    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  };

  const updateProfile = async (profileData) => {
    const { data } = await API.put("/users/profile", profileData);
    const updatedUser = { ...data, token: user.token };
    setUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    return updatedUser;
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
        updateProfile,
        isAuthenticated: !!user,
        userRole: user?.isAdmin ? "admin" : "user",
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
