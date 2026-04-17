const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL ? [process.env.FRONTEND_URL, "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"] : "*"
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

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
app.use("/api/upload", require("./routes/upload"));

app.get("/", (req, res) => res.json({ message: "Flexicore CMS API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
