const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://retroroots.co.in",
    "https://www.retroroots.co.in",
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8081",
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("CRITICAL: MongoDB Connection Error!");
    console.error("Message:", err.message);
    console.error("Check If MONGO_URI is set correctly in environment variables.");
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/daily-updates", require("./routes/dailyUpdates"));
app.use("/api/distributors", require("./routes/distributors"));
app.use("/api/enquiries", require("./routes/enquiries"));
app.use("/api/team", require("./routes/team"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/expos", require("./routes/expos"));
app.use("/api/press", require("./routes/press"));
app.use("/api/trusted-by", require("./routes/trustedBy"));
app.use("/api/careers", require("./routes/careers"));
app.use("/api/settings", require("./routes/settings"));
app.use("/api/seo", require("./routes/seo"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/inventory", require("./routes/inventory"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/upload", require("./routes/upload"));


app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
