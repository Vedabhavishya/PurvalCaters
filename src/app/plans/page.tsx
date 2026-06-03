import { PrismaClient } from '@prisma/client';
import PackageCard from '@/components/ui/PackageCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './page.module.css';

const prisma = new PrismaClient();

export const revalidate = 3600;

export default async function PlansPage() {
  const packages = await prisma.package.findMany({
    orderBy: { price: 'asc' },
  });

  return (
    <section className={`container ${styles.plansSection}`}>
      <ScrollReveal>
        <div className={styles.header}>
          <h1 className={styles.title}>Premium Catering Packages</h1>
          <p className={styles.subtitle}>
            Choose the perfect catering package for your event. Each plan is crafted to deliver a complete luxury dining experience.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.plansGrid}>
          {packages.map(pkg => (
            <PackageCard 
              key={pkg.id}
              name={pkg.name}
              description={pkg.description}
              price={pkg.price}
              capacity={pkg.capacity}
              includes={pkg.includes}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
