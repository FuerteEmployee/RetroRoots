const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { url: String, publicId: String },
  category: { type: String, enum: ["factory", "installation", "event", "entry-to-exit"], default: "factory" },
  stepLabel: { type: String },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("Gallery", gallerySchema);
