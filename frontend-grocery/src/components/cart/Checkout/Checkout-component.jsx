import React from "react";
import { toast } from "react-toastify";
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
} from "./Checkout-style";

// Placeholder Cart Data
const mockCartItems = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 15.99,
    quantity: 1,
    subscription: "weekly",
  },
  { id: 2, name: "Organic Milk", price: 5.5, quantity: 2, subscription: null },
  {
    id: 3,
    name: "Broccoli Florets",
    price: 9.25,
    quantity: 1,
    subscription: "monthly",
  },
  {
    id: 4,
    name: "Atta (Wheat Flour)",
    price: 30.0,
    quantity: 1,
    subscription: null,
  },
];

const CheckoutPage = () => {
  // Helper function for calculations
  const calculateTotal = (items) => {
    let subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Apply a mock discount for monthly subscriptions
    const subscriptionDiscount = items
      .filter((item) => item.subscription === "monthly")
      .reduce((acc, item) => acc + item.price * item.quantity * 0.05, 0); // 5% off monthly

    const shippingFee = 5.0;
    const taxRate = 0.08;

    const taxableSubtotal = subtotal - subscriptionDiscount;
    const tax = taxableSubtotal * taxRate;
    const grandTotal = taxableSubtotal + shippingFee + tax;

    return {
      subtotal: subtotal,
      discount: subscriptionDiscount,
      tax: tax,
      shipping: shippingFee,
      grandTotal: grandTotal,
    };
  };

  const totals = calculateTotal(mockCartItems);

  const handleCheckout = () => {
    // --- Future Backend Call ---
    console.log("Initiating checkout for total:", totals.grandTotal);
    toast.info("Proceeding to Payment Gateway...");
    // Future: Navigate to a dedicated payment page or trigger a payment modal
  };

  return (
    <CheckoutContainer>
      <Title>Your Cart Summary</Title>

      <ContentWrapper>
        <CartDetails>
          <SectionHeader>Items ({mockCartItems.length})</SectionHeader>
          {mockCartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemInfo $isSub={!!item.subscription}>
                <h4>
                  {item.name} x {item.quantity}
                </h4>
                <p>
                  {item.subscription
                    ? `Subscription: ${
                        item.subscription.charAt(0).toUpperCase() +
                        item.subscription.slice(1)
                      }`
                    : "One-Time Purchase"}
                </p>
              </ItemInfo>
              <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
            </CartItem>
          ))}
          {mockCartItems.length === 0 && <p>Your cart is empty.</p>}
        </CartDetails>

        <SummaryCard>
          <SectionHeader>Order Total</SectionHeader>

          <SummaryLine>
            Subtotal:{" "}
            <span className="value">${totals.subtotal.toFixed(2)}</span>
          </SummaryLine>
          <SummaryLine>
            Subscription Discount:{" "}
            <span className="value" style={{ color: "var(--color-success)" }}>
              -${totals.discount.toFixed(2)}
            </span>
          </SummaryLine>
          <SummaryLine>
            Shipping Fee:{" "}
            <span className="value">${totals.shipping.toFixed(2)}</span>
          </SummaryLine>
          <SummaryLine>
            Tax (8%): <span className="value">${totals.tax.toFixed(2)}</span>
          </SummaryLine>

          <SummaryLine $total>
            Grand Total:{" "}
            <span className="value">${totals.grandTotal.toFixed(2)}</span>
          </SummaryLine>

          <CheckoutButton
            onClick={handleCheckout}
            disabled={mockCartItems.length === 0}
          >
            Proceed to Payment
          </CheckoutButton>
        </SummaryCard>
      </ContentWrapper>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
