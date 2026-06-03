export interface MenuItem {
  id: string;
  name: string;
  isVeg: boolean;
  course:
    | 'starters'
    | 'breads'
    | 'veg-main'
    | 'nonveg-main'
    | 'rice-biryani'
    | 'accompaniments'
    // Breakfast Courses
    | 'south-indian-breakfast'
    | 'north-indian-breakfast'
    | 'special-breakfast'
    | 'breakfast-rice'
    // Dessert Courses
    | 'hot-sweets'
    | 'halwas'
    | 'kheer-payasam'
    | 'traditional-sweets'
    | 'fruit-desserts'
    | 'custards-puddings'
    | 'cold-desserts'
    | 'bengali-sweets'
    | 'milk-cream-desserts'
    | 'traditional-snacks';
  subcategory: string;
}

export const MENU_ITEMS: MenuItem[] = [

  // 3. STARTERS & SNACKS
  // 3.1 Manchurias (Veg)
  { id: 'sn-man-1', name: 'Vegetable Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },
  { id: 'sn-man-2', name: 'BabyCorn Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },
  { id: 'sn-man-3', name: 'Gobhi Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },
  { id: 'sn-man-4', name: 'Paneer Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },
  { id: 'sn-man-5', name: 'Aloo Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },
  { id: 'sn-man-6', name: 'Mushroom Manchuria', isVeg: true, course: 'starters', subcategory: 'Manchuria\'s' },

  // 3.2 Spring Rolls (Veg)
  { id: 'sn-spr-1', name: 'Vegetable Spring Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },
  { id: 'sn-spr-2', name: 'Shanghai Spring Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },
  { id: 'sn-spr-3', name: 'Paneer Spring Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },
  { id: 'sn-spr-4', name: 'Palak Spring Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },
  { id: 'sn-spr-5', name: 'Mushroom Spring Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },
  { id: 'sn-spr-6', name: 'Bread Rolls', isVeg: true, course: 'starters', subcategory: 'Spring Rolls' },

  // 3.3 65 Items (Veg)
  { id: 'sn-65-1', name: 'Paneer 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-2', name: 'Gobhi 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-3', name: 'Aloo 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-4', name: 'BabyCorn 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-5', name: 'Mushroom 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-6', name: 'Meal Maker 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-7', name: 'Vegetable 65', isVeg: true, course: 'starters', subcategory: '65 Items' },
  { id: 'sn-65-8', name: 'Aloo Gobhi 65', isVeg: true, course: 'starters', subcategory: '65 Items' },

  // 3.4 Crispy Items (Veg)
  { id: 'sn-crp-1', name: 'Crispy Vegetables', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },
  { id: 'sn-crp-2', name: 'Crispy Gobhi', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },
  { id: 'sn-crp-3', name: 'Crispy Aloo', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },
  { id: 'sn-crp-4', name: 'Crispy BabyCorn', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },
  { id: 'sn-crp-5', name: 'Crispy Paneer', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },
  { id: 'sn-crp-6', name: 'Crispy Mushroom', isVeg: true, course: 'starters', subcategory: 'Crispy Items' },

  // 3.5 Cutlet's (Veg)
  { id: 'sn-cut-1', name: 'Sabudana Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },
  { id: 'sn-cut-2', name: 'Banana Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },
  { id: 'sn-cut-3', name: 'Mutter Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },
  { id: 'sn-cut-4', name: 'Vegetable Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },
  { id: 'sn-cut-5', name: 'Mushroom Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },
  { id: 'sn-cut-6', name: 'Aloo Mutter Cutlet', isVeg: true, course: 'starters', subcategory: 'Cutlet\'s' },

  // 3.6 Lollypop's (Veg)
  { id: 'sn-lol-1', name: 'Paneer Lollypop', isVeg: true, course: 'starters', subcategory: 'Lollypop\'s' },
  { id: 'sn-lol-2', name: 'Banana Lollypop', isVeg: true, course: 'starters', subcategory: 'Lollypop\'s' },
  { id: 'sn-lol-3', name: 'Corn Lollypop', isVeg: true, course: 'starters', subcategory: 'Lollypop\'s' },
  { id: 'sn-lol-4', name: 'Vegetable Lollypop', isVeg: true, course: 'starters', subcategory: 'Lollypop\'s' },

  // 3.7 Bullets (Veg)
  { id: 'sn-bul-1', name: 'Corn Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },
  { id: 'sn-bul-2', name: 'Green Peas Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },
  { id: 'sn-bul-3', name: 'Vegetable Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },
  { id: 'sn-bul-4', name: 'Banana Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },
  { id: 'sn-bul-5', name: 'Meal Maker Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },
  { id: 'sn-bul-6', name: 'Paneer Bullet', isVeg: true, course: 'starters', subcategory: 'Bullets' },

  // 3.8 Pakoda's (Veg)
  { id: 'sn-pak-1', name: 'Paneer Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-2', name: 'Aloo Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-3', name: 'Gobhi Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-4', name: 'Vegetable Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-5', name: 'Greens Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-6', name: 'Mushroom Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-7', name: 'Babycorn Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-8', name: 'Onion Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },
  { id: 'sn-pak-9', name: 'Kaju Pakoda', isVeg: true, course: 'starters', subcategory: 'Pakoda\'s' },

  // 3.9 Gold Coin's (Veg)
  { id: 'sn-gld-1', name: 'Vegetable Gold Coin', isVeg: true, course: 'starters', subcategory: 'Gold Coin\'s' },
  { id: 'sn-gld-2', name: 'Chilly Gold Coin', isVeg: true, course: 'starters', subcategory: 'Gold Coin\'s' },
  { id: 'sn-gld-3', name: 'Paneer Gold Coin', isVeg: true, course: 'starters', subcategory: 'Gold Coin\'s' },
  { id: 'sn-gld-4', name: 'Gobhi Gold Coin', isVeg: true, course: 'starters', subcategory: 'Gold Coin\'s' },

  // 3.10 Sandwiches (Veg)
  { id: 'sn-sdw-1', name: 'Paneer Sandwich', isVeg: true, course: 'starters', subcategory: 'Sandwiches' },
  { id: 'sn-sdw-2', name: 'Bread Sandwich', isVeg: true, course: 'starters', subcategory: 'Sandwiches' },
  { id: 'sn-sdw-3', name: 'Vegetable Sandwich', isVeg: true, course: 'starters', subcategory: 'Sandwiches' },
  { id: 'sn-sdw-4', name: 'Cheese Sandwich', isVeg: true, course: 'starters', subcategory: 'Sandwiches' },

  // 3.11 Kachori's (Veg)
  { id: 'sn-kac-1', name: 'Kachori', isVeg: true, course: 'starters', subcategory: 'Kachori\'s' },
  { id: 'sn-kac-2', name: 'Masala Kachori', isVeg: true, course: 'starters', subcategory: 'Kachori\'s' },
  { id: 'sn-kac-3', name: 'Paneer Kachori', isVeg: true, course: 'starters', subcategory: 'Kachori\'s' },

  // 3.12 Samosa's (Veg)
  { id: 'sn-sam-1', name: 'Mutter Aloo Samosa', isVeg: true, course: 'starters', subcategory: 'Samosa\'s' },
  { id: 'sn-sam-2', name: 'Vegetable Samosa', isVeg: true, course: 'starters', subcategory: 'Samosa\'s' },
  { id: 'sn-sam-3', name: 'Mushroom Alu Samosa', isVeg: true, course: 'starters', subcategory: 'Samosa\'s' },
  { id: 'sn-sam-4', name: 'Samosa', isVeg: true, course: 'starters', subcategory: 'Samosa\'s' },

  // 3.13 Bhajji's (Veg)
  { id: 'sn-bha-1', name: 'Aloo Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-2', name: 'Pan Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-3', name: 'Raw Banana Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-4', name: 'Mirchi Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-5', name: 'Gobhi Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-6', name: 'Baigan Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },
  { id: 'sn-bha-7', name: 'Cut Mirchi Bhajji', isVeg: true, course: 'starters', subcategory: 'Bhajji\'s' },

  // 3.14 Vegetable Tandoor (Veg)
  { id: 'sn-tan-1', name: 'Paneer Tikka', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-2', name: 'Malai Tikka', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-3', name: 'Aloo Tikka', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-4', name: 'Tandoori Aloo', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-5', name: 'Tandoori Gobhi', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-6', name: 'Tandoori Bread Aloo', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },
  { id: 'sn-tan-7', name: 'Hara Bhara Kabab', isVeg: true, course: 'starters', subcategory: 'Vegetable Tandoor' },

  // 3.15 Bonda's (Veg)
  { id: 'sn-bon-1', name: 'Aloo Bonda', isVeg: true, course: 'starters', subcategory: 'Bonda\'s' },
  { id: 'sn-bon-2', name: 'Vegetable Bonda', isVeg: true, course: 'starters', subcategory: 'Bonda\'s' },

  // 3.16 Non-Veg Snacks - Chicken
  { id: 'sn-nvch-1', name: 'Chicken Reshmi Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-2', name: 'Chicken Tangdi Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-3', name: 'Chicken Tikka', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-4', name: 'Chicken Hariyali Tikka', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-5', name: 'Grilled Chicken', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-6', name: 'Chicken 65', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-7', name: 'Chicken Tandoori', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-8', name: 'Chicken Ginger', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-9', name: 'Chicken Garlic', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-10', name: 'Chicken Butter', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-11', name: 'Chicken Fry', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-12', name: 'Chicken Hariyali', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-13', name: 'Chicken Spring Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-14', name: 'Chicken Pepper', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-15', name: 'Kasturi Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-16', name: 'Chicken Manchuria (Dry/Wet)', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-17', name: 'Chicken 55', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-18', name: 'Chicken 555', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-19', name: 'Chicken Lollypop', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },
  { id: 'sn-nvch-20', name: 'Chicken Roast', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Chicken)' },

  // 3.17 Non-Veg Snacks - Mutton
  { id: 'sn-nvmu-1', name: 'Mutton Shammi Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-2', name: 'Mutton Sheek Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-3', name: 'Mutton Spring Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-4', name: 'Mutton Chops', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-5', name: 'Mutton Macaroni', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-6', name: 'Mutton 65', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-7', name: 'Mutton Roast', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-8', name: 'Mutton Meat Balls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-9', name: 'Boti Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-10', name: 'Mutton Manchuria', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-11', name: 'Chilly Mutton', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-12', name: 'Garlic Mutton', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-13', name: 'Ginger Mutton', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-14', name: 'Pepper Mutton', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },
  { id: 'sn-nvmu-15', name: 'Mutton rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Mutton)' },

  // 3.18 Non-Veg Snacks - Fish
  { id: 'sn-nvfi-1', name: 'Fish Fingers', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-2', name: 'Apollo Fish', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-3', name: 'Fish Kabab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-4', name: 'Fish Fry (bone/boneless)', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-5', name: 'Fish Cutlet', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-6', name: 'Fish Tikka', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-7', name: 'Fish 65', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-8', name: 'Ginger Fish', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-9', name: 'Garlic Fish', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-10', name: 'Fish Manchuria', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-11', name: 'Pepper Fish', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-12', name: 'Chilly Fish', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-13', name: 'Fish Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-14', name: 'Fish Pakoda', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },
  { id: 'sn-nvfi-15', name: 'Fish Spring Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Fish)' },

  // 3.19 Non-Veg Snacks - Egg
  { id: 'sn-nveg-1', name: 'Egg Curry (Snack)', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-2', name: 'Egg Omlette Curry', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-3', name: 'Egg Spring Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-4', name: 'Boiled Eggs', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-5', name: 'Egg Bread', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-6', name: 'Egg Paratha', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-7', name: 'Egg Dosa (Snack)', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-8', name: 'Egg Paneer Kurma', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-9', name: 'Egg Parwal Curry', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-10', name: 'Egg Mushroom Omlette', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },
  { id: 'sn-nveg-11', name: 'Egg Roll', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Egg)' },

  // 3.20 Non-Veg Snacks - Prawns
  { id: 'sn-nvpr-1', name: 'Ginger Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-2', name: 'Prawns 65', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-3', name: 'Loose Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-4', name: 'Garlic Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-5', name: 'Pepper Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-6', name: 'Chilly Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-7', name: 'Prawn Pakoda', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-8', name: 'Tandoori Prawns', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },
  { id: 'sn-nvpr-9', name: 'Prawn Spring Rolls', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Prawns)' },

  // 3.21 Non-Veg Snacks - Crabs
  { id: 'sn-nvcr-1', name: 'Crab Fry', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Crab\'s)' },
  { id: 'sn-nvcr-2', name: 'Pepper Crab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Crab\'s)' },
  { id: 'sn-nvcr-3', name: 'Ginger Crab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Crab\'s)' },
  { id: 'sn-nvcr-4', name: 'Garlic Crab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Crab\'s)' },
  { id: 'sn-nvcr-5', name: 'Grilled Crab', isVeg: false, course: 'starters', subcategory: 'Non-Veg Snacks (Crab\'s)' },

  // 4. INDIAN BREADS (ROTIS)
  // 4.1 Poori
  { id: 'br-poo-1', name: 'Methi Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },
  { id: 'br-poo-2', name: 'Palak Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },
  { id: 'br-poo-3', name: 'Ginger Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },
  { id: 'br-poo-4', name: 'Garlic Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },
  { id: 'br-poo-5', name: 'Muli Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },
  { id: 'br-poo-6', name: 'Masala Poori', isVeg: true, course: 'breads', subcategory: 'Poori' },

  // 4.2 Paratha's
  { id: 'br-par-1', name: 'Aloo Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-2', name: 'Muli Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-3', name: 'Gobhi Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-4', name: 'Palak Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-5', name: 'Ginger Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-6', name: 'Garlic Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-7', name: 'Kerala Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-8', name: 'Punjabi Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-9', name: 'Plain Paratha', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },
  { id: 'br-par-10', name: 'Tava Phulka', isVeg: true, course: 'breads', subcategory: 'Paratha\'s' },

  // 4.3 Tandoor Roti's
  { id: 'br-tan-1', name: 'Butter Tandoor Roti', isVeg: true, course: 'breads', subcategory: 'Tandoor Roti\'s' },
  { id: 'br-tan-2', name: 'Plain Tandoor Roti', isVeg: true, course: 'breads', subcategory: 'Tandoor Roti\'s' },
  { id: 'br-tan-3', name: 'Butter Naan', isVeg: true, course: 'breads', subcategory: 'Tandoor Roti\'s' },
  { id: 'br-tan-4', name: 'Plain Naan', isVeg: true, course: 'breads', subcategory: 'Tandoor Roti\'s' },

  // 4.4 Rumali Roti's
  { id: 'br-rum-1', name: 'Butter Rumali', isVeg: true, course: 'breads', subcategory: 'Rumali Roti\'s' },
  { id: 'br-rum-2', name: 'Plain Rumali', isVeg: true, course: 'breads', subcategory: 'Rumali Roti\'s' },
  { id: 'br-rum-3', name: 'Ginger Rumali', isVeg: true, course: 'breads', subcategory: 'Rumali Roti\'s' },
  { id: 'br-rum-4', name: 'Garlic Rumali', isVeg: true, course: 'breads', subcategory: 'Rumali Roti\'s' },

  // 4.5 Kulcha's
  { id: 'br-kul-1', name: 'Pudina Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha\'s' },
  { id: 'br-kul-2', name: 'Till Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha\'s' },
  { id: 'br-kul-3', name: 'Cheese Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha\'s' },
  { id: 'br-kul-4', name: 'Paneer Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha\'s' },
  { id: 'br-kul-5', name: 'Masala Kulcha', isVeg: true, course: 'breads', subcategory: 'Kulcha\'s' },

  // 5. VEGETARIAN MAIN COURSE
  // 5.1 Curries (Paneer & Veg)
  { id: 'vm-cur-1', name: 'Stuffed Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-2', name: 'Stuffed Capsicum', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-3', name: 'Stuffed Bhendi', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-4', name: 'Bulbul Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-5', name: 'Paneer Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-6', name: 'Malai Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-7', name: 'Vegetable Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-8', name: 'Kaddu Kofta', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-9', name: 'Kaju Green Peas', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-10', name: 'Kaju BabyCorn', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-11', name: 'Kaju Phool Makhani', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-12', name: 'Baby Corn Mushroom', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-13', name: 'Kaju Mushroom', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-14', name: 'Paneer BabyCorn', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-15', name: 'Kaju Paneer Mushroom', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-16', name: 'Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-17', name: 'Paneer Tikka Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-18', name: 'Chole Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-19', name: 'Lobiya Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-20', name: 'Butter Paneer Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-21', name: 'Shahi Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-22', name: 'Mutter Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-23', name: 'Aloo Gobhi Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-24', name: 'Paneer Gobhi', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-25', name: 'Palak Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-26', name: 'Aloo Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-27', name: 'Aloo Mutter', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-28', name: 'Paneer Aloo', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-29', name: 'Vegetable Kurma', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-30', name: 'Vegetable Paneer Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-31', name: 'Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-32', name: 'Pudina Aloo Kurma', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-33', name: 'Bhendi Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-34', name: 'Methi Aloo', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-35', name: 'Navratan Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-36', name: 'Ginger Chole', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-37', name: 'Kadhai Vegetable', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-38', name: 'Methi Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-39', name: 'Chilli Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-40', name: 'Ginger Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-41', name: 'Jeera Aloo', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-42', name: 'Nutrella Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-43', name: 'Gobhi Masala', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-44', name: 'Ginger Gobhi', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-45', name: 'Aloo Stew', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-46', name: 'Vegetable Stew', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-47', name: 'Drumstick Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-48', name: 'Meal Maker Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-49', name: 'Kadhai Paneer', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-50', name: 'Badam Aloo', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-51', name: 'Dum Aloo', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-52', name: 'Mixed Vegetable Curry', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },
  { id: 'vm-cur-53', name: 'Kashmiri Aloo Dum', isVeg: true, course: 'veg-main', subcategory: 'Vegetable Curries' },

  // 5.2 Hyderabadi Specials
  { id: 'vm-hyd-1', name: 'Bagara Baigan', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-2', name: 'Capsicum Masala', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-3', name: 'Mirchi-ka-Salan', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-4', name: 'Baigan Mirchi Curry', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-5', name: 'Mirchi Tomato Curry', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-6', name: 'Capsicum Tomato Curry', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },
  { id: 'vm-hyd-7', name: 'Hyderabadi Curry', isVeg: true, course: 'veg-main', subcategory: 'Hyderabadi Specials' },

  // 5.3 South Indian Curries
  { id: 'vm-si-1', name: 'Donda Fry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-2', name: 'Donda Bagara Masala', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-3', name: 'Bhendi Fry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-4', name: 'Beans Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-5', name: 'Cabbage Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-6', name: 'Mixed Vegetable Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-7', name: 'Brinjal Fry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-8', name: 'Karela Fry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-9', name: 'Raw Banana Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-10', name: 'Arvi Fry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-11', name: 'Kaddu Chana Dal', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-12', name: 'Aloo Baigan 65', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-13', name: 'South Indian Veg Kurma', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-14', name: 'Aloo Kurma', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-15', name: 'Avail', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-16', name: 'Cabbage Thooran', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-17', name: 'Beans Thooran', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-18', name: 'Cabbage Tomato Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },
  { id: 'vm-si-19', name: 'Tava Dry', isVeg: true, course: 'veg-main', subcategory: 'South Indian Curries' },

  // 5.4 Dal Varieties
  { id: 'vm-dal-1', name: 'Sambar', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-2', name: 'Palak Dal', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-3', name: 'Tomato Dal', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-4', name: 'Mango Dal', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-5', name: 'Dal Fry', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-6', name: 'Dal Tadka', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-7', name: 'Moong Dal', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-8', name: 'Veg Dal', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },
  { id: 'vm-dal-9', name: 'Dalcha', isVeg: true, course: 'veg-main', subcategory: 'Dal Varieties' },

  // 6. NON-VEGETARIAN MAIN COURSE (CURRIES)
  // 6.1 Chicken Curries
  { id: 'nvm-ch-1', name: 'Butter Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-2', name: 'Ginger Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-3', name: 'Dum-Ka-Murg', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-4', name: 'Chicken Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-5', name: 'Chicken Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-6', name: 'Chicken Chettinad', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-7', name: 'Chilly Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-8', name: 'Methi Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-9', name: 'Chicken with Palak', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-10', name: 'Malai Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-11', name: 'Chicken Tikka Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-12', name: 'Chicken Afghani', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-13', name: 'Chicken Hyderabadi', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-14', name: 'Chicken Moghalai', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-15', name: 'Kadai Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-16', name: 'Chicken-do-Pyaza', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-17', name: 'Pepper Chicken', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },
  { id: 'nvm-ch-18', name: 'Chicken Haleem', isVeg: false, course: 'nonveg-main', subcategory: 'Chicken Curries' },

  // 6.2 Mutton Curries
  { id: 'nvm-mu-1', name: 'Mutton Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-2', name: 'Mutton Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-3', name: 'Mutton Rogan Josh', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-4', name: 'Ginger Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-5', name: 'Mutton Fry Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-6', name: 'Butter Mutton Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-7', name: 'Mutton Jahangir', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-8', name: 'Mutton-do-Pyaza', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-9', name: 'Kadai Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-10', name: 'Lal Goast', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-11', name: 'Mutton Haleem', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-12', name: 'Palak Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-13', name: 'Ghongura Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-14', name: 'Minced Meat Balls', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-15', name: 'Methi Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-16', name: 'Bone Marrow Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-17', name: 'Pepper Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-18', name: 'Chilli Mutton', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },
  { id: 'nvm-mu-19', name: 'Mutton Salami', isVeg: false, course: 'nonveg-main', subcategory: 'Mutton Curries' },

  // 6.3 Sea Food Curries
  { id: 'nvm-sf-1', name: 'Fish Curry (bone/boneless)', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-2', name: 'Nellore Fish Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-3', name: 'Fish Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-4', name: 'Fish Tikka Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-5', name: 'Ginger Fish Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-6', name: 'Garlic Fish Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-7', name: 'Butter Fish Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-8', name: 'Malabar Fish Curry', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-9', name: 'Ginger Prawns Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-10', name: 'Garlic Prawns Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-11', name: 'Pepper Prawns Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-12', name: 'Prawns Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-13', name: 'Crab Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-14', name: 'Garlic Crab Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },
  { id: 'nvm-sf-15', name: 'Ginger Crab Masala', isVeg: false, course: 'nonveg-main', subcategory: 'Sea Food Curries' },

  // 7. RICE & BIRYANI
  // 7.1 Rice Items (Veg)
  { id: 'rb-ri-1', name: 'Vegetable Pulav', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-2', name: 'Green Peas Pulav', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-3', name: 'Jeera Pulav', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-4', name: 'Kashmiri Pulav', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-5', name: 'Coconut Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-6', name: 'Tomato Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-7', name: 'Vegetable Fried Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-8', name: 'Kaju Fried Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-9', name: 'Tamarind Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-10', name: 'Ghee Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-11', name: 'Lemon Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },
  { id: 'rb-ri-12', name: 'Plain Rice', isVeg: true, course: 'rice-biryani', subcategory: 'Rice' },

  // 7.2 Rice Items (Non-Veg Fried Rice)
  { id: 'rb-nvfr-1', name: 'Chicken Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },
  { id: 'rb-nvfr-2', name: 'Mutton Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },
  { id: 'rb-nvfr-3', name: 'Fish Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },
  { id: 'rb-nvfr-4', name: 'Egg Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },
  { id: 'rb-nvfr-5', name: 'Prawns Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },
  { id: 'rb-nvfr-6', name: 'Assorted Fried Rice', isVeg: false, course: 'rice-biryani', subcategory: 'Fried Rice (Non-Veg)' },

  // 7.3 Biryani's (Veg)
  { id: 'rb-bi-1', name: 'Vegetable Biryani', isVeg: true, course: 'rice-biryani', subcategory: 'Biryani\'s' },
  { id: 'rb-bi-2', name: 'Thai Biryani', isVeg: true, course: 'rice-biryani', subcategory: 'Biryani\'s' },

  // 7.4 Biryani's (Non-Veg)
  { id: 'rb-nvbi-1', name: 'Chicken Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },
  { id: 'rb-nvbi-2', name: 'Mutton Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },
  { id: 'rb-nvbi-3', name: 'Fish Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },
  { id: 'rb-nvbi-4', name: 'Egg Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },
  { id: 'rb-nvbi-5', name: 'Prawns Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },
  { id: 'rb-nvbi-6', name: 'Assorted Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Biryani\'s (Non-Veg)' },

  // Older legacy mapped items
  { id: 'rb-3', name: 'Hyderabadi Chicken Dum Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Non-Veg Biryani' },
  { id: 'rb-4', name: 'Zafrani Mutton Dum Biryani', isVeg: false, course: 'rice-biryani', subcategory: 'Non-Veg Biryani' },

  // 8. ACCOMPANIMENTS (Raithas, Salads, Pickles)
  // 8.1 Raithas
  { id: 'ac-rai-1', name: 'Mixed Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-2', name: 'Onion Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-3', name: 'Pine Apple Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-4', name: 'Boondi Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-5', name: 'Pudina Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-6', name: 'Cucumber Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-7', name: 'Garlic Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-8', name: 'Ginger Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-9', name: 'Tomato Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },
  { id: 'ac-rai-10', name: 'Ginger Onion Raitha', isVeg: true, course: 'accompaniments', subcategory: 'Raitha' },

  // 8.2 Salads
  { id: 'ac-sal-1', name: 'Pineapple Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-2', name: 'Green Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-3', name: 'Russian Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-4', name: 'Fruit Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-5', name: 'Tossed Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-6', name: 'Lobiya Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-7', name: 'Cucumber Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-8', name: 'Chole Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-9', name: 'Aloo Dahi Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-10', name: 'Aloo Basket', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-11', name: 'Sprout Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-12', name: 'Moong Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-13', name: 'Cabbage Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-14', name: 'Jelly Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-15', name: 'Baby Corn Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-16', name: 'Beet Root Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },
  { id: 'ac-sal-17', name: 'Aloo Mint Salad', isVeg: true, course: 'accompaniments', subcategory: 'Salads' },

  // 8.3 Pickles
  { id: 'ac-pik-1', name: 'Mango Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },
  { id: 'ac-pik-2', name: 'Lime Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },
  { id: 'ac-pik-3', name: 'Gonghura Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },
  { id: 'ac-pik-4', name: 'Mix Vegetable Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },
  { id: 'ac-pik-5', name: 'Red Chilly (seasonal) Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },
  { id: 'ac-pik-6', name: 'Amla (seasonal) Pickle', isVeg: true, course: 'accompaniments', subcategory: 'Pickles' },

  // 9. BREAKFAST ITEMS
  // 9.1 South Indian Breakfast - Dosas
  { id: 'bf-dos-1', name: 'Cheese Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-2', name: 'Masala Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-3', name: 'Butter Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-4', name: 'Paneer Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-5', name: 'Onion Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-6', name: 'Palak Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-7', name: 'Moti Choor Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-8', name: 'Noodles Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-9', name: 'Rava Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-10', name: 'Mushroom Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-11', name: 'Baby Corn Dosa', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Dosas' },
  { id: 'bf-dos-12', name: 'Egg Dosa', isVeg: false, course: 'south-indian-breakfast', subcategory: 'Dosas' },

  // 9.2 South Indian Breakfast - Traditional South Indian
  { id: 'bf-trad-1', name: 'Uttapam', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },
  { id: 'bf-trad-2', name: 'Pesarattu', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },
  { id: 'bf-trad-3', name: 'Vegetable Idly', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },
  { id: 'bf-trad-4', name: 'Vada', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },
  { id: 'bf-trad-5', name: 'Mysore Bajji', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },
  { id: 'bf-trad-6', name: 'Dhai Vada', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Traditional South Indian' },

  // 9.3 South Indian Breakfast - Pongal Varieties
  { id: 'bf-pong-1', name: 'Rice Pongal', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Pongal Varieties' },
  { id: 'bf-pong-2', name: 'Rava Pongal', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Pongal Varieties' },
  { id: 'bf-pong-3', name: 'Vegetable Pongal', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Pongal Varieties' },

  // 9.4 South Indian Breakfast - Upma Varieties
  { id: 'bf-upm-1', name: 'Vegetable Upma', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Upma Varieties' },
  { id: 'bf-upm-2', name: 'Bambino Upma', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Upma Varieties' },
  { id: 'bf-upm-3', name: 'Vegetable Tomato Bath', isVeg: true, course: 'south-indian-breakfast', subcategory: 'Upma Varieties' },

  // 9.5 North Indian Breakfast - Poori Varieties
  { id: 'bf-poo-1', name: 'Plain Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },
  { id: 'bf-poo-2', name: 'Masala Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },
  { id: 'bf-poo-3', name: 'Palak Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },
  { id: 'bf-poo-4', name: 'Ginger Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },
  { id: 'bf-poo-5', name: 'Methi Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },
  { id: 'bf-poo-6', name: 'Aloo Puri', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Poori Varieties' },

  // 9.6 North Indian Breakfast - Paratha Varieties
  { id: 'bf-par-1', name: 'Aloo Paratha', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Paratha Varieties' },
  { id: 'bf-par-2', name: 'Gobhi Paratha', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Paratha Varieties' },
  { id: 'bf-par-3', name: 'Muli Paratha', isVeg: true, course: 'north-indian-breakfast', subcategory: 'Paratha Varieties' },

  // 9.7 Special Breakfast
  { id: 'bf-spec-1', name: 'Bhatura', isVeg: true, course: 'special-breakfast', subcategory: 'Special Breakfast' },

  // 9.8 Breakfast Rice Items
  { id: 'bf-rice-1', name: 'Tamarind Rice', isVeg: true, course: 'breakfast-rice', subcategory: 'Breakfast Rice Items' },
  { id: 'bf-rice-2', name: 'Coconut Rice', isVeg: true, course: 'breakfast-rice', subcategory: 'Breakfast Rice Items' },
  { id: 'bf-rice-3', name: 'Tomato Rice', isVeg: true, course: 'breakfast-rice', subcategory: 'Breakfast Rice Items' },

  // 10. DESSERTS & SWEETS
  // 10.1 Hot Indian Sweets (Jamun Specials)
  { id: 'de-hot-1', name: 'Gulab Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-2', name: 'Kala Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-3', name: 'Stuffed Gulab Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-4', name: 'Tri Colour Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-5', name: 'Kesari Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-6', name: 'Anjeer Jamun', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },
  { id: 'de-hot-7', name: 'Gulab Jamun with Ice Cream', isVeg: true, course: 'hot-sweets', subcategory: 'Hot Indian Sweets (Jamun Specials)' },

  // 10.2 Halwas
  { id: 'de-hal-1', name: 'Besan Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-2', name: 'Moong Dal Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-3', name: 'Pineapple Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-4', name: 'Atta Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-5', name: 'Rice Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-6', name: 'Gajar Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-7', name: 'Carrot Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-8', name: 'Papaya Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },
  { id: 'de-hal-9', name: 'Kaddu Halwa', isVeg: true, course: 'halwas', subcategory: 'Halwas' },

  // 10.3 Kheer & Payasam
  { id: 'de-kh-1', name: 'Rice Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-2', name: 'Bambino Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-3', name: 'Aloo Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-4', name: 'Kaddu Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-5', name: 'Moong Dal Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-6', name: 'Besan Kheer', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-7', name: 'Basundi', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-8', name: 'Pheni with Kesari Milk', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-9', name: 'Moong Dal Payasam', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },
  { id: 'de-kh-10', name: 'Elaneer Payasam', isVeg: true, course: 'kheer-payasam', subcategory: 'Kheer & Payasam' },

  // 10.4 Traditional Indian Sweets - Jalebi Specials
  { id: 'de-trad-jal-1', name: 'Jalebi', isVeg: true, course: 'traditional-sweets', subcategory: 'Jalebi Specials' },
  { id: 'de-trad-jal-2', name: 'Rabdi Jalebi', isVeg: true, course: 'traditional-sweets', subcategory: 'Jalebi Specials' },
  { id: 'de-trad-jal-3', name: 'Jhangiri', isVeg: true, course: 'traditional-sweets', subcategory: 'Jalebi Specials' },

  // 10.5 Traditional Indian Sweets - Laddu Varieties
  { id: 'de-trad-lad-1', name: 'Besan Laddu', isVeg: true, course: 'traditional-sweets', subcategory: 'Laddu Varieties' },
  { id: 'de-trad-lad-2', name: 'Rava Laddu', isVeg: true, course: 'traditional-sweets', subcategory: 'Laddu Varieties' },
  { id: 'de-trad-lad-3', name: 'Groundnut Laddu', isVeg: true, course: 'traditional-sweets', subcategory: 'Laddu Varieties' },
  { id: 'de-trad-lad-4', name: 'Motichoor Ka Laddu', isVeg: true, course: 'traditional-sweets', subcategory: 'Laddu Varieties' },
  { id: 'de-trad-lad-5', name: 'Rava Besan Laddu', isVeg: true, course: 'traditional-sweets', subcategory: 'Laddu Varieties' },

  // 10.6 Traditional Indian Sweets - Burfi Varieties
  { id: 'de-trad-bur-1', name: 'Badam Burfi', isVeg: true, course: 'traditional-sweets', subcategory: 'Burfi Varieties' },
  { id: 'de-trad-bur-2', name: 'Kaju Burfi', isVeg: true, course: 'traditional-sweets', subcategory: 'Burfi Varieties' },
  { id: 'de-trad-bur-3', name: 'Khova Burfi', isVeg: true, course: 'traditional-sweets', subcategory: 'Burfi Varieties' },

  // 10.7 Traditional Indian Sweets - Pedha & Milk Sweets
  { id: 'de-trad-ped-1', name: 'Pedha', isVeg: true, course: 'traditional-sweets', subcategory: 'Pedha & Milk Sweets' },
  { id: 'de-trad-ped-2', name: 'Maide-ka-Pedha', isVeg: true, course: 'traditional-sweets', subcategory: 'Pedha & Milk Sweets' },

  // 10.8 Traditional Indian Sweets - Festival Sweets
  { id: 'de-trad-fest-1', name: 'Mysore Pak', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-2', name: 'Balushah', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-3', name: 'Khaaja', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-4', name: 'Khubani-ka-Meetha', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-5', name: 'Boorlu (Puran Poli)', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-6', name: 'Sugar Pongal', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-7', name: 'Srikhand', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-8', name: 'Maal Puva', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-9', name: 'Sandesh', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-10', name: 'Chum-Chum', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-11', name: 'Shahi Qubani ka Meetha', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },
  { id: 'de-trad-fest-12', name: 'Double ka Meetha', isVeg: true, course: 'traditional-sweets', subcategory: 'Festival Sweets' },

  // 10.9 Fruit-Based Desserts
  { id: 'de-frt-1', name: 'Banana Split', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-2', name: 'Fruit Platter', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-3', name: 'Fruit Salad', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-4', name: 'Fruit Salad with Pepper', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-5', name: 'Apple Custard', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-6', name: 'Mango Roll', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },
  { id: 'de-frt-7', name: 'Lichi Golla', isVeg: true, course: 'fruit-desserts', subcategory: 'Fruit-Based Desserts' },

  // 10.10 Custards & Puddings
  { id: 'de-cust-1', name: 'Custard', isVeg: true, course: 'custards-puddings', subcategory: 'Custards & Puddings' },
  { id: 'de-cust-2', name: 'Trifle Pudding', isVeg: true, course: 'custards-puddings', subcategory: 'Custards & Puddings' },
  { id: 'de-cust-3', name: 'Rava Kesari', isVeg: true, course: 'custards-puddings', subcategory: 'Custards & Puddings' },
  { id: 'de-cust-4', name: 'Kesari Bath', isVeg: true, course: 'custards-puddings', subcategory: 'Custards & Puddings' },

  // 10.11 Cold Desserts
  { id: 'de-cold-1', name: 'Ice Cream (Cream / Vanilla / Strawberry)', isVeg: true, course: 'cold-desserts', subcategory: 'Cold Desserts' },

  // 10.12 Bengali Sweets
  { id: 'de-beng-1', name: 'Rasgulla', isVeg: true, course: 'bengali-sweets', subcategory: 'Bengali Sweets' },
  { id: 'de-beng-2', name: 'Rasmalai', isVeg: true, course: 'bengali-sweets', subcategory: 'Bengali Sweets' },

  // 10.13 Milk & Cream Desserts
  { id: 'de-milk-1', name: 'Malai Roll', isVeg: true, course: 'milk-cream-desserts', subcategory: 'Milk & Cream Desserts' },

  // 10.14 Traditional Snacks / Sweet Items
  { id: 'de-snk-1', name: 'Besan Chakki', isVeg: true, course: 'traditional-snacks', subcategory: 'Traditional Snacks / Sweet Items' },
  { id: 'de-snk-2', name: 'Coconut Laddu', isVeg: true, course: 'traditional-snacks', subcategory: 'Traditional Snacks / Sweet Items' }
];
