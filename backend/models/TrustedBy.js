const mongoose = require("mongoose");
const trustedBySchema = new mongoose.Schema({
  name: { type: String },
  logo: { url: String, publicId: String },
  link: { type: String },
  type: { type: String, enum: ["client", "press"], default: "client" },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("TrustedBy", trustedBySchema);
