const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  type: { type: String, enum: ["category", "industry-tag"], default: "category" },
  description: { type: String },
  image: { url: String, publicId: String },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("Category", categorySchema);
