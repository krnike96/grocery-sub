import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, Plus, Minus, Home, MapPin, ShoppingCart } from "lucide-react";
import API from "../../../api/axios";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import * as S from "./Checkout-style";

const CheckoutPage = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [useDefault, setUseDefault] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    if (useDefault && user?.defaultAddress) {
      setShippingAddress({
        address: user.defaultAddress.address || "",
        city: user.defaultAddress.city || "",
        postalCode: user.defaultAddress.postalCode || "",
      });
    } else if (!useDefault) {
      setShippingAddress({ address: "", city: "", postalCode: "" });
    }
  }, [user, useDefault]);

  const isCartEmpty =
    cart.orderItems.length === 0 && cart.subscriptions.length === 0;

  const totals = (() => {
    const subtotal =
      cart.orderItems.reduce((acc, i) => acc + i.price * i.qty, 0) +
      cart.subscriptions.reduce((acc, i) => acc + i.price, 0);
    const shipping = subtotal > 499 || subtotal === 0 ? 0 : 40;
    const tax = subtotal * 0.05;
    return { subtotal, shipping, tax, grandTotal: subtotal + shipping + tax };
  })();

  const handleCheckout = async () => {
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode
    ) {
      return toast.error("Complete address details are required");
    }

    try {
      const { data } = await API.post("/orders", {
        orderItems: cart.orderItems,
        subscriptions: cart.subscriptions,
        shippingAddress,
        totalPrice: totals.grandTotal,
        paymentMethod: "Cash on Delivery",
      });

      if (data) {
        if (!useDefault) {
          await updateProfile({ defaultAddress: shippingAddress });
        }
        toast.success("Order placed successfully!");
        clearCart();
        setTimeout(() => {
          navigate("/user-dashboard");
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  const hasDefaultAddress = !!(
    user?.defaultAddress?.address && user?.defaultAddress?.city
  );

  if (isCartEmpty) {
    return (
      <S.CheckoutContainer
        style={{ textAlign: "center", padding: "100px 20px" }}
      >
        <ShoppingCart
          size={64}
          style={{ color: "#ccc", marginBottom: "20px" }}
        />
        <S.Title>Your Cart is Empty</S.Title>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 24px",
            background: "#28a745",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Return to Shop
        </Link>
      </S.CheckoutContainer>
    );
  }

  return (
    <S.CheckoutContainer>
      <S.Title>Checkout Summary</S.Title>
      <S.ContentWrapper>
        <S.CartDetails>
          <S.SectionHeader>Delivery Address</S.SectionHeader>
          <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
            <button
              type="button"
              onClick={() => setUseDefault(true)}
              style={{
                flex: 1,
                padding: "10px",
                cursor: "pointer",
                borderRadius: "8px",
                border: useDefault ? "2px solid #28a745" : "1px solid #ddd",
                background: useDefault ? "#f0fff4" : "#fff",
                fontWeight: useDefault ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Home size={18} style={{ marginRight: "5px" }} /> Use Default
            </button>
            <button
              type="button"
              onClick={() => setUseDefault(false)}
              style={{
                flex: 1,
                padding: "10px",
                cursor: "pointer",
                borderRadius: "8px",
                border: !useDefault ? "2px solid #28a745" : "1px solid #ddd",
                background: !useDefault ? "#f0fff4" : "#fff",
                fontWeight: !useDefault ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapPin size={18} style={{ marginRight: "5px" }} /> New Address
            </button>
          </div>

          <S.AddressForm>
            <S.InputRow>
              <S.StyledInput
                placeholder="Address"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                disabled={useDefault}
              />
            </S.InputRow>
            <S.InputRow>
              <S.StyledInput
                placeholder="City"
                value={shippingAddress.city}
                disabled={useDefault}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
              />
              <S.StyledInput
                placeholder="Pincode"
                value={shippingAddress.postalCode}
                disabled={useDefault}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
              />
            </S.InputRow>
          </S.AddressForm>

          <S.SectionHeader>Review Items</S.SectionHeader>
          {cart.orderItems.map((item) => (
            <S.CartItem key={item.product}>
              <S.ItemInfo>
                <h4>{item.name}</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <button onClick={() => updateQty(item.product, -1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.product, 1)}>
                    <Plus size={14} />
                  </button>
                  <Trash2
                    size={18}
                    color="red"
                    onClick={() => removeFromCart(item.product, "once")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </S.ItemInfo>
              <S.ItemPrice>₹{(item.price * item.qty).toFixed(2)}</S.ItemPrice>
            </S.CartItem>
          ))}

          {cart.subscriptions.map((item) => (
            <S.CartItem key={item.product}>
              <S.ItemInfo $isSub>
                <h4>{item.name}</h4>
                <p style={{ color: "#28a745", fontWeight: "bold" }}>
                  Plan: {item.frequency}
                </p>
              </S.ItemInfo>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <S.ItemPrice>₹{item.price.toFixed(2)}</S.ItemPrice>
                <Trash2
                  size={18}
                  color="red"
                  onClick={() => removeFromCart(item.product, "sub")}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </S.CartItem>
          ))}
        </S.CartDetails>

        <S.SummaryCard>
          <S.SectionHeader>Price Details</S.SectionHeader>
          <S.SummaryLine>
            <span>Subtotal</span>
            <span>₹{totals.subtotal.toFixed(2)}</span>
          </S.SummaryLine>
          <S.SummaryLine>
            <span>GST (5%)</span>
            <span>₹{totals.tax.toFixed(2)}</span>
          </S.SummaryLine>
          <S.SummaryLine>
            <span>Delivery Charges</span>
            <span
              style={{ color: totals.shipping === 0 ? "green" : "inherit" }}
            >
              {totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`}
            </span>
          </S.SummaryLine>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              margin: "15px 0",
            }}
          />
          <S.SummaryLine $total>
            <span>Amount Payable</span>
            <span>₹{totals.grandTotal.toFixed(2)}</span>
          </S.SummaryLine>
          <S.CheckoutButton
            onClick={handleCheckout}
            disabled={isCartEmpty || (useDefault && !hasDefaultAddress)}
          >
            Confirm Order & Pay
          </S.CheckoutButton>
        </S.SummaryCard>
      </S.ContentWrapper>
    </S.CheckoutContainer>
  );
};

export default CheckoutPage;
