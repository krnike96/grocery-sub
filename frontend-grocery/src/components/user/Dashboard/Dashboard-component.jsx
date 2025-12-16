// src/components/user/Dashboard/Dashboard-component.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, Calendar, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { categories, products, offers } from "../../../data/groceryData";
import {
  DashboardContainer,
  HeroSection,
  HeroText,
  SectionTitle,
  Grid,
  CategoryCard,
  BackButton,
  ProductCard,
  ProductInfo,
  ActionButtons,
  FooterInfo,
} from "./Dashboard-style";

const UserDashboard = () => {
  // State to track if a category is selected
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Filter products based on selected category ID
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory.id)
    : [];

  // Handle Add to Cart / Subscribe logic
  const handleAction = (item, type) => {
    // REQUIREMENT: Redirect to login if not signed in
    if (!isAuthenticated) {
      toast.error("Please Login to add items to cart!");
      navigate("/login");
      return;
    }

    // If logged in, proceed (Mock Logic)
    const actionText =
      type === "sub" ? "Subscription started" : "Added to Cart";
    toast.success(`${item.name}: ${actionText}`);
  };

  return (
    <DashboardContainer>
      {/* 1. Hero / Offers Section (Only show on Home View) */}
      {!selectedCategory && (
        <HeroSection>
          <HeroText>
            <h1>Groceries Delivered in 10 Mins</h1>
            <p>
              Use code <strong>{offers[0].code}</strong> to {offers[0].desc}
            </p>
            <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
              Free Delivery above ₹499
            </p>
          </HeroText>
          <div style={{ fontSize: "60px" }}>🔥</div>
        </HeroSection>
      )}

      {/* 2. Category Selection View (Default) */}
      {!selectedCategory ? (
        <>
          <SectionTitle>Shop by Category</SectionTitle>
          <Grid>
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
              >
                <img src={cat.image} alt={cat.name} />
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </CategoryCard>
            ))}
          </Grid>

          {/* Contact / Footer Area */}
          <FooterInfo>
            <div>
              <h4>Company</h4>
              <p>About Us</p>
              <p>Team</p>
              <p>Careers</p>
            </div>
            <div>
              <h4>Contact</h4>
              <p>Help & Support</p>
              <p>Partner with us</p>
              <p>Ride with us</p>
            </div>
            <div>
              <h4>Legal</h4>
              <p>Terms & Conditions</p>
              <p>Refund & Cancellation</p>
              <p>Privacy Policy</p>
            </div>
          </FooterInfo>
        </>
      ) : (
        /* 3. Products List View (When a category is clicked) */
        <>
          <BackButton onClick={() => setSelectedCategory(null)}>
            <ArrowLeft size={18} /> Back to Categories
          </BackButton>

          <SectionTitle>{selectedCategory.name}</SectionTitle>

          <Grid>
            {filteredProducts.map((item) => (
              <ProductCard key={item.id}>
                <img src={item.image} alt={item.name} />
                <ProductInfo>
                  <h3>{item.name}</h3>
                  <div className="price">
                    ₹{item.price} <span className="unit">/ {item.unit}</span>
                  </div>
                </ProductInfo>

                <ActionButtons>
                  {/* One-Time Purchase */}
                  <button
                    className="add-btn"
                    onClick={() => handleAction(item, "once")}
                  >
                    <ShoppingCart
                      size={16}
                      style={{ display: "inline", marginRight: "5px" }}
                    />
                    ADD (One-time)
                  </button>

                  {/* Subscription Option (Only if available) */}
                  {item.isSubscriptionAvailable && (
                    <button
                      className="sub-btn"
                      onClick={() => handleAction(item, "sub")}
                    >
                      <Calendar
                        size={16}
                        style={{ display: "inline", marginRight: "5px" }}
                      />
                      SUBSCRIBE (Daily)
                    </button>
                  )}
                </ActionButtons>
              </ProductCard>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>
              No products found in this category yet.
            </p>
          )}
        </>
      )}
    </DashboardContainer>
  );
};

export default UserDashboard;
