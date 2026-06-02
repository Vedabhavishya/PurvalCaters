import styles from './page.module.css';
import Image from 'next/image';
import { 
  FaUtensils, 
  FaAward, 
  FaGraduationCap, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaCogs, 
  FaUsers, 
  FaBriefcase,
  FaCheckCircle 
} from 'react-icons/fa';

export default function About() {
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

      {/* Founder Spotlight */}
      <section className={styles.chefSection}>
        <div className="container">
          <h2 className={styles.sectionHeading}>The Culinary Visionary</h2>
          <p className={styles.sectionSubtitle}>
            Our kitchen, recipes, and operations are guided by expert hands with global credentials.
          </p>

          <div className={styles.chefCard}>
            <div className={styles.chefPhotoContainer}>
              <Image 
                src="/images/about_kabab.png" 
                alt="Executive Chef & Founder of Purval's Caterers" 
                fill
                sizes="(max-width: 992px) 100vw, 40vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            <div className={styles.chefBio}>
              <div className={styles.chefMeta}>
                <h3 className={styles.chefName}>Executive Chef Purval</h3>
                <p className={styles.chefTitle}>Founder, CEO & Executive Chef</p>
                <div className={styles.chefTags}>
                  <span className={styles.chefTag}><FaAward /> 20+ Years Global Exp</span>
                  <span className={styles.chefTag}><FaGraduationCap /> IHM Hyderabad Alumni</span>
                  <span className={styles.chefTag}><FaBriefcase /> Osmania University</span>
                </div>
              </div>
              
              <p className={styles.chefDesc}>
                Bringing over 20+ years of professional culinary mastery across India and abroad, including prestigious assignments in New Zealand and the United States, our Founder guides the gastronomic identity of Purval's Caterers.
              </p>
              
              <p className={styles.chefDesc}>
                After acquiring a Post Graduate Diploma in Hotel Management from the esteemed Institute of Hotel Management and Catering Technology (IHM) Hyderabad, alongside a Bachelor of Commerce from Osmania University, he worked with elite international hotels and fine dining ventures. 
              </p>

              <p className={styles.chefDesc}>
                He holds exceptional expertise in authentic **Hyderabadi, South Indian, North Indian, Mughlai, and Tandoor** cuisines. Under his leadership, our team successfully executes large-scale weddings and corporate canteens catering to thousands of guests simultaneously while maintaining strict premium hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pax Capacity Banner */}
      <section className="container">
        <div className={styles.paxBanner}>
          <h3 className={styles.paxTitle}><FaUsers style={{ marginRight: '8px' }} /> Catering For Any Event Size</h3>
          <p className={styles.paxDesc}>
            From intimate family get-togethers and birthday celebrations of **35 guests** to grand royal weddings and corporate galas serving **10,000+ pax and above**, our commitment to immaculate taste, absolute hygiene, consistency, and flawless execution remains unwavering.
          </p>
        </div>
      </section>

      {/* Corporate Canteens & Clients */}
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
        </div>
      </section>

      {/* Global Restaurant Consultations */}
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
      </div>
    </div>
  );
}
