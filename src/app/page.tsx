import HeroSection from '@/components/ui/HeroSection';
import AboutSection from '@/components/ui/AboutSection';
import ServicesSection from '@/components/ui/ServicesSection';
import ReviewerPhoto from '@/components/ui/ReviewerPhoto';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './page.module.css';
import prisma from '@/lib/prisma';
import { FaCrown, FaLeaf, FaHandsHelping, FaStar } from 'react-icons/fa';
import GallerySection from '@/components/ui/GallerySection';
import StatsSection from '@/components/ui/StatsSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isVisible: true },
  });

  const galleryItems = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const menuItemsCount = await prisma.menuItem.count();

  let initialVisitorCount = 1000;
  try {
    let counter = await prisma.visitorCount.findFirst();
    if (!counter) {
      counter = await prisma.visitorCount.create({
        data: { count: 1000 },
      });
    }
    initialVisitorCount = counter.count;
  } catch (err) {
    console.error('Failed to get initial visitor count:', err);
  }

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />

      {/* Why Choose Us */}
      <ScrollReveal>
        <section className={styles.whyUsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Choose Supper Club?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <FaCrown className={styles.featureIcon} />
                <h3>Premium Quality</h3>
                <p>We source only the finest ingredients to craft an unforgettable luxury dining experience.</p>
              </div>
              <div className={styles.featureCard}>
                <FaLeaf className={styles.featureIcon} />
                <h3>Authentic Recipes</h3>
                <p>Traditional Indian recipes passed down through generations, prepared with modern flair.</p>
              </div>
              <div className={styles.featureCard}>
                <FaHandsHelping className={styles.featureIcon} />
                <h3>Impeccable Service</h3>
                <p>Our dedicated hospitality team ensures your event is flawless from start to finish.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Gallery Section */}
      <GallerySection items={galleryItems} />

      {/* Testimonials */}
      <ScrollReveal>
        <section className={`container ${styles.section}`} style={{ overflow: 'hidden' }}>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialsTrack}>
              {/* Render twice for seamless infinite scrolling */}
              {[...testimonials, ...testimonials].map((t, index) => (
                <div key={`${t.id}-${index}`} className={styles.testimonialCard}>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className={styles.quote}>"{t.content}"</p>
                  
                  <div className={styles.reviewerInfo}>
                    <ReviewerPhoto imageUrl={t.imageUrl} name={t.name} />
                    <div>
                      <div className={styles.author}>{t.name}</div>
                      <div className={styles.role}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <StatsSection 
          initialVisitorCount={initialVisitorCount} 
          menuItemsCount={menuItemsCount} 
        />
      </ScrollReveal>
    </>
  );
}
