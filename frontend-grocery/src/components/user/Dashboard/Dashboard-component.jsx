// src/components/user/Dashboard/Dashboard-component.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, Calendar, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../api/axios"; // Import the axios instance
import { categories, offers } from "../../../data/groceryData"; // Keep categories and offers
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dbProducts, setDbProducts] = useState([]); // State for backend data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 1. Fetch live products from local MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setDbProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products from server");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Filter products based on selected category name (matches our Seeder data)
  const filteredProducts = selectedCategory
    ? dbProducts.filter((p) => 
        selectedCategory.name.toLowerCase().includes(p.category.toLowerCase())
      )
    : [];

  const handleAction = (item, type) => {
    if (!isAuthenticated) {
      toast.error("Please Login to add items to cart!");
      navigate("/login");
      return;
    }
    const actionText = type === "sub" ? "Subscription started" : "Added to Cart";
    toast.success(`${item.name}: ${actionText}`);
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading Groceries...</div>;

  return (
    <DashboardContainer>
      {/* Hero Section */}
      {!selectedCategory && (
        <HeroSection>
          <HeroText>
            <h1>Groceries Delivered in 10 Mins</h1>
            <p>Use code <strong>{offers[0].code}</strong> to {offers[0].desc}</p>
            <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>Free Delivery above ₹499</p>
          </HeroText>
          <div style={{ fontSize: "60px" }}>🔥</div>
        </HeroSection>
      )}

      {!selectedCategory ? (
        <>
          <SectionTitle>Shop by Category</SectionTitle>
          <Grid>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} onClick={() => setSelectedCategory(cat)}>
                <img src={cat.image} alt={cat.name} />
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </CategoryCard>
            ))}
          </Grid>

          <FooterInfo>
            <div><h4>Company</h4><p>About Us</p><p>Team</p></div>
            <div><h4>Contact</h4><p>Help & Support</p><p>Partner with us</p></div>
            <div><h4>Legal</h4><p>Terms & Conditions</p><p>Privacy Policy</p></div>
          </FooterInfo>
        </>
      ) : (
        <>
          <BackButton onClick={() => setSelectedCategory(null)}>
            <ArrowLeft size={18} /> Back to Categories
          </BackButton>

          <SectionTitle>{selectedCategory.name}</SectionTitle>

          <Grid>
            {filteredProducts.map((item) => (
              <ProductCard key={item._id}> {/* Use MongoDB _id */}
                <img src={item.image} alt={item.name} />
                <ProductInfo>
                  <h3>{item.name}</h3>
                  <div className="price">
                    ₹{item.price} <span className="unit">/ {item.unit}</span>
                  </div>
                </ProductInfo>

                <ActionButtons>
                  <button className="add-btn" onClick={() => handleAction(item, "once")}>
                    <ShoppingCart size={16} style={{ display: "inline", marginRight: "5px" }} />
                    ADD (One-time)
                  </button>

                  <button className="sub-btn" onClick={() => handleAction(item, "sub")}>
                    <Calendar size={16} style={{ display: "inline", marginRight: "5px" }} />
                    SUBSCRIBE (Daily)
                  </button>
                </ActionButtons>
              </ProductCard>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <p style={{ textAlign: "center", color: "#888", padding: "20px" }}>
              No products found in this category yet.
            </p>
          )}
        </>
      )}
    </DashboardContainer>
  );
};

export default UserDashboard;