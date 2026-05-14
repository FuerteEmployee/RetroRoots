
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function checkSku() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const p = await Product.findOne({ name: 'RR-501' });
        console.log(`Product: ${p.name}`);
        p.variants.forEach(v => console.log(`  Variant SKU: ${v.sku}`));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

checkSku();
