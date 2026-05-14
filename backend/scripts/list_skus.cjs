
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function listProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const products = await Product.find({}).limit(5);
        products.forEach(p => {
            console.log(`Product: ${p.name}, Parent SKU: ${p.sku}`);
            p.variants.forEach(v => {
                console.log(`  Variant SKU: ${v.sku}, Price: ${v.price}`);
            });
        });

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

listProducts();
