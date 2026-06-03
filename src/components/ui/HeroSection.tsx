"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const BACKGROUNDS = [
  '/images/hero_bg_1.png',
  '/images/hero_bg_2.png',
  '/images/hero_bg_3.png',
  '/images/hero_bg_4.png',
];

export default function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Images Slider */}
      {BACKGROUNDS.map((bg, index) => (
        <div 
          key={bg} 
          className={`${styles.bgImage} ${index === currentBg ? styles.active : ''}`}
        >
          <Image 
            src={bg} 
            alt={`Catering Background ${index + 1}`}
            fill
            priority={index === 0}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
      
      <div className={styles.bgOverlay}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>Purval’s Caterers</h1>
        <p className={styles.subtitle}>"Curated Authentic Indian Feast"</p>
        <div className={styles.buttons}>
          <Link href="/menu" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
            Explore Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
