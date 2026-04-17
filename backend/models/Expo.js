const mongoose = require("mongoose");
const expoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  description: { type: String },
  registrationLink: { type: String },
  boothPhotos: [{ url: String, publicId: String }],
  isUpcoming: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Expo", expoSchema);
