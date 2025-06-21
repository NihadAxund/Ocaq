export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  distributorPrice?: number;
  images: string[];
  category: 'skin-care' | 'hair-care' | 'supplements' | 'medical-services';
  brand: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  isDistributorOnly?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'distributor' | 'admin';
  isLoggedIn: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  code: string;
  expiresAt: Date;
  isActive: boolean;
}

export interface DistributorApplication {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  documents: File[];
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}