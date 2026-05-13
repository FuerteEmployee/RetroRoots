const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

// Get all variants across all products
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    let allVariants = [];
    
    products.forEach(product => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach(variant => {
          allVariants.push({
            productId: product._id,
            productName: product.name,
            category: product.category?.name || "Uncategorized",
            productImages: product.images, // Fallback images
            ...variant.toObject()
          });
        });
      }
    });

    res.json(allVariants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update stock for a specific variant
router.put("/:productId/:variantId", auth, async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { stock, type, seatingCapacity, color, size, sku } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.id(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    if (stock !== undefined) variant.stock = stock;
    if (type !== undefined) variant.type = type;
    if (seatingCapacity !== undefined) variant.seatingCapacity = seatingCapacity;
    if (color !== undefined) variant.color = color;
    if (size !== undefined) variant.size = size;
    if (sku !== undefined) variant.sku = sku;

    await product.save();
    res.json({ message: "Inventory updated successfully", variant });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
