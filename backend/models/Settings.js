const mongoose = require("mongoose");
const settingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String },
  whatsappMessage: { type: String, default: "Hi, I want to know more about RetroRoots products." },
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    twitter: String,
  },
  footerText: { type: String },
  privacyPolicyContent: { type: String },
  deliveryPageContent: { type: String },
  cookieConsentText: { type: String },
  smtpConfig: {
    host: String,
    port: Number,
    user: String,
    pass: String,
  },
  heroSlides: [{
    title: String,
    subtitle: String,
    image: { url: String, publicId: String },
    ctaText: String,
    ctaLink: String,
    displayOrder: Number,
  }],
}, { timestamps: true });
module.exports = mongoose.model("Settings", settingsSchema);
