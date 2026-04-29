const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Category = require("../models/Category");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const cats = await Category.find();
    console.log("----------------------------");
    cats.forEach(c => console.log(`${c.name.padEnd(20)} | ${c.slug}`));
    console.log("----------------------------");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

run();
