import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, MapPin, Calendar, CreditCard, ShoppingBag } from 'lucide-react';
import { useCart, DELIVERY_REGIONS } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { DeliveryDatePicker } from '@/components/shared/DeliveryDatePicker';
import { PaymentForm } from '@/components/shared/PaymentForm';
import type { OrderCustomer } from '@/types';

type CheckoutStep = 'details' | 'delivery' | 'payment';

export function Checkout() {
  const { items, cartTotal, discount, appliedOffers, deliveryFee, deliveryDate, deliveryWindow, deliveryRegion, setDeliveryDate, setDeliveryWindow, setDeliveryRegion, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>('details');
  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '', email: '', phone: '', address: '', region: deliveryRegion || ''
  });

  const rawTotal = cartTotal + discount;
  const total = cartTotal + deliveryFee;

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.region) return;
    setStep('delivery');
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCustomer(c => ({...c, region: val}));
    setDeliveryRegion(val);
  };

  const handleDeliverySubmit = () => {
    if (deliveryDate && deliveryWindow) {
      setStep('payment');
    }
  };

  const handlePaymentSuccess = () => {
    // Generate order ID
    const orderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    // Save order
    addOrder({
      id: orderId,
      items: [...items], // clone items
      customer,
      subtotal: cartTotal,
      deliveryFee,
      total,
      deliveryDate: deliveryDate!,
      deliveryWindow: deliveryWindow!,
      status: 'pending',
      paymentStatus: 'succeeded',
      createdAt: new Date().toISOString(),
    });

    // Clear cart and redirect
    clearCart();
    navigate(`/order-confirmation?id=${orderId}`, { replace: true });
  };

  const steps = [
    { id: 'details', label: 'Details', icon: MapPin },
    { id: 'delivery', label: 'Delivery', icon: Calendar },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  if (items.length === 0) return null;

  return (
    <div className="bg-[#FEF6ED] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <Link to="/cart" className="text-primary text-sm font-medium hover:underline mb-6 inline-block">
            &larr; Back to Cart
          </Link>
          <h1 className="text-primary font-serif text-4xl mb-8">Checkout</h1>
          
          {/* Progress Indicator */}
          <div className="flex items-center max-w-2xl">
            {steps.map((s, idx) => {
              const isPast = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;
              return (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-colors ${
                    isPast ? 'bg-pink border-pink text-white' :
                    isCurrent ? 'border-primary text-primary bg-white' :
                    'border-primary/20 text-primary/40 bg-transparent'
                  }`}>
                    {isPast ? <Check className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className={`ml-3 text-sm font-medium hidden sm:block ${isCurrent || isPast ? 'text-primary' : 'text-primary/40'}`}>
                    {s.label}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-px mx-4 ${isPast ? 'bg-pink' : 'bg-pink/20'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Flow Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Details */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-primary/5"
                >
                  <h2 className="text-primary font-serif text-2xl mb-6">Customer Details</h2>
                  <form onSubmit={handleDetailsSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Full Name *</label>
                        <input
                          required
                          value={customer.name}
                          onChange={e => setCustomer({...customer, name: e.target.value})}
                          className="w-full px-4 py-3 bg-cream/30 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Phone Number *</label>
                        <input
                          required
                          type="tel"
                          value={customer.phone}
                          onChange={e => setCustomer({...customer, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-cream/30 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}
                        className="w-full px-4 py-3 bg-cream/30 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Delivery Region *</label>
                      <select
                        required
                        value={customer.region || ''}
                        onChange={handleRegionChange}
                        className="w-full px-4 py-3 bg-cream/30 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="" disabled>Select your region</option>
                        {DELIVERY_REGIONS.map(r => (
                          <option key={r.id} value={r.id}>{r.label} ({r.price} TND)</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-primary text-xs font-medium tracking-wider mb-2 block">Delivery Address *</label>
                      <textarea
                        required
                        rows={3}
                        value={customer.address}
                        onChange={e => setCustomer({...customer, address: e.target.value})}
                        placeholder="Street address, apartment, suite, etc."
                        className="w-full px-4 py-3 bg-cream/30 border border-primary/20 rounded-xl text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                      />
                    </div>
                    <div className="pt-4 border-t border-primary/10">
                      <button type="submit" className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 bg-pink text-white px-8 py-3 rounded-xl font-medium tracking-wide hover:bg-pink-dark transition-colors">
                        Continue to Delivery <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Delivery */}
              {step === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <DeliveryDatePicker
                    selectedDate={deliveryDate}
                    selectedWindow={deliveryWindow}
                    onSelectDate={setDeliveryDate}
                    onSelectWindow={setDeliveryWindow}
                  />
                  
                  <div className="flex items-center justify-between mt-8">
                    <button onClick={() => setStep('details')} className="text-primary text-sm font-medium hover:underline">
                      &larr; Back to Details
                    </button>
                    <button 
                      onClick={handleDeliverySubmit}
                      disabled={!deliveryDate || !deliveryWindow}
                      className="flex items-center justify-center gap-2 bg-pink text-white px-8 py-3 rounded-xl font-medium tracking-wide hover:bg-pink-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <PaymentForm 
                    amount={total} 
                    onSuccess={handlePaymentSuccess} 
                    onBack={() => setStep('delivery')} 
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-primary/5 sticky top-32">
              <h3 className="text-primary font-serif text-xl mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Order Summary
              </h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-primary text-sm font-medium line-clamp-1">{item.product.name}</h4>
                      <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                      <p className="text-primary/80 text-sm font-medium mt-1">{(item.product.price * item.quantity).toFixed(2)} TND</p>
                    </div>
                  </div>
                ))}
              </div>

              {appliedOffers.length > 0 && (
                <div className="mb-6 space-y-2">
                  <div className="text-primary font-medium text-sm mb-2">Applied Offers:</div>
                  {appliedOffers.map((offer, i) => (
                    <div key={i} className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 flex flex-col xl:flex-row xl:items-center justify-between gap-1">
                      <span>{offer}</span>
                      {offer.includes('Free Delivery') && <span className="w-fit text-[10px] uppercase tracking-wider bg-emerald-200/50 px-1.5 py-0.5 rounded">Applied</span>}
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 pt-6 border-t border-primary/10 text-sm">
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
                  {deliveryFee === 0 && discount > 0 && appliedOffers.some(o => o.includes('Free Delivery')) ? (
                    <span className="text-emerald-600 font-medium uppercase text-xs tracking-wider">Free</span>
                  ) : !deliveryRegion ? (
                    <span className="text-primary/60 italic text-sm">Select region</span>
                  ) : (
                    <span className="text-primary font-medium">{deliveryFee.toFixed(2)} TND</span>
                  )}
                </div>
                
                <div className="flex justify-between items-end pt-3 border-t border-primary/5 mt-3">
                  <span className="text-primary font-medium">Total</span>
                  <span className="text-primary font-serif text-2xl font-bold">{total.toFixed(2)} <span className="text-sm font-normal">TND</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
