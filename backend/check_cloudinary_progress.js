const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const cloudinaryCount = await Product.countDocuments({
    "images.0.publicId": { $ne: "local" },
    "images.0.url": { $regex: "cloudinary.com" }
  });
  
  const localCount = await Product.countDocuments({
    "images.0.publicId": "local"
  });

  console.log(`Products with Cloudinary URLs: ${cloudinaryCount}`);
  console.log(`Products still needing upload (local): ${localCount}`);
  
  const sample = await Product.findOne({ "images.0.url": { $regex: "cloudinary.com" } });
  if (sample) {
      console.log(`Sample Cloudinary URL: ${sample.images[0].url}`);
  }

  await mongoose.disconnect();
});
