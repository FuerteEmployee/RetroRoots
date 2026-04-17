const mongoose = require("mongoose");
const distributorSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pinCode: { type: String },
  area: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String, default: "India" },
  territory: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  isVisibleOnMap: { type: Boolean, default: false },
  message: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Distributor", distributorSchema);
