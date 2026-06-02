"use client";

import { useState } from 'react';
import styles from './page.module.css';
import FoodCard from '@/components/ui/FoodCard';

type Category = { id: string; name: string; slug: string };
type MenuItem = { id: string; name: string; description: string | null; price: number | null; imageUrl: string | null; categoryId: string };

interface MenuClientProps {
  categories: Category[];
  items: MenuItem[];
}

export default function MenuClient({ categories, items }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  const filteredItems = items.filter(item => item.categoryId === activeCategory);

  return (
    <section className={`container ${styles.menuSection}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Exquisite Menu</h1>
        <p className={styles.subtitle}>
          Explore a curated selection of authentic Indian dishes prepared with the finest ingredients and culinary mastery.
        </p>
      </div>

      <div className={styles.categoriesNav}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.menuGrid}>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <FoodCard 
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>No items found in this category.</h3>
            <p>Please check back later or try another category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
