import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Navbar from "./components/layout/Navbar/Navbar-component";
import RegisterPage from "./components/auth/Register/Register-component";
import LoginPage from "./components/auth/Login/Login-component";
import UserDashboard from "./components/user/Dashboard/Dashboard-component.jsx";
import AdminDashboard from "./components/admin/Dashboard/Dashboard-component.jsx";
import DeliveryDashboard from "./components/delivery/Dashboard/Dashboard-component.jsx";
import CheckoutPage from "./components/cart/Checkout/Checkout-component.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// --- STYLED COMPONENTS (Preserved) ---
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px 0;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <Layout>
          <Navbar />

          <MainContent>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<UserDashboard />} />

              {/* Protected User Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Delivery Routes */}
              <Route
                path="/delivery"
                element={
                  <ProtectedRoute>
                    <DeliveryDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainContent>

          <ToastContainer position="top-center" autoClose={3000} />
        </Layout>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
