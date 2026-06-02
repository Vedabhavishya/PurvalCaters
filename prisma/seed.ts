import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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

  // Create Categories
  const categories = [
    { name: 'Starters', slug: 'starters' },
    { name: 'Main Course', slug: 'main-course' },
    { name: 'South Indian', slug: 'south-indian' },
    { name: 'North Indian', slug: 'north-indian' },
    { name: 'Desserts', slug: 'desserts' },
    { name: 'Beverages', slug: 'beverages' },
    { name: 'Live Counters', slug: 'live-counters' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const startersCategory = await prisma.category.findUnique({ where: { slug: 'starters' } });
  const mainCourseCategory = await prisma.category.findUnique({ where: { slug: 'main-course' } });
  const southIndianCategory = await prisma.category.findUnique({ where: { slug: 'south-indian' } });

  if (startersCategory && mainCourseCategory && southIndianCategory) {
    // Add Menu Items
    const menuItems = [
      {
        name: 'Paneer Tikka',
        description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
        price: 250,
        categoryId: startersCategory.id,
        isFeatured: true,
      },
      {
        name: 'Butter Chicken',
        description: 'Chicken cooked in a smooth buttery and creamy tomato based gravy.',
        price: 450,
        categoryId: mainCourseCategory.id,
        isFeatured: true,
      },
      {
        name: 'Masala Dosa',
        description: 'Crispy rice batter crepe stuffed with a spiced potato mash.',
        price: 150,
        categoryId: southIndianCategory.id,
        isFeatured: false,
      },
    ];

    for (const item of menuItems) {
      await prisma.menuItem.create({
        data: item,
      });
    }
  }

  // Create Packages
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

  // Create Testimonial
  await prisma.testimonial.create({
    data: {
      name: 'Rajesh Sharma',
      role: 'Event Host',
      content: 'The Royal Wedding Package exceeded our expectations. The food was exquisite and the service was truly premium.',
      rating: 5,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
