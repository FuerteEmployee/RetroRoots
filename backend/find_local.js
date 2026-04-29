const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const products = await Product.find({
    $or: [
      { "images.0.url": { $exists: true, $not: /http/ } },
      { image: { $exists: true, $ne: "", $not: /http/ } }
    ]
  }).lean();
  
  console.log(`Products with non-HTTP images: ${products.length}`);
  if (products.length > 0) {
    products.slice(0, 5).forEach(p => {
      console.log(`- ${p.name}: ${JSON.stringify(p.images[0] || p.image)}`);
    });
  }
  
  await mongoose.disconnect();
});
