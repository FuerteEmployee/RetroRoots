/**
 * STANDALONE MONGODB IMPORT SCRIPT
 * 
 * Instructions:
 * 1. Copy this file and products.json to your new laptop.
 * 2. Run 'npm install mongoose dotenv cloudinary' in that folder.
 * 3. Create a .env file with your MONGO_URI and CLOUDINARY details.
 * 4. Run 'node import_to_mongo_standalone.js'
 */

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// --- CONFIGURATION ---
const MONGO_URI = process.env.MONGO_URI;
const JSON_FILE = './products.json';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- MODEL ---
const productSchema = new mongoose.Schema({
    title: String,
    category: [String],
    price: String,
    primaryImage: String,
    secondaryImage: String,
    oldLink: String,
    categoryFolder: String,
    createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

// --- HELPER: UPLOAD TO CLOUDINARY ---
async function uploadImage(url, folder) {
    if (!url) return null;
    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: `retro_roots/${folder}`
        });
        return result.secure_url;
    } catch (error) {
        console.error(`  Failed to upload: ${url}`, error.message);
        return null;
    }
}

// --- MAIN IMPORT ---
async function runImport() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB.');

        const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
        console.log(`Starting import of ${data.length} products...`);

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            console.log(`[${i+1}/${data.length}] ${item.title}`);

            const primary = await uploadImage(item.primaryImage, item.categoryFolder);
            const secondary = await uploadImage(item.secondaryImage, item.categoryFolder);

            await Product.create({
                title: item.title,
                category: item.categories,
                price: item.price,
                primaryImage: primary,
                secondaryImage: secondary,
                oldLink: item.link,
                categoryFolder: item.categoryFolder
            });
        }
        console.log('DONE!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

runImport();
