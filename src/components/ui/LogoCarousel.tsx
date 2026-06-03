"use client";

import React from 'react';
import Image from 'next/image';
import styles from './LogoCarousel.module.css';

interface LogoItem {
  name: string;
  logo: string;
}

interface LogoCarouselProps {
  logos: LogoItem[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  // Duplicate the logos to achieve a seamless scrolling effect
  const doubleLogos = [...logos, ...logos];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselTrack}>
        {doubleLogos.map((item, index) => (
          <div key={index} className={styles.logoWrapper} title={item.name}>
            <Image
              src={item.logo}
              alt={`${item.name} Logo`}
              fill
              sizes="(max-width: 768px) 110px, 140px"
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
