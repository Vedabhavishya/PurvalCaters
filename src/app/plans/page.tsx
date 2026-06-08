import ScrollReveal from '@/components/ui/ScrollReveal';
import PlansClient from './PlansClient';
import styles from './page.module.css';
import Image from 'next/image';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Premium Catering Packages | Supper Club",
  description: "Explore our vegetarian and non-vegetarian catering menu packages, custom live counters, and tailored setups.",
};

export default async function PlansPage() {
  const dbLiveCounters = await prisma.menuItem.findMany({
    where: {
      course: 'live-counters'
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Map the DB MenuItem shape to what PlansClient expects
  const liveCounters = dbLiveCounters.map(item => ({
    name: item.name,
    desc: item.description || 'Special live catering counter prepared fresh by our master chefs.',
    icon: item.name.toLowerCase().includes('chaat') ? 'chaat'
          : item.name.toLowerCase().includes('dosa') ? 'dosa'
          : item.name.toLowerCase().includes('bbq') || item.name.toLowerCase().includes('grill') || item.name.toLowerCase().includes('kebab') ? 'grill'
          : item.name.toLowerCase().includes('mocktail') || item.name.toLowerCase().includes('drink') ? 'mocktail'
          : item.name.toLowerCase().includes('ice cream') || item.name.toLowerCase().includes('dessert') ? 'dessert'
          : item.name.toLowerCase().includes('pan') ? 'pan'
          : 'default'
  }));

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
          <PlansClient initialLiveCounters={liveCounters} />
        </ScrollReveal>
      </div>
    </div>
  );
}
