import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const categories = [
  {
    name: "Fresh Vegetables",
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=300",
    desc: "Farm fresh veggies direct from the field.",
  },
  {
    name: "Fresh Fruits",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=300",
    desc: "Seasonal, exotic, and daily fruits.",
  },
  {
    name: "Dairy & Breakfast",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300",
    desc: "Milk, Curd, Bread, Eggs & Butter.",
  },
  {
    name: "Munchies & Snacks",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=300",
    desc: "Chips, Biscuits, Namkeen & Popcorn.",
  },
];

const products = [
  {
    name: "Potato (Aloo)",
    category: "Fresh Vegetables",
    price: 30,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f8aba655?auto=format&fit=crop&q=80&w=300",
    stock: 100,
  },
  {
    name: "Onion",
    category: "Fresh Vegetables",
    price: 40,
    unit: "1 kg",
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=300",
    stock: 100,
  },
  {
    name: "Banana",
    category: "Fresh Fruits",
    price: 60,
    unit: "1 Dozen",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=300",
    stock: 50,
  },
  {
    name: "Full Cream Milk",
    category: "Dairy & Breakfast",
    price: 64,
    unit: "1 Liter",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300",
    stock: 40,
  },
];

const importData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
