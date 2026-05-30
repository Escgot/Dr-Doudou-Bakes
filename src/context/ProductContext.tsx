import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product, Category, Badge, Order } from '@/types';

// ── Seed Data ────────────────────────────────────────────────────────

const SEED_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'All', slug: 'all' },
  { id: 'cat-2', name: 'Cakes', slug: 'cakes' },
  { id: 'cat-3', name: 'Cheesecakes', slug: 'cheesecakes' },
  { id: 'cat-4', name: 'Brownies & Bars', slug: 'brownies-bars' },
  { id: 'cat-5', name: 'Pies', slug: 'pies' },
  { id: 'cat-6', name: 'Macarons', slug: 'macarons' },
  { id: 'cat-7', name: 'Tarts', slug: 'tarts' },
  { id: 'cat-8', name: 'Truffles', slug: 'truffles' },
  { id: 'cat-9', name: 'Gluten-Free', slug: 'gluten-free' },
  { id: 'cat-10', name: 'Traditional', slug: 'traditional' },
];

const SEED_BADGES: Badge[] = [
  { id: 'bdg-1', label: 'Bestseller', color: '#D4A574' },
  { id: 'bdg-2', label: 'New', color: '#BA7B63' },
  { id: 'bdg-3', label: 'Gluten-Free', color: '#6B8F5E' },
  { id: 'bdg-4', label: 'Vegan', color: '#5E8F6B' },
  { id: 'bdg-5', label: 'Premium', color: '#834731' },
  { id: 'bdg-6', label: 'Seasonal', color: '#C4886E' },
];

const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tiramisu Style Cheesecake',
    slug: 'Tiramisu Style Cheesecake',
    description: 'Our chef-crafted snacks and mini desserts deliver exceptional flavor and shelf appeal in a single-serving size. Rich Belgian chocolate with a fudgy center.',
    price: 35.00,
    image: '/images/desserts/Tiramisu-Cheesecak.png',
    categoryId: 'cat-3',
    badgeIds: ['bdg-2', 'bdg-5'],
    ingredients: 'Belgian chocolate (cocoa mass, sugar, cocoa butter, soy lecithin), butter, free-range eggs, wheat flour, vanilla extract, sea salt flakes.',
    dietaryNotes: ['Contains: Gluten, Eggs, Dairy, Soy'],
    isPublished: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'Chocolate Cheesecake',
    slug: 'chocolate cheesecake',
    description: 'Retail-ready classic bakery items in convenient packaging, perfectly portioned, and available in a range of sizes. A traditional Tunisian delight with almonds.',
    price: 5.5,
    image: '/images/desserts/Chocolate-Cheesecake.png',
    categoryId: 'cat-3',
    badgeIds: ['bdg-1', 'bdg-5'],
    ingredients: 'Almonds, sugar, rose water, semolina, butter, orange blossom water, honey, powdered sugar',
    dietaryNotes: ['Contains: Tree Nuts, Dairy', 'Egg-Free'],
    isPublished: true,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Speculoos Cheesecake',
    slug: 'Speculoos Cheesecake',
    description: 'Visually stunning, scratch-made multi-layer bar cakes, round cakes, molten, and gluten-free cakes crafted to perfection by our master pastry chefs.',
    price: 5.5,
    image: '/images/desserts/Speculoos-Cheesecake.png',
    categoryId: 'cat-3',
    badgeIds: ['bdg-2', 'bdg-5'],
    ingredients: 'Wheat flour, butter, sugar, eggs, Madagascar vanilla, cream cheese, heavy cream, fresh strawberries, white chocolate',
    dietaryNotes: ['Contains: Gluten, Eggs, Dairy'],
    isPublished: true,
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Strawberry Cheesecake',
    slug: 'Strawberry Cheesecake',
    description: 'A premium collection of dessert bars and brownies with our signature layering capabilities, ideal for on-the-go formats. Buttery shortcrust meets rich chocolate.',
    price: 6.00,
    image: '/images/desserts/Strawberry-Cheesecake.png',
    categoryId: 'cat-2',
    badgeIds: ['bdg-5'],
    ingredients: 'Dark chocolate, butter, eggs, sugar, wheat flour, cocoa powder, vanilla extract, sea salt, walnut pieces',
    dietaryNotes: ['Contains: Gluten, Eggs, Dairy, Tree Nuts'],
    isPublished: true,
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'prod-5',
    name: 'Brownies',
    slug: 'Brownies',
    description: 'An impressive assortment of smooth & creamy cheesecakes made with real cream cheese and fresh ingredients. New York style with a graham cracker crust.',
    price: 3.00,
    image: '/images/desserts/brownies.webp',
    categoryId: 'cat-10',
    badgeIds: ['bdg-1', 'bdg-5'],
    ingredients: 'Cream cheese, sour cream, eggs, sugar, graham crackers, butter, vanilla extract, lemon zest, heavy cream',
    dietaryNotes: ['Contains: Gluten, Eggs, Dairy'],
    isPublished: true,
    createdAt: '2026-01-25T10:00:00Z',
  },
];

// ── Storage Keys ─────────────────────────────────────────────────────

const STORAGE_KEYS = {
  products: 'ddb_products',
  categories: 'ddb_categories',
  badges: 'ddb_badges',
  orders: 'ddb_orders',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* corrupt data, use fallback */ }
  return fallback;
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* storage full */ }
}

// ── Context ──────────────────────────────────────────────────────────

interface ProductContextType {
  products: Product[];
  categories: Category[];
  badges: Badge[];
  orders: Order[];
  publishedProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getBadgesForProduct: (product: Product) => Badge[];
  getCategoryById: (id: string) => Category | undefined;
  // CRUD — Products
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  togglePublish: (id: string) => void;
  // CRUD — Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // CRUD — Badges
  addBadge: (badge: Omit<Badge, 'id'>) => void;
  updateBadge: (id: string, updates: Partial<Badge>) => void;
  deleteBadge: (id: string) => void;
  // Orders
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ── Helper ───────────────────────────────────────────────────────────

let idCounter = Date.now();
function uid(prefix: string) {
  return `${prefix}-${(idCounter++).toString(36)}`;
}

// ── Provider ─────────────────────────────────────────────────────────

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(STORAGE_KEYS.products, SEED_PRODUCTS)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage(STORAGE_KEYS.categories, SEED_CATEGORIES)
  );
  const [badges, setBadges] = useState<Badge[]>(() =>
    loadFromStorage(STORAGE_KEYS.badges, SEED_BADGES)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage(STORAGE_KEYS.orders, [])
  );

  // Persist on change
  useEffect(() => saveToStorage(STORAGE_KEYS.products, products), [products]);
  useEffect(() => saveToStorage(STORAGE_KEYS.categories, categories), [categories]);
  useEffect(() => saveToStorage(STORAGE_KEYS.badges, badges), [badges]);
  useEffect(() => saveToStorage(STORAGE_KEYS.orders, orders), [orders]);

  // ── Derived ──────────────────────────────────────────────────────
  const publishedProducts = products.filter(p => p.isPublished);

  const getProductBySlug = useCallback(
    (slug: string) => products.find(p => p.slug === slug),
    [products]
  );

  const getProductsByCategory = useCallback(
    (categoryId: string) => {
      if (categoryId === 'cat-1') return publishedProducts; // "All"
      return publishedProducts.filter(p => p.categoryId === categoryId);
    },
    [publishedProducts]
  );

  const getBadgesForProduct = useCallback(
    (product: Product) => badges.filter(b => product.badgeIds.includes(b.id)),
    [badges]
  );

  const getCategoryById = useCallback(
    (id: string) => categories.find(c => c.id === id),
    [categories]
  );

  // ── CRUD — Products ──────────────────────────────────────────────
  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: uid('prod'),
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const togglePublish = useCallback((id: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, isPublished: !p.isPublished } : p))
    );
  }, []);

  // ── CRUD — Categories ────────────────────────────────────────────
  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: uid('cat') }]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // ── CRUD — Badges ────────────────────────────────────────────────
  const addBadge = useCallback((badge: Omit<Badge, 'id'>) => {
    setBadges(prev => [...prev, { ...badge, id: uid('bdg') }]);
  }, []);

  const updateBadge = useCallback((id: string, updates: Partial<Badge>) => {
    setBadges(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)));
  }, []);

  const deleteBadge = useCallback((id: string) => {
    setBadges(prev => prev.filter(b => b.id !== id));
  }, []);

  // ── Orders ───────────────────────────────────────────────────────
  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [...prev, order]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products, categories, badges, orders,
        publishedProducts,
        getProductBySlug, getProductsByCategory, getBadgesForProduct, getCategoryById,
        addProduct, updateProduct, deleteProduct, togglePublish,
        addCategory, updateCategory, deleteCategory,
        addBadge, updateBadge, deleteBadge,
        addOrder, updateOrderStatus, deleteOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
