import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, MapPin, Package, ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import type { Order } from '@/types';

export function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { orders } = useProducts();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) setOrder(foundOrder);
    }
  }, [orderId, orders]);

  if (!order) {
    return (
      <div className="min-h-screen bg-cream pt-32 flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-primary/30 mb-4" />
        <h1 className="text-primary font-serif text-3xl mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the details for this order.</p>
        <Link to="/" className="bg-pink text-white px-8 py-3 rounded-full font-medium hover:bg-pink-dark transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  // Formatting date for display
  const deliveryDateObj = new Date(order.deliveryDate);
  const formattedDate = deliveryDateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-[#FEF6ED] min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-primary/5 relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

          {/* Success Header */}
          <div className="text-center mb-10 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>
            <h1 className="text-primary font-serif text-4xl mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your order, {order.customer.name.split(' ')[0]}.<br/>
              Your sweet treats are being prepared with love.
            </p>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-cream/30 p-6 rounded-2xl border border-primary/10">
            <div>
              <p className="text-primary/60 text-xs font-medium tracking-wider uppercase mb-1">Order Number</p>
              <p className="text-primary font-mono font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-primary/60 text-xs font-medium tracking-wider uppercase mb-1">Total Paid</p>
              <p className="text-primary font-serif font-bold text-lg">{order.total.toFixed(2)} TND</p>
            </div>
            <div>
              <p className="text-primary/60 text-xs font-medium tracking-wider uppercase mb-1">Payment</p>
              <p className="text-emerald-600 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Successful
              </p>
            </div>
          </div>

          {/* Delivery & Items Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-primary/10 pt-10">
            
            {/* Left: Delivery Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-primary font-serif text-xl mb-4 border-b border-primary/10 pb-2">Delivery Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary/60 mt-0.5" />
                    <div>
                      <p className="text-primary font-medium">{formattedDate}</p>
                      <p className="text-muted-foreground text-sm">Delivery Date</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary/60 mt-0.5" />
                    <div>
                      <p className="text-primary font-medium">{order.deliveryWindow}</p>
                      <p className="text-muted-foreground text-sm">Estimated Time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary/60 mt-0.5" />
                    <div>
                      <p className="text-primary font-medium line-clamp-2">{order.customer.address}</p>
                      <p className="text-muted-foreground text-sm">Delivery Address</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Items */}
            <div>
              <h3 className="text-primary font-serif text-xl mb-4 border-b border-primary/10 pb-2">Order Summary</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {order.items.map((item, idx) => (
                  <div key={`${item.product.id}-${idx}`} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0 border border-primary/5">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-muted-foreground text-xs">Qty: {item.quantity}</span>
                        <span className="text-primary text-sm font-medium">{(item.product.price * item.quantity).toFixed(2)} TND</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action */}
          <div className="mt-12 text-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center gap-2 bg-pink text-white px-8 py-4 rounded-xl font-medium tracking-wide hover:bg-pink-dark transition-all"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
