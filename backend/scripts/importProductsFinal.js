const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- CATEGORY MAPPING LOGIC ---
const CATEGORY_MAP = [
  { keywords: ["sofa"], name: "Sofa" },
  { keywords: ["recliner"], name: "Recliners" },
  { keywords: ["dining"], name: "Dining Chair" },
  { keywords: ["lounge"], name: "Lounge Chair" },
  { keywords: ["lounger", "diwaan"], name: "Lounger (Diwaan)" },
];

function getCategoryName(name) {
  const lowerName = name.toLowerCase();
  for (const mapping of CATEGORY_MAP) {
    if (mapping.keywords.some(k => lowerName.includes(k))) {
      return mapping.name;
    }
  }
  return "Other";
}

// --- HELPER: UPLOAD TO CLOUDINARY ---
async function uploadImage(url, folder) {
  if (!url) return null;
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: `retro_roots/${folder || 'general'}`
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error(`  Failed to upload: ${url}`, error.message);
    return null;
  }
}

async function runImport() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const jsonPath = path.join(__dirname, "../../mongo/products.json");
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`File not found: ${jsonPath}`);
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    console.log(`Starting import of ${data.length} products...`);

    const categoryIdMap = {};

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(`[${i + 1}/${data.length}] Processing: ${item.title}`);

      // 1. Determine Category
      const catName = getCategoryName(item.title);
      if (!categoryIdMap[catName]) {
        let cat = await Category.findOne({ name: catName });
        if (!cat) {
          cat = await Category.create({ 
            name: catName, 
            slug: slugify(catName, { lower: true, strict: true }) 
          });
          console.log(`  Created Category: ${catName}`);
        }
        categoryIdMap[catName] = cat._id;
      }

      // 2. Upload Images
      const images = [];
      const primary = await uploadImage(item.primaryImage, item.categoryFolder);
      if (primary) images.push(primary);
      const secondary = await uploadImage(item.secondaryImage, item.categoryFolder);
      if (secondary) images.push(secondary);

      // 3. Create Product
      try {
        await Product.create({
          name: item.title,
          slug: slugify(item.title + "-" + Math.floor(Math.random() * 10000), { lower: true, strict: true }),
          category: categoryIdMap[catName],
          images: images,
          priceRange: item.price,
          description: `Imported from ${item.link}`,
          isVisible: true
        });
      } catch (err) {
        if (err.code === 11000) {
          console.warn(`  Skipping duplicate: ${item.title}`);
        } else {
          throw err;
        }
      }
    }

    console.log("IMPORT COMPLETED!");
  } catch (err) {
    console.error("IMPORT FAILED:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runImport();
