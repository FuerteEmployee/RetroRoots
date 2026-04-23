const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
require('dotenv').config();

const Category = require('./models/Category');
const Product = require('./models/Product');
const Blog = require('./models/Blog');

const extractedDataPath = path.join(__dirname, 'extracted_data.json');

const dbSeed = async () => {
  try {
    if (!fs.existsSync(extractedDataPath)) {
      throw new Error('extracted_data.json not found!');
    }

    const data = JSON.parse(fs.readFileSync(extractedDataPath, 'utf8'));

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB (backend/flexicore)');

    // 1. CLEAR COLLECTIONS
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    
    // 2. SEED CATEGORIES
    console.log('Inserting Categories...');
    const categoriesToSeed = data.categories.map(cat => ({
      name: cat.name,
      slug: cat.slug || slugify(cat.name, { lower: true, strict: true }),
      image: { 
        url: data.products.find(p => p.category === cat.name)?.image || '',
        publicId: 'remote'
      }
    }));
    const createdCategories = await Category.insertMany(categoriesToSeed);
    
    const getCatId = (name) => createdCategories.find(c => c.name === name)?._id;

    // 3. SEED PRODUCTS
    console.log(`Inserting ${data.products.length} Products...`);
    const productsToSeed = data.products.map(prod => ({
      name: prod.name,
      slug: slugify(prod.name, { lower: true, strict: true }),
      category: getCatId(prod.category),
      priceRange: "Consult for Price",
      isVisible: true,
      images: [{ url: prod.image, publicId: 'remote' }],
      description: `Premium ${prod.category} - ${prod.name} from Retro Roots.`,
      industryTags: ["Living Room"] // Default tag to avoid filter issues
    }));

    // Ensure unique slugs
    const seenSlugs = new Set();
    productsToSeed.forEach(p => {
      let baseSlug = p.slug;
      let counter = 1;
      while (seenSlugs.has(p.slug)) {
        p.slug = `${baseSlug}-${counter}`;
        counter++;
      }
      seenSlugs.add(p.slug);
    });

    await Product.insertMany(productsToSeed);

    // 4. SEED BLOGS
    console.log(`Inserting ${data.blogs.length} Blogs...`);
    for (const blog of data.blogs) {
      await Blog.create({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        featuredImage: { url: blog.image, publicId: 'remote' },
        author: blog.author,
        isPublished: true
      });
    }
    
    console.log('✅ Database seeded successfully!');
    console.log(`Summary: ${createdCategories.length} Categories, ${productsToSeed.length} Products, ${data.blogs.length} Blogs.`);
    process.exit(0);

  } catch (err) {
    console.error('Seeding Failed:', err);
    process.exit(1);
  }
};

dbSeed();
