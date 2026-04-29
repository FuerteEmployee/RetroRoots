const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const p = await Product.findOne({ name: /^RR-7/ }).populate('category');
    console.log(JSON.stringify(p, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
