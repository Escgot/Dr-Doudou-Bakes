import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { normalizeImageFields } from '@/lib/imagePaths';
import { getDiscountedPrice } from '@/lib/discount';
import type { CartItem, Product, ProductVariant } from '@/types';

// ── Storage ──────────────────────────────────────────────────────────

const CART_KEY = 'ddb_cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      return (JSON.parse(raw) as CartItem[]).map(item => ({
        ...item,
        product: normalizeImageFields(item.product),
      }));
    }
  } catch { /* ignore */ }
  return [];
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch { /* storage full */ }
}

// ── Context ──────────────────────────────────────────────────────────

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  discount: number;
  appliedOffers: string[];
  deliveryFee: number;
  addToCart: (product: Product, quantity?: number, selectedVariant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  isInCart: (productId: string, variantId?: string) => boolean;
  // Delivery selection (stored here so it persists through checkout steps)
  deliveryDate: string | null;
  deliveryWindow: string | null;
  deliveryRegion: string | null;
  setDeliveryDate: (date: string | null) => void;
  setDeliveryWindow: (window: string | null) => void;
  setDeliveryRegion: (region: string | null) => void;
  // Drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────

export const DELIVERY_REGIONS = [
  { id: 'monastir', label: 'Livraison à domicile (Monastir)', price: 3 },
  { id: 'monastir-pickup', label: "Pick-up Monastir (devant l'association Voix de l'Enfant / Marine Nationale)", price: 0 },
  { id: 'sfax-zone-1', label: 'Sfax (Route de Tunis / Route de Mahdia / Nassria)', price: 5 },
  { id: 'sfax-zone-2', label: 'Sfax (Bouacida / Kaaniche)', price: 1 }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [deliveryWindow, setDeliveryWindow] = useState<string | null>(null);
  const [deliveryRegion, setDeliveryRegion] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist
  useEffect(() => saveCart(items), [items]);

  // Derived
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const rawTotal = items.reduce((sum, item) => sum + getDiscountedPrice(item.product, item.quantity, item.selectedVariant) * item.quantity, 0);

  // Promotion Engine
  let discount = 0;
  let hasFreeDelivery = false;
  const appliedOffers: string[] = [];

  // Group items by category for processing (use discounted unit prices)
  const cheesecakes = items
    .filter(i => i.product.categoryId === 'cat-3')
    .flatMap(i => Array(i.quantity).fill(getDiscountedPrice(i.product, i.quantity, i.selectedVariant)))
    .sort((a, b) => b - a); // Sort descending to maximize discount for user

  const brownies = items
    .filter(i => i.product.categoryId === 'cat-4')
    .flatMap(i => Array(i.quantity).fill(getDiscountedPrice(i.product, i.quantity, i.selectedVariant)))
    .sort((a, b) => b - a);

  // Cheesecake Offer Logic: 7 for 38 (Free Del), then 4 for 20
  let ccIndex = 0;
  const sevens = Math.floor(cheesecakes.length / 7);
  for (let i = 0; i < sevens; i++) {
    const chunk = cheesecakes.slice(ccIndex, ccIndex + 7);
    const chunkSum = chunk.reduce((a, b) => a + b, 0);
    const offerDiscount = Math.max(0, chunkSum - 38);
    if (offerDiscount > 0) {
      discount += offerDiscount;
      hasFreeDelivery = true;
      appliedOffers.push('7 Cheesecakes for 38 TND + Free Delivery');
    }
    ccIndex += 7;
  }
  const fours = Math.floor((cheesecakes.length - ccIndex) / 4);
  for (let i = 0; i < fours; i++) {
    const chunk = cheesecakes.slice(ccIndex, ccIndex + 4);
    const chunkSum = chunk.reduce((a, b) => a + b, 0);
    const offerDiscount = Math.max(0, chunkSum - 20);
    if (offerDiscount > 0) {
      discount += offerDiscount;
      appliedOffers.push('4 Cheesecakes for 20 TND');
    }
    ccIndex += 4;
  }

  // Brownie Offer Logic: 15 for 40 (Free Del), then 4 for 10
  let brIndex = 0;
  const fifteens = Math.floor(brownies.length / 15);
  for (let i = 0; i < fifteens; i++) {
    const chunk = brownies.slice(brIndex, brIndex + 15);
    const chunkSum = chunk.reduce((a, b) => a + b, 0);
    const offerDiscount = Math.max(0, chunkSum - 40);
    if (offerDiscount > 0) {
      discount += offerDiscount;
      hasFreeDelivery = true;
      appliedOffers.push('15 Brownies for 40 TND + Free Delivery');
    }
    brIndex += 15;
  }
  const foursBr = Math.floor((brownies.length - brIndex) / 4);
  for (let i = 0; i < foursBr; i++) {
    const chunk = brownies.slice(brIndex, brIndex + 4);
    const chunkSum = chunk.reduce((a, b) => a + b, 0);
    const offerDiscount = Math.max(0, chunkSum - 10);
    if (offerDiscount > 0) {
      discount += offerDiscount;
      appliedOffers.push('4 Brownies for 10 TND');
    }
    brIndex += 4;
  }

  // Custom Product Free Delivery Logic
  for (const item of items) {
    if (item.product.freeDeliveryMinQuantity && item.quantity >= item.product.freeDeliveryMinQuantity) {
      if (!hasFreeDelivery) {
        hasFreeDelivery = true;
        appliedOffers.push(`Free Delivery (from ${item.product.name})`);
      }
    }
  }

  // Final totals
  const cartTotal = Math.max(0, rawTotal - discount);
  const regionPrice = DELIVERY_REGIONS.find(r => r.id === deliveryRegion)?.price || 0;
  const deliveryFee = (items.length > 0 && !hasFreeDelivery && deliveryRegion) ? regionPrice : 0;


  const addToCart = useCallback((product: Product, quantity = 1, selectedVariant?: ProductVariant) => {
    const normalizedProduct = normalizeImageFields(product);
    setItems(prev => {
      const existing = prev.find(item => item.product.id === normalizedProduct.id && item.selectedVariant?.id === selectedVariant?.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === normalizedProduct.id && item.selectedVariant?.id === selectedVariant?.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: normalizedProduct, quantity, selectedVariant }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, variantId?: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedVariant?.id === variantId)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedVariant?.id === variantId)));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedVariant?.id === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDeliveryDate(null);
    setDeliveryWindow(null);
    setDeliveryRegion(null);
  }, []);

  const isInCart = useCallback(
    (productId: string, variantId?: string) => items.some(item => item.product.id === productId && item.selectedVariant?.id === variantId),
    [items]
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items, cartCount, cartTotal, discount, appliedOffers, deliveryFee,
        addToCart, removeFromCart, updateQuantity, clearCart, isInCart,
        deliveryDate, deliveryWindow, deliveryRegion, setDeliveryDate, setDeliveryWindow, setDeliveryRegion,
        isCartOpen, openCart, closeCart, toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
