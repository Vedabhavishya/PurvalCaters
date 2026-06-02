"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { FaUtensils } from 'react-icons/fa';

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
    { name: 'Menu', path: '/menu' },
    { name: 'Premium Plans', path: '/plans' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isSolid = scrolled || pathname !== '/';

  return (
    <nav className={`${styles.navbar} ${isSolid ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContent}`}>
        <Link href="/" className={styles.logo}>
          <FaUtensils /> Supper Club
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
          <Link href="/contact" className="btn btn-primary hover-lift">
            Book Catering
          </Link>
        </div>
      </div>
    </nav>
  );
}
