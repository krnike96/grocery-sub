import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAdmin && !user.isAdmin) {
    // If route requires admin but user is not admin, send to user dashboard
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
