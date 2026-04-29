const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./models/Product");
const Category = require("./models/Category");
const Gallery = require("./models/Gallery");
const Blog = require("./models/Blog");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const uploadsPath = path.join(__dirname, "uploads");

    async function uploadFile(localName) {
      if (!localName || localName.startsWith("http")) return null;
      
      // Try to find the file with various extensions if not provided
      let filePath = path.join(uploadsPath, localName);
      if (!fs.existsSync(filePath)) {
        const extensions = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".PNG"];
        for (const ext of extensions) {
          if (fs.existsSync(filePath + ext)) {
            filePath += ext;
            break;
          }
        }
      }

      if (!fs.existsSync(filePath)) {
        console.log(`  File not found: ${localName}`);
        return null;
      }

      console.log(`  Uploading ${localName} to Cloudinary...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "retroroots_migration",
        resource_type: "auto",
      });
      return { url: result.secure_url, publicId: result.public_id };
    }

    // 1. PRODUCTS
    console.log("Migrating Products...");
    const products = await Product.find({
      $or: [
        { "images.0.url": { $exists: true, $not: /http/ } },
        { image: { $exists: true, $ne: "", $not: /http/ } }
      ]
    });
    for (const p of products) {
      console.log(`- Product: ${p.name}`);
      const localUrl = p.images[0]?.url || p.image;
      const uploaded = await uploadFile(localUrl);
      if (uploaded) {
        await Product.findByIdAndUpdate(p._id, {
          $set: { images: [uploaded], image: undefined }
        });
      }
    }

    // 2. CATEGORIES
    console.log("Migrating Categories...");
    const cats = await Category.find({
      $or: [
        { "image.url": { $exists: true, $not: /http/ } },
        { image: { $exists: true, $ne: "", $not: /http/ } }
      ]
    });
    for (const c of cats) {
      console.log(`- Category: ${c.name}`);
      const localUrl = c.image?.url || (typeof c.image === 'string' ? c.image : null);
      const uploaded = await uploadFile(localUrl);
      if (uploaded) {
        await Category.findByIdAndUpdate(c._id, {
          $set: { image: uploaded }
        });
      }
    }

    // 3. GALLERY
    console.log("Migrating Gallery...");
    const gallery = await Gallery.find({
      "image.url": { $exists: true, $not: /http/ }
    });
    for (const g of gallery) {
      console.log(`- Gallery: ${g.title}`);
      const uploaded = await uploadFile(g.image.url);
      if (uploaded) {
        await Gallery.findByIdAndUpdate(g._id, {
          $set: { image: uploaded }
        });
      }
    }

    console.log("\n✅ Migration Completed!");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
