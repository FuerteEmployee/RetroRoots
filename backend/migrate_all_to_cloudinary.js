const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./models/Product");
const Category = require("./models/Category");
const Gallery = require("./models/Gallery");
const Blog = require("./models/Blog");
const Team = require("./models/Team");
const TrustedBy = require("./models/TrustedBy");
const Certificate = require("./models/Certificate");
const Expo = require("./models/Expo");
const Press = require("./models/Press");

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
      
      let filePath = path.join(uploadsPath, localName);
      if (!fs.existsSync(filePath)) {
        const extensions = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".PNG"];
        for (const ext of extensions) {
          if (fs.existsSync(filePath + ext)) { filePath += ext; break; }
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

    const models = [
      { M: Product, imgField: "images.0.url", updateField: "images", isArray: true },
      { M: Category, imgField: "image.url", updateField: "image" },
      { M: Gallery, imgField: "image.url", updateField: "image" },
      { M: Blog, imgField: "featuredImage.url", updateField: "featuredImage" },
      { M: Team, imgField: "photo.url", updateField: "photo" },
      { M: TrustedBy, imgField: "logo.url", updateField: "logo" },
      { M: Certificate, imgField: "image.url", updateField: "image" },
      { M: Expo, imgField: "image.url", updateField: "image" },
      { M: Press, imgField: "mediaLogo.url", updateField: "mediaLogo" }
    ];

    for (const m of models) {
      console.log(`Checking ${m.M.modelName}...`);
      const items = await m.M.find({ [m.imgField]: { $exists: true, $not: /http/ } });
      console.log(`  Found ${items.length} to migrate`);
      for (const item of items) {
        const localUrl = m.isArray ? item.images[0].url : item[m.updateField.split('.')[0]].url;
        const uploaded = await uploadFile(localUrl);
        if (uploaded) {
          const update = m.isArray ? { [m.updateField]: [uploaded] } : { [m.updateField]: uploaded };
          await m.M.findByIdAndUpdate(item._id, { $set: update });
        }
      }
    }

    console.log("\n✅ ALL Migrations Completed!");
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrate();
