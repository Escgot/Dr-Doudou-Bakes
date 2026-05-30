// ── Product & Catalog ────────────────────────────────────────────────

export interface Badge {
  id: string;
  label: string;
  color: string; // hex color for badge pill
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in TND (Tunisian Dinar)
  image: string; // path or URL
  categoryId: string;
  badgeIds: string[];
  ingredients: string;
  dietaryNotes: string[];
  isPublished: boolean;
  createdAt: string; // ISO date
}

// ── Cart ─────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

// ── Delivery ─────────────────────────────────────────────────────────

export interface DeliveryWindow {
  id: string;
  label: string;      // e.g. "9:00 AM – 12:00 PM"
  startHour: number;   // 9
  endHour: number;     // 12
}

// ── Orders ───────────────────────────────────────────────────────────

export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryDate: string;      // ISO date
  deliveryWindow: string;    // label
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string;
  createdAt: string;         // ISO date
}

// ── Recipes ──────────────────────────────────────────────────────────

export interface IngredientGroup {
  title: string;
  items: string[];
}

export interface RecipeContent {
  title: string;
  description: string;
  category: string;
  tags: string[];
  quote?: string;
  ingredientGroups: IngredientGroup[];
  steps: string[];
}

export interface Recipe {
  id: string;
  imageUrl: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  translations: {
    EN: RecipeContent;
    FR: RecipeContent;
    AR: RecipeContent;
  };
}
