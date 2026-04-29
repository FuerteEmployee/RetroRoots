const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

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

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Get or create all required categories
    const categoryNames = [...CATEGORY_MAP.map(m => m.name), "Other"];
    const categoryIdMap = {};

    for (const name of categoryNames) {
      let cat = await Category.findOne({ name });
      if (!cat) {
        cat = await Category.create({ name });
        console.log(`Created new category: ${name}`);
      }
      categoryIdMap[name] = cat._id;
    }

    // 2. Fetch all products
    const products = await Product.find({}).populate("category");
    console.log(`Fetched ${products.length} products`);

    const bulkOps = [];
    let processedCount = 0;
    let updatedCount = 0;

    for (const product of products) {
      processedCount++;
      const targetCategoryName = getCategoryName(product.name);
      const targetCategoryId = categoryIdMap[targetCategoryName];

      // Check if current category is already correct
      const currentCategoryName = product.category ? product.category.name : null;

      if (currentCategoryName !== targetCategoryName) {
        bulkOps.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { category: targetCategoryId } }
          }
        });
        updatedCount++;
      }
    }

    // 3. Execute bulk update
    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps);
      console.log("Bulk update completed");
    } else {
      console.log("No updates needed");
    }

    console.log(`Total processed: ${processedCount}`);
    console.log(`Total updated: ${updatedCount}`);

  } catch (err) {
    console.error("Error during categorization:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
