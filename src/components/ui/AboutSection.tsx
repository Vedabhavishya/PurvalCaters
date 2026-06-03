"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutSection.module.css';
import { FaCalendarAlt, FaUsers, FaGlobe, FaArrowRight } from 'react-icons/fa';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentSection) {
            observer.unobserve(currentSection); // Trigger animation only once
          }
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.aboutSection} ${isVisible ? styles.visible : ''}`}
      id="about-heritage"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Left Column - Visual Showcase */}
          <div className={styles.imageColumn}>
            <div className={styles.imagesContainer}>
              {/* Left Image (Offset Downwards, Slides from Left) */}
              <div className={`${styles.imageWrapper} ${styles.imageLeft} ${styles.revealLeft}`}>
                <Image 
                  src="/images/about_kabab.png" 
                  alt="Authentic Tandoori Kabab Platter by Purval's Caterers" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              {/* Overlapping Badge (Est. 1991, Springs up) */}
              <div className={`${styles.badge} ${styles.revealBadge}`}>
                <span className={styles.badgeLabel}>Since</span>
                <span className={styles.badgeYear}>1991</span>
              </div>

              {/* Right Image (Offset Upwards, Slides from Right) */}
              <div className={`${styles.imageWrapper} ${styles.imageRight} ${styles.revealRight}`}>
                <Image 
                  src="/images/about_indian_buffet.png" 
                  alt="Premium Buffet Catering Showcase" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Brand & Narrative Copy */}
          <div className={styles.contentColumn}>
            <span className={`${styles.subtitle} ${styles.revealContent}`}>
              About Purval's Caterers
            </span>
            <h2 className={`${styles.title} ${styles.revealContent}`}>
              Crafting Culinary Emotions, Tailored For Every Celebration
            </h2>
            <p className={`${styles.text} ${styles.revealContent}`}>
              Established in 1991, Purval’s Caterers was built on a deep passion for authentic cuisine and exceptional hospitality. Guided by our Founder, CEO, and Executive Chef—who brings over 20+ years of professional culinary experience across India, New Zealand, and the USA—we believe food is more than just taste; it is an emotion, a tradition, and a way to bring people together.
            </p>
            <p className={`${styles.text} ${styles.revealContent}`}>
              From managing corporate canteens for leaders like P&G, NIFT, and Satyam Computers, to catering grand celebrations of up to 10,000+ guests, our commitment to exquisite taste, absolute hygiene, and execution excellence remains flawless.
            </p>

            {/* Feature Metric Grid */}
            <div className={`${styles.metricsGrid} ${styles.revealCards}`}>
              <div className={styles.metricCard}>
                <FaCalendarAlt className={styles.metricIcon} />
                <div className={styles.metricVal}>35+ Years</div>
                <div className={styles.metricLabel}>Exquisite Culinary Legacy</div>
              </div>
              
              <div className={styles.metricCard}>
                <FaUsers className={styles.metricIcon} />
                <div className={styles.metricVal}>35 - 10K+</div>
                <div className={styles.metricLabel}>Pax Event Capacity</div>
              </div>

              <div className={styles.metricCard}>
                <FaGlobe className={styles.metricIcon} />
                <div className={styles.metricVal}>Global Setups</div>
                <div className={styles.metricLabel}>US, Malaysia, India</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className={`${styles.buttonContainer} ${styles.revealButton}`}>
              <Link href="/about" className="btn btn-primary hover-lift">
                More About Our Story <FaArrowRight className={styles.btnArrow} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
