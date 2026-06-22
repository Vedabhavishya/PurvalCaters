import prisma from '@/lib/prisma';
import ReviewsClient from './ReviewsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Customer Reviews & Testimonials | Supper Club",
  description: "Read reviews from our wedding, corporate, and private event catering clients, and share your experience with us.",
};

export default async function ReviewsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: 'desc' }
  });

  // Convert Date objects to ISO strings for serialization
  const serializedTestimonials = testimonials.map(t => ({
    ...t,
    id: t.id,
    name: t.name,
    role: t.role,
    content: t.content,
    imageUrl: t.imageUrl,
    rating: t.rating,
    isVisible: t.isVisible,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString()
  }));

  return <ReviewsClient initialTestimonials={serializedTestimonials} />;
}
