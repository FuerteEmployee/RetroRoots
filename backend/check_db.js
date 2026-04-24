const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Show newest 3 products
  const newest = await Product.find().sort({ createdAt: -1 }).limit(3).lean();
  console.log("=== NEWEST 3 PRODUCTS ===");
  newest.forEach(p => {
    console.log(`Name: ${p.name}`);
    console.log(`  image field: ${p.image}`);
    console.log(`  images array: ${p.images.length} items`);
    if (p.images.length > 0) console.log(`  images[0]: ${JSON.stringify(p.images[0])}`);
    console.log(`  createdAt: ${p.createdAt}`);
    console.log();
  });

  // Also verify the static file server works
  console.log("=== CHECKING IF LOCAL FILES MATCH ===");
  const fs = require("fs");
  const uploadsPath = path.join(__dirname, "uploads");
  const localFiles = fs.readdirSync(uploadsPath);
  const sample = newest.find(p => p.images.length > 0);
  if (sample) {
    const fname = sample.images[0]?.url;
    const exists = localFiles.includes(fname);
    console.log(`File '${fname}' exists in uploads: ${exists}`);
  }

  await mongoose.disconnect();
});
