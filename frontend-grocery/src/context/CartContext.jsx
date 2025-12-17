import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ orderItems: [], subscriptions: [] });
  const { user } = useAuth();

  // 1. Fetch cart from DB on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const { data } = await API.get("/users/cart");
          if (data) setCart(data);
        } catch (err) {
          console.error("Failed to fetch cart from server");
        }
      } else {
        // Fallback to local storage for guests
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCart(JSON.parse(savedCart));
      }
    };
    fetchCart();
  }, [user]);

  // 2. Sync cart to DB and LocalStorage on changes
  useEffect(() => {
    const syncCart = async () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      if (user) {
        try {
          await API.post("/users/cart", cart);
        } catch (err) {
          console.error("Failed to sync cart to server");
        }
      }
    };
    syncCart();
  }, [cart, user]);

  const addToCart = (item, type) => {
    setCart((prev) => {
      if (type === "once") {
        const exist = prev.orderItems.find((i) => i.product === item._id);
        const currentQty = exist ? exist.qty : 0;

        if (currentQty + 1 > item.stock) {
          toast.error(`Only ${item.stock} left in stock.`);
          return prev;
        }

        if (exist) {
          return {
            ...prev,
            orderItems: prev.orderItems.map((i) =>
              i.product === item._id ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }
        return {
          ...prev,
          orderItems: [
            ...prev.orderItems,
            {
              product: item._id,
              name: item.name,
              price: item.price,
              image: item.image,
              qty: 1,
              stock: item.stock,
            },
          ],
        };
      } else {
        const exist = prev.subscriptions.find((s) => s.product === item._id);
        if (exist) {
          toast.info("Already in subscriptions");
          return prev;
        }
        return {
          ...prev,
          subscriptions: [
            ...prev.subscriptions,
            {
              product: item._id,
              name: item.name,
              price: item.price,
              image: item.image,
              frequency: "Daily",
            },
          ],
        };
      }
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) => ({
      ...prev,
      orderItems: prev.orderItems.map((item) => {
        if (item.product === id) {
          const newQty = item.qty + delta;
          if (delta > 0 && newQty > item.stock) {
            toast.error("Maximum stock reached");
            return item;
          }
          return { ...item, qty: Math.max(1, newQty) };
        }
        return item;
      }),
    }));
  };

  const removeFromCart = (id, type) => {
    setCart((prev) => ({
      ...prev,
      [type === "once" ? "orderItems" : "subscriptions"]: prev[
        type === "once" ? "orderItems" : "subscriptions"
      ].filter((x) => x.product !== id),
    }));
  };

  const clearCart = () => setCart({ orderItems: [], subscriptions: [] });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartCount: cart.orderItems.length + cart.subscriptions.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
