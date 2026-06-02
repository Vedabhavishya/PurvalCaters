export interface MenuItem {
  id: string;
  name: string;
  description: string;
  isVeg: boolean;
  course: 'breakfast' | 'starters' | 'breads' | 'veg-main' | 'nonveg-main' | 'rice-biryani' | 'accompaniments' | 'desserts';
  subcategory: string;
  price?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // 1. BREAKFAST SPECIALS - South Indian Breakfast
  {
    id: 'b-si-1',
    name: 'Idli with Sambar & Chutney',
    description: 'Steamed rice cakes served with hot lentil soup and fresh coconut chutney.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'South Indian Breakfast',
    price: 90
  },
  {
    id: 'b-si-2',
    name: 'Medu Vada',
    description: 'Crispy fried lentil donuts seasoned with pepper, curry leaves, and ginger.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'South Indian Breakfast',
    price: 100
  },
  {
    id: 'b-si-3',
    name: 'Mysore Masala Dosa',
    description: 'Thin rice crepe lined with spicy garlic chutney, filled with potato mash.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'South Indian Breakfast',
    price: 150
  },
  {
    id: 'b-si-4',
    name: 'Ghee Pongal',
    description: 'Traditional rice and lentil dish tempered with ghee, pepper, and cashews.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'South Indian Breakfast',
    price: 120
  },

  // 1. BREAKFAST SPECIALS - North Indian Breakfast
  {
    id: 'b-ni-1',
    name: 'Aloo Paratha',
    description: 'Whole wheat flatbread stuffed with spiced mashed potatoes, served with butter.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'North Indian Breakfast',
    price: 130
  },
  {
    id: 'b-ni-2',
    name: 'Chole Bhature',
    description: 'Spiced chickpea curry paired with deep-fried fluffy leavened bread.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'North Indian Breakfast',
    price: 180
  },
  {
    id: 'b-ni-3',
    name: 'Poori Bhaji',
    description: 'Puffed whole wheat pooris served with a mildly spiced potato curry.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'North Indian Breakfast',
    price: 120
  },

  // 1. BREAKFAST SPECIALS - Breakfast Rice
  {
    id: 'b-r-1',
    name: 'Lemon Rice',
    description: 'Basmati rice flavored with lemon juice, mustard seeds, peanuts, and curry leaves.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'Breakfast Rice',
    price: 110
  },
  {
    id: 'b-r-2',
    name: 'Tamarind Rice (Pulihora)',
    description: 'Tangy and spiced rice cooked in a rich tamarind pulp base.',
    isVeg: true,
    course: 'breakfast',
    subcategory: 'Breakfast Rice',
    price: 110
  },

  // 2. STARTERS - Vegetarian Indo-Chinese
  {
    id: 's-v-ic-1',
    name: 'Veg Manchurian',
    description: 'Deep-fried mixed vegetable balls tossed in a tangy and spicy soy-chili sauce.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Indo-Chinese (Veg)',
    price: 220
  },
  {
    id: 's-v-ic-2',
    name: 'Chili Paneer',
    description: 'Paneer cubes stir-fried with onions, bell peppers, and chili sauce.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Indo-Chinese (Veg)',
    price: 240
  },

  // 2. STARTERS - Vegetarian Crispy Items & Spring Rolls
  {
    id: 's-v-cr-1',
    name: 'Crispy Babycorn',
    description: 'Batter-fried tender babycorn tossed with peppers and sweet chili glaze.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Crispy Items & Spring Rolls (Veg)',
    price: 210
  },
  {
    id: 's-v-cr-2',
    name: 'Spring Rolls',
    description: 'Crispy wrappers filled with stir-fried julienned vegetables and glass noodles.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Crispy Items & Spring Rolls (Veg)',
    price: 180
  },

  // 2. STARTERS - Vegetarian Tandoori Starters
  {
    id: 's-v-tan-1',
    name: 'Paneer Tikka',
    description: 'Cottage cheese cubes marinated in spiced yogurt and grilled in a clay oven.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Tandoori Starters (Veg)',
    price: 260
  },
  {
    id: 's-v-tan-2',
    name: 'Tandoori Soya Chaap',
    description: 'Soybean chops marinated in rich tandoori spices and charred to perfection.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Tandoori Starters (Veg)',
    price: 220
  },
  {
    id: 's-v-tan-3',
    name: 'Hara Bhara Kabab',
    description: 'Pan-fried patties made of spinach, green peas, potatoes, and mild spices.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Tandoori Starters (Veg)',
    price: 200
  },

  // 2. STARTERS - Vegetarian Traditional Snacks
  {
    id: 's-v-tr-1',
    name: 'Samosa Chat',
    description: 'Crushed samosas topped with spicy chickpeas, yogurt, chutneys, and sev.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Traditional Snacks & Bites (Veg)',
    price: 120
  },
  {
    id: 's-v-tr-2',
    name: 'Assorted Veg Pakoras',
    description: 'Crispy gram-flour fritters made with onions, potatoes, and spinach.',
    isVeg: true,
    course: 'starters',
    subcategory: 'Traditional Snacks & Bites (Veg)',
    price: 150
  },

  // 2. STARTERS - Non-Vegetarian Chicken Starters
  {
    id: 's-nv-c-1',
    name: 'Chicken 65',
    description: 'Spicy, deep-fried chicken cubes tempered with curry leaves and yogurt.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Chicken Starters',
    price: 280
  },
  {
    id: 's-nv-c-2',
    name: 'Tandoori Chicken',
    description: 'Classic bone-in chicken marinated in yogurt-spice blend and grilled in tandoor.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Chicken Starters',
    price: 320
  },
  {
    id: 's-nv-c-3',
    name: 'Chicken Malai Tikka',
    description: 'Boneless chicken chunks marinated in cream, cheese, and cardamom, grilled.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Chicken Starters',
    price: 300
  },

  // 2. STARTERS - Non-Vegetarian Mutton Starters
  {
    id: 's-nv-m-1',
    name: 'Mutton Seekh Kabab',
    description: 'Minced mutton skewers seasoned with coriander, mint, and warm spices.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Mutton Starters',
    price: 380
  },
  {
    id: 's-nv-m-2',
    name: 'Mutton Boti Kabab',
    description: 'Tender cubes of lamb marinated in a rich spicy mixture and grilled.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Mutton Starters',
    price: 390
  },

  // 2. STARTERS - Non-Vegetarian Seafood & Egg Starters
  {
    id: 's-nv-sf-1',
    name: 'Tandoori Fish Tikka',
    description: 'Fresh fish fillets marinated in mustard oil, ajwain, and yogurt, roasted.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Seafood & Egg Starters',
    price: 360
  },
  {
    id: 's-nv-sf-2',
    name: 'Apollo Fish',
    description: 'Hyderabadi style spicy batter-fried fish tossed with green chilies and curry leaves.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Seafood & Egg Starters',
    price: 350
  },
  {
    id: 's-nv-sf-3',
    name: 'Spicy Egg Chili',
    description: 'Boiled eggs coated in batter, fried and tossed in a Chinese-style hot sauce.',
    isVeg: false,
    course: 'starters',
    subcategory: 'Seafood & Egg Starters',
    price: 200
  },

  // 3. INDIAN BREADS
  {
    id: 'br-1',
    name: 'Butter Naan',
    description: 'Leavened flatbread baked in tandoor, brushed generously with butter.',
    isVeg: true,
    course: 'breads',
    subcategory: 'Tandoori Rotis & Naans',
    price: 60
  },
  {
    id: 'br-2',
    name: 'Garlic Naan',
    description: 'Tandoor-baked leavened bread infused with fresh minced garlic and herbs.',
    isVeg: true,
    course: 'breads',
    subcategory: 'Tandoori Rotis & Naans',
    price: 70
  },
  {
    id: 'br-3',
    name: 'Tandoori Roti',
    description: 'Whole wheat unleavened flatbread baked in the traditional tandoor.',
    isVeg: true,
    course: 'breads',
    subcategory: 'Tandoori Rotis & Naans',
    price: 40
  },
  {
    id: 'br-4',
    name: 'Rumali Roti',
    description: 'Extremely thin and soft flatbread stretched and baked on an inverted wok.',
    isVeg: true,
    course: 'breads',
    subcategory: 'Rumali Rotis',
    price: 50
  },
  {
    id: 'br-5',
    name: 'Aloo Kulcha',
    description: 'Soft leavened bread stuffed with spiced potatoes and baked in tandoor.',
    isVeg: true,
    course: 'breads',
    subcategory: 'Kulcha & Paratha Varieties',
    price: 90
  },

  // 4. VEGETARIAN MAIN COURSE - Paneer Curries
  {
    id: 'vm-p-1',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich, creamy, and slightly sweet tomato-onion gravy.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Paneer Curries',
    price: 280
  },
  {
    id: 'vm-p-2',
    name: 'Kadai Paneer',
    description: 'Paneer cubes cooked with bell peppers and freshly ground kadai spices.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Paneer Curries',
    price: 280
  },
  {
    id: 'vm-p-3',
    name: 'Palak Paneer',
    description: 'Soft cottage cheese cubes simmered in a smooth, spiced spinach purée.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Paneer Curries',
    price: 270
  },

  // 4. VEGETARIAN MAIN COURSE - Vegetable & Aloo Curries
  {
    id: 'vm-v-1',
    name: 'Veg Diwani Handi',
    description: 'Mixed seasonal vegetables cooked in a rich, aromatic cashew and spinach gravy.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Vegetable & Aloo Curries',
    price: 240
  },
  {
    id: 'vm-v-2',
    name: 'Dum Aloo Kashmiri',
    description: 'Baby potatoes slow-cooked in a tangy, spicy yogurt-based tomato gravy.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Vegetable & Aloo Curries',
    price: 230
  },

  // 4. VEGETARIAN MAIN COURSE - Hyderabadi & South Indian
  {
    id: 'vm-h-1',
    name: 'Bagara Baingan',
    description: 'Hyderabadi style baby eggplants cooked in a rich sesame, peanut, and coconut gravy.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Hyderabadi & South Indian Specials',
    price: 240
  },
  {
    id: 'vm-h-2',
    name: 'Malai Kofta',
    description: 'Fried potato and paneer dumplings in a sweet, rich cashew-based gravy.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Stuffed Specials & Koftas',
    price: 290
  },
  {
    id: 'vm-d-1',
    name: 'Dal Makhani',
    description: 'Black lentils and kidney beans slow-cooked overnight with cream and butter.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Dal Varieties',
    price: 220
  },
  {
    id: 'vm-d-2',
    name: 'Dal Tadka',
    description: 'Yellow lentils cooked and tempered with ghee, garlic, cumin, and dry red chilies.',
    isVeg: true,
    course: 'veg-main',
    subcategory: 'Dal Varieties',
    price: 190
  },

  // 5. NON-VEGETARIAN MAIN COURSE - Chicken Curries
  {
    id: 'nvm-c-1',
    name: 'Butter Chicken',
    description: 'Tender tandoori chicken shreds simmered in a creamy, velvety tomato sauce.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Chicken Curries',
    price: 340
  },
  {
    id: 'nvm-c-2',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken chunks cooked in a spicy, onion-tomato masala gravy.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Chicken Curries',
    price: 340
  },
  {
    id: 'nvm-c-3',
    name: 'Methi Chaman Chicken',
    description: 'Hyderabadi style chicken cooked with fresh fenugreek leaves and green herbs.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Chicken Curries',
    price: 330
  },

  // 5. NON-VEGETARIAN MAIN COURSE - Mutton Curries
  {
    id: 'nvm-m-1',
    name: 'Mutton Rogan Josh',
    description: 'Classic Kashmiri lamb curry cooked with aromatic spices and alkanet flower.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Mutton Curries',
    price: 420
  },
  {
    id: 'nvm-m-2',
    name: 'Nellore Mutton Curry',
    description: 'Andhra style spicy mutton curry with black pepper, poppy seeds, and coconut.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Mutton Curries',
    price: 430
  },

  // 5. NON-VEGETARIAN MAIN COURSE - Seafood Curries
  {
    id: 'nvm-s-1',
    name: 'Goan Fish Curry',
    description: 'Traditional Goan fish curry cooked in a tangy coconut and tamarind base.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Fish & Seafood Curries',
    price: 380
  },
  {
    id: 'nvm-s-2',
    name: 'Butter Garlic Prawns Masala',
    description: 'Juicy prawns sauteed in garlic butter and cooked in a rich semi-dry gravy.',
    isVeg: false,
    course: 'nonveg-main',
    subcategory: 'Prawns & Crab Curries',
    price: 410
  },

  // 6. RICE & BIRYANI
  {
    id: 'rb-v-1',
    name: 'Hyderabadi Veg Dum Biryani',
    description: 'Basmati rice cooked with mixed vegetables and aromatic spices on dum.',
    isVeg: true,
    course: 'rice-biryani',
    subcategory: 'Veg Biryani',
    price: 240
  },
  {
    id: 'rb-v-2',
    name: 'Paneer Tikka Biryani',
    description: 'Fragrant rice cooked with tandoori grilled paneer and rich spices.',
    isVeg: true,
    course: 'rice-biryani',
    subcategory: 'Veg Biryani',
    price: 260
  },
  {
    id: 'rb-c-1',
    name: 'Hyderabadi Chicken Dum Biryani',
    description: 'Authentic Hyderabadi biryani with layered basmati rice and marinated chicken.',
    isVeg: false,
    course: 'rice-biryani',
    subcategory: 'Non-Veg Biryani',
    price: 320
  },
  {
    id: 'rb-m-1',
    name: 'Zafrani Mutton Dum Biryani',
    description: 'Premium mutton cooked with saffron-infused basmati rice under dum pressure.',
    isVeg: false,
    course: 'rice-biryani',
    subcategory: 'Non-Veg Biryani',
    price: 420
  },
  {
    id: 'rb-o-1',
    name: 'Jeera Rice',
    description: 'Fragrant basmati rice tempered with ghee and cumin seeds.',
    isVeg: true,
    course: 'rice-biryani',
    subcategory: 'Veg Rice',
    price: 150
  },
  {
    id: 'rb-o-2',
    name: 'Veg Fried Rice',
    description: 'Wok-tossed basmati rice with finely chopped vegetables and Chinese sauces.',
    isVeg: true,
    course: 'rice-biryani',
    subcategory: 'Fried Rice Varieties',
    price: 180
  },

  // 7. ACCOMPANIMENTS
  {
    id: 'ac-1',
    name: 'Mixed Veg Raita',
    description: 'Chilled yogurt whisked with chopped cucumber, onions, tomatoes, and roasted cumin.',
    isVeg: true,
    course: 'accompaniments',
    subcategory: 'Raitas',
    price: 70
  },
  {
    id: 'ac-2',
    name: 'Boondi Raita',
    description: 'Crispy chickpea flour balls soaked in seasoned savory yogurt.',
    isVeg: true,
    course: 'accompaniments',
    subcategory: 'Raitas',
    price: 70
  },
  {
    id: 'ac-3',
    name: 'Green Tossed Salad',
    description: 'Fresh slices of cucumber, carrots, onions, tomatoes, and green chilies.',
    isVeg: true,
    course: 'accompaniments',
    subcategory: 'Salads',
    price: 60
  },
  {
    id: 'ac-4',
    name: 'Assorted Pickles & Papad',
    description: 'Traditional mango and mixed vegetable pickle served with roasted papad.',
    isVeg: true,
    course: 'accompaniments',
    subcategory: 'Pickles',
    price: 40
  },

  // 8. DESSERTS & SWEETS
  {
    id: 'de-1',
    name: 'Shahi Qubani ka Meetha',
    description: 'Traditional Hyderabadi dessert made of dried apricots, served with cream.',
    isVeg: true,
    course: 'desserts',
    subcategory: 'Traditional Sweets',
    price: 160
  },
  {
    id: 'de-2',
    name: 'Double ka Meetha',
    description: 'Bread pudding dessert fried in ghee, soaked in saffron and cardamom syrup.',
    isVeg: true,
    course: 'desserts',
    subcategory: 'Traditional Sweets',
    price: 120
  },
  {
    id: 'de-3',
    name: 'Moong Dal Halwa',
    description: 'Rich, sweet dessert made of skinless split green gram, ghee, and nuts.',
    isVeg: true,
    course: 'desserts',
    subcategory: 'Halwas',
    price: 150
  },
  {
    id: 'de-4',
    name: 'Elaneer Payasam',
    description: 'Chilled South Indian dessert made of tender coconut pulp and condensed milk.',
    isVeg: true,
    course: 'desserts',
    subcategory: 'Kheer & Payasam',
    price: 140
  },
  {
    id: 'de-5',
    name: 'Gulab Jamun with Ice Cream',
    description: 'Warm, syrup-soaked milk dumplings served with premium vanilla ice cream.',
    isVeg: true,
    course: 'desserts',
    subcategory: 'Cold Desserts & Combos',
    price: 130
  }
];
