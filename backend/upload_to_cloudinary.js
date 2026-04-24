const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./models/Product");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const uploadsPath = path.join(__dirname, "uploads");
    
    // Get all products with local images (not http urls)
    const localProducts = await Product.find({
      "images.0.publicId": "local"
    }).lean();

    console.log(`Found ${localProducts.length} products with local images to upload to Cloudinary`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < localProducts.length; i++) {
      const product = localProducts[i];
      const localFilename = product.images[0]?.url;
      
      if (!localFilename) continue;
      
      const localFilePath = path.join(uploadsPath, localFilename);
      
      if (!fs.existsSync(localFilePath)) {
        console.log(`File not found: ${localFilename}`);
        failCount++;
        continue;
      }

      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
          folder: "retroroots/products",
          resource_type: "auto",
          public_id: path.basename(localFilename, path.extname(localFilename)),
        });

        // Update DB with Cloudinary URL
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            "images": [{ url: result.secure_url, publicId: result.public_id }]
          }
        });

        successCount++;
        if (successCount % 10 === 0) {
          console.log(`✅ Uploaded ${successCount}/${localProducts.length} images...`);
        }

      } catch (uploadErr) {
        console.log(`Failed to upload ${localFilename}:`, uploadErr.message);
        failCount++;
      }
    }

    console.log(`\n✅ Done! Uploaded: ${successCount}, Failed: ${failCount}`);
    await mongoose.disconnect();

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

uploadToCloudinary();
