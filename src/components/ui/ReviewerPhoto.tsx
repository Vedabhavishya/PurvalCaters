"use client";

import { useState } from 'react';
import styles from '@/app/page.module.css';

interface ReviewerPhotoProps {
  imageUrl: string | null;
  name: string;
}

export default function ReviewerPhoto({ imageUrl, name }: ReviewerPhotoProps) {
  const [error, setError] = useState(false);

  if (!imageUrl || error) {
    return (
      <div className={styles.reviewerPhoto}>
        {name.charAt(0).toUpperCase()}
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
