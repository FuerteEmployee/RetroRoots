const mongoose = require("mongoose");
const pressSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  mediaLogo: { url: String, publicId: String },
  date: { type: Date },
  articleUrl: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Press", pressSchema);
