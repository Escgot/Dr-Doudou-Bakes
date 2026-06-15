import type { Product, ProductVariant } from '@/types';

export function getDiscountedPrice(product: Product, quantity: number = 1, selectedVariant?: ProductVariant): number {
  const basePrice = selectedVariant ? selectedVariant.price : product.price;

  if (!product.discountType || product.discountType === 'none' || !product.discountValue) {
    return basePrice;
  }
  
  if (product.discountMinQuantity && quantity < product.discountMinQuantity) {
    return basePrice;
  }
  
  if (product.discountType === 'percentage') {
    return basePrice * (1 - (product.discountValue / 100));
  }
  
  if (product.discountType === 'amount') {
    return Math.max(0, basePrice - product.discountValue);
  }
  
  return basePrice;
}

export function hasDiscount(product: Product, quantity: number = 1, selectedVariant?: ProductVariant): boolean {
  const basePrice = selectedVariant ? selectedVariant.price : product.price;
  const discounted = getDiscountedPrice(product, quantity, selectedVariant);
  return discounted < basePrice;
}
