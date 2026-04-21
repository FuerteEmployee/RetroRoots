require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await User.findOne({ email: "admin@retroroots.co.in" });
  if (!exists) {
    await User.create({ name: "Admin", email: "admin@retroroots.co.in", password: "admin123", role: "admin" });
    console.log("Admin user created: admin@retroroots.co.in / admin123");
  } else {
    console.log("Admin user already exists");
  }
  mongoose.disconnect();
}).catch(console.error);
