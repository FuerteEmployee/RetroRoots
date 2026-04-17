const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  bio: { type: String },
  photo: { url: String, publicId: String },
  linkedinUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  isFounder: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Team", teamSchema);
