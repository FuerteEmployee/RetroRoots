const mongoose = require("mongoose");
const dailyUpdateSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("DailyUpdate", dailyUpdateSchema);
