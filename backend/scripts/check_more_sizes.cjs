
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function checkMoreSizes() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({ 'variants.0': { $exists: true } }).skip(20).limit(20);
        products.forEach(p => {
            p.variants.forEach(v => {
                console.log(`Product: ${p.name}, Variant SKU: ${v.sku}, Size: ${v.size}, Seating: ${v.seatingCapacity}, Color: ${v.color}`);
            });
        });
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

checkMoreSizes();
