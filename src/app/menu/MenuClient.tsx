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
  FaCalculator,
  FaCheckCircle,
  FaTimes,
  FaArrowRight
} from 'react-icons/fa';

type DBCategory = { id: string; name: string; slug: string };
type DBMenuItem = { id: string; name: string; description: string | null; price: number | null; imageUrl: string | null; categoryId: string };

interface MenuClientProps {
  categories: DBCategory[];
  items: DBMenuItem[];
}

// Course mapping helper for human readable titles and icons
const COURSE_DETAILS = {
  'breakfast': { title: 'Breakfast Specials', icon: FaCoffee },
  'starters': { title: 'Starters & Appetizers', icon: FaPepperHot },
  'breads': { title: 'Indian Breads', icon: FaBreadSlice },
  'veg-main': { title: 'Vegetarian Main Course', icon: FaLeaf },
  'nonveg-main': { title: 'Non-Vegetarian Main Course', icon: FaUtensils },
  'rice-biryani': { title: 'Rice & Biryani', icon: FaUtensils },
  'accompaniments': { title: 'Accompaniments', icon: FaLemon },
  'desserts': { title: 'Desserts & Sweets', icon: FaIceCream }
};

type CourseType = keyof typeof COURSE_DETAILS;

export default function MenuClient({ categories, items }: MenuClientProps) {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({
    'breakfast': true,
    'starters': true,
    'breads': true,
    'veg-main': true,
    'nonveg-main': true,
    'rice-biryani': true,
    'accompaniments': true,
    'desserts': true
  });
  
  // Sticky sidebar groups expanded/collapsed
  const [sidebarExpanded, setSidebarExpanded] = useState<Record<string, boolean>>({
    'breakfast': true,
    'starters': true,
    'breads': true,
    'veg-main': true,
    'nonveg-main': true,
    'rice-biryani': true,
    'accompaniments': true,
    'desserts': true
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

  // Load selected items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('purval_custom_menu');
    if (saved) {
      try {
        setSelectedIds(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save selected items to localStorage
  const updateSelectedItems = (ids: string[]) => {
    setSelectedIds(ids);
    localStorage.setItem('purval_custom_menu', JSON.stringify(ids));
  };

  // Merge database items into local mock items to ensure consistency
  const allMenuItems = useMemo(() => {
    const dbMappedItems: LocalMenuItem[] = items.map(dbItem => {
      // Check if it already exists in the static list by name
      const exists = MENU_ITEMS.some(item => item.name.toLowerCase() === dbItem.name.toLowerCase());
      if (exists) return null; // Filter out duplicates
      
      const catName = categories.find(c => c.id === dbItem.categoryId)?.name || '';
      let course: CourseType = 'veg-main';
      let isVeg = true;
      
      const lowerCat = catName.toLowerCase();
      const lowerName = dbItem.name.toLowerCase();
      
      if (lowerCat.includes('starter')) course = 'starters';
      else if (lowerCat.includes('dessert') || lowerCat.includes('sweet')) course = 'desserts';
      else if (lowerCat.includes('south') || lowerCat.includes('breakfast')) course = 'breakfast';
      else if (lowerCat.includes('bread') || lowerCat.includes('roti') || lowerCat.includes('naan')) course = 'breads';
      else if (lowerCat.includes('rice') || lowerCat.includes('biryani')) course = 'rice-biryani';
      else if (lowerCat.includes('accompaniment') || lowerCat.includes('raita')) course = 'accompaniments';
      
      // Simple check for veg vs non-veg based on ingredients name
      if (lowerName.includes('chicken') || lowerName.includes('mutton') || lowerName.includes('fish') || lowerName.includes('lamb') || lowerName.includes('crab') || lowerName.includes('prawn') || lowerName.includes('meat') || lowerName.includes('egg')) {
        isVeg = false;
        if (course === 'veg-main') course = 'nonveg-main';
      }
      
      return {
        id: dbItem.id,
        name: dbItem.name,
        description: dbItem.description || 'Premium culinary selection prepared with traditional Indian recipes.',
        isVeg,
        course,
        subcategory: catName || 'Chef Specials',
        price: dbItem.price || undefined
      };
    }).filter((item): item is LocalMenuItem => item !== null);

    return [...MENU_ITEMS, ...dbMappedItems];
  }, [categories, items]);

  // Handle toggling menu item selection
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

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return allMenuItems.filter(item => {
      // Search text match
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Dietary filter match
      const matchesDiet = dietFilter === 'all' || 
        (dietFilter === 'veg' && item.isVeg) || 
        (dietFilter === 'nonveg' && !item.isVeg);

      // Course filter chip match
      const matchesCourse = selectedCourseFilter === 'all' || 
        (selectedCourseFilter === 'breakfast' && item.course === 'breakfast') ||
        (selectedCourseFilter === 'starters' && item.course === 'starters') ||
        (selectedCourseFilter === 'breads' && item.course === 'breads') ||
        (selectedCourseFilter === 'main-course' && (item.course === 'veg-main' || item.course === 'nonveg-main')) ||
        (selectedCourseFilter === 'rice-biryani' && item.course === 'rice-biryani') ||
        (selectedCourseFilter === 'desserts' && item.course === 'desserts') ||
        (selectedCourseFilter === 'accompaniments' && item.course === 'accompaniments');

      return matchesSearch && matchesDiet && matchesCourse;
    });
  }, [allMenuItems, searchQuery, dietFilter, selectedCourseFilter]);

  // Group items by course, then by subcategory
  const groupedMenu = useMemo(() => {
    const groups: Record<CourseType, Record<string, LocalMenuItem[]>> = {
      'breakfast': {},
      'starters': {},
      'breads': {},
      'veg-main': {},
      'nonveg-main': {},
      'rice-biryani': {},
      'accompaniments': {},
      'desserts': {}
    };

    filteredItems.forEach(item => {
      if (!groups[item.course][item.subcategory]) {
        groups[item.course][item.subcategory] = [];
      }
      groups[item.course][item.subcategory].push(item);
    });

    return groups;
  }, [filteredItems]);

  // List of selected items complete details
  const selectedItemsDetails = useMemo(() => {
    return allMenuItems.filter(item => selectedIds.includes(item.id));
  }, [allMenuItems, selectedIds]);

  // Group selected items by course for the sidebar
  const selectedItemsByCourse = useMemo(() => {
    const groups: Record<CourseType, LocalMenuItem[]> = {
      'breakfast': [],
      'starters': [],
      'breads': [],
      'veg-main': [],
      'nonveg-main': [],
      'rice-biryani': [],
      'accompaniments': [],
      'desserts': []
    };

    selectedItemsDetails.forEach(item => {
      groups[item.course].push(item);
    });

    return groups;
  }, [selectedItemsDetails]);

  // Calculate statistics for selection
  const stats = useMemo(() => {
    const total = selectedItemsDetails.length;
    const veg = selectedItemsDetails.filter(i => i.isVeg).length;
    const nonveg = total - veg;
    
    const breakfast = selectedItemsDetails.filter(i => i.course === 'breakfast').length;
    const desserts = selectedItemsDetails.filter(i => i.course === 'desserts').length;
    const lunchDinner = total - breakfast - desserts;

    return { total, veg, nonveg, breakfast, desserts, lunchDinner };
  }, [selectedItemsDetails]);

  // Toggle course accordion
  const toggleCourseAccordion = (course: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [course]: !prev[course]
    }));
  };

  // Toggle sidebar course accordion
  const toggleSidebarAccordion = (course: string) => {
    setSidebarExpanded(prev => ({
      ...prev,
      [course]: !prev[course]
    }));
  };

  // Handle Form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle inquiry submission
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    // Create formatted menu checklist message
    let menuDetails = `CATERING MENU REQUEST\n\n`;
    menuDetails += `Total Selected Items: ${stats.total}\n`;
    menuDetails += `Veg Items: ${stats.veg} | Non-Veg Items: ${stats.nonveg}\n\n`;

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

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          guests: formData.guests ? parseInt(formData.guests) : null,
          message: menuDetails
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Clear selections
        updateSelectedItems([]);
        setFormData({ name: '', email: '', phone: '', eventType: '', guests: '', eventDate: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (e) {
      setSubmitStatus('error');
    }
  };

  // Handle custom PDF menu proposal download (print preview layout trigger)
  const handleDownloadPDF = () => {
    window.print();
  };

  // Active courses count inside search results
  const courseCount = (course: CourseType) => {
    const courseGroup = groupedMenu[course];
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
          <h1>Supper Club of India</h1>
          <p className={styles.printTagline}>Curated Authentic Indian Feast | Premium Catering Proposal</p>
          <p className={styles.printMeta}>Generated Proposal Date: {new Date().toLocaleDateString()}</p>
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
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className={styles.printFooter}>
          <p>Thank you for choosing Supper Club. For custom packages and consultations, reach out to us at bookings@supperclub.com</p>
        </div>
      </div>

      <div className={`container ${styles.menuLayout}`}>
        {/* Main Selection Area */}
        <div className={styles.menuLeft}>
          <div className={styles.header}>
            <h1 className={styles.title}>Catering Menu Builder</h1>
            <p className={styles.subtitle}>
              Design your custom feast. Select from our heritage culinary categories to customize your ideal catering package.
            </p>
          </div>

          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search for any dish (e.g., Paneer, Chicken, Biryani, Dosa...)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Filters Area */}
          <div className={styles.filtersWrapper}>
            {/* Dietary Tabs */}
            <div className={styles.dietaryTabs}>
              <button 
                onClick={() => setDietFilter('all')} 
                className={`${styles.dietTab} ${dietFilter === 'all' ? styles.dietTabActive : ''}`}
              >
                All Menu
              </button>
              <button 
                onClick={() => setDietFilter('veg')} 
                className={`${styles.dietTab} ${dietFilter === 'veg' ? styles.dietTabVegActive : ''}`}
              >
                <FaLeaf style={{ marginRight: '6px', fontSize: '0.85em' }} /> Vegetarian
              </button>
              <button 
                onClick={() => setDietFilter('nonveg')} 
                className={`${styles.dietTab} ${dietFilter === 'nonveg' ? styles.dietTabNonVegActive : ''}`}
              >
                <span className={styles.redDot} /> Non-Vegetarian
              </button>
            </div>

            {/* Course Filter Chips */}
            <div className={styles.courseFilterScroll}>
              <div className={styles.courseChips}>
                {[
                  { id: 'all', label: 'All Courses' },
                  { id: 'breakfast', label: 'Breakfast' },
                  { id: 'starters', label: 'Starters' },
                  { id: 'breads', label: 'Breads' },
                  { id: 'main-course', label: 'Main Course' },
                  { id: 'rice-biryani', label: 'Rice & Biryani' },
                  { id: 'accompaniments', label: 'Accompaniments' },
                  { id: 'desserts', label: 'Desserts' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedCourseFilter(chip.id)}
                    className={`${styles.chipBtn} ${selectedCourseFilter === chip.id ? styles.chipBtnActive : ''}`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accordion Menu Sections */}
          <div className={styles.accordionContainer}>
            {Object.entries(COURSE_DETAILS).map(([courseKey, details]) => {
              const count = courseCount(courseKey as CourseType);
              // Hide accordion if course tab filter is active and doesn't match
              if (selectedCourseFilter !== 'all' && 
                  selectedCourseFilter !== courseKey && 
                  !(selectedCourseFilter === 'main-course' && (courseKey === 'veg-main' || courseKey === 'nonveg-main'))) {
                return null;
              }
              if (count === 0) return null; // Hide course sections with no matching items

              const isExpanded = expandedCourses[courseKey];
              const Icon = details.icon;
              const courseGroup = groupedMenu[courseKey as CourseType];

              return (
                <div key={courseKey} className={`${styles.accordionCard} ${isExpanded ? styles.expanded : ''}`}>
                  <button 
                    onClick={() => toggleCourseAccordion(courseKey)} 
                    className={styles.accordionHeader}
                  >
                    <div className={styles.accordionHeaderLeft}>
                      <span className={styles.categoryIconCircle}>
                        <Icon className={styles.courseIcon} />
                      </span>
                      <div>
                        <h3>{details.title}</h3>
                        <span className={styles.itemCountText}>{count} Dishes Available</span>
                      </div>
                    </div>
                    <span className={styles.accordionToggleIcon}>
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className={styles.accordionBody}>
                      {Object.entries(courseGroup).map(([subcat, subcatItems]) => (
                        <div key={subcat} className={styles.subCategoryBlock}>
                          <h4 className={styles.subCategoryTitle}>{subcat}</h4>
                          
                          <div className={styles.itemGrid}>
                            {subcatItems.map((item) => {
                              const isSelected = selectedIds.includes(item.id);
                              return (
                                <div 
                                  key={item.id} 
                                  onClick={() => toggleItem(item.id)}
                                  className={`${styles.dishCard} ${isSelected ? styles.dishCardSelected : ''}`}
                                >
                                  {/* Veg / Non-Veg Indicator Badge */}
                                  <div className={styles.dishHeader}>
                                    <div className={`${styles.foodIndicator} ${item.isVeg ? styles.vegBorder : styles.nonVegBorder}`}>
                                      <div className={item.isVeg ? styles.vegDotInner : styles.nonVegTriangleInner} />
                                    </div>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleItem(item.id);
                                      }}
                                      className={`${styles.addButton} ${isSelected ? styles.addButtonSelected : ''}`}
                                      aria-label={isSelected ? `Remove ${item.name}` : `Add ${item.name}`}
                                    >
                                      {isSelected ? (
                                        <>
                                          <FaCheck style={{ fontSize: '0.8em' }} />
                                          <span>Selected</span>
                                        </>
                                      ) : (
                                        <>
                                          <FaPlus style={{ fontSize: '0.8em' }} />
                                          <span>Add</span>
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  <div className={styles.dishInfo}>
                                    <h5 className={styles.dishName}>{item.name}</h5>
                                    <p className={styles.dishDesc}>{item.description}</p>
                                    {item.price && (
                                      <span className={styles.dishPrice}>Est. ₹{item.price} <span className={styles.paxLabel}>/ plate</span></span>
                                    )}
                                  </div>
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

            {filteredItems.length === 0 && (
              <div className={styles.emptyResults}>
                <FaUtensils className={styles.emptyIcon} />
                <h3>No dishes match your filters</h3>
                <p>Try adjusting your search keywords or checking a different dietary filter.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setDietFilter('all'); setSelectedCourseFilter('all'); }}
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Custom Package Panel */}
        <div className={styles.menuRight}>
          <div className={styles.stickyPanel}>
            <div className={styles.panelHeader}>
              <h2>Your Custom Catering Menu</h2>
              <p>Selected Items Checklist</p>
            </div>

            <div className={styles.panelContent}>
              {selectedIds.length === 0 ? (
                <div className={styles.sidebarEmptyState}>
                  <FaUtensils className={styles.sidebarEmptyIcon} />
                  <h4>Your menu is empty</h4>
                  <p>Browse the options on the left and select dishes to build your custom catering package.</p>
                </div>
              ) : (
                <div className={styles.sidebarGroups}>
                  {Object.entries(selectedItemsByCourse).map(([courseKey, courseItems]) => {
                    if (courseItems.length === 0) return null;
                    const details = COURSE_DETAILS[courseKey as CourseType];
                    const isExpanded = sidebarExpanded[courseKey];

                    return (
                      <div key={courseKey} className={styles.sidebarGroup}>
                        <button 
                          onClick={() => toggleSidebarAccordion(courseKey)}
                          className={styles.sidebarGroupHeader}
                        >
                          <span>{details?.title} ({courseItems.length})</span>
                          <span>{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
                        </button>

                        {isExpanded && (
                          <div className={styles.sidebarGroupList}>
                            {courseItems.map(item => (
                              <div key={item.id} className={styles.sidebarItem}>
                                <div className={styles.sidebarItemLeft}>
                                  <div className={`${styles.smallIndicator} ${item.isVeg ? styles.vegBg : styles.nonVegBg}`} />
                                  <span className={styles.sidebarItemName}>{item.name}</span>
                                </div>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className={styles.removeItemBtn}
                                  title="Remove item"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedIds.length > 0 && (
              <div className={styles.panelFooter}>
                {/* Stats Breakdown */}
                <div className={styles.statsSummary}>
                  <div className={styles.statsRow}>
                    <span>Total Selection:</span>
                    <strong>{stats.total} Items</strong>
                  </div>
                  <div className={styles.statsSubRows}>
                    <div className={styles.statsSubRow}>
                      <span className={styles.vegText}><FaLeaf size={10} style={{ marginRight: '3px' }} /> Veg:</span>
                      <strong>{stats.veg}</strong>
                    </div>
                    <div className={styles.statsSubRow}>
                      <span className={styles.nonVegText}><span className={styles.smallRedDot} /> Non-Veg:</span>
                      <strong>{stats.nonveg}</strong>
                    </div>
                  </div>
                  <div className={styles.mealBreakdown}>
                    <span>Breakfast: <strong>{stats.breakfast}</strong></span>
                    <span>Mains/Sides: <strong>{stats.lunchDinner}</strong></span>
                    <span>Desserts: <strong>{stats.desserts}</strong></span>
                  </div>
                </div>

                {/* CTAs */}
                <button 
                  onClick={() => setModalOpen(true)} 
                  className={`btn btn-primary ${styles.ctaPrimary}`}
                >
                  Proceed with My Custom Package <FaArrowRight style={{ marginLeft: '8px', fontSize: '0.85em' }} />
                </button>

                <div className={styles.secondaryActions}>
                  <button 
                    onClick={handleDownloadPDF} 
                    className={`btn btn-outline ${styles.ctaSecondary}`}
                  >
                    <FaFilePdf style={{ marginRight: '6px' }} /> PDF Menu
                  </button>
                  <button 
                    onClick={() => setModalOpen(true)} 
                    className={`btn btn-outline ${styles.ctaSecondary}`}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            )}
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
