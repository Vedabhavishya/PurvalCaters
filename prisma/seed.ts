import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { MENU_ITEMS } from '../src/data/menuData';

const prisma = new PrismaClient();

const MAIN_CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Vegetarian', slug: 'vegetarian' },
  { name: 'Non-Vegetarian', slug: 'non-vegetarian' },
  { name: 'Desserts & Sweets', slug: 'desserts-sweets' },
  { name: 'Live Counter', slug: 'live-counter' }
];

// Helper to determine main category slug based on item course and isVeg status
function getCategorySlug(course: string, isVeg: boolean): string {
  const c = course.toLowerCase();
  
  if (c.includes('breakfast')) {
    return 'breakfast';
  }
  if (c.includes('live-counter') || c.includes('live_counter') || c.includes('live counter')) {
    return 'live-counter';
  }
  if (
    c.includes('sweet') || 
    c.includes('halwa') || 
    c.includes('kheer') || 
    c.includes('payasam') || 
    c.includes('dessert') || 
    c.includes('snack') // sweets & traditional snacks
  ) {
    return 'desserts-sweets';
  }
  
  // For starters, breads, veg-main, nonveg-main, rice-biryani, accompaniments
  return isVeg ? 'vegetarian' : 'non-vegetarian';
}

async function main() {
  console.log('Starting seeding with 5 main categories...');

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
  
  console.log('Creating database main categories...');
  for (const catConfig of MAIN_CATEGORIES) {
    const createdCat = await prisma.category.create({
      data: {
        name: catConfig.name,
        slug: catConfig.slug,
      }
    });
    categoryCache[catConfig.slug] = createdCat.id;
  }
  console.log(`Created ${MAIN_CATEGORIES.length} main categories.`);

  // Seed Menu Items
  console.log(`Inserting ${MENU_ITEMS.length} menu items from menuData.ts...`);
  
  const menuItemsData = MENU_ITEMS.map((item) => {
    const catSlug = getCategorySlug(item.course, item.isVeg);
    const categoryId = categoryCache[catSlug];
    if (!categoryId) {
      throw new Error(`No category ID found for slug: ${catSlug} on item: ${item.name}`);
    }
    
    return {
      id: item.id,
      name: item.name,
      isVeg: item.isVeg,
      subcategory: item.subcategory,
      course: item.course, // store the sub-group course code like "starters", "breads"
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

  console.log('Database seeded successfully with all static menu items grouped by 5 main categories!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
