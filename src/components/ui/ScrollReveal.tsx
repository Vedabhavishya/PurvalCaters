"use client";

import React, { useState, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({ children, className = '', threshold = 0.1 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the section fully enters the viewport
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
    >
      {children}
    </div>
  );
}
