const mongoose = require("mongoose");
const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  description: { type: String },
  closingDate: { type: Date },
  isActive: { type: Boolean, default: true },
  applications: [{
    name: String,
    email: String,
    phone: String,
    resumeUrl: String,
    appliedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });
module.exports = mongoose.model("Career", careerSchema);
