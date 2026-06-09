"use client";

import { useState } from 'react';
import styles from '@/app/page.module.css';

interface ReviewerPhotoProps {
  imageUrl: string | null;
  name: string;
}

export default function ReviewerPhoto({ imageUrl, name }: ReviewerPhotoProps) {
  const [error, setError] = useState(false);

  const hasNoImage = !imageUrl || imageUrl === 'null' || imageUrl.trim() === '';

  if (hasNoImage || error) {
    return (
      <div className={`${styles.reviewerPhoto} ${styles.reviewerAvatar}`}>
        {name.trim().charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt={name} 
      className={styles.reviewerPhoto} 
      loading="lazy" 
      onError={() => setError(true)}
    />
  );
}
