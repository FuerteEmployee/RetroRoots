const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Product = require("./models/Product");
const Category = require("./models/Category");

const categoriesData = [
  {
    name: "Sofa",
    slug: "sofa",
    subcategories: ["1 Seater", "2 Seater", "3 Seater", "L-Shape Sofa", "Sofa cum Bed", "Fabric Sofa", "Leatherette Sofa", "Velvet Sofa", "Bovine Leather", "Modern", "Chesterfield", "Sectional", "Tufted", "Minimalist"]
  },
  {
    name: "Dining Chair",
    slug: "dining-chair",
    subcategories: ["Modern", "Traditional", "Scandinavian", "Industrial", "Rustic", "Solid Wood", "Metal Frame", "Upholstered", "Plastic/Molded", "Armchairs", "Side Chairs", "Parsons Chairs", "Ladder Back"]
  },
  {
    name: "Lounger (Diwaan)",
    slug: "lounger",
    subcategories: ["Single Lounger", "Double Lounger", "Daybed", "Traditional Diwaan", "Contemporary", "Traditional", "Royal Ivory", "Classic Teak"]
  },
  {
    name: "Lounge Chair",
    slug: "lounge-chair",
    subcategories: ["Reading Chair", "Accent Chair", "Bedroom Chair", "Fireside Chair", "Wingback", "Club Chair", "Barrel Chair", "Slipper Chair"]
  },
  {
    name: "Recliners",
    slug: "recliners",
    subcategories: ["Manual Recliner", "Power Recliner", "Motorized Recliner", "Push-back", "Rocking Recliner", "Swivel Recliner", "Massaging Recliner", "Lift Chair"]
  }
];

async function organize() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 1. Create or get categories
    const categoryMap = {};
    for (const catData of categoriesData) {
      let cat = await Category.findOne({ name: catData.name });
      if (!cat) {
        cat = await Category.create({
          name: catData.name,
          slug: catData.slug,
          description: `Premium ${catData.name} collection`
        });
      }
      categoryMap[catData.name] = { id: cat._id, subs: catData.subcategories };
    }

    // 2. Clear existing products to start fresh (or you can skip this if you want to keep them)
    // await Product.deleteMany({});
    // console.log("Cleared existing products");

    // 3. Scan uploads folder
    const uploadsPath = path.join(__dirname, "uploads");
    const files = fs.readdirSync(uploadsPath).filter(file => 
      [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(file).toLowerCase())
    );

    console.log(`Found ${files.length} images in uploads folder`);

    const productsToCreate = [];
    const catNames = Object.keys(categoryMap);

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const categoryName = catNames[i % catNames.length]; // Distribute evenly
      const catInfo = categoryMap[categoryName];
      
      // Assign a random subcategory tag
      const randomSub = catInfo.subs[Math.floor(Math.random() * catInfo.subs.length)];
      
      const productName = `${categoryName} ${fileName.split('.')[0]}`;
      const slug = `${categoryName.toLowerCase().replace(/ /g, '-')}-${fileName.split('.')[0].toLowerCase()}`;

      // Check if product already exists with this image
      const existing = await Product.findOne({ "images.url": fileName });
      if (existing) continue;

      productsToCreate.push({
        name: productName,
        slug: slug,
        category: catInfo.id,
        industryTags: [randomSub, "Living Room"], // Add subcategory and a general tag
        description: `High-quality ${categoryName} - ${productName}. Crafted with precision and style.`,
        priceRange: "Consult for Price",
        images: [{ url: fileName, publicId: "local" }],
        isVisible: true
      });
    }

    if (productsToCreate.length > 0) {
      await Product.insertMany(productsToCreate);
      console.log(`Successfully added ${productsToCreate.length} products`);
    } else {
      console.log("No new products to add");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error organizing images:", error);
    process.exit(1);
  }
}

organize();
