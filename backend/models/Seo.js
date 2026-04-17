const mongoose = require("mongoose");
const seoSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true },
  title: { type: String },
  metaDescription: { type: String },
  keywords: [String],
  ogImage: { url: String, publicId: String },
  canonicalUrl: { type: String },
  robotsTxt: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Seo", seoSchema);
