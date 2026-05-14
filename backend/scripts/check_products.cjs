
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const skus = [
            'RR-501', 'RR-502', 'RR-503', 'RR-509', 'RR-510',
            'RR-511', 'RR-514', 'RR-516', 'RR-517', 'RR-518',
            'RR-519', 'RR-522', 'RR-523', 'RR-524', 'RR-525',
            'RR-530', 'RR-532', 'RR-534', 'RR-543', 'RR-546'
        ];

        for (const sku of skus) {
            const product = await Product.findOne({ 'variants.sku': sku });
            if (product) {
                const variant = product.variants.find(v => v.sku === sku);
                console.log(`Found SKU ${sku}: Product Name: ${product.name}, Variant Price: ${variant.price}, Seating: ${variant.seatingCapacity}, Size: ${variant.size}`);
                // Check if specifications field exists even if not in schema
                const rawProduct = await mongoose.connection.db.collection('products').findOne({ _id: product._id });
                if (rawProduct.specifications) {
                    console.log(`  Has specifications field: YES`);
                    console.log(`  Specifications: ${JSON.stringify(rawProduct.specifications)}`);
                } else {
                    console.log(`  Has specifications field: NO`);
                }
            } else {
                console.log(`SKU ${sku} NOT FOUND`);
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

checkProducts();
