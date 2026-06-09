"use client";

import { useState, useEffect } from 'react';
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // Autoplay Effect
  useEffect(() => {
    if (!items || items.length <= 1) return;
    
    const activeItem = items[activeIndex];
    
    // Only set a timer if the active item is a PHOTO
    if (activeItem.type === 'PHOTO') {
      const timer = setTimeout(() => {
        handleNext();
      }, 8000); // 8 seconds for photos
      
      return () => clearTimeout(timer);
    }
    
    // For videos, transition is triggered by the onEnded event of the video tag
  }, [activeIndex, items]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Gallery</h2>
        <p className={styles.sectionSubtitle}>
          Take a look at some of our premium event setups, dishes, and culinary presentations.
        </p>
      </div>

      <div className={styles.carouselContainer}>
          <div className={styles.sliderViewport}>
            <div 
              className={styles.sliderTrack} 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item, idx) => (
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
                        muted
                        autoPlay
                        playsInline
                        onEnded={handleNext}
                        // Only play the video if it is the active slide
                        ref={(el) => {
                          if (el) {
                            if (idx === activeIndex) {
                              el.play().catch(() => {});
                            } else {
                              el.pause();
                              el.currentTime = 0;
                            }
                          }
                        }}
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
      </section>
    );
}
