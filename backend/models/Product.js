const mongoose = require("mongoose");
const slugify = require("slugify");

const variantSchema = new mongoose.Schema({
  seatingCapacity: { type: String },
  size: { type: String },
  color: { type: String },
  type: { type: String }, // Sofa Type (Recliner, L Shape, etc.)
  sku: { type: String, unique: true, sparse: true },
  stock: { type: Number, default: 0 },
  reservedStock: { type: Number, default: 0 },
  soldQuantity: { type: Number, default: 0 },
  price: { type: Number },
  images: [{ url: String, publicId: String }],
  status: { type: String, enum: ["In Stock", "Low Stock", "Out of Stock"], default: "Out of Stock" }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  sku: { type: String }, // Parent SKU
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  industryTags: [String],
  description: { type: String, default: "Crafted with premium quality materials and timeless design, this piece adds comfort, elegance, and functionality to any modern living space. Designed for durability and everyday use, it blends perfectly with contemporary and classic interiors." },
  aiMetaDescription: { type: String },
  images: [{ url: String, publicId: String, label: String }],
  modelFile: { url: String, publicId: String },
  videoUrl: { type: String },
  specPdf: { url: String, publicId: String },
  priceRange: { type: String },
  sizes: [String],
  seats: [String],
  colors: [String],
  variants: [variantSchema],
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre("save", function (next) {
  // Automatically update variant status based on stock
  if (this.variants && this.variants.length > 0) {
    this.variants.forEach(variant => {
      if (variant.stock > 5) variant.status = "In Stock";
      else if (variant.stock > 0) variant.status = "Low Stock";
      else variant.status = "Out of Stock";
    });
  }
  next();
});


productSchema.pre("save", function (next) {
  if (this.isModified("name")) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
