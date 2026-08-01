// Grid boundaries defining the SVG map canvas scale
export const MAP_SIZE = { width: 800, height: 500 };

// Available merchants and restaurants with coordinates (x, y) relative to MAP_SIZE
export const STORES = [
  {
    id: 'store_1',
    name: 'Burger Galaxy',
    category: 'Food',
    rating: 4.8,
    prepTime: '10-15 mins',
    x: 150,
    y: 120,
    color: '#6366f1',
    icon: '🍔',
    items: [
      { id: 'bg_1', name: 'Supernova Double Burger', price: 9.99, desc: 'Double beef patty, melted cheddar, nebula sauce, crispy onions.', image: '🍔' },
      { id: 'bg_2', name: 'Stardust Fries', price: 3.49, desc: 'Crispy seasoned fries with a pinch of galactic seasoning.', image: '🍟' },
      { id: 'bg_3', name: 'Comet Milkshake', price: 4.99, desc: 'Creamy vanilla shake with Oreo crumbles and cosmic sprinkles.', image: '🥤' }
    ]
  },
  {
    id: 'store_2',
    name: 'PharmaQuick',
    category: 'Pharmacy',
    rating: 4.9,
    prepTime: '5-10 mins',
    x: 650,
    y: 100,
    color: '#06b6d4',
    icon: '💊',
    items: [
      { id: 'pq_1', name: 'Instant Energy Booster', price: 5.99, desc: 'Effervescent Vitamin C and B-complex drink tablets.', image: '🧪' },
      { id: 'pq_2', name: 'Soothing First Aid Kit', price: 12.49, desc: 'Essential bandages, antiseptics, and healing ointments.', image: '🩹' },
      { id: 'pq_3', name: 'Premium Sleep Aid Capsules', price: 8.99, desc: 'All-natural herbal capsules for a perfect rest.', image: '💤' }
    ]
  },
  {
    id: 'store_3',
    name: 'MegaMart Groceries',
    category: 'Groceries',
    rating: 4.6,
    prepTime: '15-20 mins',
    x: 200,
    y: 380,
    color: '#10b981',
    icon: '🍏',
    items: [
      { id: 'mm_1', name: 'Organic Avocado Pack', price: 6.99, desc: 'Pack of 4 perfectly ripe, nutrient-rich Haas avocados.', image: '🥑' },
      { id: 'mm_2', name: 'Artisan Sourdough Loaf', price: 4.29, desc: 'Freshly baked whole wheat sourdough bread with a crispy crust.', image: '🍞' },
      { id: 'mm_3', name: 'Cold-Brew Concentrate', price: 8.99, desc: 'Strong, smooth organic cold brew coffee blend.', image: '☕' }
    ]
  },
  {
    id: 'store_4',
    name: 'Sushi Ninja',
    category: 'Food',
    rating: 4.7,
    prepTime: '15-22 mins',
    x: 600,
    y: 380,
    color: '#ec4899',
    icon: '🍣',
    items: [
      { id: 'sn_1', name: 'Shogun Sushi Platter', price: 18.99, desc: '12 pieces of assorted premium nigiri and maki rolls.', image: '🍣' },
      { id: 'sn_2', name: 'Spicy Tuna Crunch Roll', price: 11.49, desc: 'Tuna, cucumber, spicy mayo, and crunchy tempura flakes.', image: '🍤' },
      { id: 'sn_3', name: 'Matcha Mochi Ice Cream', price: 5.49, desc: 'Three sweet rice dough balls filled with premium green tea ice cream.', image: '🍡' }
    ]
  }
];

export const HOUSES = [
  { id: 'house_a', name: 'Westside Apartments', x: 100, y: 250, desc: 'Apt 402, Block B' },
  { id: 'house_b', name: 'East Heights Villa', x: 700, y: 250, desc: 'Villa No. 12, Gate 2' },
  { id: 'house_c', name: 'Downtown Condos', x: 400, y: 80, desc: 'Suite 108, Main St' },
  { id: 'house_d', name: 'South Gardens Residence', x: 450, y: 420, desc: 'House 5, Lane 3' }
];

export const RIDERS = [
  { id: 'rider_1', name: 'Alex', avatar: '🚴', type: 'Bicycle', rating: 4.9, speed: 1.2 },
  { id: 'rider_2', name: 'Sarah', avatar: '🛴', type: 'Electric Scooter', rating: 4.8, speed: 1.6 },
  { id: 'rider_3', name: 'Carlos', avatar: '🏍️', type: 'Motorcycle', rating: 4.7, speed: 2.2 }
];
