export interface MenuItem {
  id: string;
  name: string;
  isVeg: boolean;
  course: 'welcome-drinks' | 'chat-items' | 'starters' | 'breads' | 'veg-main' | 'nonveg-main' | 'rice-biryani' | 'accompaniments' | 'desserts';
  subcategory: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // 1. WELCOME DRINKS
  { id: 'wd-1', name: 'Pineapple Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-2', name: 'Watermelon Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-3', name: 'Grape Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-4', name: 'Mixed Fruit Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-5', name: 'Musk Melon', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-6', name: 'Seasonal Fresh Fruit Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-7', name: 'Badam Milk (Hot/Cold)', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-8', name: 'Litchi', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-9', name: 'Kiwi', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-10', name: 'Seethofal Delight', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-11', name: 'Guava Juice', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },
  { id: 'wd-12', name: 'Fruit Punch', isVeg: true, course: 'welcome-drinks', subcategory: 'Welcome Drinks' },

  // 2. CHAT ITEMS
  { id: 'ch-1', name: 'Bhel Puri', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-2', name: 'Pani Puri', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-3', name: 'Dahi Puri', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-4', name: 'Ragda Cutlet', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-5', name: 'Samosa Cutlet', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-6', name: 'Dahi Vada', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-7', name: 'Dahi Papdi', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },
  { id: 'ch-8', name: 'Assorted Dosa', isVeg: true, course: 'chat-items', subcategory: 'Chat Items' },

  // 3. STARTERS (VEG & NON-VEG)
  { id: 'st-v-1', name: 'Veg Cutlet', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-2', name: 'Paneer Lollipop', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-3', name: 'Veg Finger', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-4', name: 'Veg Stick', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-5', name: 'Harabara Kebab', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-6', name: 'Bread Cheese Roll', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-7', name: 'Veg Spring Roll', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-8', name: 'Cheese Balls', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-9', name: 'Paneer Majestic', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-10', name: 'Crispy Babycorn', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  { id: 'st-v-11', name: 'Paneer Tikka', isVeg: true, course: 'starters', subcategory: 'Vegetarian Starters' },
  // Non-Veg Starters
  { id: 'st-nv-1', name: 'Chicken 65', isVeg: false, course: 'starters', subcategory: 'Non-Vegetarian Starters' },
  { id: 'st-nv-2', name: 'Tandoori Chicken', isVeg: false, course: 'starters', subcategory: 'Non-Vegetarian Starters' },
  { id: 'st-nv-3', name: 'Chicken Malai Tikka', isVeg: false, course: 'starters', subcategory: 'Non-Vegetarian Starters' },
  { id: 'st-nv-4', name: 'Mutton Seekh Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Vegetarian Starters' },
  { id: 'st-nv-5', name: 'Apollo Fish', isVeg: false, course: 'starters', subcategory: 'Non-Vegetarian Starters' },

  // 4. INDIAN BREADS (ROTIS)
  { id: 'br-1', name: 'Butter Naan', isVeg: true, course: 'breads', subcategory: 'Tandoori Rotis & Naans' },
  { id: 'br-2', name: 'Garlic Naan', isVeg: true, course: 'breads', subcategory: 'Tandoori Rotis & Naans' },
  { id: 'br-3', name: 'Tandoori Roti', isVeg: true, course: 'breads', subcategory: 'Tandoori Rotis & Naans' },
  { id: 'br-4', name: 'Rumali Roti', isVeg: true, course: 'breads', subcategory: 'Rumali Rotis' },
  { id: 'br-5', name: 'Aloo Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha & Paratha Varieties' },

  // 5. VEGETARIAN MAIN COURSE
  { id: 'vm-1', name: 'Paneer Butter Masala', isVeg: true, course: 'veg-main', subcategory: 'Paneer Curries' },
  { id: 'vm-2', name: 'Kadai Paneer', isVeg: true, course: 'veg-main', subcategory: 'Paneer Curries' },
  { id: 'vm-3', name: 'Veg Diwani Handi', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-4', name: 'Dum Aloo Kashmiri', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-5', name: 'Bagara Baingan', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-6', name: 'Malai Kofta', isVeg: true, course: 'veg-main', subcategory: 'Stuffed Specials' },
  { id: 'vm-7', name: 'Dal Makhani', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-8', name: 'Dal Tadka', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },

  // 6. NON-VEGETARIAN MAIN COURSE
  { id: 'nvm-1', name: 'Butter Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-2', name: 'Chicken Tikka Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-3', name: 'Mutton Rogan Josh', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-4', name: 'Nellore Mutton Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-5', name: 'Goan Fish Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Fish & Seafood Curries' },

  // 7. RICE & BIRYANI
  { id: 'rb-1', name: 'Hyderabadi Veg Dum Biryani', isVeg: true, course: 'rice-biryani', subcategory: 'Veg Biryani' },
  { id: 'rb-2', name: 'Paneer Tikka Biryani', isVeg: true, course: 'rice-biryani', subcategory: 'Veg Biryani' },
  { id: 'rb-3', name: 'Hyderabadi Chicken Dum Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Non-Veg Biryani' },
  { id: 'rb-4', name: 'Zafrani Mutton Dum Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Non-Veg Biryani' },
  { id: 'rb-5', name: 'Jeera Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Veg Rice' },
  { id: 'rb-6', name: 'Veg Fried Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Veg Rice' },

  // 8. ACCOMPANIMENTS (Salads, Raitas, etc.)
  { id: 'ac-1', name: 'Mixed Veg Raita', isVeg: true, course: 'accompaniments', subcategory: 'Raitas' },
  { id: 'ac-2', name: 'Boondi Raita', isVeg: true, course: 'accompaniments', subcategory: 'Raitas' },
  { id: 'ac-3', name: 'Green Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salad Counter' },
  { id: 'ac-4', name: 'Kachumber Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salad Counter' },
  { id: 'ac-5', name: 'Assorted Pickles & Papad', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },

  // 9. DESSERTS & SWEETS
  { id: 'de-1', name: 'Shahi Qubani ka Meetha', isVeg: true, course: 'desserts', subcategory: 'Traditional Sweets' },
  { id: 'de-2', name: 'Double ka Meetha', isVeg: true, course: 'desserts', subcategory: 'Traditional Sweets' },
  { id: 'de-3', name: 'Moong Dal Halwa', isVeg: true, course: 'desserts', subcategory: 'Halwas' },
  { id: 'de-4', name: 'Elaneer Payasam', isVeg: true, course: 'desserts', subcategory: 'Kheer & Payasam' },
  { id: 'de-5', name: 'Gulab Jamun with Ice Cream', isVeg: true, course: 'desserts', subcategory: 'Cold Desserts' }
];
