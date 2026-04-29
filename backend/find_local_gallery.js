const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Gallery = require("./models/Gallery");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const items = await Gallery.find({
    "image.url": { $exists: true, $not: /http/ }
  }).lean();
  
  console.log(`Gallery items with local images: ${items.length}`);
  if (items.length > 0) {
    items.slice(0, 5).forEach(i => {
      console.log(`- ${i.title}: ${JSON.stringify(i.image)}`);
    });
  }
  
  await mongoose.disconnect();
});
