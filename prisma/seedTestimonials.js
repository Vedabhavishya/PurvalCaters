const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function main() {
  console.log('Seeding testimonials...');
  for (const t of mockTestimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log('Successfully seeded 12 testimonials.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
