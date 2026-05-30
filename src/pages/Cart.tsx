import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function Cart() {
  const { items, cartTotal, discount, appliedOffers, deliveryFee, updateQuantity, removeFromCart } = useCart();

  const rawTotal = cartTotal + discount;
  const total = cartTotal + deliveryFee;

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-primary pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-serif text-4xl lg:text-6xl tracking-wide"
          >
            Your Shopping Cart
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/70 mt-4 text-sm"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Cart</span>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <AnimatedSection className="text-center py-16">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShoppingBag className="w-10 h-10 text-primary/30" />
              </div>
              <h2 className="text-primary font-serif text-3xl mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any sweet treats to your cart yet. Discover our premium collections and find your new favorite dessert.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink text-white rounded-full font-medium tracking-wide hover:bg-pink-dark transition-colors"
              >
                Start Shopping
              </Link>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatedSection>
                  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-primary/5">
                    {/* Header Row */}
                    <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-primary/10 text-xs font-medium text-primary tracking-wider uppercase">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-3 text-center">Quantity</div>
                      <div className="col-span-3 text-right">Total</div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-primary/5">
                      {items.map((item) => (
                        <div key={item.product.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          {/* Product Info */}
                          <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                            <Link to={`/products/${item.product.slug}`} className="w-24 h-24 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-primary/5 group">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </Link>
                            <div className="flex flex-col gap-1">
                              <Link to={`/products/${item.product.slug}`} className="text-primary font-sans text-base font-semibold hover:underline">
                                {item.product.name}
                              </Link>
                              <span className="text-primary/70 text-sm">{item.product.price.toFixed(2)} TND</span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-400 hover:text-red-500 text-xs flex items-center gap-1 mt-2 w-fit transition-colors"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          </div>

                          {/* Quantity (Mobile layout adjustments) */}
                          <div className="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center">
                            <span className="md:hidden text-muted-foreground text-sm">Quantity</span>
                            <div className="flex items-center gap-3 bg-cream rounded-full border border-primary/10 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-primary font-medium w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center">
                            <span className="md:hidden text-muted-foreground text-sm">Total</span>
                            <span className="text-primary font-serif text-lg font-bold">
                              {(item.product.price * item.quantity).toFixed(2)} TND
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-primary/5 sticky top-32">
                    <h3 className="text-primary font-serif text-2xl mb-6">Order Summary</h3>
                    
                    {appliedOffers.length > 0 && (
                      <div className="mb-6 space-y-2">
                        <div className="text-primary font-medium text-sm mb-2">Applied Offers:</div>
                        {appliedOffers.map((offer, i) => (
                          <div key={i} className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span>{offer}</span>
                            {offer.includes('Free Delivery') && <span className="w-fit text-[10px] uppercase tracking-wider bg-emerald-200/50 px-1.5 py-0.5 rounded">Applied</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-4 mb-6 text-sm">
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="text-primary font-medium">{rawTotal.toFixed(2)} TND</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-emerald-600 font-medium">
                          <span>Discount</span>
                          <span>-{discount.toFixed(2)} TND</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>Delivery</span>
                        {deliveryFee === 0 && discount > 0 ? (
                          <span className="text-emerald-600 font-medium uppercase text-xs tracking-wider">Free</span>
                        ) : (
                          <span className="text-primary font-medium">{deliveryFee.toFixed(2)} TND</span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-primary/10 pt-4 mb-8">
                      <div className="flex justify-between items-end">
                        <span className="text-primary font-medium">Total</span>
                        <span className="text-primary font-serif text-3xl font-bold">{total.toFixed(2)} <span className="text-lg font-normal">TND</span></span>
                      </div>
                      <p className="text-xs text-muted-foreground text-right mt-1">Includes taxes</p>
                    </div>

                    <Link
                      to="/checkout"
                      className="w-full bg-pink text-white py-4 rounded-xl font-medium tracking-wide hover:bg-pink-dark transition-all flex items-center justify-center gap-2 group mb-4"
                    >
                      Checkout Securely
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link
                      to="/shop"
                      className="w-full block text-center text-primary font-medium text-sm hover:underline"
                    >
                      Continue Shopping
                    </Link>

                    {/* Trust badges */}
                    <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-center gap-4 text-muted-foreground/50">
                      {/* Placeholder for payment icons */}
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                      <div className="h-8 w-12 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
