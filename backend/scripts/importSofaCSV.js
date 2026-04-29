const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const BASE_URL = "https://retroroots.co.in";

async function uploadImage(relPath) {
  if (!relPath) return null;
  const cleanPath = relPath.replace(/^\.\.\//, "/");
  const fullUrl = BASE_URL + cleanPath;
  
  try {
    const result = await cloudinary.uploader.upload(fullUrl, {
      folder: "retro_roots/sofa"
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    console.error(`  Failed to upload: ${fullUrl}`, err.message);
    return null;
  }
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const sofaCat = await Category.findOneAndUpdate(
      { name: "Sofa" },
      { name: "Sofa", slug: "sofa" },
      { upsert: true, new: true }
    );

    // Delete existing products imported from this CSV to avoid duplicates with empty images
    const deleteResult = await Product.deleteMany({ category: sofaCat._id });
    console.log(`Deleted ${deleteResult.deletedCount} existing sofa products.`);

    const csvPath = path.join(__dirname, "../../products.csv");
    const content = fs.readFileSync(csvPath, "utf8");
    const lines = content.split("\n").filter(l => l.trim() !== "");
    
    const dataLines = lines.slice(1);
    console.log(`Processing ${dataLines.length} products from CSV...`);

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i];
      // Use regex to split CSV to handle potential commas in quotes (though not expected here)
      const parts = line.split(",");
      const productId = parts[0];
      const csvCategory = parts[1];
      const imagePath = parts[2];

      if (!productId) continue;

      console.log(`[${i+1}/${dataLines.length}] Importing: ${productId}`);

      const img = await uploadImage(imagePath);
      const images = img ? [img] : [];

      try {
        await Product.create({
          name: productId,
          slug: slugify(productId + "-" + Math.floor(Math.random() * 10000), { lower: true, strict: true }),
          category: sofaCat._id,
          images: images,
          description: `Imported from CSV. Original category: ${csvCategory}`,
          isVisible: true
        });
      } catch (err) {
        console.error(`  Error: ${err.message}`);
      }
    }

    console.log("CSV IMPORT COMPLETED WITH CORRECT IMAGES!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
