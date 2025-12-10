// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import toolRoutes from "./routes/toolRoutes.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("MERN Blog API is running...");
});

// ===== API ROUTES =====
app.use("/api/posts", postRoutes);
app.use("/api/tools", toolRoutes);

// ===== PORT & DB SETUP =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1); // stop immediately if missing
}

console.log("🚀 Starting aitoolsprint-backend server.js...");
console.log("ℹ️ Using PORT:", PORT);

// Connect to MongoDB first, then start server
const startServer = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err.message);
    process.exit(1); // crash clearly so Render shows the error
  }
};

startServer();
