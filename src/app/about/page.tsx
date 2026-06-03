"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import LogoCarousel from '@/components/ui/LogoCarousel';
import { 
  FaUtensils, 
  FaAward, 
  FaGraduationCap, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaCogs, 
  FaBriefcase,
  FaCheckCircle,
  FaTimes 
} from 'react-icons/fa';

export default function About() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const canteens = [
    {
      name: "NIFT Madhapur",
      desc: "Managed full-scale on-premise canteen services, catering daily to hundreds of students and faculty members at the National Institute of Fashion Technology."
    },
    {
      name: "Procter & Gamble (P&G)",
      desc: "Delivered highly compliant, hygienic, and premium corporate cafeteria operations matching multinational standards of health and nutrition."
    },
    {
      name: "Satyam Computers",
      desc: "Managed ongoing canteen facilities and successfully orchestrated the massive annual 'Satyamoutsav' get-together festivals catering to thousands."
    }
  ];

  const regularClients = [
    "South Central Railways", "CMC", "P & T", "King & Cardinal Bakery", 
    "Air India", "GST Department", "State Bank of India (SBI)", "Telangana Police", 
    "Kotak Mahindra Bank", "Second Chance Christian Ministry", "Medinova Hospitals", 
    "Allwyn", "Samsung Electronics", "Defence Accounts"
  ];

  const clientLogos = [
    { name: "NIFT", logo: "/images/nift_logo.png" },
    { name: "Procter & Gamble", logo: "/images/p&g_logo.png" },
    { name: "Samsung Electronics", logo: "/images/samsung_logo.webp" },
    { name: "State Bank of India (SBI)", logo: "/images/sbi_logo.png" },
    { name: "Telangana Police", logo: "/images/telangana_police_logo.png" },
    { name: "Kotak Mahindra Bank", logo: "/images/kotak_mahindra_logo.png" },
    { name: "South Central Railways", logo: "/images/southcentralrailways_logo.jpg" },
    { name: "Air India", logo: "/images/airindia_logo.webp" },
    { name: "King & Cardinal", logo: "/images/King_cardinal_logo.jpg" },
    { name: "Allwyn", logo: "/images/allwyn_logo.png" },
    { name: "Defence Accounts", logo: "/images/defenece_accounts_logo.png" },
    { name: "GST Department", logo: "/images/gst_logo.png" }
  ];

  const consultations = [
    {
      country: "India Project",
      name: "Elephant Group of Hotels",
      desc: "Designed and implemented a luxury Indian-themed restaurant concept. Handled full layout, standard operating kitchen designs, and core menu selection."
    },
    {
      country: "Malaysia",
      name: "Biryani Concept Express",
      desc: "Successfully launched an authentic Indian Biryani concept restaurant. Optimized kitchen layout, standard recipes, and trained international chefs."
    },
    {
      country: "United States",
      name: "Vegan Dining - West Virginia",
      desc: "Established a specialty vegan Indian restaurant in West Virginia. Created operational menus, trained kitchen staff, and made the facility fully functional."
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Top Banner Section */}
      <div className={styles.bannerContainer}>
        <Image 
          src="/images/about_banner.png" 
          alt="About Us Banner" 
          fill
          sizes="100vw"
          priority
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>About Us</h1>
          <p className={styles.bannerSubtitle}>Our Story, Heritage & Passion for Gastronomy</p>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <ScrollReveal>
          <section className="container">
            <h2 className={styles.title}>Our Story & Heritage</h2>
            <p className={styles.subtitle}>
              Established in 1991, Purval’s Caterers has been crafting memories through authentic flavors, traditional recipes, and unparalleled hospitality.
            </p>

            {/* Story Intro */}
            <div className={styles.content}>
              <div className={styles.text}>
                <h2>Crafting Celebrations for 35+ Years</h2>
                <p>
                  Purval’s Caterers was founded on a passion for exceptional culinary experiences and a singular vision: to create memorable dining for every single celebration. Over the decades, we have grown into one of the most trusted and respected names in outdoor catering, celebrated for our uncompromising quality, consistent taste, and bespoke hospitality.
                </p>
                <p>
                  To us, food is not merely nourishment — it is an emotional experience, an echo of centuries-old traditions, and a beautiful medium that draws people closer. Every custom menu we curate is a reflection of our commitment to culinary authenticity, innovative presentation, and flawless execution.
                </p>
              </div>
              <div className={styles.imageWrapper}>
                <Image 
                  src="/images/about_indian_buffet.png" 
                  alt="Premium Indian Buffet Catering Showcase" 
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Food Safety & Certifications Section */}
        <ScrollReveal>
          <section className={styles.safetySection}>
            <div className="container">
              <div className={styles.safetyGrid}>
                {/* Left Content Column */}
                <div className={styles.safetyLeft}>
                  <span className={styles.safetyBadge}>Certified & Trusted</span>
                  <h2 className={styles.safetyTitle}>Food Safety & Certifications</h2>
                  <p className={styles.safetySubtitle}>
                    We follow the highest standards of hygiene, food safety, and quality. Purvals Caterers & Hoteliers is officially registered under FSSAI, ensuring safe and trusted catering services for every occasion.
                  </p>
                  
                  <div className={styles.trustGrid}>
                    <div className={styles.trustCard}>
                      <FaCheckCircle className={styles.trustIcon} />
                      <span>FSSAI Certified</span>
                    </div>
                    <div className={styles.trustCard}>
                      <FaCheckCircle className={styles.trustIcon} />
                      <span>Hygienic Food Preparation</span>
                    </div>
                    <div className={styles.trustCard}>
                      <FaCheckCircle className={styles.trustIcon} />
                      <span>Government Registered</span>
                    </div>
                    <div className={styles.trustCard}>
                      <FaCheckCircle className={styles.trustIcon} />
                      <span>Trusted Catering Service</span>
                    </div>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoRow}>
                      <div className={styles.infoItem}>
                        <strong>FSSAI Registration Number:</strong> 23621033001862
                      </div>
                      <div className={styles.infoItem}>
                        <strong>Valid Till:</strong> 01 April 2029
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsLightboxOpen(true)}
                    className="btn btn-primary"
                  >
                    View Full Certificate
                  </button>
                </div>

                {/* Right Image/Certificate Column */}
                <div className={styles.safetyRight}>
                  <div 
                    className={styles.certCard}
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <span className={styles.floatingBadge}>Government Verified</span>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.414', borderRadius: '12px', overflow: 'hidden' }}>
                      <Image 
                        src="/images/fssai_certificate.png" 
                        alt="FSSAI Registration Certificate" 
                        fill
                        sizes="(max-width: 992px) 100vw, 40vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Founder's Note */}
        <ScrollReveal>
          <section className={styles.chefSection}>
            <div className="container">
              <h2 className={styles.sectionHeading}>Founder’s Note</h2>
              <p className={styles.sectionSubtitle}>
                A message from our Founder, CEO & Executive Chef, Arun Kumar Lakpath.
              </p>

              <div className={styles.chefCard}>
                <div className={styles.chefPhotoContainer}>
                  <Image 
                    src="/images/founder.png" 
                    alt="Arun Kumar Lakpath - Founder, CEO & Executive Chef of Purval's Caterers" 
                    fill
                    sizes="(max-width: 992px) 100vw, 40vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                
                <div className={styles.chefBio}>
                  <div className={styles.chefMeta}>
                    <h3 className={styles.chefName}>Arun Kumar Lakpath</h3>
                    <p className={styles.chefTitle}>Founder, CEO & Executive Chef</p>
                    <div className={styles.chefTags}>
                      <span className={styles.chefTag}><FaAward /> 20+ Years Experience</span>
                      <span className={styles.chefTag}><FaGraduationCap /> IHM Hyderabad</span>
                      <span className={styles.chefTag}><FaBriefcase /> Osmania University</span>
                    </div>
                  </div>
                  
                  <p className={styles.chefDesc}>
                    Welcome to Purval’s Caterers. Established in 1991, our journey began with a passion for authentic cuisine, exceptional hospitality, and a vision of creating memorable dining experiences for every celebration. Over the decades, we have grown into a trusted name in outdoor catering, celebrated for our uncompromising quality, consistent taste, and personalized service.
                  </p>
                  
                  <p className={styles.chefDesc}>
                    With over 20+ years of professional culinary experience across India and abroad—including assignments in New Zealand and the United States—I guide the gastronomic identity of our team. After completing my Post Graduate Diploma in Hotel Management from the Institute of Hotel Management and Catering Technology (IHM) Hyderabad, alongside a Bachelor of Commerce degree from Osmania University, I had the privilege of working with leading international hospitality brands, gaining expertise in authentic <strong>Hyderabadi, South Indian, North Indian, Mughlai, and Tandoor</strong> cuisines.
                  </p>

                  <p className={styles.chefDesc}>
                    We believe food is not just about taste — it is about emotion, tradition, and bringing people together. I sincerely thank our clients, partners, and well-wishers for your continued trust and encouragement over the years, motivating us to continue delivering excellence and making every occasion truly special.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Corporate Canteens & Clients */}
        <ScrollReveal>
          <section className={styles.clientsSection}>
            <div className="container">
              <h2 className={styles.sectionHeading}>Our Prestigious Portfolio</h2>
              <p className={styles.sectionSubtitle}>
                Our legacy includes managing large-scale, high-compliance canteens and catering to premier institutions.
              </p>

              <h3 className={styles.clientsLabel}>Corporate Canteens Managed</h3>
              <div className={styles.canteenGrid}>
                {canteens.map((c, index) => (
                  <div key={index} className={styles.canteenCard}>
                    <FaBuilding className={styles.canteenIcon} />
                    <h4 className={styles.canteenName}>{c.name}</h4>
                    <p className={styles.canteenDesc}>{c.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className={styles.clientsLabel}>Our Regular Catering Clients</h3>
              <div className={styles.clientBadgeGrid}>
                {regularClients.map((client, index) => (
                  <span key={index} className={styles.clientBadge}>
                    <FaCheckCircle style={{ marginRight: '6px', color: 'var(--accent-gold)' }} />
                    {client}
                  </span>
                ))}
              </div>

              {/* Client Logos Carousel Marquee */}
              <LogoCarousel logos={clientLogos} />
            </div>
          </section>
        </ScrollReveal>

        {/* Global Restaurant Consultations */}
        <ScrollReveal>
          <section className={styles.consultSection}>
            <div className="container">
              <h2 className={styles.sectionHeading}><FaGlobe style={{ marginRight: '10px' }} /> Global Restaurant Consultations</h2>
              <p className={styles.sectionSubtitle}>
                We extend our culinary expertise internationally by providing premium, end-to-end advisory services to set up Indian restaurants right from kitchen layout design to menu planning and staff training.
              </p>

              <div className={styles.consultGrid}>
                {consultations.map((c, index) => (
                  <div key={index} className={styles.consultCard}>
                    <div className={styles.consultIcon}><FaCogs /></div>
                    <div className={styles.consultCountry}>{c.country}</div>
                    <h4 className={styles.consultName}>{c.name}</h4>
                    <p className={styles.consultDesc}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>
      {/* Lightbox / Modal Certificate Viewer */}
      {isLightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeBtn} 
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close certificate viewer"
            >
              <FaTimes />
            </button>
            <div style={{ position: 'relative', width: 'min(90vw, 600px)', height: 'min(85vh, 848px)' }}>
              <Image 
                src="/images/fssai_certificate.png" 
                alt="FSSAI Registration Certificate" 
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
