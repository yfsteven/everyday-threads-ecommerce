// Run once with: node db/seed.js
// Fills the products table with the 12 everyday-threads-ecommerce products.

require('dotenv').config();
const pool = require('../config/db');

const sampleProducts = [
  ['Grey Muscle Tank Top', 'A relaxed-fit muscle tank in heathered grey, perfect for workouts or lounging.', 22.99, 'Tank Tops', '/products/grey-muscle-tank-top.png', true, 20],
  ['Black Tank Top', 'A classic ribbed black tank top with a racerback cut.', 19.99, 'Tank Tops', '/products/black-tank-top.png', true, 24],
  ['White Tank Top', 'A clean, everyday white tank top with a racerback design.', 18.99, 'Tank Tops', '/products/white-tank-top.png', true, 18],
  ['Heathered Button Polo', 'A textured button-up polo, available in a mix of red, blue, and grey heather tones.', 42.99, 'Polos', '/products/heathered-polo-3pack-colors.png', true, 14],
  ['Maroon Crewneck Tee', 'A soft, everyday crewneck t-shirt in deep maroon.', 21.99, 'T-Shirts', '/products/maroon-crewneck-tee.png', true, 30],
  ['Royal Blue Long Sleeve Tee', 'A comfortable long sleeve tee in a rich royal blue.', 26.99, 'Long Sleeves', '/products/royal-blue-long-sleeve-tee.png', true, 22],
  ['Forest Green Long Sleeve Polo', 'A long sleeve polo in forest green, perfect for cooler days.', 38.99, 'Polos', '/products/forest-green-long-sleeve-polo.png', true, 16],
  ['Forest Green Pullover Hoodie', 'A cozy pullover hoodie in deep forest green with a kangaroo pocket.', 54.99, 'Hoodies', '/products/forest-green-pullover-hoodie.png', true, 12],
  ['Black Zip-Up Hoodie', 'A versatile black zip-up hoodie, great for layering.', 58.99, 'Hoodies', '/products/black-zip-up-hoodie.png', true, 15],
  ['Cream Oversized Hoodie', 'An oversized, relaxed-fit hoodie in warm cream.', 62.99, 'Hoodies', '/products/cream-oversized-hoodie.png', true, 10],
  ['Dusty Blue Pullover Hoodie', 'A soft pullover hoodie in a muted dusty blue with drawstrings.', 56.99, 'Hoodies', '/products/dusty-blue-pullover-hoodie.png', false, 0],
  ['Maroon Oversized Hoodie', 'An oversized maroon hoodie with a relaxed, streetwear-inspired fit.', 59.99, 'Hoodies', '/products/maroon-oversized-hoodie.png', true, 9],
];

async function seed() {
  try {
    await pool.query('DELETE FROM products');

    for (const product of sampleProducts) {
      await pool.query(
        `INSERT INTO products (name, description, price, category, image_url, availability, inventory_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        product
      );
    }

    console.log(`Seeded ${sampleProducts.length} products successfully!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
