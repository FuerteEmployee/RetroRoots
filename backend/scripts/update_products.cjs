
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

const data = [
    { sku: "RR-501", price: 24000, d: "30\"", h: "31\"", sh: "17\"" },
    { sku: "RR-502", price: 25800, d: "30\"", h: "31\"", sh: "17\"" },
    { sku: "RR-503", price: 24000, d: "30\"", h: "31\"", sh: "17\"" },
    { sku: "RR-509", price: 36000, d: "34\"", h: "31\"", sh: "17\"" },
    { sku: "RR-510", price: 36000, d: "21\"", h: "31\"", sh: "17\"" },
    { sku: "RR-511", price: 22800, d: "30\"", h: "33\"", sh: "17\"" },
    { sku: "RR-514", price: 24000, d: "30\"", h: "30\"", sh: "17\"" },
    { sku: "RR-516", price: 24000, d: "30\"", h: "31\"", sh: "17\"" },
    { sku: "RR-517", price: 25800, d: "31\"", h: "32\"", sh: "17\"" },
    { sku: "RR-518", price: 24000, d: "30\"", h: "33\"", sh: "17\"" },
    { sku: "RR-519", price: 30000, d: "32\"", h: "31\"", sh: "17\"" },
    { sku: "RR-522", price: 30000, d: "31\"", h: "33\"", sh: "17\"" },
    { sku: "RR-523", price: 25500, d: "30\"", h: "32\"", sh: "17\"" },
    { sku: "RR-524", price: 24000, d: "30\"", h: "32\"", sh: "17\"" },
    { sku: "RR-525", price: 24000, d: "31\"", h: "39\"", sh: "17\"" },
    { sku: "RR-530", price: 36000, d: "33\"", h: "32\"", sh: "17\"" },
    { sku: "RR-532", price: 24000, d: "30\"", h: "31\"", sh: "17\"" },
    { sku: "RR-534", price: 39000, d: "33\"", h: "33\"", sh: "17\"" },
    { sku: "RR-543", price: 30000, d: "31\"", h: "33\"", sh: "17\"" },
    { sku: "RR-546", price: 39000, d: "31\"", h: "30\"", sh: "17\"" }
];

async function updateProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const missing = [];
        const updated = [];

        for (const item of data) {
            const product = await Product.findOne({ name: item.sku });
            if (!product) {
                console.log(`Product ${item.sku} NOT FOUND`);
                missing.push(item.sku);
                continue;
            }

            console.log(`Updating ${item.sku}...`);

            // 1. Update Description with Dimensions
            const dimText = `\n\nDimensions:\nDepth: ${item.d} | Height: ${item.h} | Seat Height: ${item.sh}`;
            if (!product.description.includes("Dimensions:")) {
                product.description += dimText;
            } else {
                // Replace existing dimensions if they exist
                product.description = product.description.replace(/Dimensions:[\s\S]*$/, dimText.trim());
            }

            // 2. Add "2 Seater" and "6Ft" to seats/sizes if missing
            if (!product.seats.includes("2 Seater")) product.seats.push("2 Seater");
            if (!product.sizes.includes("6Ft")) product.sizes.push("6Ft");

            // 3. Find or Create Variant
            let variant = product.variants.find(v => v.sku === item.sku);
            if (!variant) {
                console.log(`  Adding new variant for ${item.sku}`);
                product.variants.push({
                    seatingCapacity: "2 Seater",
                    size: "6Ft",
                    sku: item.sku,
                    price: item.price,
                    stock: 20,
                    status: "In Stock"
                });
            } else {
                console.log(`  Updating existing variant price for ${item.sku}`);
                variant.price = item.price;
                variant.seatingCapacity = "2 Seater";
                variant.size = "6Ft";
            }

            // 4. Set parent SKU as well if missing
            if (!product.sku) product.sku = item.sku;

            await product.save();
            console.log(`  Saved ${item.sku}`);
            updated.push(item.sku);
        }

        console.log("\nUpdate Summary:");
        console.log(`Successfully Updated: ${updated.length}`);
        console.log(`Missing Models: ${missing.length > 0 ? missing.join(", ") : "None"}`);

    } catch (err) {
        console.error("Error during update:", err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

updateProducts();
