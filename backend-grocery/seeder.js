import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';

// Since we are in the backend folder, we can't easily import from the frontend src folder.
// I've extracted the data from your codebase_filtered.txt file for you below.
const products = [
    {
        name: "Farm Fresh Milk",
        category: "Dairy",
        price: 45,
        unit: "1L",
        image: "https://images.unsplash.com/photo-1563636619-e910ef2a844b?w=200",
        stock: 50,
        description: "Fresh cow milk from local farms."
    },
    {
        name: "Organic Bananas",
        category: "Fruits",
        price: 60,
        unit: "1kg",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200",
        stock: 100,
        description: "Sweet and ripe organic bananas."
    },
    {
        name: "Brown Bread",
        category: "Bakery",
        price: 40,
        unit: "400g",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200",
        stock: 30,
        description: "Healthy whole wheat brown bread."
    },
    {
        name: "Red Tomatoes",
        category: "Vegetables",
        price: 30,
        unit: "1kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad675?w=200",
        stock: 80,
        description: "Juicy red tomatoes for your salads."
    }
];

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear existing products
        await Product.deleteMany();

        // Insert new products
        await Product.insertMany(products);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}