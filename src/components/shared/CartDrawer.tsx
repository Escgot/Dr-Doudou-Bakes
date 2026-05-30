import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, cartTotal, discount, appliedOffers, deliveryFee, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleCartClick = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <h2 className="text-primary font-serif text-2xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
                  <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-primary/30" />
                  </div>
                  <p className="font-serif text-lg text-primary">Your cart is empty</p>
                  <p className="text-sm px-8">Looks like you haven't added any sweet treats to your cart yet.</p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-primary/5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-primary font-sans text-sm font-semibold tracking-wide line-clamp-2">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-muted-foreground hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-primary/70 text-xs mt-1">{item.product.price.toFixed(2)} TND</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-cream rounded-full border border-primary/10 px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-primary text-xs font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-primary font-serif font-bold text-sm">
                            {(item.product.price * item.quantity).toFixed(2)} TND
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-primary/10 p-6 bg-cream/30">
                {appliedOffers.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {appliedOffers.map((offer, i) => (
                      <div key={i} className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center justify-between">
                        <span>{offer}</span>
                        {offer.includes('Free Delivery') && <span className="text-[10px] uppercase tracking-wider bg-emerald-200/50 px-1.5 py-0.5 rounded">Applied</span>}
                      </div>
                    ))}
                  </div>
                )}
                
                {discount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-600 text-sm font-medium">Discount</span>
                    <span className="text-emerald-600 font-serif font-medium">-{discount.toFixed(2)} TND</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-primary text-sm font-medium">Total</span>
                  <span className="text-primary font-serif text-2xl font-bold">{cartTotal.toFixed(2)} TND</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-primary text-white py-4 rounded-xl font-medium tracking-wide hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleCartClick}
                    className="w-full bg-white text-primary border border-primary py-3 rounded-xl font-medium tracking-wide hover:bg-cream transition-all"
                  >
                    View Cart
                  </button>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Delivery and taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
