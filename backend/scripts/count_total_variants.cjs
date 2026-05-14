
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function countTotalVariants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({});
        let count = 0;
        products.forEach(p => {
            if (p.variants) count += p.variants.length;
        });
        console.log(`Total Variants in DB: ${count}`);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

countTotalVariants();
