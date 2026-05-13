const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Enquiry = require("../models/Enquiry");
const Distributor = require("../models/Distributor");

router.get("/", auth, async (req, res) => {
  try {
    const [productsCount, blogs, enquiries, unreadEnquiries, distributors, pendingDistributors] = await Promise.all([
      Product.countDocuments(),
      Blog.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ isRead: false }),
      Distributor.countDocuments({ status: "approved" }),
      Distributor.countDocuments({ status: "pending" }),
    ]);

    // Calculate low stock alerts (variants with stock <= 5)
    const productsWithVariants = await Product.find({ "variants.0": { $exists: true } });
    let lowStockCount = 0;
    productsWithVariants.forEach(p => {
      p.variants.forEach(v => {
        if (v.stock <= 5) lowStockCount++;
      });
    });

    const recentEnquiries = await Enquiry.find().sort("-createdAt").limit(5);
    res.json({ 
      products: productsCount, 
      blogs, 
      enquiries, 
      unreadEnquiries, 
      distributors, 
      pendingDistributors, 
      recentEnquiries,
      lowStockCount 
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
