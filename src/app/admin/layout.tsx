"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUtensils, FaHome, FaEnvelopeOpenText, FaSignOutAlt, FaBoxOpen, FaStar } from 'react-icons/fa';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Simple check for login page to not show sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    // In a real app, clear auth cookies/session here
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Menu Items', path: '/admin/menu', icon: <FaUtensils /> },
    { name: 'Premium Plans', path: '/admin/plans', icon: <FaBoxOpen /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <FaEnvelopeOpenText /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FaStar /> },
  ];

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <Link href="/admin/dashboard" className={styles.brand}>
          <FaUtensils /> SC Admin
        </Link>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link 
              key={item.name} 
              href={item.path}
              className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
