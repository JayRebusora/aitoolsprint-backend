import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

// CORS
const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://aitoolsprint-frontend.vercel.app",
  "https://aitoolsprint.com",
  "https://www.aitoolsprint.com",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Body parser
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MERN Blog API is running...");
});

// API routes
app.use("/api/posts", postRoutes);

// ====== PORT & DB SETUP ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// IMPORTANT: bind to a numeric port, not a string of code
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
