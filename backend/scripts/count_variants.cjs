
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function countVariants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const products = await Product.find({});
        let totalVariants = 0;
        products.forEach(p => {
            if (p.variants) totalVariants += p.variants.length;
        });
        console.log(`Total Products: ${products.length}`);
        console.log(`Total Variants: ${totalVariants}`);

        const productsWithVariants = products.filter(p => p.variants && p.variants.length > 0);
        console.log(`Products with variants: ${productsWithVariants.length}`);
        if (productsWithVariants.length > 0) {
            console.log("Sample product with variants:");
            const p = productsWithVariants[0];
            console.log(`Name: ${p.name}`);
            p.variants.forEach(v => console.log(`  Variant SKU: ${v.sku}`));
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

countVariants();
