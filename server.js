// ====== PORT & DB SETUP ======
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1); // stop here if it's missing
}

console.log("🚀 Starting aitoolsprint-backend server.js...");
console.log("ℹ️ Using PORT:", PORT);

// Connect to MongoDB first, then start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // crash clearly if DB fails
  }
};

startServer();
