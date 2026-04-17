const mongoose = require("mongoose");
const enquirySchema = new mongoose.Schema({
  type: { type: String, enum: ["contact", "product"], default: "contact" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  productName: { type: String },
  isRead: { type: Boolean, default: false },
  isReplied: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Enquiry", enquirySchema);
