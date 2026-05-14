
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function findAnything() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const products = await Product.find({ 
            $or: [
                { name: /RR-501/i },
                { sku: /RR-501/i },
                { 'variants.sku': /RR-501/i }
            ]
        });

        console.log(`Found ${products.length} products matching RR-501`);
        products.forEach(p => {
            console.log(`Product Name: ${p.name}, Parent SKU: ${p.sku}`);
            p.variants.forEach(v => {
                console.log(`  Variant SKU: ${v.sku}, Size: ${v.size}, Seating: ${v.seatingCapacity}`);
            });
        });

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

findAnything();
