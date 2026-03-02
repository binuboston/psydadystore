import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  features: string[];
  inStock: boolean;
  badge?: 'new' | 'sale' | 'bestseller';
}

interface ProductStore {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string;
  /** Product ID for the hero banner promo. If null, falls back to first bestseller or first product. */
  featuredBannerProductId: string | null;
  /** Product IDs for the hero banner parallax carousel. If empty, uses bestsellers + featured. */
  featuredBannerProductIds: string[];
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFeaturedBannerProductId: (id: string | null) => void;
  setFeaturedBannerProductIds: (ids: string[]) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getFilteredProducts: () => Product[];
  getFeaturedBannerProduct: () => Product | undefined;
  getFeaturedBannerProducts: () => Product[];
}

// Black-only product imagery — local assets (see public/images/)
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Apex Chronograph',
    slug: 'apex-chronograph',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 127,
    description: 'Experience timeless elegance with the Apex Chronograph. Meticulously crafted with premium materials, featuring a sapphire crystal face, Swiss movement, and Italian leather strap. This timepiece seamlessly blends classic design with modern sophistication.',
    category: 'Watches',
    images: [
      '/images/black-watch-1.png',
      '/images/black-watch-2.png',
      '/images/black-watch-3.png',
      '/images/black-watch-1.png',
    ],
    sizes: ['36mm', '40mm', '42mm', '44mm'],
    features: [
      'Swiss automatic movement with 48-hour power reserve',
      'Scratch-resistant sapphire crystal with anti-reflective coating',
      'Water resistant up to 100 meters (10 ATM)',
      'Premium Italian leather strap with quick-release spring bars',
      'Luminous hands and markers for low-light visibility',
      'Date display window at 3 o\'clock position',
    ],
    inStock: true,
    badge: 'sale',
  },
  {
    id: '2',
    name: 'Meridian Minimalist',
    slug: 'meridian-minimalist',
    price: 189,
    rating: 4.6,
    reviewCount: 89,
    description: 'The Meridian Minimalist represents the perfect union of form and function. With its ultra-slim profile, clean dial design, and precision quartz movement, this watch is the ideal companion for the modern professional.',
    category: 'Watches',
    images: [
      '/images/black-watch-2.png',
      '/images/black-watch-3.png',
    ],
    sizes: ['38mm', '40mm', '42mm'],
    features: [
      'Japanese quartz movement for precision accuracy',
      'Ultra-slim 7mm case profile',
      'Stainless steel mesh bracelet',
      'Minimalist dial with no date window',
      'Water resistant to 50 meters',
      'Scratch-resistant mineral crystal',
    ],
    inStock: true,
    badge: 'bestseller',
  },
  {
    id: '3',
    name: 'Luxe Leather Tote',
    slug: 'luxe-leather-tote',
    price: 449,
    rating: 4.9,
    reviewCount: 203,
    description: 'Crafted from the finest full-grain leather, the Luxe Leather Tote combines timeless style with practical functionality. Perfect for daily commutes or weekend getaways, with multiple compartments to keep you organized.',
    category: 'Bags',
    images: [
      '/images/black-model-1.png',
      '/images/black-model-2.png',
    ],
    sizes: ['One Size'],
    features: [
      'Premium full-grain Italian leather',
      'Spacious main compartment with laptop sleeve',
      'Multiple interior pockets and organizers',
      'Comfortable shoulder straps with 10-inch drop',
      'Magnetic snap closure',
      'Gold-tone hardware accents',
    ],
    inStock: true,
    badge: 'new',
  },
  {
    id: '4',
    name: 'Urban Backpack Pro',
    slug: 'urban-backpack-pro',
    price: 159,
    rating: 4.7,
    reviewCount: 156,
    description: 'The Urban Backpack Pro is engineered for the modern commuter. Water-resistant fabric, ergonomic design, and smart organization make this the perfect everyday carry solution.',
    category: 'Bags',
    images: [
      '/images/black-model-3.png',
      '/images/black-model-4.png',
    ],
    sizes: ['One Size'],
    features: [
      'Water-resistant nylon construction',
      'Padded 15-inch laptop compartment',
      'USB charging port for on-the-go power',
      'Ergonomic padded shoulder straps',
      'Hidden anti-theft pocket',
      'Breathable back panel',
    ],
    inStock: true,
  },
  {
    id: '5',
    name: 'Classic Aviator Sunglasses',
    slug: 'classic-aviator-sunglasses',
    price: 129,
    originalPrice: 179,
    rating: 4.5,
    reviewCount: 94,
    description: 'Iconic design meets modern lens technology. These premium aviator sunglasses feature polarized lenses for superior glare reduction and 100% UV protection.',
    category: 'Accessories',
    images: [
      '/images/black-model-1.png',
      '/images/black-model-4.png',
    ],
    sizes: ['One Size'],
    features: [
      'Polarized lenses with 100% UV protection',
      'Premium metal frame construction',
      'Adjustable nose pads for comfort',
      'Scratch-resistant coating',
      'Includes protective carrying case',
      'Three-year warranty',
    ],
    inStock: true,
    badge: 'sale',
  },
  {
    id: '6',
    name: 'Signature Leather Wallet',
    slug: 'signature-leather-wallet',
    price: 89,
    rating: 4.8,
    reviewCount: 178,
    description: 'Slim, sophisticated, and built to last. This premium leather wallet features RFID protection and a minimalist design that fits comfortably in any pocket.',
    category: 'Accessories',
    images: [
      '/images/black-tshirt-flat-1.png',
      '/images/black-tshirt-flat-2.png',
    ],
    sizes: ['One Size'],
    features: [
      'Premium top-grain leather',
      'RFID blocking technology',
      '6 card slots and 2 bill compartments',
      'Slim profile design',
      'Contrast stitching detail',
      'Lifetime guarantee',
    ],
    inStock: true,
    badge: 'bestseller',
  },
  {
    id: '7',
    name: 'Cashmere Blend Scarf',
    slug: 'cashmere-blend-scarf',
    price: 119,
    rating: 4.9,
    reviewCount: 67,
    description: 'Luxuriously soft and beautifully crafted, this cashmere blend scarf adds elegance and warmth to any outfit. Perfect for cool evenings and winter days.',
    category: 'Accessories',
    images: [
      '/images/black-tshirt-model-1.png',
      '/images/black-tshirt-model-2.png',
    ],
    sizes: ['One Size'],
    features: [
      '70% cashmere, 30% wool blend',
      'Dimensions: 70" x 28"',
      'Lightweight yet warm',
      'Black',
      'Dry clean only',
      'Gift-ready packaging',
    ],
    inStock: true,
    badge: 'new',
  },
  {
    id: '8',
    name: 'Sport Chronograph Elite',
    slug: 'sport-chronograph-elite',
    price: 549,
    rating: 4.9,
    reviewCount: 245,
    description: 'Built for performance and precision. The Sport Chronograph Elite features a robust titanium case, ceramic bezel, and advanced chronograph functions for the active lifestyle.',
    category: 'Watches',
    images: [
      '/images/black-watch-1.png',
      '/images/black-watch-3.png',
    ],
    sizes: ['42mm', '44mm', '46mm'],
    features: [
      'Titanium case with ceramic bezel',
      'Swiss automatic chronograph movement',
      'Water resistant to 200 meters',
      'Sapphire crystal front and back',
      'Rubber sport strap with deployment clasp',
      'Luminous hands and hour markers',
    ],
    inStock: true,
    badge: 'new',
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  categories: ['All', 'Men', 'Kids', 'Gadgets', 'Watches', 'Bags', 'Accessories'],
  selectedCategory: null,
  searchQuery: '',
  featuredBannerProductId: null,
  featuredBannerProductIds: [],

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFeaturedBannerProductId: (id) => set({ featuredBannerProductId: id }),

  setFeaturedBannerProductIds: (ids) => set({ featuredBannerProductIds: ids }),

  getProductBySlug: (slug) => {
    return get().products.find((product) => product.slug === slug);
  },

  getFeaturedBannerProduct: () => {
    const { products, featuredBannerProductId } = get();
    if (featuredBannerProductId) {
      const product = products.find((p) => p.id === featuredBannerProductId);
      if (product) return product;
    }
    return products.find((p) => p.badge === 'bestseller') ?? products[0];
  },

  getFeaturedBannerProducts: () => {
    const { products, featuredBannerProductIds } = get();
    if (featuredBannerProductIds.length > 0) {
      const result = featuredBannerProductIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p != null);
      if (result.length > 0) return result;
    }
    const bestsellers = products.filter((p) => p.badge === 'bestseller');
    return bestsellers.length >= 3 ? bestsellers.slice(0, 3) : products.slice(0, 3);
  },

  getFilteredProducts: () => {
    const { products, selectedCategory, searchQuery } = get();
    
    let filtered = products;

    // Filter by category (Men, Kids, Gadgets map to product categories)
    if (selectedCategory && selectedCategory !== 'All') {
      const bannerCategoryMap: Record<string, string[]> = {
        Men: ['Watches', 'Bags'],
        Kids: ['Accessories'],
        Gadgets: ['Watches', 'Accessories'],
      };
      const mappedCategories = bannerCategoryMap[selectedCategory];
      if (mappedCategories) {
        filtered = filtered.filter((product) => mappedCategories.includes(product.category));
      } else {
        filtered = filtered.filter((product) => product.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  },
}));
