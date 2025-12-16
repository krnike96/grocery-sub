// src/data/groceryData.js

export const categories = [
  {
    id: 1,
    name: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=300",
    desc: "Farm fresh veggies direct from the field.",
  },
  {
    id: 2,
    name: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=300",
    desc: "Seasonal, exotic, and daily fruits.",
  },
  {
    id: 3,
    name: "Dairy & Breakfast",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300",
    desc: "Milk, Curd, Bread, Eggs & Butter.",
  },
  {
    id: 4,
    name: "Munchies & Snacks",
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=300",
    desc: "Chips, Biscuits, Namkeen & Popcorn.",
  },
];

export const products = [
  // Vegetables
  {
    id: 101,
    categoryId: 1,
    name: "Potato (Aloo)",
    price: 30,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
  {
    id: 102,
    categoryId: 1,
    name: "Onion",
    price: 40,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
  {
    id: 103,
    categoryId: 1,
    name: "Tomato",
    price: 25,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
  
  // Fruits
  {
    id: 201,
    categoryId: 2,
    name: "Banana",
    price: 60,
    unit: "1 Dozen",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
  {
    id: 202,
    categoryId: 2,
    name: "Apple (Royal Gala)",
    price: 180,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: false, // One time only
  },

  // Dairy
  {
    id: 301,
    categoryId: 3,
    name: "Full Cream Milk",
    price: 64,
    unit: "1 Liter",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
  {
    id: 302,
    categoryId: 3,
    name: "Brown Bread",
    price: 45,
    unit: "1 Packet",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300",
    isSubscriptionAvailable: true,
  },
];

export const offers = [
  { id: 1, code: "WELCOME50", desc: "Get 50% OFF on your first order" },
  { id: 2, code: "FREEDEL", desc: "Free Delivery on orders above ₹499" },
];