import styles from './page.module.css';
import { FaImage, FaUser } from 'react-icons/fa';

export default function About() {
  return (
    <>
      <section className={`container ${styles.aboutSection}`}>
        <h1 className={styles.title}>Our Story</h1>
        <div className={styles.content}>
          <div className={styles.image}>
            <FaImage size={64} opacity={0.5} />
            <span style={{ marginLeft: '1rem', opacity: 0.5 }}>Premium Catering Image</span>
          </div>
          <div className={styles.text}>
            <h2>A Legacy of Culinary Excellence</h2>
            <p>
              Founded on the principles of authentic Indian hospitality, Supper Club of India 
              has been redefining luxury catering for over a decade. We believe that every 
              event is unique and deserves a culinary experience that matches its grandeur.
            </p>
            <p>
              Our mission is to bring the rich, diverse flavors of India to your celebrations, 
              curated with modern elegance and served with impeccable attention to detail. 
              Whether it's an intimate gathering or a royal wedding, we ensure every guest 
              leaves with a memorable taste of our heritage.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className="container">
          <h2 className={styles.title} style={{ marginBottom: '1rem' }}>Meet Our Experts</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>The passion and talent behind our exquisite dining experiences.</p>
          
          <div className={styles.teamGrid}>
            <div className={styles.member}>
              <div className={styles.memberImg}><FaUser size={48} /></div>
              <h3 className={styles.memberName}>Sanjeev Kapoor</h3>
              <p className={styles.memberRole}>Executive Chef</p>
            </div>
            <div className={styles.member}>
              <div className={styles.memberImg}><FaUser size={48} /></div>
              <h3 className={styles.memberName}>Anjali Desai</h3>
              <p className={styles.memberRole}>Events Director</p>
            </div>
            <div className={styles.member}>
              <div className={styles.memberImg}><FaUser size={48} /></div>
              <h3 className={styles.memberName}>Rahul Verma</h3>
              <p className={styles.memberRole}>Operations Manager</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
