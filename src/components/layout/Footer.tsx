"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.brand}>
          <div className={styles.logoContainer}>
            <Image 
              src="/images/supperclub_logo_white.png" 
              alt="Supper Club Logo" 
              width={40} 
              height={40} 
              className={styles.logoImage}
            />
            <div className={styles.logoTextContainer}>
              <span className={styles.logoTitle}>Supper Club</span>
              <span className={styles.logoSubtitle}>OF INDIA</span>
            </div>
          </div>
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
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/plans">Package</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li>
              <a href="https://wa.me/919246179757?text=Hi%20i%20need%20to%20book%20a%20catering" target="_blank" rel="noopener noreferrer">
                Book Catering
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h4>Contact Info</h4>
          <p><FaPhone /> +91 92461 79757 / +91 98495 59171</p>
          <p><FaEnvelope /> supperclub60@gmail.com</p>
          <p><FaMapMarkerAlt /> Thukaramgate, North Lallaguda, Secunderabad, Hyderabad, India 500017</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Supper Club of India. All rights reserved.</p>
      </div>
    </footer>
  );
}
