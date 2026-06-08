import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { MENU_ITEMS } from '../src/data/menuData';
import prisma from '../src/lib/prisma';

const MAIN_CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Vegetarian', slug: 'vegetarian' },
  { name: 'Non-Vegetarian', slug: 'non-vegetarian' },
  { name: 'Desserts & Sweets', slug: 'desserts-sweets' },
  { name: 'Live Counter', slug: 'live-counter' },
  { name: 'Drinks & Snacks', slug: 'drinks-snacks' }
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
  if (
    c.includes('drinks') ||
    c.includes('chat') ||
    c.includes('soup')
  ) {
    return 'drinks-snacks';
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

  // Seed Testimonials
  console.log('Clearing existing Testimonials...');
  await prisma.testimonial.deleteMany();

  const mockTestimonials = [
    {
      name: "Rajesh Sharma",
      role: "Wedding Host",
      content: "The Royal Wedding Package exceeded our expectations. The food was exquisite and the service was truly premium. Everyone loved the authentic flavors.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Priya Patel",
      role: "Corporate Event Manager",
      content: "Supper Club handled our annual gala flawlessly. The presentation of the delicacies was top-notch. Highly recommend for corporate gatherings.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Amit Desai",
      role: "Birthday Celebrant",
      content: "Delicious food and impeccable service. The catering team made sure every guest was attended to. The paneer tikka was a massive hit!",
      imageUrl: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Neha Gupta",
      role: "Bride",
      content: "Thank you for making our special day even more memorable. The custom menu you designed was fantastic. Five stars all the way!",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Vikram Singh",
      role: "Event Organizer",
      content: "I have worked with many caterers, but Supper Club stands out for their professionalism and incredibly tasty authentic dishes.",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Anjali Rao",
      role: "Anniversary Celebration",
      content: "We booked the premium package for our 25th anniversary. Every bite felt luxurious. The dessert spread was absolutely mind-blowing.",
      imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Suresh Menon",
      role: "Festival Committee",
      content: "Great experience partnering with Supper Club for our Diwali bash. The traditional sweets were exactly how my grandmother used to make them.",
      imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
      rating: 4,
      isVisible: true,
    },
    {
      name: "Kavita Joshi",
      role: "Family Gathering",
      content: "Punctual, polite, and perfect food. They brought everything they needed and left the venue spotless. Will book again.",
      imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Rahul Verma",
      role: "Business Owner",
      content: "The VIP lunch spread was fantastic. It left a lasting impression on our international clients. Very authentic Indian feast.",
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Meera Reddy",
      role: "Engagement Party",
      content: "Everything from the welcome drinks to the main course was curated perfectly. The glassmorphism UI of their website matches their modern catering approach!",
      imageUrl: "https://randomuser.me/api/portraits/women/55.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Arjun Nair",
      role: "Housewarming",
      content: "Affordable luxury! We got the authentic feast package for 50 people. Portions were generous and incredibly flavorful.",
      imageUrl: "https://randomuser.me/api/portraits/men/91.jpg",
      rating: 5,
      isVisible: true,
    },
    {
      name: "Sneha Kapoor",
      role: "Event Planner",
      content: "My go-to caterer for high-profile clients. Supper Club of India never disappoints. Their attention to detail is remarkable.",
      imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      rating: 5,
      isVisible: true,
    }
  ];

  console.log('Seeding 12 testimonials...');
  for (const t of mockTestimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log('Successfully seeded 12 testimonials.');

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
