"use client";

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './GallerySection.module.css';

interface GalleryItem {
  id: string;
  url: string;
  type: string;
  title: string | null;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Gallery</h2>
        <p className={styles.sectionSubtitle}>
          Take a look at some of our premium event setups, dishes, and culinary presentations.
        </p>

        <div className={styles.carouselContainer}>
          {items.length > 1 && (
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Previous slide">
              <FaChevronLeft />
            </button>
          )}

          <div className={styles.sliderViewport}>
            <div 
              className={styles.sliderTrack} 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item) => (
                <div key={item.id} className={styles.slide}>
                  <div className={styles.mediaWrapper}>
                    {item.type === 'PHOTO' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={item.url} 
                        alt={item.title || 'Gallery Media'} 
                        className={styles.slideImg}
                      />
                    ) : (
                      <video 
                        src={item.url} 
                        className={styles.slideVideo}
                        controls
                        loop
                        muted
                        autoPlay
                        playsInline
                      />
                    )}
                    {item.title && (
                      <div className={styles.mediaCaption}>
                        {item.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {items.length > 1 && (
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Next slide">
              <FaChevronRight />
            </button>
          )}

          {items.length > 1 && (
            <div className={styles.indicators}>
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
