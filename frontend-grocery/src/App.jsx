import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

// --- PLACEHOLDERS (We will replace these later) ---
import Navbar from "./components/layout/Navbar/Navbar-component";
// import LoginPage from "./components/auth/Login/Login-component";
import RegisterPage from "./components/auth/Register/Register-component";
import LoginPage from "./components/auth/Login/Login-component";
import UserDashboard from './components/user/Dashboard/Dashboard-component.jsx';
import AdminDashboard from './components/admin/Dashboard/Dashboard-component.jsx';
import DeliveryDashboard from './components/delivery/Dashboard/Dashboard-component.jsx';
import CheckoutPage from './components/cart/Checkout/Checkout-component.jsx';

// Create a simple styled layout container
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 20px 0; /* Add vertical padding */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto; /* Center the content */
`;
// --- END PLACEHOLDERS ---

function App() {
  return (
    <Router>
      <Layout>
        {/* Navbar will be present on all pages */}
        <Navbar />

        <MainContent>
          <Routes>
            {/* Routes */}
            <Route path="/login" element={< LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CheckoutPage />} />
            <Route path="/" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
          </Routes>
        </MainContent>

        {/* Toast notifications container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </Layout>
    </Router>
  );
}

export default App;
