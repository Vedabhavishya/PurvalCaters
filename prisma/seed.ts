import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { MENU_ITEMS } from '../src/data/menuData';

const prisma = new PrismaClient();

const COURSE_MAPPING: Record<string, { name: string; slug: string }> = {
  'starters': { name: 'Starters & Appetizers', slug: 'starters' },
  'breads': { name: "Roti's", slug: 'breads' },
  'veg-main': { name: 'Vegetarian Main Course', slug: 'veg-main' },
  'nonveg-main': { name: 'Non-Vegetarian Main Course', slug: 'nonveg-main' },
  'rice-biryani': { name: 'Rice & Biryani', slug: 'rice-biryani' },
  'accompaniments': { name: 'Accompaniments', slug: 'accompaniments' },
  'south-indian-breakfast': { name: 'South Indian Breakfast', slug: 'south-indian-breakfast' },
  'north-indian-breakfast': { name: 'North Indian Breakfast', slug: 'north-indian-breakfast' },
  'special-breakfast': { name: 'Special Breakfast', slug: 'special-breakfast' },
  'breakfast-rice': { name: 'Breakfast Rice Items', slug: 'breakfast-rice' },
  'hot-sweets': { name: 'Hot Indian Sweets (Jamun Specials)', slug: 'hot-sweets' },
  'halwas': { name: 'Halwas', slug: 'halwas' },
  'kheer-payasam': { name: 'Kheer & Payasam', slug: 'kheer-payasam' },
  'traditional-sweets': { name: 'Traditional Indian Sweets', slug: 'traditional-sweets' },
  'fruit-desserts': { name: 'Fruit-Based Desserts', slug: 'fruit-desserts' },
  'custards-puddings': { name: 'Custards & Puddings', slug: 'custards-puddings' },
  'cold-desserts': { name: 'Cold Desserts', slug: 'cold-desserts' },
  'bengali-sweets': { name: 'Bengali Sweets', slug: 'bengali-sweets' },
  'milk-cream-desserts': { name: 'Milk & Cream Desserts', slug: 'milk-cream-desserts' },
  'traditional-snacks': { name: 'Traditional Snacks / Sweet Items', slug: 'traditional-snacks' },
  'live-counters': { name: 'Live Counters', slug: 'live-counters' }
};

async function main() {
  console.log('Starting seeding with exact categories...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@supperclub.com' },
    update: {},
    create: {
      email: 'admin@supperclub.com',
      password: hashedPassword,
    },
  });
  console.log('Admin user verified.');

  // Clean existing menu items and categories
  console.log('Clearing existing MenuItems and Categories...');
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  // Create clean Category map
  const categoryCache: Record<string, string> = {};
  
  // Unique categories list based on mapping values (since all 21 slugs are unique, it creates all 21 categories!)
  const uniqueCategories = Array.from(
    new Map(Object.values(COURSE_MAPPING).map(item => [item.slug, item])).values()
  );

  console.log('Creating database categories...');
  for (const catConfig of uniqueCategories) {
    const createdCat = await prisma.category.create({
      data: {
        name: catConfig.name,
        slug: catConfig.slug,
      }
    });
    categoryCache[catConfig.slug] = createdCat.id;
  }
  console.log(`Created ${uniqueCategories.length} categories.`);

  // Seed Menu Items
  console.log(`Inserting ${MENU_ITEMS.length} menu items from menuData.ts...`);
  
  // Use a transaction/chunking to insert items efficiently
  const menuItemsData = MENU_ITEMS.map((item) => {
    const catConfig = COURSE_MAPPING[item.course];
    if (!catConfig) {
      throw new Error(`No category mapping found for course: ${item.course} on item: ${item.name}`);
    }
    const categoryId = categoryCache[catConfig.slug];
    
    return {
      id: item.id,
      name: item.name,
      isVeg: item.isVeg,
      subcategory: item.subcategory,
      categoryId,
      isFeatured: false,
    };
  });

  // Batch insert in chunks of 100 for SQLite limits
  const chunkSize = 100;
  for (let i = 0; i < menuItemsData.length; i += chunkSize) {
    const chunk = menuItemsData.slice(i, i + chunkSize);
    await prisma.menuItem.createMany({
      data: chunk,
    });
    console.log(`Inserted items ${i + 1} to ${Math.min(i + chunkSize, menuItemsData.length)}...`);
  }

  // Create Packages if none exist
  const pkgCount = await prisma.package.count();
  if (pkgCount === 0) {
    console.log('Seeding default packages...');
    const packages = [
      {
        name: 'Silver Package',
        description: 'Ideal for small gatherings and intimate parties.',
        price: 1000,
        capacity: 50,
        includes: JSON.stringify(['2 Starters', '2 Main Courses', '1 Dessert', 'Standard Cutlery']),
      },
      {
        name: 'Gold Package',
        description: 'Perfect for corporate events and medium sized parties.',
        price: 2000,
        capacity: 100,
        includes: JSON.stringify(['4 Starters', '4 Main Courses', '2 Desserts', 'Welcome Drink', 'Premium Cutlery']),
      },
      {
        name: 'Royal Wedding Package',
        description: 'The ultimate luxury dining experience for weddings.',
        price: 5000,
        capacity: 500,
        includes: JSON.stringify(['Live Counters', 'Unlimited Premium Starters', 'Exotic Main Courses', 'Gourmet Desserts', 'Dedicated Serving Staff', 'Luxury Setup']),
      },
    ];

    for (const pkg of packages) {
      await prisma.package.create({
        data: pkg,
      });
    }
  }

  // Create Testimonials if none exist
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    console.log('Seeding default testimonial...');
    await prisma.testimonial.create({
      data: {
        name: 'Rajesh Sharma',
        role: 'Event Host',
        content: 'The Royal Wedding Package exceeded our expectations. The food was exquisite and the service was truly premium.',
        rating: 5,
      },
    });
  }

  console.log('Database seeded successfully with all static menu items grouped by exact category names!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
