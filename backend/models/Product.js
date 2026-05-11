const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  sku: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  industryTags: [String],
  description: { type: String, default: "Crafted with premium quality materials and timeless design, this piece adds comfort, elegance, and functionality to any modern living space. Designed for durability and everyday use, it blends perfectly with contemporary and classic interiors." },
  aiMetaDescription: { type: String },
  images: [{ url: String, publicId: String }],
  modelFile: { url: String, publicId: String },
  videoUrl: { type: String },
  specPdf: { url: String, publicId: String },
  priceRange: { type: String },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre("save", function (next) {
  if (this.isModified("name")) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
