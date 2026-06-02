"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ServicesSection.module.css';
import { FaCheck } from 'react-icons/fa';

export default function ServicesSection() {
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
        threshold: 0.1, // Trigger when 10% of the section is visible
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

  const services = [
    {
      title: "Royal Weddings",
      image: "/images/service_weddings.png",
      description: "Exquisite culinary spectacles for your once-in-a-lifetime celebration. Customized royal menus, luxurious buffet presentations, and flawless service.",
      bullets: ["Customized Theme Menus", "Luxury Buffet Presentation", "Live Culinary Counters", "Dedicated Hospitality Staff"],
      cardClass: styles.card1
    },
    {
      title: "Milestone Birthdays",
      image: "/images/service_birthdays.png",
      description: "Delightful feasts to celebrate milestones with friends and family. High-energy live stations, customized desserts, and mocktail bars.",
      bullets: ["Interactive Food Stations", "Mocktail & Beverage Bars", "Artisanal Dessert Displays", "Hassle-Free Table Setup"],
      cardClass: styles.card2
    },
    {
      title: "Corporate Gatherings",
      image: "/images/service_corporate.png",
      description: "Sleek, compliant, and professional dining operations for business summits, product launches, or office celebrations.",
      bullets: ["Multi-Cuisine Corporate Buffets", "Elegant High-Tea Selections", "Punctual Delivery & Layout", "Strict Safety & Hygiene Checked"],
      cardClass: styles.card3
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.servicesSection} ${isVisible ? styles.visible : ''}`}
      id="services-experience"
    >
      <div className="container">
        {/* Header (Fades and slides up) */}
        <div className={`${styles.sectionHeader} ${styles.revealHeader}`}>
          <span className={styles.subtitle}>Our Offerings</span>
          <h2 className={styles.title}>Catering Services For All Occasions</h2>
        </div>

        {/* Services Grid (Staggered cards reveal) */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${styles.card} ${styles.revealCard} ${service.cardClass}`}
            >
              {/* Backing Image Layer (Dims and zooms on hover) */}
              <div className={styles.imageContainer}>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.cardImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.imageOverlay}></div>
              </div>

              {/* Front Card Content - Just the Title */}
              <div className={styles.defaultContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
              </div>

              {/* Back Card Content - Details (Slides up on hover) */}
              <div className={styles.hoverContent}>
                <h3 className={styles.hoverTitle}>{service.title}</h3>
                <p className={styles.hoverText}>{service.description}</p>
                
                <ul className={styles.bulletList}>
                  {service.bullets.map((bullet, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      <FaCheck className={styles.bulletIcon} />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className={`btn ${styles.hoverBtn}`}>
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
