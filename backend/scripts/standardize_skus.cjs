
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');
const Category = require('../models/Category');

const colorMap = {
    "cream": "CRM",
    "black": "BLK",
    "black & grey": "BGY",
    "grey": "GRY",
    "brown": "BRN",
    "beige": "BEG",
    "navy blue": "NVB",
    "olive green": "OLV",
    "white": "WHT"
};

const seatingMap = {
    "1 seater": "1S",
    "2 seater": "2S",
    "3 seater": "3S",
    "l shape": "LS",
    "recliner": "RC"
};

const categoryMap = {
    "sofa": "SOFA",
    "dining chair": "DNCH",
    "lounger (diwaan)": "LNGR",
    "lounge chair": "LNCH",
    "recliners": "RCLR"
};

const CORRECT_FORMAT_REGEX = /^[A-Z]{4}-[A-Z0-9]{3}-[A-Z0-9]{2}-[0-9]+$/;

async function updateSkus() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const products = await Product.find().populate('category');
        console.log(`Processing ${products.length} products...`);

        const zeroStockVariants = [];
        const usedSkus = new Set();
        let totalUpdated = 0;
        let totalSkipped = 0;

        for (const product of products) {
            let productModified = false;

            // Ensure "Visible on website" is checked
            if (product.isVisible !== true) {
                product.isVisible = true;
                productModified = true;
            }

            const catName = (product.category?.name || "General").toLowerCase();
            const typeCode = categoryMap[catName] || catName.substring(0, 4).toUpperCase().padEnd(4, 'X');

            for (const variant of product.variants) {
                // Check if SKU is already in correct format
                if (variant.sku && CORRECT_FORMAT_REGEX.test(variant.sku)) {
                    usedSkus.add(variant.sku);
                    totalSkipped++;
                    continue;
                }

                // Generate new SKU parts
                const colorStr = (variant.color || "").toLowerCase().trim();
                const colorCode = colorMap[colorStr] || colorStr.substring(0, 3).toUpperCase().padEnd(3, 'X');

                const seatingStr = (variant.seatingCapacity || "").toLowerCase().trim();
                const seatingCode = seatingMap[seatingStr] || seatingStr.substring(0, 2).toUpperCase().padEnd(2, 'X');

                // Size: digits only
                let sizeDigits = (variant.size || "").replace(/\D/g, '');
                if (!sizeDigits) {
                    // Try to extract from description if it's a 6Ft/30" type thing
                    const desc = product.description || "";
                    const depthMatch = desc.match(/Depth:\s*(\d+)/i);
                    const widthMatch = desc.match(/(\d+)Ft/i); // e.g. 6Ft
                    if (widthMatch) {
                        const widthInches = parseInt(widthMatch[1]) * 12;
                        const depth = depthMatch ? depthMatch[1] : "00";
                        sizeDigits = `${widthInches}${depth}`;
                    } else {
                        sizeDigits = "000"; // Fallback
                    }
                }

                let newSku = `${typeCode}-${colorCode}-${seatingCode}-${sizeDigits}`;

                // Handle uniqueness
                if (usedSkus.has(newSku)) {
                    let counter = 1;
                    let tempSku = `${newSku}${counter}`;
                    while (usedSkus.has(tempSku)) {
                        counter++;
                        tempSku = `${newSku}${counter}`;
                    }
                    newSku = tempSku;
                }

                variant.sku = newSku;
                usedSkus.add(newSku);
                productModified = true;
                totalUpdated++;

                // Track zero stock
                if (variant.stock === 0) {
                    zeroStockVariants.push({
                        productName: product.name,
                        variantSku: newSku,
                        details: `${variant.seatingCapacity} | ${variant.color} | ${variant.size}`
                    });
                }
            }

            if (productModified) {
                await product.save();
            }
        }

        console.log("\nSKU Update Results:");
        console.log(`Total Variants Updated: ${totalUpdated}`);
        console.log(`Total Variants Skipped (already correct): ${totalSkipped}`);
        
        console.log("\nVariants with 0 Stock:");
        if (zeroStockVariants.length > 0) {
            zeroStockVariants.forEach(v => {
                console.log(`- [${v.variantSku}] ${v.productName} (${v.details})`);
            });
        } else {
            console.log("None");
        }

    } catch (err) {
        console.error("Error during SKU update:", err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

updateSkus();
