
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');
const Order = require('../models/Order');

async function testStockDecrement() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        // Find a product with a variant
        const product = await Product.findOne({ "variants.0": { $exists: true } });
        if (!product) {
            console.log("No products with variants found.");
            return;
        }

        const variant = product.variants[0];
        const initialStock = variant.stock;
        const productId = product._id;
        const variantId = variant._id;

        console.log(`Testing with Product: ${product.name}, Variant SKU: ${variant.sku}`);
        console.log(`Initial Stock: ${initialStock}`);

        // Simulate an order (Manually calling the logic that would be in the route)
        const quantityToOrder = 1;
        
        const updatedProduct = await Product.findOneAndUpdate(
            { 
              _id: productId, 
              "variants._id": variantId,
              "variants.stock": { $gte: quantityToOrder }
            },
            { 
              $inc: { 
                "variants.$.stock": -quantityToOrder,
                "variants.$.soldQuantity": quantityToOrder 
              } 
            },
            { new: true }
        );

        if (updatedProduct) {
            const updatedVariant = updatedProduct.variants.id(variantId);
            console.log(`Stock after decrement: ${updatedVariant.stock}`);
            
            // Now test increment (Cancellation)
            await Product.findOneAndUpdate(
                { _id: productId, "variants._id": variantId },
                { 
                  $inc: { 
                    "variants.$.stock": quantityToOrder,
                    "variants.$.soldQuantity": -quantityToOrder 
                  } 
                }
            );
            
            const finalProduct = await Product.findById(productId);
            const finalVariant = finalProduct.variants.id(variantId);
            console.log(`Stock after increment (reversal): ${finalVariant.stock}`);
            
            if (finalVariant.stock === initialStock) {
                console.log("SUCCESS: Stock management logic works correctly!");
            } else {
                console.log("FAILURE: Stock did not return to initial value.");
            }
        } else {
            console.log("FAILURE: Atomic update failed (possibly insufficient stock).");
        }

    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        await mongoose.connection.close();
    }
}

testStockDecrement();
