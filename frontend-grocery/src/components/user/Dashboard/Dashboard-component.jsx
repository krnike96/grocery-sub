import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Calendar,
  ArrowLeft,
  Package,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import API from "../../../api/axios";
import { offers } from "../../../data/groceryData";
import * as Styled from "./Dashboard-style";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("shop");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFrequencies, setSelectedFrequencies] = useState({});

  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          API.get("/products"),
          API.get("/categories/get-categories"),
        ]);

        const validCategories = catRes.data.filter((cat) =>
          prodRes.data.some(
            (prod) => prod.category.toLowerCase() === cat.name.toLowerCase()
          )
        );

        setDbProducts(prodRes.data);
        setDbCategories(validCategories);

        if (isAuthenticated) {
          const subRes = await API.get("/orders/my-subscriptions");
          setUserSubscriptions(subRes.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [isAuthenticated]);

  const handleFrequencyChange = (productId, freq) => {
    setSelectedFrequencies((prev) => ({ ...prev, [productId]: freq }));
  };

  const handleAction = (item, type) => {
    if (!isAuthenticated) {
      toast.error("Please Login to continue!");
      navigate("/login");
      return;
    }

    if (userRole === "admin") {
      toast.error("Admins cannot place orders.");
      return;
    }

    if (type === "once") {
      const currentInCart = cart?.orderItems?.find(
        (i) => i.product === item._id
      );
      const currentQty = currentInCart ? currentInCart.qty : 0;
      if (currentQty + 1 > item.stock) {
        toast.error(`Only ${item.stock} units available.`);
        return;
      }
      addToCart(item, "once");
      toast.success(`${item.name} added to cart!`);
    } else {
      const freq = selectedFrequencies[item._id] || "Daily";
      addToCart(item, "sub", freq);
      toast.success(`${item.name} added as ${freq} subscription!`);
    }
  };

  const handleCancelSub = async (subId) => {
    if (
      window.confirm(
        "Are you sure you want to permanently remove this subscription?"
      )
    ) {
      try {
        await API.delete(`/orders/subscription/${subId}/cancel`);
        toast.success("Subscription removed");
        setUserSubscriptions((prev) => prev.filter((s) => s._id !== subId));
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to cancel");
      }
    }
  };

  if (loading)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Loading Dashboard...
      </div>
    );

  const filteredProducts = selectedCategory
    ? dbProducts.filter(
        (p) => p.category.toLowerCase() === selectedCategory.name.toLowerCase()
      )
    : [];

  return (
    <Styled.DashboardContainer>
      <Styled.TabContainer>
        <Styled.TabButton
          $active={activeTab === "shop"}
          onClick={() => {
            setActiveTab("shop");
            setSelectedCategory(null);
          }}
        >
          <ShoppingCart size={18} /> Shop Groceries
        </Styled.TabButton>
        {isAuthenticated && userRole !== "admin" && (
          <Styled.TabButton
            $active={activeTab === "subscriptions"}
            onClick={() => setActiveTab("subscriptions")}
          >
            <Calendar size={18} /> My Subscriptions
          </Styled.TabButton>
        )}
      </Styled.TabContainer>

      {activeTab === "shop" && (
        <>
          {!selectedCategory && (
            <Styled.HeroSection>
              <Styled.HeroText>
                <h1>Groceries Delivered in 10 Mins</h1>
                <p>
                  Use code <strong>{offers[0].code}</strong> to {offers[0].desc}
                </p>
              </Styled.HeroText>
              <div style={{ fontSize: "60px" }}>🔥</div>
            </Styled.HeroSection>
          )}

          {!selectedCategory ? (
            <>
              <Styled.SectionTitle>Shop by Category</Styled.SectionTitle>
              <Styled.Grid>
                {dbCategories.map((cat) => (
                  <Styled.CategoryCard
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <img src={cat.image} alt={cat.name} />
                    <h3>{cat.name}</h3>
                    <p>{cat.desc}</p>
                  </Styled.CategoryCard>
                ))}
              </Styled.Grid>
            </>
          ) : (
            <>
              <Styled.BackButton onClick={() => setSelectedCategory(null)}>
                <ArrowLeft size={18} /> Back
              </Styled.BackButton>
              <Styled.SectionTitle>{selectedCategory.name}</Styled.SectionTitle>
              <Styled.Grid>
                {filteredProducts.map((item) => (
                  <Styled.ProductCard key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <Styled.ProductInfo>
                      <h3>{item.name}</h3>
                      <div className="price">
                        ₹{item.price} / {item.unit}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: item.stock < 10 ? "red" : "green",
                          marginTop: "5px",
                        }}
                      >
                        {item.stock > 0
                          ? `${item.stock} in stock`
                          : "Out of Stock"}
                      </div>
                    </Styled.ProductInfo>

                    <div
                      style={{
                        padding: "0 15px 10px",
                        display: "flex",
                        gap: "8px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "#666",
                          alignSelf: "center",
                        }}
                      >
                        Plan:
                      </label>
                      <select
                        value={selectedFrequencies[item._id] || "Daily"}
                        onChange={(e) =>
                          handleFrequencyChange(item._id, e.target.value)
                        }
                        style={{
                          flex: 1,
                          padding: "4px",
                          fontSize: "0.8rem",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                    </div>

                    <Styled.ActionButtons>
                      <button
                        className="add-btn"
                        onClick={() => handleAction(item, "once")}
                        disabled={item.stock === 0}
                      >
                        ADD ONCE
                      </button>
                      <button
                        className="sub-btn"
                        onClick={() => handleAction(item, "sub")}
                      >
                        SUBSCRIBE
                      </button>
                    </Styled.ActionButtons>
                  </Styled.ProductCard>
                ))}
              </Styled.Grid>
            </>
          )}
        </>
      )}

      {activeTab === "subscriptions" && (
        <div style={{ padding: "0 10px" }}>
          <Styled.SectionTitle>My Ongoing Subscriptions</Styled.SectionTitle>
          {userSubscriptions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                background: "white",
                borderRadius: "12px",
              }}
            >
              <Package
                size={64}
                color="#ddd"
                style={{ marginBottom: "15px" }}
              />
              <p style={{ color: "#888" }}>No active subscriptions found.</p>
              <button
                onClick={() => setActiveTab("shop")}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  background: "var(--color-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ background: "#f8f9fa" }}>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ padding: "18px" }}>Product</th>
                    <th>Frequency</th>
                    <th>Status</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userSubscriptions.map((sub) => (
                    <tr
                      key={sub._id}
                      style={{ borderTop: "1px solid #f1f1f1" }}
                    >
                      <td style={{ padding: "18px", fontWeight: "500" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src={sub.product?.image}
                            alt=""
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                          {sub.product?.name}
                        </div>
                      </td>
                      <td>{sub.frequency}</td>
                      <td>
                        <span
                          style={{
                            color:
                              sub.status === "Active" ? "#28a745" : "#dc3545",
                            background:
                              sub.status === "Active" ? "#e8f5e9" : "#fdecea",
                            padding: "4px 10px",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                          }}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => handleCancelSub(sub._id)}
                          style={{
                            color: "#dc3545",
                            border: "1px solid #dc3545",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            background: "white",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Trash2 size={14} /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Styled.DashboardContainer>
  );
};

export default UserDashboard;
