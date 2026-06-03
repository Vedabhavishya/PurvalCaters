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
  starters: string[];
  mainCourse: {
    northIndian: string[];
    southIndian: string[];
    mughlaiSpecial: string[];
  };
  saladsAndAccompaniments: string[];
  desserts: string[];
}

const VEG_PACKAGES: PackageItem[] = [
  {
    id: 'veg-p1',
    name: 'Classic Veg Delight',
    idealFor: 'Small gatherings, birthday parties, corporate lunches',
    welcomeDrinks: ['Fresh Lime Soda', 'Buttermilk / Masala Chaas'],
    starters: ['Veg Manchurian', 'Paneer Tikka', 'Mini Veg Cutlets'],
    mainCourse: {
      northIndian: ['Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Butter Naan / Roti'],
      southIndian: ['Vegetable Kurma', 'Lemon Rice', 'Medu Vada with Coconut Chutney'],
      mughlaiSpecial: ['Veg Mughlai Kofta']
    },
    saladsAndAccompaniments: ['Green Salad', 'Pickle & Papad', 'Raita'],
    desserts: ['Gulab Jamun', 'Fruit Custard']
  },
  {
    id: 'veg-p2',
    name: 'Royal Vegetarian Feast',
    idealFor: 'Weddings, engagement functions, festive celebrations',
    welcomeDrinks: ['Mango Mocktail', 'Sweet Lassi'],
    starters: ['Hara Bhara Kabab', 'Paneer Malai Tikka', 'Crispy Corn', 'Veg Spring Rolls'],
    mainCourse: {
      northIndian: ['Shahi Paneer', 'Dum Aloo Kashmiri', 'Dal Makhani', 'Veg Pulao', 'Butter Naan / Kulcha'],
      southIndian: ['Vegetable Biryani', 'Avial', 'Mini Masala Dosa Live Counter', 'Sambar & Chutneys'],
      mughlaiSpecial: ['Veg Nawabi Korma']
    },
    saladsAndAccompaniments: ['Russian Salad', 'Boondi Raita', 'Papad & Pickles'],
    desserts: ['Rasmalai', 'Double Ka Meetha', 'Ice Cream']
  },
  {
    id: 'veg-p3',
    name: 'Grand Maharaja Veg Experience',
    idealFor: 'Luxury events, premium weddings, VIP functions',
    welcomeDrinks: ['Jaljeera', 'Fresh Fruit Punch', 'Badam Milk'],
    starters: ['Paneer Achari Tikka', 'Veg Seekh Kabab', 'Cheese Balls', 'Baby Corn Pepper Fry', 'Tandoori Mushroom'],
    mainCourse: {
      northIndian: ['Paneer Lababdar', 'Kadai Vegetables', 'Dal Bukhara', 'Kashmiri Pulao', 'Assorted Indian Breads'],
      southIndian: ['Hyderabadi Veg Dum Biryani', 'Malabar Vegetable Curry', 'Appam with Stew', 'Ghee Pongal'],
      mughlaiSpecial: ['Subz Badami Korma', 'Veg Haleem']
    },
    saladsAndAccompaniments: ['Exotic Salad Bar', 'Mint Raita', 'Pickles, Papad & Chutneys'],
    desserts: ['Gajar Ka Halwa', 'Angoori Rasmalai', 'Apricot Delight', 'Live Jalebi Counter']
  }
];

const NON_VEG_PACKAGES: PackageItem[] = [
  {
    id: 'nonveg-p1',
    name: 'Signature Non-Veg Combo',
    idealFor: 'Family functions, office parties, casual celebrations',
    welcomeDrinks: ['Mint Cooler', 'Sweet Lassi'],
    starters: ['Chicken Tikka', 'Fish Fry', 'Chicken 65'],
    mainCourse: {
      northIndian: ['Butter Chicken', 'Mutton Rogan Josh', 'Dal Fry', 'Jeera Rice', 'Butter Naan'],
      southIndian: ['Andhra Chicken Curry', 'Chicken Biryani', 'Medu Vada with Chutney'],
      mughlaiSpecial: ['Chicken Korma']
    },
    saladsAndAccompaniments: ['Onion Salad', 'Raita', 'Pickle & Papad'],
    desserts: ['Gulab Jamun', 'Kheer']
  },
  {
    id: 'nonveg-p2',
    name: 'Royal Mughlai Non-Veg Feast',
    idealFor: 'Weddings, receptions, premium celebrations',
    welcomeDrinks: ['Fresh Lime Mint', 'Rose Milk'],
    starters: ['Chicken Malai Kebab', 'Mutton Seekh Kebab', 'Fish Tikka', 'Dragon Chicken'],
    mainCourse: {
      northIndian: ['Murgh Musallam', 'Mutton Curry', 'Dal Makhani', 'Veg Pulao', 'Garlic Naan'],
      southIndian: ['Hyderabadi Chicken Dum Biryani', 'Chettinad Chicken Curry', 'Appam with Chicken Stew'],
      mughlaiSpecial: ['Mutton Korma', 'Chicken Rezala']
    },
    saladsAndAccompaniments: ['Fresh Garden Salad', 'Boondi Raita', 'Pickles & Papad'],
    desserts: ['Rasmalai', 'Double Ka Meetha', 'Ice Cream']
  },
  {
    id: 'nonveg-p3',
    name: 'Premium Nawabi Non-Veg Experience',
    idealFor: 'Luxury weddings, VIP events, grand celebrations',
    welcomeDrinks: ['Mocktail Bar', 'Badam Milk', 'Fresh Fruit Juices'],
    starters: ['Tangdi Kebab', 'Prawns Pepper Fry', 'Tandoori Fish', 'Mutton Galouti Kebab', 'Chicken Afghani'],
    mainCourse: {
      northIndian: ['Butter Chicken Deluxe', 'Mutton Rogan Josh', 'Dal Bukhara', 'Kashmiri Pulao', 'Assorted Indian Breads'],
      southIndian: ['Ambur Mutton Biryani', 'Andhra Kodi Kura', 'Malabar Fish Curry', 'Neer Dosa'],
      mughlaiSpecial: ['Nihari', 'Chicken Mughlai']
    },
    saladsAndAccompaniments: ['Premium Salad Bar', 'Mint Raita', 'Papad, Pickles & Chutneys'],
    desserts: ['Shahi Tukda', 'Apricot Delight', 'Rabri Jalebi', 'Kulfi Counter']
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
    title: 'Jain Options Available',
    text: 'Special Jain food options (without onion, garlic, or root vegetables) available on request.',
    icon: 'jain'
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

export default function PlansClient() {
  const [activeTab, setActiveTab] = useState<'veg' | 'nonveg'>('veg');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

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
    const nvKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'kebab', 'kabab', 'kora', 'curry', 'biryani', 'kodi', 'murgh', 'nihari', 'rezala', 'rogan josh', 'tikka', 'fry', '65', 'seekh', 'galouti', 'tangdi', 'musallam', 'combo', 'feast', 'experience'];
    const vegKeywords = ['dal', 'paneer', 'veg', 'pulao', 'bread', 'naan', 'roti', 'kulcha', 'rice', 'dosa', 'appam', 'stew', 'curry veg', 'salad', 'vada', 'chutney', 'sambar', 'kofta', 'corn', 'balls', 'mushroom', 'pongal', 'ghee'];
    
    if (vegKeywords.some(kw => lower.includes(kw))) return 'veg';
    if (nvKeywords.some(kw => lower.includes(kw))) return 'nonveg';
    
    return 'nonveg';
  };

  const renderDishBadge = (name: string, isVegPkg: boolean, courseType: 'drink' | 'starter' | 'main' | 'salad' | 'dessert') => {
    const type = getDishType(name, isVegPkg, courseType);
    let badgeClass = styles.badgeVeg;
    if (type === 'nonveg') badgeClass = styles.badgeNonVeg;
    else if (type === 'drink') badgeClass = styles.badgeDrink;
    else if (type === 'dessert') badgeClass = styles.badgeDessert;
    else if (type === 'side') badgeClass = styles.badgeSide;

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
                <div className={styles.courseBlock}>
                  <h4 className={styles.courseHeader}>
                    <FaWineGlassAlt className={styles.courseIcon} /> Welcome Drinks
                  </h4>
                  <div className={styles.badgesWrapper}>
                    {pkg.welcomeDrinks.map((item, i) => (
                      <React.Fragment key={i}>
                        {renderDishBadge(item, activeTab === 'veg', 'drink')}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Starters */}
                <div className={styles.courseBlock}>
                  <h4 className={styles.courseHeader}>
                    <FaUtensils className={styles.courseIcon} /> Starters
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
                          <div className={styles.subCourseSection}>
                            <h5>North Indian</h5>
                            <div className={styles.badgesWrapper}>
                              {pkg.mainCourse.northIndian.map((item, i) => (
                                <React.Fragment key={i}>
                                  {renderDishBadge(item, activeTab === 'veg', 'main')}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                          <div className={styles.subCourseSection}>
                            <h5>South Indian</h5>
                            <div className={styles.badgesWrapper}>
                              {pkg.mainCourse.southIndian.map((item, i) => (
                                <React.Fragment key={i}>
                                  {renderDishBadge(item, activeTab === 'veg', 'main')}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                          <div className={styles.subCourseSection}>
                            <h5>Mughlai Special</h5>
                            <div className={styles.badgesWrapper}>
                              {pkg.mainCourse.mughlaiSpecial.map((item, i) => (
                                <React.Fragment key={i}>
                                  {renderDishBadge(item, activeTab === 'veg', 'main')}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Salads & Accompaniments */}
                      <div className={styles.courseBlock}>
                        <h4 className={styles.courseHeader}>
                          <FaInfoCircle className={styles.courseIcon} /> Salads & Accompaniments
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
                          <FaCookie className={styles.courseIcon} /> Desserts
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
          {ADDONS.map((addon, i) => (
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
