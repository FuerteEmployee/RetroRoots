const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../backend/.env") });
const Product = require("../backend/models/Product");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const local = await Product.countDocuments({
    "images.0.publicId": "local"
  });
  const external = await Product.countDocuments({
    "images.0.url": /http/
  });
  const none = await Product.countDocuments({
    $or: [
      { images: { $size: 0 } },
      { images: { $exists: false } }
    ]
  });
  const stringOnly = await Product.countDocuments({
    image: { $exists: true, $ne: "" },
    images: { $size: 0 }
  });

  console.log(`Local images (publicId: "local"): ${local}`);
  console.log(`External images (contains http): ${external}`);
  console.log(`No images array: ${none}`);
  console.log(`Only 'image' field set (string): ${stringOnly}`);

  if (stringOnly > 0) {
    const sample = await Product.findOne({ image: { $exists: true, $ne: "" }, images: { $size: 0 } }).lean();
    console.log(`Sample 'image' field: ${sample.image}`);
  }

  await mongoose.disconnect();
});
