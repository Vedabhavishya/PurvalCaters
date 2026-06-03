"use client";

import { useState } from 'react';
import styles from './page.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import ScrollReveal from '@/components/ui/ScrollReveal';

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
    
    // Construct WhatsApp message content
    const eventLabels: Record<string, string> = {
      wedding: 'Wedding Ceremony',
      birthday: 'Birthday Party',
      corporate: 'Corporate Event',
      private: 'Private Banquet / Gathering',
      other: 'Other Occasions'
    };
    
    const eventLabel = eventLabels[formData.eventType] || formData.eventType || 'N/A';

    const whatsAppMessage = `Hi Purval's Caterers, I want to inquire about catering services. Here are my details:

• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Event Type: ${eventLabel}
• Estimated Guests: ${formData.guests || 'N/A'}

Message & Catering Details:
${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsAppMessage);
    const whatsAppUrl = `https://wa.me/919246179757?text=${encodedMessage}`;

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
        const opened = window.open(whatsAppUrl, '_blank');
        if (!opened) {
          window.location.href = whatsAppUrl;
        }
        setFormData({ name: '', email: '', phone: '', eventType: '', guests: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error submitting contact inquiry:', err);
      setStatus('error');
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Top Banner Section */}
      <div className={styles.bannerContainer}>
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>Contact Us</h1>
          <p className={styles.bannerSubtitle}>Let's Plan Your Next Culinary Feast</p>
        </div>
      </div>

      <div className={`container ${styles.mainContainer}`}>
        <div className={styles.grid}>
          {/* Left Column: Contact Details Cards */}
          <ScrollReveal className={styles.detailsColumn}>
            {/* Phone Card */}
            <div className={styles.detailCard}>
              <div className={styles.iconCircle}>
                <FaPhone />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Phone & Mobile</h3>
                <a href="tel:+919246179757" className={styles.linkItem}>+91 92461 79757</a>
                <a href="tel:+919849559171" className={styles.linkItem}>+91 98495 59171</a>
                
                <span className={styles.cardText} style={{ marginTop: '0.5rem' }}>Landline:</span>
                <a href="tel:04027730385" className={styles.linkItem}>040 - 27730385</a>
                <a href="tel:04064514143" className={styles.linkItem}>040 - 64514143</a>
              </div>
            </div>

            {/* Email Card */}
            <div className={styles.detailCard}>
              <div className={styles.iconCircle}>
                <FaEnvelope />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Email Address</h3>
                <a href="mailto:supperclub60@gmail.com" className={styles.linkItem}>
                  supperclub60@gmail.com
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className={styles.detailCard}>
              <div className={styles.iconCircle}>
                <FaMapMarkerAlt />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Our Address</h3>
                <p className={styles.cardText} style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.7' }}>
                  Thukaramgate<br />
                  North Lallaguda, Secunderabad.<br />
                  Hyderabad, India 500017
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Send Us A Message Form */}
          <ScrollReveal className={styles.formCard}>
            <h2>Send Us a Message</h2>
            <p>Fill out the inquiry form below, and our catering coordinators will reach out to design your proposal.</p>
            
            {status === 'success' && (
              <div className={styles.alertSuccess}>
                Thank you! Your catering inquiry message has been sent successfully. We will get back to you shortly.
              </div>
            )}
            {status === 'error' && (
              <div className={styles.alertError}>
                Something went wrong. Please check your network connection and try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className={styles.inputField} 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className={styles.inputField} 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="name@email.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    className={styles.inputField} 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="eventType">Event Type</label>
                  <select 
                    id="eventType" 
                    name="eventType" 
                    className={styles.selectField} 
                    value={formData.eventType} 
                    onChange={handleChange}
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">Wedding Ceremony</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Banquet / Gathering</option>
                    <option value="other">Other Occasions</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="guests">Estimated Guest Count</label>
                  <input 
                    type="number" 
                    id="guests" 
                    name="guests" 
                    min="35"
                    className={styles.inputField} 
                    value={formData.guests} 
                    onChange={handleChange}
                    placeholder="Min 35 guests"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message & Catering Details *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  className={styles.textareaField} 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="Detail your requirements, preferred cuisines, event date, and specific requests here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary ${styles.submitBtn}`} 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>

        {/* Map Section */}
        <ScrollReveal>
          <div className={styles.mapSection}>
            <h2 className={styles.mapHeading}>Our Location</h2>
            <p className={styles.mapSubtitle}>Find us at our main kitchen and operations office</p>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://maps.google.com/maps?q=Thukaramgate,%20North%20Lallaguda,%20Secunderabad,%20Hyderabad,%20India%20500017&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                className={styles.mapFrame} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Purval Caterers Operations Location Map"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
