import styles from './PackageCard.module.css';
import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import Link from 'next/link';

interface PackageCardProps {
  name: string;
  description: string;
  price: number;
  capacity: number;
  includes: string;
}

export default function PackageCard({ name, description, price, capacity, includes }: PackageCardProps) {
  let includesList: string[] = [];
  try {
    includesList = JSON.parse(includes);
  } catch (e) {
    includesList = includes.split(',').map(i => i.trim());
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.price}>
        ₹{price.toLocaleString('en-IN')} <span>/ event</span>
      </div>
      <div className={styles.capacity}>
        <FaUsers /> Up to {capacity} Guests
      </div>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.includesTitle}>Package Includes:</div>
      <ul className={styles.includesList}>
        {includesList.map((item, index) => (
          <li key={index}>
            <FaCheckCircle className={styles.checkIcon} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      
      <div className={styles.btnWrapper}>
        <Link href="/contact" className="btn btn-primary" style={{ width: '100%' }}>
          Book This Package
        </Link>
      </div>
    </div>
  );
}
