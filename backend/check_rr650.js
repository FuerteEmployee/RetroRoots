const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const p = await Product.findOne({ name: "RR-650" }).lean();
  console.log("=== PRODUCT RR-650 ===");
  if (p) {
    console.log(`Name: ${p.name}`);
    console.log(`image field: ${p.image}`);
    console.log(`images array: ${JSON.stringify(p.images)}`);
  } else {
    console.log("Product not found");
  }
  await mongoose.disconnect();
});
