// backend-grocery/server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows frontend to access backend

// Basic Route for Testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
