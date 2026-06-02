import styles from './FoodCard.module.css';
import { FaImage } from 'react-icons/fa';

interface FoodCardProps {
  name: string;
  description: string | null;
  price: number | null;
  imageUrl?: string | null;
}

export default function FoodCard({ name, description, price, imageUrl }: FoodCardProps) {
  return (
    <div className={styles.card}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className={styles.image} loading="lazy" />
      ) : (
        <div className={styles.imagePlaceholder}>
          <FaImage size={40} opacity={0.3} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
