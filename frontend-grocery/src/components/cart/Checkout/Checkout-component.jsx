import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2, Plus, Minus, Home, MapPin, ShoppingCart } from "lucide-react";
import API from "../../../api/axios";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import {
  CheckoutContainer,
  Title,
  ContentWrapper,
  CartDetails,
  SummaryCard,
  SectionHeader,
  CartItem,
  ItemInfo,
  ItemPrice,
  SummaryLine,
  CheckoutButton,
  AddressForm,
  InputRow,
  StyledInput,
} from "./Checkout-style";

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

  // Sync address with default or clear it
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

  // If the cart is cleared (after successful order), we show this view
  const isCartEmpty =
    cart.orderItems.length === 0 && cart.subscriptions.length === 0;

  const totals = (() => {
    const subtotal =
      cart.orderItems.reduce((acc, i) => acc + i.price * i.qty, 0) +
      cart.subscriptions.reduce((acc, i) => acc + i.price, 0);
    const shipping = subtotal > 499 || subtotal === 0 ? 0 : 40;
    const tax = subtotal * 0.05; // 5% GST
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

        // Clear the cart first
        clearCart();

        // Delay navigation slightly so user sees success and page doesn't glitch
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

  // Fallback UI when cart is empty (prevents blank page after clearCart)
  if (isCartEmpty) {
    return (
      <CheckoutContainer style={{ textAlign: "center", padding: "100px 20px" }}>
        <ShoppingCart
          size={64}
          style={{ color: "#ccc", marginBottom: "20px" }}
        />
        <Title>Your Cart is Empty</Title>
        <p style={{ marginBottom: "30px", color: "#666" }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 24px",
            background: "var(--color-primary, #28a745)",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Return to Shop
        </Link>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <Title>Checkout Summary</Title>
      <ContentWrapper>
        <CartDetails>
          <SectionHeader>Delivery Address</SectionHeader>
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

          <AddressForm>
            <InputRow>
              <StyledInput
                placeholder="Address / House No / Street"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                disabled={useDefault}
              />
            </InputRow>
            <InputRow>
              <StyledInput
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
              <StyledInput
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
            </InputRow>
            {useDefault && !hasDefaultAddress && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "5px" }}>
                No default address found in your profile. Please use "New
                Address".
              </p>
            )}
          </AddressForm>

          <SectionHeader>Review Items</SectionHeader>

          {cart.orderItems.map((item) => (
            <CartItem key={item.product}>
              <ItemInfo>
                <h4>{item.name}</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    onClick={() => updateQty(item.product, -1)}
                    style={{ padding: "2px 6px" }}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.product, 1)}
                    style={{ padding: "2px 6px" }}
                  >
                    <Plus size={14} />
                  </button>
                  <Trash2
                    size={18}
                    color="red"
                    onClick={() => removeFromCart(item.product, "once")}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </ItemInfo>
              <ItemPrice>₹{(item.price * item.qty).toFixed(2)}</ItemPrice>
            </CartItem>
          ))}

          {cart.subscriptions.map((item) => (
            <CartItem key={item.product}>
              <ItemInfo $isSub>
                <h4>{item.name} (Subscription)</h4>
                <p>Plan: {item.plan}</p>
              </ItemInfo>
              <ItemPrice>₹{item.price.toFixed(2)}</ItemPrice>
            </CartItem>
          ))}
        </CartDetails>

        <SummaryCard>
          <SectionHeader>Price Details</SectionHeader>
          <SummaryLine>
            <span>Subtotal</span>
            <span>₹{totals.subtotal.toFixed(2)}</span>
          </SummaryLine>
          <SummaryLine>
            <span>GST (5%)</span>
            <span>₹{totals.tax.toFixed(2)}</span>
          </SummaryLine>
          <SummaryLine>
            <span>Delivery Charges</span>
            <span
              style={{ color: totals.shipping === 0 ? "green" : "inherit" }}
            >
              {totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`}
            </span>
          </SummaryLine>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eee",
              margin: "15px 0",
            }}
          />
          <SummaryLine $total>
            <span>Amount Payable</span>
            <span>₹{totals.grandTotal.toFixed(2)}</span>
          </SummaryLine>
          <CheckoutButton
            onClick={handleCheckout}
            disabled={isCartEmpty || (useDefault && !hasDefaultAddress)}
          >
            Confirm Order & Pay
          </CheckoutButton>
        </SummaryCard>
      </ContentWrapper>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
