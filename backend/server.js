const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Load environment variables from .env (built into Node, no dotenv needed)
try {
  process.loadEnvFile();
} catch {
  // No .env file present — fall back to environment variables from the host.
}

const app = express();
const PORT = 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API route
app.get("/api/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello from backend!",
  });
});

// POST API
app.post("/api/message", (req, res) => {
  const { name } = req.body;

  res.json({
    success: true,
    message: `Hello ${name || "User"}!`,
  });
});

// Database connection
async function connectDB() {
  if (!MONGODB_URI || MONGODB_URI.startsWith("YOUR_MONGODB_ATLAS")) {
    console.warn("MONGODB_URI is not configured yet — skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();
