const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = 'D:\\2026 -BK\\Retro Roots\\28-02-2026\\project';
const BASE_URL = 'https://wdtteapoy.wpengine.com'; // Extracted from links
const CATEGORIES = [
    'recliners',
    'diningchair',
    'loungerdiwaan',
    'loungechair',
    'sofa'
];

function normalizeUrl(url) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('../')) return BASE_URL + '/' + url.substring(3);
    if (url.startsWith('/')) return BASE_URL + url;
    return BASE_URL + '/' + url;
}

function extractFromHtml(filePath, categoryFolder) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const products = [];
    
    // Pattern 1: WooCommerce/Elementor <li> structure
    const liRegex = /<li class="[^"]*product[^"]*">([\s\S]*?)<\/li>/g;
    let match;
    while ((match = liRegex.exec(content)) !== null) {
        const productHtml = match[1];
        const titleMatch = productHtml.match(/<div class="product-title">\s*<h5><a href="([^"]+)">([^<]+)<\/a><\/h5>/);
        if (titleMatch) {
            const title = titleMatch[2].trim();
            const link = titleMatch[1];
            
            let categories = [];
            const categoryWrapperMatch = productHtml.match(/<div class="product-category-wrapper">([\s\S]*?)<\/div>/);
            if (categoryWrapperMatch) {
                const catContent = categoryWrapperMatch[1];
                const catMatches = catContent.matchAll(/<a [^>]*>([^<]+)<\/a>/g);
                for (const cm of catMatches) {
                    categories.push(cm[1].trim());
                }
            }

            let price = '';
            const priceSectionMatch = productHtml.match(/<div class="product-price">([\s\S]*?)<\/div>/);
            if (priceSectionMatch) {
                const priceAmounts = priceSectionMatch[1].match(/<bdi>([\s\S]*?)<\/bdi>/g);
                if (priceAmounts) {
                    price = priceAmounts.map(p => {
                        let clean = p.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&#8377;/g, '₹').trim();
                        return clean;
                    }).join(' - ');
                }
            }

            const primaryImgMatch = productHtml.match(/<div class="primary-image"><img src="([^"]+)"/);
            const secondaryImgMatch = productHtml.match(/<div class="secondary-image"><img src="([^"]+)"/);

            products.push({
                id: (products.length + 1) + '-' + categoryFolder,
                title,
                link: normalizeUrl(link),
                categoryFolder,
                categories,
                price,
                primaryImage: normalizeUrl(primaryImgMatch ? primaryImgMatch[1] : null),
                secondaryImage: normalizeUrl(secondaryImgMatch ? secondaryImgMatch[1] : null)
            });
        }
    }

    // Pattern 2: Sofa style <div> structure
    if (products.length === 0) {
        const blocks = content.split(/<div class="product">/);
        blocks.shift();

        blocks.forEach(block => {
            const nameMatch = block.match(/<div class="product-name">([^<]+)<\/div>/);
            if (nameMatch) {
                const title = nameMatch[1].trim();
                const thumbMatch = block.match(/<a href="([^"]+)" class="thumb">/);
                const imgMatch = block.match(/<img src="([^"]+)"/);

                products.push({
                    id: (products.length + 1) + '-' + categoryFolder,
                    title,
                    link: normalizeUrl(thumbMatch ? thumbMatch[1] : ''),
                    categoryFolder,
                    categories: [categoryFolder],
                    price: '',
                    primaryImage: normalizeUrl(imgMatch ? imgMatch[1] : null),
                    secondaryImage: null
                });
            }
        });
    }

    return products;
}

function main() {
    let allProducts = [];

    CATEGORIES.forEach(cat => {
        const htmlPath = path.join(PROJECT_ROOT, cat, 'index.html');
        console.log(`Processing category: ${cat}...`);
        const catProducts = extractFromHtml(htmlPath, cat);
        console.log(`Found ${catProducts.length} products in ${cat}.`);
        allProducts = allProducts.concat(catProducts);
    });

    // Write JSON
    const jsonPath = path.join(PROJECT_ROOT, 'products.json');
    fs.writeFileSync(jsonPath, JSON.stringify(allProducts, null, 2));
    console.log(`Generated ${jsonPath}`);

    // Write CSV
    const csvPath = path.join(PROJECT_ROOT, 'products.csv');
    const headers = ['ID', 'Title', 'Category Folder', 'Categories', 'Price', 'Primary Image', 'Secondary Image', 'Link'];
    const csvContent = [
        headers.join(','),
        ...allProducts.map(p => [
            p.id,
            `"${p.title.replace(/"/g, '""')}"`,
            p.categoryFolder,
            `"${p.categories.join(', ')}"`,
            `"${p.price}"`,
            `"${p.primaryImage || ''}"`,
            `"${p.secondaryImage || ''}"`,
            `"${p.link}"`
        ].join(','))
    ].join('\n');
    
    fs.writeFileSync(csvPath, csvContent);
    console.log(`Generated ${csvPath}`);
}

main();
