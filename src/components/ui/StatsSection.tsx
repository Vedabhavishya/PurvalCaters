"use client";

import { useEffect, useState, useRef } from 'react';
import styles from './StatsSection.module.css';

interface StatsSectionProps {
  initialVisitorCount: number;
  menuItemsCount: number;
}

interface StatCardProps {
  target: number;
  label: string;
  suffix?: string;
  bgImage: string;
}

function StatCard({ target, label, suffix = "", bgImage }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      
      const currentCount = Math.floor(easeProgress * target);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target]);

  return (
    <div 
      ref={elementRef}
      className={styles.card}
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bgImage})` }}
    >
      <div className={styles.number}>
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function StatsSection({ initialVisitorCount, menuItemsCount }: StatsSectionProps) {
  const [visitorCount, setVisitorCount] = useState(initialVisitorCount);

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem('supperclub_visited');
        
        if (hasVisited) {
          // Fetch current count without incrementing
          const res = await fetch('/api/visitor-count');
          if (res.ok) {
            const data = await res.json();
            if (data.count) {
              setVisitorCount(data.count);
            }
          }
        } else {
          // Mark visited in this session and increment
          sessionStorage.setItem('supperclub_visited', 'true');
          const res = await fetch('/api/visitor-count', { method: 'POST' });
          if (res.ok) {
            const data = await res.json();
            if (data.count) {
              setVisitorCount(data.count);
            }
          }
        }
      } catch (error) {
        console.error('Failed to manage visitor count dynamically:', error);
      }
    };

    incrementVisitorCount();
  }, []);

  const yearsOfExcellence = new Date().getFullYear() - 1991;

  return (
    <section className={styles.statsSection}>
      <div className={styles.statsGrid}>
        <StatCard 
          target={yearsOfExcellence} 
          label="Years Of Excellence" 
          suffix="+" 
          bgImage="/images/about_banner.png" 
        />
        <StatCard 
          target={menuItemsCount} 
          label="Menu Options" 
          suffix="+" 
          bgImage="/images/about_kabab.png" 
        />
        <StatCard 
          target={visitorCount} 
          label="Happy Visitors" 
          bgImage="/images/service_corporate.png" 
        />
      </div>
    </section>
  );
}
