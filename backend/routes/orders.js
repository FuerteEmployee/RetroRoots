
const router = require("express").Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Get all orders (Admin only)
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find().sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new order (Stock Decrement)
router.post("/", async (req, res) => {
  try {
    const { items, customerInfo, totalAmount, paymentDetails } = req.body;

    // Generate a unique order number
    const orderNumber = `RR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 1. Validate and Decrement Stock atomically for each item
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findOneAndUpdate(
        { 
          _id: item.productId, 
          "variants._id": item.variantId,
          "variants.stock": { $gte: item.quantity } // Ensure enough stock
        },
        { 
          $inc: { 
            "variants.$.stock": -item.quantity,
            "variants.$.soldQuantity": item.quantity 
          } 
        },
        { new: true }
      );

      if (!product) {
        return res.status(400).json({ 
          message: `Sorry, one or more items are no longer available in the requested quantity (SKU: ${item.sku})` 
        });
      }

      const variant = product.variants.id(item.variantId);
      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        productName: product.name,
        sku: variant.sku,
        quantity: item.quantity,
        price: variant.price
      });
    }

    // 2. Create Order
    const order = new Order({
      orderNumber,
      items: orderItems,
      totalAmount,
      customerInfo,
      paymentStatus: "paid", // Assuming payment success for this demo
      paymentDetails
    });

    await order.save();
    res.status(201).json(order);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Order Status (Stock Increment on Cancel/Return)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    // If order is already in a final state, don't allow changes that affect stock twice
    const isReturningToStock = ["cancelled", "returned"].includes(status) && 
                               !["cancelled", "returned"].includes(order.status);

    if (isReturningToStock) {
      // Return items to stock
      for (const item of order.items) {
        await Product.findOneAndUpdate(
          { _id: item.productId, "variants._id": item.variantId },
          { 
            $inc: { 
              "variants.$.stock": item.quantity,
              "variants.$.soldQuantity": -item.quantity 
            } 
          }
        );
      }
    }

    order.status = status;
    await order.save();
    res.json(order);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
