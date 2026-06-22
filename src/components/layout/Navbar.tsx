"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Package', path: '/plans' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact Us', path: '/contact' },
  ];

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isSolid = scrolled || pathname !== '/';

  return (
    <nav className={`${styles.navbar} ${isSolid ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContent}`}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/images/supperclub_logo_white.png" 
            alt="Supper Club Logo" 
            width={72} 
            height={72} 
            className={styles.logoImage}
            priority
          />
          <div className={styles.logoTextContainer}>
            <span className={styles.logoTitle}>Supper Club</span>
            <span className={styles.logoSubtitle}>OF INDIA</span>
          </div>
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://wa.me/919246179757?text=Hi%20i%20need%20to%20book%20a%20catering" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary hover-lift"
          >
            Book Catering
          </a>
        </div>
      </div>
    </nav>
  );
}
