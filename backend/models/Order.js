
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    sku: { type: String },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"], 
    default: "pending" 
  },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  paymentDetails: {
    transactionId: { type: String },
    method: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
