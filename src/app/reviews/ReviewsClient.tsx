"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { FaStar, FaPlus, FaTimes, FaCheckCircle } from 'react-icons/fa';
import ReviewerPhoto from '@/components/ui/ReviewerPhoto';

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  content: string;
  imageUrl: string | null;
  rating: number;
  isVisible: boolean;
  createdAt: string;
};

interface ReviewsClientProps {
  initialTestimonials: Testimonial[];
}

export default function ReviewsClient({ initialTestimonials }: ReviewsClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
  });

  const handleStarClick = (ratingValue: number) => {
    setFormData(prev => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) {
      alert('Name and review content are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role || null,
          content: formData.content,
          rating: formData.rating,
          imageUrl: null,
          isVisible: true, // Visible immediately
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setTestimonials(prev => [newReview, ...prev]);
        setSuccessSubmitted(true);
        setFormData({ name: '', role: '', content: '', rating: 5 });
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessSubmitted(false);
    setFormData({ name: '', role: '', content: '', rating: 5 });
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.reviewsHero}>
        <div className={styles.heroContent}>
          <h1>Client Reviews & Experiences</h1>
          <p>Read about the dining experiences of our guests and share your own feedback with us.</p>
          <button className={styles.writeReviewBtn} onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Write a Review
          </button>
        </div>
      </section>

      {/* Main Reviews List */}
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.reviewCard}>
                <div>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className={styles.quote}>"{t.content}"</p>
                </div>
                
                <div className={styles.reviewerInfo}>
                  <ReviewerPhoto imageUrl={t.imageUrl} name={t.name} />
                  <div className={styles.reviewerDetails}>
                    <h4>{t.name}</h4>
                    {t.role && <span>{t.role}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Write a Review Modal */}
      <div className={`${styles.modalOverlay} ${isModalOpen ? styles.active : ''}`}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{successSubmitted ? 'Thank You!' : 'Write a Review'}</h2>
            <button className={styles.closeBtn} onClick={closeModal}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalBody}>
            {successSubmitted ? (
              <div className={styles.successOverlay}>
                <FaCheckCircle className={styles.successIcon} />
                <h3>Review Submitted!</h3>
                <p>Thank you for sharing your feedback. Your review is now live on our page.</p>
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Rajesh Sharma"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="role">Position / Event Type</label>
                    <input 
                      type="text" 
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Wedding Host, Corporate Guest"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Overall Rating *</label>
                  <div className={styles.starSelector}>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        type="button"
                        key={starValue}
                        onClick={() => handleStarClick(starValue)}
                        className={`${styles.starBtn} ${formData.rating >= starValue ? styles.starActive : ''}`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="content">Your Review *</label>
                  <textarea 
                    id="content" 
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Tell us about your experience with our services, dishes, or staff..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
