const mongoose = require("mongoose");
const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuingBody: { type: String },
  date: { type: Date },
  image: { url: String, publicId: String },
  enableDownload: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Certificate", certificateSchema);
