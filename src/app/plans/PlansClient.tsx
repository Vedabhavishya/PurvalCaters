"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { 
  FaLeaf, 
  FaWineGlassAlt, 
  FaUtensils, 
  FaCookie, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaStar,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaCocktail,
  FaFire,
  FaCookieBite,
  FaUserFriends,
  FaExchangeAlt,
  FaCalendarAlt,
  FaHeart,
  FaChild
} from 'react-icons/fa';

interface PackageItem {
  id: string;
  name: string;
  idealFor: string;
  welcomeDrinks: string[];
  welcomeDrinksLabel?: string;
  starters: string[];
  startersLabel?: string;
  mainCourse: Record<string, string[]>;
  saladsAndAccompaniments: string[];
  saladsLabel?: string;
  desserts: string[];
  dessertsLabel?: string;
}

const VEG_PACKAGES: PackageItem[] = [
  {
    id: 'veg-p1',
    name: 'Veg Delight',
    idealFor: 'Small gatherings, birthday parties, corporate lunches',
    welcomeDrinks: [],
    starters: ['Veg Manchuria', 'Crispy Baby Corn', 'Spring Rolls'],
    startersLabel: 'Vegetarian Starters (Any 1)',
    mainCourse: {
      'Indian Breads (Any 1)': ['Poori', 'Chappati', 'Tandoor Roti', 'Rumali Roti'],
      'Rice & Biryani (Any 1)': ['Jeera Rice', 'Fried Rice', 'Vegetable Biryani & Steam Rice'],
      'Signature Curries (Any 2)': ['Paneer Specialties', 'Veg Korma', 'Dum Aloo', 'Bagara Baingan', 'Alu Gobi Masala', 'Veg Kofta', 'Chole', 'Bhendi Fry'],
      'Dals & South Indian (Any 2)': ['Sambar', 'Dal Fry', 'Tomato Dal', 'Palak Dal', 'Dal Tadka', 'Rasam']
    },
    saladsAndAccompaniments: ['Green Salad', 'Papad / Fryums', 'Pickle / Chutney', 'Plain Curd', 'Raitha', 'Mineral Water'],
    desserts: ['Gulab Jamun', 'Kala Jamun', 'Double-ka-meetha', 'Kaddu-ka-kheer'],
    dessertsLabel: 'Dessert (Any 1)'
  },
  {
    id: 'veg-p2',
    name: 'Royal Vegetarian Feast',
    idealFor: 'Weddings, engagement functions, festive celebrations',
    welcomeDrinks: ['Watermelon Juice', 'Pineapple Juice', 'Fruit Punch', 'Badam Milk'],
    welcomeDrinksLabel: 'Welcome Drinks (Any 1)',
    starters: ['Veg Manchuria', 'Crispy Baby Corn', 'Spring Rolls', 'Aloo 65', 'Gobi Manchuria', 'Gobi 65', 'Mushroom Manchuria', 'Veg Bullets'],
    startersLabel: 'Vegetarian Starters (Any 2)',
    mainCourse: {
      'Indian Breads (Any 1)': ['Poori', 'Chappati', 'Tandoor Roti', 'Rumali Roti'],
      'Rice & Biryani (Any 2)': ['Jeera Rice', 'Fried Rice', 'Vegetable Biryani', 'Thai Biryani', 'Veg Pulav', 'Peas Pulav & Steam Rice'],
      'Signature Curries (Any 3)': ['Paneer Specialties', 'Veg Korma', 'Dum Aloo', 'Bagara Baingan', 'Alu Gobi Masala', 'Veg Kofta', 'Chole', 'Bhendi Fry', 'Malai Kofta', 'Stuffed Bhendi', 'Paneer Phool Makhani', 'Mushroom Curry', 'Jeera Aloo', 'Kadai Paneer', 'Cabbage Dry', 'French Beans Dry'],
      'Dals & South Indian (Any 2)': ['Sambar', 'Dal Fry', 'Tomato Dal', 'Palak Dal', 'Dal Tadka', 'Rasam']
    },
    saladsAndAccompaniments: ['Green Salad', 'Papad / Fryums', 'Pickle / Chutney', 'Plain Curd', 'Raitha', 'Mineral Water'],
    desserts: ['Gulab Jamun', 'Kala Jamun', 'Double-ka-meetha', 'Kaddu-ka-kheer', 'Ice Cream (Vanilla/Strawberry)', 'Rasmalai'],
    dessertsLabel: 'Dessert (Any 1)'
  }
];

const NON_VEG_PACKAGES: PackageItem[] = [
  {
    id: 'nonveg-p1',
    name: 'Non-Veg Delight',
    idealFor: 'Family functions, office parties, casual celebrations',
    welcomeDrinks: [],
    starters: ['Chicken 65', 'Chicken Manchuria', 'Chilly Chicken', 'Pepper Chicken', 'Chicken Majestic'],
    startersLabel: 'Non-Vegetarian Starters (Any 1)',
    mainCourse: {
      'Indian Breads (Any 1)': ['Poori', 'Chappati', 'Tandoor Roti', 'Rumali Roti'],
      'Rice & Biryani (Any 1)': ['Jeera Rice', 'Fried Rice', 'Veg Pulav', 'Veg Biryani & Steam Rice'],
      'Signature Curries (Combo: Veg 1 + Non-Veg 1)': ['Paneer Specialties', 'Veg Korma', 'Dum Aloo', 'Bagara Baingan', 'Alu Gobi Masala', 'Veg Kofta', 'Chole', 'Bhendi Fry', 'Chicken Afghani', 'Chicken Moghalai', 'Dum-ka-Chicken', 'Butter Chicken'],
      'Dals & South Indian (Any 1)': ['Sambar', 'Dal Fry', 'Tomato Dal', 'Palak Dal', 'Dal Tadka', 'Rasam']
    },
    saladsAndAccompaniments: ['Green Salad', 'Papad / Fryums', 'Pickle / Chutney', 'Plain Curd', 'Raitha', 'Mineral Water'],
    desserts: ['Gulab Jamun', 'Kala Jamun', 'Double-ka-meetha', 'Kaddu-ka-kheer'],
    dessertsLabel: 'Dessert (Any 1)'
  },
  {
    id: 'nonveg-p2',
    name: 'Royal Non-Vegetarian Feast',
    idealFor: 'Weddings, receptions, premium celebrations',
    welcomeDrinks: ['Watermelon Juice', 'Pineapple Juice', 'Fruit Punch', 'Badam Milk'],
    welcomeDrinksLabel: 'Welcome Drinks (Any 1)',
    starters: ['Chicken 65', 'Chicken Manchuria', 'Chilly Chicken', 'Pepper Chicken', 'Chicken Majestic', 'Fish Fry', 'Fish Fingers', 'Apollo Fish', 'Loose Prawns', 'Chilli Prawns', 'Prawn 65'],
    startersLabel: 'Non-Vegetarian Starters (Any 2)',
    mainCourse: {
      'Indian Breads (Any 1)': ['Poori', 'Chappati', 'Tandoor Roti', 'Rumali Roti'],
      'Rice & Biryani (Any 1) - (Chicken/Mutton/Fish/Prawn)': ['Jeera Rice', 'Fried Rice', 'Veg Pulav & Steam Rice'],
      'Signature Curries (Combo: Veg 1 + Non-Veg 2)': ['Paneer Specialties', 'Veg Korma', 'Dum Aloo', 'Bagara Baingan', 'Alu Gobi Masala', 'Veg Kofta', 'Chole', 'Bhendi Fry', 'Chicken Afghani', 'Chicken Moghalai', 'Dum-ka-Chicken', 'Butter Chicken', 'Kadai Chicken', 'Chicken Tikka Masala', 'Malai Chicken', 'Methi Chicken', 'Malabar Fish Curry (With Bone)'],
      'Dals & South Indian (Any 1)': ['Sambar', 'Dal Fry', 'Tomato Dal', 'Palak Dal', 'Dal Tadka', 'Rasam']
    },
    saladsAndAccompaniments: ['Green Salad', 'Papad / Fryums', 'Pickle / Chutney', 'Plain Curd', 'Raitha', 'Mineral Water'],
    desserts: ['Gulab Jamun', 'Kala Jamun', 'Double-ka-meetha', 'Kaddu-ka-kheer', 'Ice Cream (Vanilla/Strawberry)'],
    dessertsLabel: 'Dessert (Any 1)'
  }
];

const ADDONS = [
  {
    name: 'Live Chaat Counter',
    desc: 'Tangy, sweet, and spicy street-style chaats prepared live by our master chefs.',
    icon: 'chaat'
  },
  {
    name: 'Live Dosa Counter',
    desc: 'Crispy hot dosas served with fresh sambar and assortments of chutneys.',
    icon: 'dosa'
  },
  {
    name: 'Live BBQ / Grill Station',
    desc: 'Sizzling hot kebabs and grilled delicacies prepared fresh from the charcoal embers.',
    icon: 'grill'
  },
  {
    name: 'Mocktail Counter',
    desc: 'Refreshing, hand-crafted artisan mocktails customized for your guest preferences.',
    icon: 'mocktail'
  },
  {
    name: 'Ice Cream & Dessert Bar',
    desc: 'A grand sweet finish with premium ice cream scoops and dynamic toppings.',
    icon: 'dessert'
  },
  {
    name: 'Pan Counter',
    desc: 'Traditional banarasi and sweet pan options to wrap up the dining experience.',
    icon: 'pan'
  }
];

const NOTES = [
  {
    title: '100% Customizable',
    text: 'All packages can be customized based on guest preferences and dietary requirements.',
    icon: 'custom'
  },
  {
    title: 'Separate Kids\' Menu',
    text: 'A customized, kid-friendly menu with milder spices and fun treats can be arranged.',
    icon: 'kids'
  },
  {
    title: 'Seasonal Availability',
    text: 'Menu items may vary based on seasonal availability and event size to ensure maximum freshness.',
    icon: 'seasonal'
  }
];

interface PlansClientProps {
  initialLiveCounters?: Array<{ name: string; desc: string; icon: string }>;
}

export default function PlansClient({ initialLiveCounters }: PlansClientProps) {
  const [activeTab, setActiveTab] = useState<'veg' | 'nonveg'>('veg');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const addonsList = initialLiveCounters && initialLiveCounters.length > 0 ? initialLiveCounters : ADDONS;
  const packages = activeTab === 'veg' ? VEG_PACKAGES : NON_VEG_PACKAGES;

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getWhatsAppLink = (packageName: string) => {
    const text = encodeURIComponent(`Hi, I am interested in booking the "${packageName}" (${activeTab === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}) package for my event. Please share more details.`);
    return `https://wa.me/919246179757?text=${text}`;
  };

  const getDishType = (name: string, isVegPkg: boolean, courseType: 'drink' | 'starter' | 'main' | 'salad' | 'dessert'): 'veg' | 'nonveg' | 'drink' | 'dessert' | 'side' => {
    if (courseType === 'drink') return 'drink';
    if (courseType === 'dessert') return 'dessert';
    if (courseType === 'salad') return 'side';
    if (isVegPkg) return 'veg';
    
    const lower = name.toLowerCase();
    const nvKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'kebab', 'kabab', 'kora', 'curry', 'biryani', 'kodi', 'murgh', 'nihari', 'rezala', 'rogan josh', 'tikka', 'fry', '65', 'seekh', 'galouti', 'tangdi', 'musallam', 'combo', 'feast', 'experience', 'afghani', 'moghalai', 'dum-ka-chicken', 'butter chicken', 'kadai chicken', 'tikka masala', 'malai chicken', 'methi chicken', 'malabar fish'];
    const vegKeywords = ['dal', 'paneer', 'veg', 'pulao', 'bread', 'naan', 'roti', 'kulcha', 'rice', 'dosa', 'appam', 'stew', 'curry veg', 'salad', 'vada', 'chutney', 'sambar', 'kofta', 'corn', 'balls', 'mushroom', 'pongal', 'ghee', 'poori', 'chappati', 'tandoor roti', 'rumali roti', 'korma', 'aloo', 'baingan', 'gobi', 'bhendi', 'chole'];
    
    if (vegKeywords.some(kw => lower.includes(kw))) return 'veg';
    if (nvKeywords.some(kw => lower.includes(kw))) return 'nonveg';
    
    return 'veg'; // Default to veg for unspecified base items in non-veg packages (like breads)
  };

  const renderDishBadge = (name: string, isVegPkg: boolean, courseType: 'drink' | 'starter' | 'main' | 'salad' | 'dessert') => {
    const type = getDishType(name, isVegPkg, courseType);
    let badgeClass = styles.badgeVeg;
    if (type === 'nonveg') {
      badgeClass = styles.badgeNonVeg;
    }

    return (
      <span className={`${styles.dishBadge} ${badgeClass}`}>
        {name}
      </span>
    );
  };

  const renderAddonIcon = (iconName: string) => {
    switch (iconName) {
      case 'chaat': return <FaCookieBite className={styles.addonIcon} />;
      case 'dosa': return <FaUtensils className={styles.addonIcon} />;
      case 'grill': return <FaFire className={styles.addonIcon} />;
      case 'mocktail': return <FaCocktail className={styles.addonIcon} />;
      case 'dessert': return <FaCookie className={styles.addonIcon} />;
      case 'pan': return <FaLeaf className={styles.addonIcon} />;
      default: return <FaCheckCircle className={styles.addonIcon} />;
    }
  };

  const renderNoteIcon = (iconName: string) => {
    switch (iconName) {
      case 'custom': return <FaExchangeAlt className={styles.noteIcon} />;
      case 'jain': return <FaHeart className={styles.noteIcon} />;
      case 'kids': return <FaChild className={styles.noteIcon} />;
      case 'seasonal': return <FaCalendarAlt className={styles.noteIcon} />;
      default: return <FaInfoCircle className={styles.noteIcon} />;
    }
  };

  return (
    <div className={styles.plansClient}>
      {/* Category Tabs Switcher */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'veg' ? styles.tabBtnActiveVeg : ''}`}
          onClick={() => setActiveTab('veg')}
        >
          <FaLeaf style={{ marginRight: '8px' }} /> Vegetarian Packages
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'nonveg' ? styles.tabBtnActiveNonVeg : ''}`}
          onClick={() => setActiveTab('nonveg')}
        >
          <span className={styles.redDot} /> Non-Vegetarian Packages
        </button>
      </div>

      {/* Packages Grid */}
      <div className={styles.packagesGrid}>
        {packages.map((pkg, idx) => {
          const isExpanded = expandedCards[pkg.id] ?? false;
          const starsCount = idx + 3; // 3, 4, 5 star representations for classic, royal, grand
          const idealChips = pkg.idealFor.split(',').map(item => item.trim());

          return (
            <div 
              key={pkg.id} 
              className={`${styles.packageCard} ${activeTab === 'nonveg' ? styles.cardBorderNonVeg : styles.cardBorderVeg}`}
            >
              {/* Card Ribbon / Stars */}
              <div className={styles.cardRating}>
                {[...Array(starsCount)].map((_, i) => (
                  <FaStar key={i} className={styles.starIcon} />
                ))}
              </div>

              {/* Title & Description */}
              <h2 className={styles.packageName}>{pkg.name}</h2>
              
              <div className={styles.idealForContainer}>
                <div className={styles.idealForTitle}>
                  <FaUserFriends style={{ marginRight: '6px', color: 'var(--accent-gold)' }} />
                  <span>Ideal For:</span>
                </div>
                <div className={styles.idealChipsGrid}>
                  {idealChips.map((chip, cIdx) => (
                    <span key={cIdx} className={styles.idealChip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <hr className={styles.divider} />

              {/* Course Sections */}
              <div className={styles.menuOverview}>
                {/* Welcome Drinks */}
                {pkg.welcomeDrinks.length > 0 && (
                  <div className={styles.courseBlock}>
                    <h4 className={styles.courseHeader}>
                      <FaWineGlassAlt className={styles.courseIcon} /> {pkg.welcomeDrinksLabel || 'Welcome Drinks'}
                    </h4>
                    <div className={styles.badgesWrapper}>
                      {pkg.welcomeDrinks.map((item, i) => (
                        <React.Fragment key={i}>
                          {renderDishBadge(item, activeTab === 'veg', 'drink')}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {/* Starters */}
                <div className={styles.courseBlock}>
                  <h4 className={styles.courseHeader}>
                    <FaUtensils className={styles.courseIcon} /> {pkg.startersLabel || 'Starters'}
                  </h4>
                  <div className={styles.badgesWrapper}>
                    {pkg.starters.map((item, i) => (
                      <React.Fragment key={i}>
                        {renderDishBadge(item, activeTab === 'veg', 'starter')}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Collapsible Main Course & Desserts Area to keep cards clean */}
                <div className={`${styles.collapsibleArea} ${isExpanded ? styles.expanded : ''}`}>
                  {isExpanded && (
                    <>
                      {/* Main Course */}
                      <div className={styles.courseBlock}>
                        <h4 className={styles.courseHeader}>
                          <FaUtensils className={styles.courseIcon} /> Main Course
                        </h4>
                        <div className={styles.subCourseContainer}>
                          {Object.entries(pkg.mainCourse).map(([sectionTitle, items]) => (
                            <div key={sectionTitle} className={styles.subCourseSection}>
                              <h5>{sectionTitle}</h5>
                              <div className={styles.badgesWrapper}>
                                {items.map((item, i) => (
                                  <React.Fragment key={i}>
                                    {renderDishBadge(item, activeTab === 'veg', 'main')}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Salads & Accompaniments */}
                      <div className={styles.courseBlock}>
                        <h4 className={styles.courseHeader}>
                          <FaInfoCircle className={styles.courseIcon} /> {pkg.saladsLabel || 'Salads & Accompaniments'}
                        </h4>
                        <div className={styles.badgesWrapper}>
                          {pkg.saladsAndAccompaniments.map((item, i) => (
                            <React.Fragment key={i}>
                              {renderDishBadge(item, activeTab === 'veg', 'salad')}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Desserts */}
                      <div className={styles.courseBlock}>
                        <h4 className={styles.courseHeader}>
                          <FaCookie className={styles.courseIcon} /> {pkg.dessertsLabel || 'Desserts'}
                        </h4>
                        <div className={styles.badgesWrapper}>
                          {pkg.desserts.map((item, i) => (
                            <React.Fragment key={i}>
                              {renderDishBadge(item, activeTab === 'veg', 'dessert')}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {!isExpanded && (
                  <div className={styles.compactMainText}>
                    <strong>Includes:</strong> North Indian, South Indian & Mughlai main courses, accompaniments, and premium desserts.
                  </div>
                )}
              </div>

              {/* Expand Toggle */}
              <button 
                onClick={() => toggleCard(pkg.id)} 
                className={styles.expandBtn}
              >
                {isExpanded ? (
                  <>
                    Show Less Menu Details <FaChevronUp style={{ marginLeft: '6px' }} />
                  </>
                ) : (
                  <>
                    Show Complete Menu Details <FaChevronDown style={{ marginLeft: '6px' }} />
                  </>
                )}
              </button>

              {/* CTA Booking Link */}
              <a 
                href={getWhatsAppLink(pkg.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${styles.bookBtn} ${activeTab === 'veg' ? styles.bookBtnVeg : styles.bookBtnNonVeg}`}
              >
                Inquire For Package <FaArrowRight style={{ marginLeft: '8px' }} />
              </a>
            </div>
          );
        })}
      </div>

      {/* Add-ons & Counters Section */}
      <div className={styles.addonsSection}>
        <h3 className={styles.sectionTitle}>Optional Live Add-on Counters</h3>
        <p className={styles.sectionSubtitle}>Elevate your guest experience with live specialized counters managed by our expert chefs.</p>
        <div className={styles.addonsGrid}>
          {addonsList.map((addon, i) => (
            <div key={i} className={styles.addonCard}>
              <div className={styles.addonHeader}>
                {renderAddonIcon(addon.icon)}
                <span className={styles.addonName}>{addon.name}</span>
              </div>
              <p className={styles.addonDesc}>{addon.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes & Customizations Section */}
      <div className={styles.notesSection}>
        <div className={styles.notesHeader}>
          <FaInfoCircle size={22} color="var(--accent-gold)" />
          <h3>Important Notes & Customizations</h3>
        </div>
        <div className={styles.notesGrid}>
          {NOTES.map((note, i) => (
            <div key={i} className={styles.noteItem}>
              <div className={styles.noteTitleRow}>
                {renderNoteIcon(note.icon)}
                <h4>{note.title}</h4>
              </div>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
