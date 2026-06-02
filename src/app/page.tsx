import HeroSection from '@/components/ui/HeroSection';
import FoodCard from '@/components/ui/FoodCard';
import ReviewerPhoto from '@/components/ui/ReviewerPhoto';
import styles from './page.module.css';
import { PrismaClient } from '@prisma/client';
import { FaCrown, FaLeaf, FaHandsHelping, FaStar } from 'react-icons/fa';

const prisma = new PrismaClient();

export default async function Home() {
  const featuredItems = await prisma.menuItem.findMany({
    where: { isFeatured: true },
    take: 3,
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { isVisible: true },
    take: 3,
  });

  return (
    <>
      <HeroSection />

      {/* Featured Dishes */}
      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Featured Delicacies</h2>
        <div className={styles.featuredGrid}>
          {featuredItems.map(item => (
            <FoodCard 
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
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

      {/* Testimonials */}
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
    </>
  );
}
