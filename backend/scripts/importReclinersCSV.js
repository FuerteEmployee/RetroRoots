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

async function uploadImage(url) {
  if (!url) return null;
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: "retro_roots/recliners"
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    console.error(`  Failed to upload: ${url}`, err.message);
    return null;
  }
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const reclinerCat = await Category.findOneAndUpdate(
      { name: "Recliners" },
      { name: "Recliners", slug: "recliners" },
      { upsert: true, new: true }
    );

    const csvPath = "C:\\Users\\SHIVANI\\Downloads\\recliners.csv";
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at ${csvPath}`);
    }

    const content = fs.readFileSync(csvPath, "utf8");
    const lines = content.split("\n").filter(l => l.trim() !== "");
    
    const dataLines = lines.slice(1);
    console.log(`Processing ${dataLines.length} recliners from CSV...`);

    for (let i = 0; i < dataLines.length; i++) {
      const parts = dataLines[i].split(",");
      const productId = parts[0]?.trim();
      const imageUrl = parts[2]?.trim();

      if (!productId) continue;

      console.log(`[${i+1}/${dataLines.length}] Importing: ${productId}`);

      const img = await uploadImage(imageUrl);
      const images = img ? [img] : [];

      try {
        await Product.create({
          name: productId,
          slug: slugify(productId + "-" + Math.floor(Math.random() * 10000), { lower: true, strict: true }),
          category: reclinerCat._id,
          images: images,
          description: `Imported from recliners.csv`,
          isVisible: true
        });
      } catch (err) {
        console.error(`  Error: ${err.message}`);
      }
    }

    console.log("RECLINERS IMPORT COMPLETED!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
