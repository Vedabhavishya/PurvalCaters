import ScrollReveal from '@/components/ui/ScrollReveal';
import PlansClient from './PlansClient';
import styles from './page.module.css';
import Image from 'next/image';

export const metadata = {
  title: "Premium Catering Packages | Supperclub",
  description: "Explore our vegetarian and non-vegetarian catering menu packages, custom live counters, and tailored setups.",
};

export default function PlansPage() {
  return (
    <div className={styles.plansPage}>
      {/* Top Banner Section */}
      <div className={styles.bannerContainer}>
        <Image 
          src="/images/hero_bg_3.png" 
          alt="Catering Packages Banner" 
          fill
          sizes="100vw"
          priority
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <ScrollReveal>
            <h1 className={styles.bannerTitle}>Premium Catering Packages</h1>
            <p className={styles.bannerSubtitle}>
              Discover our carefully curated vegetarian and non-vegetarian menu packages. Designed to bring authentic flavors and luxury hospitality to your event.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className={`container ${styles.plansSection}`}>
        <ScrollReveal>
          <PlansClient />
        </ScrollReveal>
      </div>
    </div>
  );
}
