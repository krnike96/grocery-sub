// src/components/layout/Navbar/Navbar-component.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import {
  NavContainer,
  NavWrapper,
  Logo,
  NavMenu,
  NavItem,
  MobileMenuButton,
  CartBadge,
} from "./Navbar-style";
import {
  ShoppingCart,
  User,
  LogIn,
  Menu,
  X,
  Package,
  Truck,
  LogOut,
  Home,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userRole, logout } = useAuth();
  const { cartCount } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case "admin":
        return {
          path: "/admin",
          icon: <Package size={20} />,
          label: "Admin Panel",
        };
      case "delivery":
        return {
          path: "/delivery",
          icon: <Truck size={20} />,
          label: "Deliveries",
        };
      case "user":
      default:
        // Regular users don't need a special "Dashboard" link in nav if Home is the dashboard
        return null;
    }
  };

  const dashboardLink = isAuthenticated ? getDashboardLink() : null;

  return (
    <NavContainer>
      <NavWrapper>
        <Logo>
          <Link to="/">
            🥦 Grocery<span style={{ fontWeight: "900" }}>Sub</span>
          </Link>
        </Logo>

        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </MobileMenuButton>

        <NavMenu $isOpen={isMenuOpen}>
          <NavItem>
            <Link to="/" onClick={toggleMenu}>
              <Home size={20} />
              Home
            </Link>
          </NavItem>

          {isAuthenticated ? (
            <>
              {dashboardLink && (
                <NavItem>
                  <Link to={dashboardLink.path} onClick={toggleMenu}>
                    {dashboardLink.icon}
                    {dashboardLink.label}
                  </Link>
                </NavItem>
              )}

              {/* Cart Link: Only for Users */}
              {userRole !== "admin" && userRole !== "delivery" && (
                <NavItem>
                  <Link to="/cart" onClick={toggleMenu}>
                    <ShoppingCart size={20} />
                    Cart
                    {/* Hardcoded 2 for demo, connect to CartContext later */}
                    <CartBadge>{cartCount}</CartBadge>
                  </Link>
                </NavItem>
              )}

              <NavItem>
                <button onClick={handleLogout}>
                  <LogOut size={20} />
                  Logout
                </button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Link to="/login" onClick={toggleMenu}>
                  <User size={20} />
                  Login
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register" onClick={toggleMenu}>
                  <LogIn size={20} />
                  Register
                </Link>
              </NavItem>
            </>
          )}
        </NavMenu>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;
