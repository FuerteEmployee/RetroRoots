const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Blog = require("./models/Blog");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const blogs = await Blog.find({
    "featuredImage.url": { $exists: true, $not: /http/ }
  }).lean();
  
  console.log(`Blogs with local images: ${blogs.length}`);
  if (blogs.length > 0) {
    blogs.forEach(b => {
      console.log(`- ${b.title}: ${JSON.stringify(b.featuredImage)}`);
    });
  }
  
  await mongoose.disconnect();
});
