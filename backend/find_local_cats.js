const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const cats = await Category.find({
    $or: [
      { "image.url": { $exists: true, $not: /http/ } },
      { image: { $exists: true, $ne: "", $not: /http/ } }
    ]
  }).lean();
  
  console.log(`Categories with non-HTTP images: ${cats.length}`);
  if (cats.length > 0) {
    cats.forEach(c => {
      console.log(`- ${c.name}: ${JSON.stringify(c.image)}`);
    });
  }
  
  await mongoose.disconnect();
});
