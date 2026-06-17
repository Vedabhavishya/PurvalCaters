"use client";

import { useState, useMemo, useEffect } from 'react';
import styles from './page.module.css';
import { MENU_ITEMS, MenuItem as LocalMenuItem } from '@/data/menuData';
import { 
  FaSearch, 
  FaLeaf, 
  FaCoffee, 
  FaPepperHot, 
  FaBreadSlice, 
  FaUtensils, 
  FaLemon, 
  FaIceCream, 
  FaChevronDown, 
  FaChevronUp, 
  FaPlus, 
  FaCheck, 
  FaTrashAlt, 
  FaFilePdf, 
  FaCheckCircle,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';

type DBCategory = { id: string; name: string; slug: string };
type DBMenuItem = { 
  id: string; 
  name: string; 
  description: string | null; 
  price: number | null; 
  imageUrl: string | null; 
  isVeg: boolean;
  subcategory: string | null;
  course: string | null;
  categoryId: string;
};

interface MenuClientProps {
  categories: DBCategory[];
  items: DBMenuItem[];
}

// Course details including titles, icons, and menuType
const COURSE_DETAILS = {
  // Main Menu
  'starters': { title: 'Starters & Appetizers', icon: FaPepperHot, menuType: 'main' as const },
  'breads': { title: "Roti's", icon: FaBreadSlice, menuType: 'main' as const },
  'veg-main': { title: 'Vegetarian Main Course', icon: FaLeaf, menuType: 'main' as const },
  'nonveg-main': { title: 'Non-Vegetarian Main Course', icon: FaUtensils, menuType: 'main' as const },
  'rice-biryani': { title: 'Rice & Biryani', icon: FaUtensils, menuType: 'main' as const },
  'accompaniments': { title: 'Accompaniments', icon: FaLemon, menuType: 'main' as const },

  // Breakfast Menu
  'south-indian-breakfast': { title: 'South Indian Breakfast', icon: FaCoffee, menuType: 'breakfast' as const },
  'north-indian-breakfast': { title: 'North Indian Breakfast', icon: FaCoffee, menuType: 'breakfast' as const },
  'special-breakfast': { title: 'Special Breakfast', icon: FaUtensils, menuType: 'breakfast' as const },
  'breakfast-rice': { title: 'Breakfast Rice Items', icon: FaUtensils, menuType: 'breakfast' as const },

  // Desserts Menu
  'hot-sweets': { title: 'Hot Indian Sweets (Jamun Specials)', icon: FaIceCream, menuType: 'desserts' as const },
  'halwas': { title: 'Halwas', icon: FaIceCream, menuType: 'desserts' as const },
  'kheer-payasam': { title: 'Kheer & Payasam', icon: FaIceCream, menuType: 'desserts' as const },
  'traditional-sweets': { title: 'Traditional Indian Sweets', icon: FaIceCream, menuType: 'desserts' as const },
  'fruit-desserts': { title: 'Fruit-Based Desserts', icon: FaIceCream, menuType: 'desserts' as const },
  'custards-puddings': { title: 'Custards & Puddings', icon: FaIceCream, menuType: 'desserts' as const },
  'cold-desserts': { title: 'Cold Desserts', icon: FaIceCream, menuType: 'desserts' as const },
  'bengali-sweets': { title: 'Bengali Sweets', icon: FaIceCream, menuType: 'desserts' as const },
  'milk-cream-desserts': { title: 'Milk & Cream Desserts', icon: FaIceCream, menuType: 'desserts' as const },
  'traditional-snacks': { title: 'Traditional Snacks / Sweet Items', icon: FaIceCream, menuType: 'desserts' as const },
  'live-counters': { title: 'Live Counter Station', icon: FaUtensils, menuType: 'live-counters' as const },
  'Welcome Drinks': { title: 'Welcome Drinks', icon: FaCoffee, menuType: 'drinks-snacks' as const },
  'Chat': { title: 'Chat', icon: FaUtensils, menuType: 'drinks-snacks' as const },
  'Chinese Soup': { title: 'Chinese Soup', icon: FaUtensils, menuType: 'drinks-snacks' as const },
  'Chinese Noodles': { title: 'Chinese Noodles', icon: FaUtensils, menuType: 'main' as const }
};

type CourseType = keyof typeof COURSE_DETAILS;

export default function MenuClient({ categories, items }: MenuClientProps) {
  // State
  const [menuType, setMenuType] = useState<'all' | 'main' | 'breakfast' | 'desserts' | 'live-counters' | 'drinks-snacks'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({
    'starters': true,
    'breads': true,
    'veg-main': true,
    'nonveg-main': true,
    'rice-biryani': true,
    'accompaniments': true,
    'south-indian-breakfast': true,
    'north-indian-breakfast': true,
    'special-breakfast': true,
    'breakfast-rice': true,
    'hot-sweets': true,
    'halwas': true,
    'kheer-payasam': true,
    'traditional-sweets': true,
    'fruit-desserts': true,
    'custards-puddings': true,
    'cold-desserts': true,
    'bengali-sweets': true,
    'milk-cream-desserts': true,
    'traditional-snacks': true,
    'live-counters': true,
    'Welcome Drinks': true,
    'Chat': true,
    'Chinese Soup': true,
    'Chinese Noodles': true
  });

  const [sidebarExpanded, setSidebarExpanded] = useState<Record<string, boolean>>({
    'starters': true,
    'breads': true,
    'veg-main': true,
    'nonveg-main': true,
    'rice-biryani': true,
    'accompaniments': true,
    'south-indian-breakfast': true,
    'north-indian-breakfast': true,
    'special-breakfast': true,
    'breakfast-rice': true,
    'hot-sweets': true,
    'halwas': true,
    'kheer-payasam': true,
    'traditional-sweets': true,
    'fruit-desserts': true,
    'custards-puddings': true,
    'cold-desserts': true,
    'bengali-sweets': true,
    'milk-cream-desserts': true,
    'traditional-snacks': true,
    'live-counters': true,
    'Welcome Drinks': true,
    'Chat': true,
    'Chinese Soup': true,
    'Chinese Noodles': true
  });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    eventDate: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  // Load selection from localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('purval_custom_menu_v2');
    if (saved) {
      try {
        setSelectedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const updateSelectedItems = (ids: string[]) => {
    setSelectedIds(ids);
    localStorage.setItem('purval_custom_menu_v2', JSON.stringify(ids));
  };

  // Merge items from database if any are not in local data
  const allMenuItems = useMemo(() => {
    if (items.length === 0) {
      return MENU_ITEMS;
    }

    return items.map((dbItem): LocalMenuItem => {
      const category = categories.find(c => c.id === dbItem.categoryId);
      const catName = category?.name || 'Starters';

      const course = (dbItem.course || 'veg-main') as CourseType;
      const subcat = dbItem.subcategory || catName;

      return {
        id: dbItem.id,
        name: dbItem.name,
        isVeg: dbItem.isVeg,
        course,
        subcategory: subcat
      };
    });
  }, [categories, items]);

  // Handle selection toggling
  const toggleItem = (itemId: string) => {
    if (selectedIds.includes(itemId)) {
      updateSelectedItems(selectedIds.filter(id => id !== itemId));
    } else {
      updateSelectedItems([...selectedIds, itemId]);
    }
  };

  const removeItem = (itemId: string) => {
    updateSelectedItems(selectedIds.filter(id => id !== itemId));
  };

  // Filter items based on Search Query and Dietary Tab (All, Veg, Non-Veg)
  const filteredItems = useMemo(() => {
    return allMenuItems.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDiet = dietFilter === 'all' || 
        (dietFilter === 'veg' && item.isVeg) || 
        (dietFilter === 'nonveg' && (!item.isVeg || item.course === 'accompaniments'));

      return matchesSearch && matchesDiet;
    });
  }, [allMenuItems, searchQuery, dietFilter]);
  
  // Filter items based on active tab (menuType), diet filter, and search query
  const visibleItems = useMemo(() => {
    return filteredItems.filter(item => {
      const details = COURSE_DETAILS[item.course as CourseType];
      if (!details) return false;
      if (searchQuery !== '') return true;
      if (dietFilter !== 'all' && details.menuType !== 'main') return false;
      return menuType === 'all' || details.menuType === menuType;
    });
  }, [filteredItems, menuType, dietFilter, searchQuery]);

  // Group items by course, then by subcategory
  const groupedMenu = useMemo(() => {
    const groups: Record<CourseType, Record<string, LocalMenuItem[]>> = {
      'starters': {},
      'breads': {},
      'veg-main': {},
      'nonveg-main': {},
      'rice-biryani': {},
      'accompaniments': {},
      'south-indian-breakfast': {},
      'north-indian-breakfast': {},
      'special-breakfast': {},
      'breakfast-rice': {},
      'hot-sweets': {},
      'halwas': {},
      'kheer-payasam': {},
      'traditional-sweets': {},
      'fruit-desserts': {},
      'custards-puddings': {},
      'cold-desserts': {},
      'bengali-sweets': {},
      'milk-cream-desserts': {},
      'traditional-snacks': {},
      'live-counters': {},
      'Welcome Drinks': {},
      'Chat': {},
      'Chinese Soup': {},
      'Chinese Noodles': {}
    };

    visibleItems.forEach(item => {
      if (groups[item.course]) {
        if (!groups[item.course][item.subcategory]) {
          groups[item.course][item.subcategory] = [];
        }
        groups[item.course][item.subcategory].push(item);
      }
    });

    // Sort items so that Veg (isVeg === true) comes first
    Object.keys(groups).forEach(courseKey => {
      const course = courseKey as CourseType;
      Object.keys(groups[course]).forEach(subcat => {
        groups[course][subcat].sort((a, b) => {
          if (a.isVeg === b.isVeg) return 0;
          return a.isVeg ? -1 : 1;
        });
      });
    });

    return groups;
  }, [filteredItems]);

  // Selected items detail list
  const selectedItemsDetails = useMemo(() => {
    return allMenuItems.filter(item => selectedIds.includes(item.id));
  }, [allMenuItems, selectedIds]);

  // Group selected items by course for checklist counts
  const selectedItemsByCourse = useMemo(() => {
    const groups: Record<CourseType, LocalMenuItem[]> = {
      'starters': [],
      'breads': [],
      'veg-main': [],
      'nonveg-main': [],
      'rice-biryani': [],
      'accompaniments': [],
      'south-indian-breakfast': [],
      'north-indian-breakfast': [],
      'special-breakfast': [],
      'breakfast-rice': [],
      'hot-sweets': [],
      'halwas': [],
      'kheer-payasam': [],
      'traditional-sweets': [],
      'fruit-desserts': [],
      'custards-puddings': [],
      'cold-desserts': [],
      'bengali-sweets': [],
      'milk-cream-desserts': [],
      'traditional-snacks': [],
      'live-counters': [],
      'Welcome Drinks': [],
      'Chat': [],
      'Chinese Soup': [],
      'Chinese Noodles': []
    };

    selectedItemsDetails.forEach(item => {
      if (groups[item.course]) {
        groups[item.course].push(item);
      }
    });

    return groups;
  }, [selectedItemsDetails]);

  // Stats calculation
  const stats = useMemo(() => {
    const total = selectedItemsDetails.length;
    const veg = selectedItemsDetails.filter(i => i.isVeg).length;
    const nonveg = total - veg;
    return { total, veg, nonveg };
  }, [selectedItemsDetails]);

  // Expand / collapse accordions
  const toggleCourseAccordion = (course: string) => {
    setExpandedCourses(prev => ({ ...prev, [course]: !prev[course] }));
  };

  const toggleSidebarAccordion = (course: string) => {
    setSidebarExpanded(prev => ({ ...prev, [course]: !prev[course] }));
  };

  // Inquiry form submit handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    let menuDetails = `CUSTOM CATERING PACKAGE REQUEST\n\n`;
    menuDetails += `Total Selected Items: ${stats.total}\n`;
    menuDetails += `Vegetarian: ${stats.veg} | Non-Vegetarian: ${stats.nonveg}\n\n`;

    Object.entries(selectedItemsByCourse).forEach(([course, items]) => {
      if (items.length > 0) {
        const title = COURSE_DETAILS[course as CourseType]?.title || course;
        menuDetails += `=== ${title} (${items.length}) ===\n`;
        items.forEach((item, index) => {
          menuDetails += `${index + 1}. ${item.name} (${item.isVeg ? 'Veg' : 'Non-Veg'})\n`;
        });
        menuDetails += `\n`;
      }
    });

    // Construct WhatsApp message
    const whatsAppMessage = `Hi Supper Club, I want to request a custom catering package quote. Here are my details:

• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Event Type: ${formData.eventType}
• Estimated Guests: ${formData.guests || 'N/A'}
• Event Date: ${formData.eventDate || 'N/A'}

=== SELECTED MENU ITEMS ===
Total Selected: ${stats.total} Dishes (Veg: ${stats.veg} | Non-Veg: ${stats.nonveg})

${Object.entries(selectedItemsByCourse)
  .filter(([_, items]) => items.length > 0)
  .map(([course, items]) => {
    const title = COURSE_DETAILS[course as CourseType]?.title || course;
    // Sort items alphabetically by name
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    const itemsList = sortedItems.map((item, idx) => `  ${idx + 1}. ${item.name} (${item.isVeg ? 'Veg' : 'Non-Veg'})`).join('\n');
    return `[${title} (${items.length})]\n${itemsList}`;
  })
  .join('\n\n')}`;

    const encodedMessage = encodeURIComponent(whatsAppMessage);
    const whatsAppUrl = `https://wa.me/919246179757?text=${encodedMessage}`;

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.eventDate || null,
          guests: formData.guests ? parseInt(formData.guests) : null,
          message: menuDetails
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        const opened = window.open(whatsAppUrl, '_blank');
        if (!opened) {
          window.location.href = whatsAppUrl;
        }
        updateSelectedItems([]);
        setFormData({ name: '', email: '', phone: '', eventType: '', guests: '', eventDate: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (e) {
      console.error('Error submitting inquiry:', e);
      setSubmitStatus('error');
    }
  };

  // Handle PDF/Print download
  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Handle WhatsApp Redirection with pretyped custom package details
  const handleWhatsAppRedirect = () => {
    if (selectedItemsDetails.length === 0) return;

    let message = `Hi Purval's Caterers, I would like to get a quote/cost estimate for my custom catering package.\n\n`;
    message += `Here are the selected items:\n`;
    selectedItemsDetails.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.isVeg ? 'Veg' : 'Non-Veg'})\n`;
    });
    message += `\nTotal Items: ${stats.total} (Veg: ${stats.veg}, Non-Veg: ${stats.nonveg})\n\n`;
    message += `Could you please let me know the cost and options for this selection? Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsAppUrl = `https://wa.me/919246179757?text=${encodedMessage}`;

    if (typeof window !== 'undefined') {
      window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Count items inside a course
  const courseCount = (course: CourseType) => {
    const courseGroup = groupedMenu[course];
    if (!courseGroup) return 0;
    let count = 0;
    Object.values(courseGroup).forEach(items => {
      count += items.length;
    });
    return count;
  };

  return (
    <div className={styles.menuPageContainer}>
      {/* Hidden print page block */}
      <div className={styles.printContainer}>
        <div className={styles.printHeader}>
          <h1>Purval’s Caterers</h1>
          <p className={styles.printTagline}>Curated Authentic Indian Feast | Premium Catering Proposal</p>
          <p className={styles.printMeta}>Generated Proposal Date: {isMounted ? new Date().toLocaleDateString() : ''}</p>
        </div>

        <div className={styles.printSummaryBlock}>
          <h3>Catering Menu Summary</h3>
          <p><strong>Total Dishes Selected:</strong> {stats.total} Items</p>
          <p><strong>Dietary Breakdown:</strong> {stats.veg} Vegetarian Dishes, {stats.nonveg} Non-Vegetarian Dishes</p>
        </div>

        <div className={styles.printList}>
          {Object.entries(selectedItemsByCourse).map(([course, courseItems]) => {
            if (courseItems.length === 0) return null;
            const details = COURSE_DETAILS[course as CourseType];
            return (
              <div key={course} className={styles.printSection}>
                <h3>{details?.title} ({courseItems.length} Selected)</h3>
                <ul>
                  {courseItems.map((item, idx) => (
                    <li key={item.id}>
                      <strong>{item.name}</strong> - <span>{item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className={styles.printFooter}>
          <p>Thank you for choosing Purval’s Caterers. For custom packages and consultations, reach out to us at supperclub60@gmail.com or +91 92461 79757</p>
        </div>
      </div>

      <div className={`container ${styles.menuLayout}`}>
        {/* Left Column Selection Area */}
        <div className={styles.menuLeft}>
          <div className={styles.header}>
            <h1 className={styles.title}>Catering Menu Builder</h1>
            <p className={styles.subtitle}>
              Design your custom feast. Select from our heritage culinary categories to customize your ideal catering package.
            </p>
          </div>


          {/* Top Dietary Tabs Filters */}
          <div className={styles.dietaryTabs}>
            <button 
              onClick={() => { setMenuType('all'); setDietFilter('all'); }} 
              className={`${styles.dietTab} ${menuType === 'all' && dietFilter === 'all' ? styles.dietTabActive : ''}`}
            >
              All Menu
            </button>
            <button 
              onClick={() => { setMenuType('breakfast'); setDietFilter('all'); }} 
              className={`${styles.dietTab} ${menuType === 'breakfast' && dietFilter === 'all' ? styles.dietTabActive : ''}`}
            >
              Breakfast
            </button>
            <button 
              onClick={() => { setMenuType('all'); setDietFilter('veg'); }} 
              className={`${styles.dietTab} ${menuType === 'all' && dietFilter === 'veg' ? styles.dietTabVegActive : ''}`}
            >
              Vegetarian
            </button>
            <button 
              onClick={() => { setMenuType('all'); setDietFilter('nonveg'); }} 
              className={`${styles.dietTab} ${menuType === 'all' && dietFilter === 'nonveg' ? styles.dietTabNonVegActive : ''}`}
            >
              Non-Vegetarian
            </button>
            <button 
              onClick={() => { setMenuType('desserts'); setDietFilter('all'); }} 
              className={`${styles.dietTab} ${menuType === 'desserts' && dietFilter === 'all' ? styles.dietTabActive : ''}`}
            >
              Desserts & Sweets
            </button>
            <button 
              onClick={() => { setMenuType('live-counters'); setDietFilter('all'); }} 
              className={`${styles.dietTab} ${menuType === 'live-counters' && dietFilter === 'all' ? styles.dietTabActive : ''}`}
            >
              Live Counter
            </button>
            <button 
              onClick={() => { setMenuType('drinks-snacks'); setDietFilter('all'); }} 
              className={`${styles.dietTab} ${menuType === 'drinks-snacks' && dietFilter === 'all' ? styles.dietTabActive : ''}`}
            >
              Drinks & Snacks
            </button>
          </div>

          {/* Search Input Box */}
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search for any dish (e.g. Dosa, Gulab Jamun, Tikka)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Accordion Menu Sections */}
          <div className={styles.accordionContainer}>
            {Object.entries(COURSE_DETAILS)
              .filter(([_, details]) => {
                if (searchQuery !== '') return true;
                if (dietFilter !== 'all' && details.menuType !== 'main') return false;
                return menuType === 'all' || details.menuType === menuType;
              })
              .sort(([keyA, detailsA], [keyB, detailsB]) => {
                const getSortWeight = (key: string, details: any) => {
                  if (details.menuType === 'breakfast') return 10;
                  if (details.menuType === 'main') {
                    if (key === 'accompaniments') return 45;
                    const group = groupedMenu[key as CourseType];
                    const hasVeg = Object.values(group || {}).some(items => items.some(item => item.isVeg));
                    const hasNonVeg = Object.values(group || {}).some(items => items.some(item => !item.isVeg));
                    if (hasVeg && !hasNonVeg) return 20;
                    if (!hasVeg && hasNonVeg) return 30;
                    return 40;
                  }
                  if (details.menuType === 'desserts') return 50;
                  if (details.menuType === 'drinks-snacks') return 60;
                  if (details.menuType === 'live-counters') return 70;
                  return 100;
                };
                return getSortWeight(keyA, detailsA) - getSortWeight(keyB, detailsB);
              })
              .map(([courseKey, details]) => {
                const count = courseCount(courseKey as CourseType);
                if (count === 0) return null; // Hide categories that contain 0 matching items

                const isExpanded = expandedCourses[courseKey];
                const Icon = details.icon;
                const courseGroup = groupedMenu[courseKey as CourseType];

                // Determine classification for color-coding (veg, non-veg, combined, sweets)
                const hasVeg = Object.values(courseGroup || {}).some(subcatItems =>
                  subcatItems.some(item => item.isVeg)
                );
                const hasNonVeg = Object.values(courseGroup || {}).some(subcatItems =>
                  subcatItems.some(item => !item.isVeg)
                );

                let categoryStyleType: 'veg' | 'nonveg' | 'combined' | 'sweets' | 'live' | 'drinks' = 'combined';
                if (details.menuType === 'desserts') {
                  categoryStyleType = 'sweets';
                } else if (details.menuType === 'drinks-snacks') {
                  categoryStyleType = 'drinks';
                } else if (details.menuType === 'live-counters') {
                  categoryStyleType = 'live';
                } else if (hasVeg && !hasNonVeg) {
                  categoryStyleType = 'veg';
                } else if (!hasVeg && hasNonVeg) {
                  categoryStyleType = 'nonveg';
                } else {
                  categoryStyleType = 'combined';
                }

                // Map classification to CSS classes
                const cardStyleClass = 
                  categoryStyleType === 'sweets' ? styles.accordionCardSweets :
                  categoryStyleType === 'drinks' ? styles.accordionCardDrinks :
                  categoryStyleType === 'live' ? styles.accordionCardLive :
                  categoryStyleType === 'veg' ? styles.accordionCardVeg :
                  categoryStyleType === 'nonveg' ? styles.accordionCardNonVeg :
                  styles.accordionCardCombined;

                const circleStyleClass = 
                  categoryStyleType === 'sweets' ? styles.categoryIconCircleSweets :
                  categoryStyleType === 'drinks' ? styles.categoryIconCircleDrinks :
                  categoryStyleType === 'live' ? styles.categoryIconCircleLive :
                  categoryStyleType === 'veg' ? styles.categoryIconCircleVeg :
                  categoryStyleType === 'nonveg' ? styles.categoryIconCircleNonVeg :
                  styles.categoryIconCircleCombined;

                return (
                  <div key={courseKey} className={`${styles.accordionCard} ${cardStyleClass} ${isExpanded ? styles.expanded : ''}`}>
                    <button 
                      onClick={() => toggleCourseAccordion(courseKey)} 
                      className={styles.accordionHeader}
                    >
                      <div className={styles.accordionHeaderLeft}>
                        <span className={`${styles.categoryIconCircle} ${circleStyleClass}`}>
                          <Icon className={styles.courseIcon} />
                        </span>
                        <div>
                          <h3>{details.title}</h3>
                          <span className={styles.itemCountText}>{count} items</span>
                        </div>
                      </div>
                      <span className={styles.accordionToggleIcon}>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>

                    {isExpanded && courseGroup && (
                      <div className={styles.accordionBody}>
                        {Object.entries(courseGroup)
                          .sort(([subcatA, itemsA], [subcatB, itemsB]) => {
                            if (courseKey === 'rice-biryani') {
                              const getPriority = (subcat: string) => {
                                const s = subcat.toLowerCase();
                                if (s === 'rice') return 1;
                                if (s.includes('fried') || s.includes('chinese')) return 2;
                                if (s.includes('biryani')) return 3;
                                return 4;
                              };
                              const pA = getPriority(subcatA);
                              const pB = getPriority(subcatB);
                              if (pA !== pB) return pA - pB;
                            }
                            const hasNonVegA = itemsA.some(item => !item.isVeg);
                            const hasNonVegB = itemsB.some(item => !item.isVeg);
                            if (hasNonVegA && !hasNonVegB) return 1;
                            if (!hasNonVegA && hasNonVegB) return -1;
                            return 0;
                          })
                          .map(([subcat, subcatItems]) => (
                          <div key={subcat} className={styles.subCategoryBlock}>
                            {subcat !== details.title && (
                              <h4 className={styles.subCategoryTitle}>{subcat}</h4>
                            )}
                            
                            <div className={styles.itemGrid}>
                              {subcatItems.map((item) => {
                                const isSelected = selectedIds.includes(item.id);
                                return (
                                  <div 
                                    key={item.id} 
                                    onClick={() => toggleItem(item.id)}
                                    className={`${styles.dishCard} ${isSelected ? styles.dishCardSelected : ''}`}
                                  >
                                    <div className={styles.dishCardLeft}>
                                      <span className={`${styles.checkbox} ${isSelected ? styles.checkboxSelected : ''}`}>
                                        {isSelected && <FaCheck className={styles.checkIcon} />}
                                      </span>
                                      <span className={styles.dishName}>{item.name}</span>
                                    </div>
                                    <span className={`${styles.addSign} ${isSelected ? styles.addSignSelected : ''}`}>
                                      {isSelected ? <FaCheck /> : <FaPlus />}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            {visibleItems.length === 0 && (
              <div className={styles.emptyResults}>
                <FaUtensils className={styles.emptyIcon} />
                <h3>No dishes match your search</h3>
                <p>Try checking a different keywords or resetting filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setDietFilter('all'); }}
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Catering Package Panel */}
        <div className={styles.menuRight}>
          <div className={styles.stickyPanel}>
            <div className={styles.panelHeader}>
              <h2>My Selection</h2>
              <p>{selectedIds.length > 0 ? `${stats.total} Items Added` : 'No items selected'}</p>
            </div>

            <div className={styles.panelContent}>
              {selectedIds.length > 0 ? (
                <div className={styles.sidebarChecklistScroll}>
                  <div className={styles.sidebarChecklist}>
                    {Object.entries(selectedItemsByCourse).map(([course, items]) => {
                      if (items.length === 0) return null;
                      const isExpanded = sidebarExpanded[course] ?? true;
                      const title = COURSE_DETAILS[course as CourseType]?.title || course;

                      return (
                        <div key={course} className={styles.checklistRow}>
                          <button 
                            onClick={() => toggleSidebarAccordion(course)}
                            className={styles.sidebarGroupHeader}
                          >
                            <div className={styles.sidebarGroupHeaderLeft}>
                              <span className={`${styles.checklistBullet} ${styles.checklistBulletActive}`}>
                                <FaCheck size={7} />
                              </span>
                              <span className={styles.sidebarGroupName}>{title}</span>
                            </div>
                            <span className={styles.sidebarSelectedCount}>
                              {items.length} {items.length === 1 ? 'item' : 'items'}
                            </span>
                          </button>

                          <div className={`${styles.sidebarGroupList} ${isExpanded ? '' : styles.collapsed}`}>
                            {items.map(item => (
                              <div key={item.id} className={styles.sidebarItem}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                                  <span className={item.isVeg ? styles.dotVeg : styles.dotNonVeg} />
                                  <span className={styles.sidebarItemName}>{item.name}</span>
                                </div>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className={styles.sidebarRemoveBtn}
                                  title="Remove item"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className={styles.sidebarEmptyMessage}>
                  <p>Choose items from the categories on the left to build your custom package proposal.</p>
                </div>
              )}
            </div>

            <div className={styles.panelFooter}>
              {selectedIds.length > 0 && (
                <div className={styles.statsSummary}>
                  <div className={styles.statsRow}>
                    <span>Total Selected:</span>
                    <div className={styles.statsSubRows} style={{ alignItems: 'center', gap: '0.45rem' }}>
                      <div className={styles.statsSubRow}>
                        <span className={styles.vegText}><FaLeaf size={10} style={{ marginRight: '3px' }} /> Veg:</span>
                        <strong>{stats.veg}</strong>
                      </div>
                      <span style={{ color: '#d1d5db' }}>•</span>
                      <div className={styles.statsSubRow}>
                        <span className={styles.nonVegText}><span className={styles.smallRedDot} style={{ marginRight: '3px' }} /> Non-Veg:</span>
                        <strong>{stats.nonveg}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Proceed CTA */}
              <button 
                onClick={() => setModalOpen(true)} 
                className={`btn ${styles.proceedBtn}`}
                disabled={selectedIds.length === 0}
                style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}
              >
                Proceed with My Custom Package <FaArrowRight style={{ fontSize: '0.85em' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => { setModalOpen(false); setSubmitStatus('idle'); }} 
              className={styles.closeModalBtn}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            {submitStatus === 'success' ? (
              <div className={styles.modalSuccessState}>
                <FaCheckCircle className={styles.successCheckIcon} />
                <h2>Menu Submitted Successfully!</h2>
                <p>Thank you for compiling your custom menu. Our catering experts are reviewing your selections and will prepare a tailored proposal for you shortly.</p>
                <button 
                  onClick={() => { setModalOpen(false); setSubmitStatus('idle'); }}
                  className="btn btn-primary"
                  style={{ marginTop: '1.5rem' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <h2>Complete Your Catering Package</h2>
                  <p>Submit your custom menu choice of <strong>{stats.total} items</strong> to request a specialized quote.</p>
                </div>

                <form onSubmit={handleSubmitInquiry} className={styles.modalForm}>
                  <div className={styles.modalFormGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleFormChange}
                      placeholder="Enter your name" 
                    />
                  </div>

                  <div className={styles.modalFormRow}>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleFormChange}
                        placeholder="yourname@email.com" 
                      />
                    </div>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleFormChange}
                        placeholder="10-digit mobile number" 
                      />
                    </div>
                  </div>

                  <div className={styles.modalFormRow}>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="eventType">Event Type *</label>
                      <select 
                        id="eventType" 
                        name="eventType" 
                        required
                        value={formData.eventType} 
                        onChange={handleFormChange}
                      >
                        <option value="">Select Event Type</option>
                        <option value="Wedding">Wedding Ceremony</option>
                        <option value="Corporate">Corporate Cafeteria / Event</option>
                        <option value="Birthday">Birthday Celebration</option>
                        <option value="Housewarming">Housewarming Ceremony</option>
                        <option value="PrivateParty">Private Banquet / Party</option>
                        <option value="Other">Other Occasions</option>
                      </select>
                    </div>

                    <div className={styles.modalFormGroup}>
                      <label htmlFor="guests">Estimated Guest Count *</label>
                      <input 
                        type="number" 
                        id="guests" 
                        name="guests" 
                        required 
                        min="35"
                        value={formData.guests} 
                        onChange={handleFormChange}
                        placeholder="Min 35 guests" 
                      />
                    </div>
                  </div>

                  <div className={styles.modalFormGroup}>
                    <label htmlFor="eventDate">Expected Event Date</label>
                    <input 
                      type="date" 
                      id="eventDate" 
                      name="eventDate"
                      value={formData.eventDate} 
                      onChange={handleFormChange}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className={styles.formErrorMessage}>
                      An error occurred while sending your request. Please check your network and try again.
                    </div>
                  )}

                  <div className={styles.modalFooterActions}>
                    <button 
                      type="button" 
                      onClick={() => setModalOpen(false)} 
                      className="btn btn-outline"
                    >
                      Back to Menu
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' ? 'Submitting...' : 'Request Custom Quote'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
