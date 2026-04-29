const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const pCount = await Product.countDocuments();
    const cCount = await Category.countDocuments();
    console.log("----------------------------");
    console.log("DATABASE STATUS");
    console.log(`Total Products:   ${pCount}`);
    console.log(`Total Categories: ${cCount}`);
    console.log("----------------------------");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
