import type { Product } from '@/types';

export function getDiscountedPrice(product: Product, quantity: number = 1): number {
  if (!product.discountType || product.discountType === 'none' || !product.discountValue) {
    return product.price;
  }
  
  if (product.discountMinQuantity && quantity < product.discountMinQuantity) {
    return product.price;
  }
  
  if (product.discountType === 'percentage') {
    return product.price * (1 - (product.discountValue / 100));
  }
  
  if (product.discountType === 'amount') {
    return Math.max(0, product.price - product.discountValue);
  }
  
  return product.price;
}

export function hasDiscount(product: Product, quantity: number = 1): boolean {
  const discounted = getDiscountedPrice(product, quantity);
  return discounted < product.price;
}
