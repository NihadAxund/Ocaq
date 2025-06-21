import { Product, Promotion, Office } from '@/types';

export const products: Product[] = [
  {
    id: 'skincare-1',
    name: 'Vitamin C Brightening Serum',
    description: 'Advanced vitamin C serum with 20% L-ascorbic acid for radiant, even-toned skin.',
    price: 89.99,
    distributorPrice: 65.99,
    images: [
      'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg',
      'https://images.pexels.com/photos/5938568/pexels-photo-5938568.jpeg'
    ],
    category: 'skin-care',
    brand: 'DermaClinical',
    inStock: true,
    rating: 4.8,
    reviews: 234,
    tags: ['vitamin-c', 'brightening', 'anti-aging', 'serum']
  },
  {
    id: 'skincare-2',
    name: 'Hyaluronic Acid Moisturizer',
    description: 'Ultra-hydrating moisturizer with hyaluronic acid for plump, dewy skin.',
    price: 76.99,
    distributorPrice: 56.99,
    images: [
      'https://images.pexels.com/photos/5938569/pexels-photo-5938569.jpeg',
      'https://images.pexels.com/photos/5938570/pexels-photo-5938570.jpeg'
    ],
    category: 'skin-care',
    brand: 'HydraLux',
    inStock: true,
    rating: 4.7,
    reviews: 189,
    tags: ['hyaluronic-acid', 'moisturizer', 'hydrating']
  },
  {
    id: 'haircare-1',
    name: 'Keratin Repair Shampoo',
    description: 'Professional-grade keratin shampoo for damaged and chemically treated hair.',
    price: 45.99,
    distributorPrice: 32.99,
    images: [
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg',
      'https://images.pexels.com/photos/4465125/pexels-photo-4465125.jpeg'
    ],
    category: 'hair-care',
    brand: 'KeratinPro',
    inStock: true,
    rating: 4.6,
    reviews: 156,
    tags: ['keratin', 'repair', 'shampoo', 'damaged-hair']
  },
  {
    id: 'supplements-1',
    name: 'Collagen Beauty Complex',
    description: 'Marine collagen supplement with biotin and vitamin E for healthy skin, hair, and nails.',
    price: 65.99,
    distributorPrice: 48.99,
    images: [
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      'https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg'
    ],
    category: 'supplements',
    brand: 'NutriBeauty',
    inStock: true,
    rating: 4.9,
    reviews: 312,
    tags: ['collagen', 'beauty', 'supplement', 'marine']
  },
  {
    id: 'medical-1',
    name: 'Professional Microdermabrasion Treatment',
    description: 'In-clinic microdermabrasion service performed by certified aestheticians.',
    price: 199.99,
    distributorPrice: 149.99,
    images: [
      'https://images.pexels.com/photos/3985299/pexels-photo-3985299.jpeg',
      'https://images.pexels.com/photos/3985300/pexels-photo-3985300.jpeg'
    ],
    category: 'medical-services',
    brand: 'MedSpa Pro',
    inStock: true,
    rating: 4.8,
    reviews: 89,
    tags: ['microdermabrasion', 'professional', 'treatment'],
    isDistributorOnly: true
  }
];

export const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Summer Skincare Sale',
    description: 'Save 25% on all skincare products this summer!',
    image: 'https://images.pexels.com/photos/5938571/pexels-photo-5938571.jpeg',
    discount: 25,
    code: 'SUMMER25',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    isActive: true
  },
  {
    id: 'promo-2',
    title: 'Hair Care Bundle',
    description: 'Buy 2 hair care products and get 1 free!',
    image: 'https://images.pexels.com/photos/4465127/pexels-photo-4465127.jpeg',
    discount: 33,
    code: 'HAIR2FOR1',
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    isActive: true
  },
  {
    id: 'promo-3',
    title: 'New Customer Discount',
    description: 'First-time customers get 15% off their entire order!',
    image: 'https://images.pexels.com/photos/5938572/pexels-photo-5938572.jpeg',
    discount: 15,
    code: 'WELCOME15',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true
  }
];

export const offices: Office[] = [
  {
    id: 'office-1',
    name: 'Headquarters - New York',
    address: '123 Beauty Ave, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'ny@dermabeauty.com',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'office-2',
    name: 'West Coast Office - Los Angeles',
    address: '456 Wellness Blvd, Los Angeles, CA 90210',
    phone: '+1 (555) 987-6543',
    email: 'la@dermabeauty.com',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 'office-3',
    name: 'Distribution Center - Chicago',
    address: '789 Commerce St, Chicago, IL 60601',
    phone: '+1 (555) 456-7890',
    email: 'chicago@dermabeauty.com',
    coordinates: { lat: 41.8781, lng: -87.6298 }
  }
];