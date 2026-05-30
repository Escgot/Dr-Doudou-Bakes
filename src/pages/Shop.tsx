import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingBag, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

export function Shop() {
  const { t } = useLanguage();
  const { categories, getProductsByCategory, getBadgesForProduct } = useProducts();
  const { addToCart, isInCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('cat-1');
  
  // Animation state for tracking which product was just added to cart
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());

  const displayedProducts = getProductsByCategory(activeCategory);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent triggering link
    e.stopPropagation();
    
    addToCart(product);
    
    // Show checkmark animation temporarily
    setAddedItemIds(prev => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItemIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="bg-primary pt-10 lg:pt-16 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-video shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-20 sm:-mb-28 lg:-mb-36 translate-y-10 sm:translate-y-16 lg:translate-y-24"
          >
            <img
              src="/images/desserts/tart.png"
              alt="Shop Online"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center px-4"
              >
                <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-6xl tracking-wide drop-shadow-md">
                  Shop Online
                </h1>
                <p className="text-white/90 mt-2 sm:mt-4 text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto font-light drop-shadow-sm">
                  Order your favorite Dr Doudou Bakes treats for local delivery.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="bg-[#FEF6ED] pt-32 sm:pt-44 lg:pt-64 pb-16 lg:py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Navigation */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-pink text-white shadow-lg scale-105'
                      : 'bg-white text-primary border border-pink/20 hover:border-pink hover:bg-pink/5'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Products Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product) => {
                const badges = getBadgesForProduct(product);
                const isAdded = addedItemIds.has(product.id);
                const inCart = isInCart(product.id);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group h-full"
                  >
                    <Link to={`/products/${product.slug}`} className="block h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5 flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${product.image}')` }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {badges.map(badge => (
                            <span
                              key={badge.id}
                              className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider"
                              style={{ color: badge.color }}
                            >
                              {badge.label}
                            </span>
                          ))}
                        </div>
                        
                        {/* Interactive overlay element */}
                        <div className="absolute inset-0 bg-pink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-medium tracking-wider flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            View Details <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2 gap-4">
                          <h3 className="font-serif text-xl text-primary leading-tight group-hover:text-primary-dark transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-primary font-bold whitespace-nowrap">
                            {product.price.toFixed(2)} TND
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                          {product.description}
                        </p>
                        
                        {/* Quick Add Button */}
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`w-full py-3 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : inCart
                              ? 'bg-secondary text-primary border border-pink/20 hover:bg-pink hover:text-white'
                              : 'bg-pink text-white hover:bg-pink-dark'
                          }`}
                        >
                          {isAdded ? (
                            <><Check className="w-4 h-4" /> Added!</>
                          ) : (
                            <><ShoppingBag className="w-4 h-4" /> {inCart ? 'Add Another' : 'Add to Cart'}</>
                          )}
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          
          {displayedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-primary/60 font-serif text-xl">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
