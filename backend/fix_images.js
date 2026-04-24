const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./models/Product");

async function fixImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Get all local files in uploads folder
    const uploadsPath = path.join(__dirname, "uploads");
    const localFiles = fs.readdirSync(uploadsPath).filter(file => 
      [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${localFiles.length} local images in uploads folder`);

    // For each local file (e.g. RR-531.jpg), find if there's a product whose image URL
    // contains the same filename, or update the ones we seeded from organize_images.js
    // that already have images[0].url = filename
    
    // First, let's see how many products have local images in images[] array
    const withLocalImages = await Product.find({
      "images.0.url": { $exists: true, $not: /http/ }
    });
    console.log(`Products with local images: ${withLocalImages.length}`);

    // Update old products that have no local images but have matching local file names
    // Map: product name -> local file (e.g. "RR-531" -> "RR-531.jpg")
    const productsWithExternalImage = await Product.find({
      image: /retroroots\.co\.in/,
      $or: [
        { images: { $size: 0 } },
        { "images.0.url": /http/ }
      ]
    });

    console.log(`Products with broken external images: ${productsWithExternalImage.length}`);

    let updated = 0;
    for (const product of productsWithExternalImage) {
      // Try to find a matching local file by product name
      const productName = product.name; // e.g. "RR-531"
      const matchingFile = localFiles.find(f => {
        const baseName = path.basename(f, path.extname(f)); // e.g. "RR-531"
        return baseName.toLowerCase() === productName.toLowerCase();
      });

      if (matchingFile) {
        await Product.findByIdAndUpdate(product._id, {
          $set: {
            "images": [{ url: matchingFile, publicId: "local" }]
          }
        });
        updated++;
        if (updated % 50 === 0) console.log(`Updated ${updated} products...`);
      }
    }

    console.log(`\n✅ Done! Updated ${updated} products with local images.`);

    // Summary
    const totalWithImages = await Product.countDocuments({
      $or: [
        { "images.0.url": { $exists: true } },
        { image: { $exists: true, $ne: "" } }
      ]
    });
    console.log(`Total products with images: ${totalWithImages}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fixImages();
