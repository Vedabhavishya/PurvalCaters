"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          guests: formData.guests ? parseInt(formData.guests) : undefined
        }),
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', eventType: '', guests: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className={`container ${styles.contactSection}`}>
      <h1 className={styles.title}>Get in Touch</h1>
      
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Contact Information</h2>
          <p>Ready to plan your unforgettable event? Reach out to our dedicated team of catering experts today.</p>
          
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <FaPhone className={styles.icon} />
              <span>+91 98765 43210</span>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.icon} />
              <span>bookings@supperclub.com</span>
            </div>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.icon} />
              <span>123 Heritage Street, Food District, India</span>
            </div>
          </div>
          
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
            <FaWhatsapp size={24} /> Chat on WhatsApp
          </a>
        </div>
        
        <div className={styles.form}>
          <h2>Catering Inquiry</h2>
          {status === 'success' && (
            <div style={{ padding: '1rem', background: '#10b98120', color: '#10b981', borderRadius: '8px', marginBottom: '1rem' }}>
              Thank you! Your inquiry has been sent successfully. We will contact you shortly.
            </div>
          )}
          {status === 'error' && (
            <div style={{ padding: '1rem', background: '#ef444420', color: '#ef4444', borderRadius: '8px', marginBottom: '1rem' }}>
              Something went wrong. Please try again or contact us directly.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" className={styles.input} required value={formData.name} onChange={handleChange} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" className={styles.input} required value={formData.email} onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" className={styles.input} required value={formData.phone} onChange={handleChange} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label htmlFor="eventType">Event Type</label>
                <select id="eventType" name="eventType" className={styles.input} value={formData.eventType} onChange={handleChange}>
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="party">Private Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="guests">Estimated Guests</label>
                <input type="number" id="guests" name="guests" className={styles.input} value={formData.guests} onChange={handleChange} />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Event Details & Requirements *</label>
              <textarea id="message" name="message" className={styles.textarea} required value={formData.message} onChange={handleChange}></textarea>
            </div>
            
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
