"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import { FaUtensils, FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brand}>
          <h3><FaUtensils /> Supper Club of India</h3>
          <p>Curated Authentic Indian Feast. Providing premium catering services for weddings, corporate events, and parties across the region.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        <div className={styles.links}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Our Menu</Link></li>
            <li><Link href="/plans">Premium Plans</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h4>Contact Info</h4>
          <p><FaPhone /> +91 98765 43210</p>
          <p><FaEnvelope /> info@supperclub.com</p>
          <p><FaMapMarkerAlt /> 123 Heritage Street, Food District, India</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Supper Club of India. All rights reserved.</p>
      </div>
    </footer>
  );
}
