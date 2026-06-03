import ScrollReveal from '@/components/ui/ScrollReveal';
import PlansClient from './PlansClient';
import styles from './page.module.css';

export const metadata = {
  title: "Premium Catering Packages | Purval's Caterers",
  description: "Explore our vegetarian and non-vegetarian catering menu packages, custom live counters, and tailored setups.",
};

export default function PlansPage() {
  return (
    <section className={`container ${styles.plansSection}`}>
      <ScrollReveal>
        <div className={styles.header}>
          <h1 className={styles.title}>Premium Catering Packages</h1>
          <p className={styles.subtitle}>
            Discover our carefully curated vegetarian and non-vegetarian menu packages. Designed to bring authentic flavors and luxury hospitality to your event.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <PlansClient />
      </ScrollReveal>
    </section>
  );
}
