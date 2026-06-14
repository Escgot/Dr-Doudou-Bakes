import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, ShoppingBag, Leaf, WheatOff, Wheat, Info, ArrowLeft, Egg, Milk, Nut, Bean, EggOff, Vegan } from 'lucide-react';
import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { getDiscountedPrice, hasDiscount } from '@/lib/discount';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, getBadgesForProduct, getCategoryById, publishedProducts } = useProducts();
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary font-serif text-3xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="text-primary underline hover:no-underline">
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  const productBadges = getBadgesForProduct(product);
  const category = getCategoryById(product.categoryId);
  let relatedProducts = publishedProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // Fallback: If no products in the same category, show the newest products instead
  if (relatedProducts.length === 0) {
    relatedProducts = publishedProducts
      .filter(p => p.id !== product.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  }
  const ingredientsList = product.ingredients.split(',').map(i => i.trim());
  const alreadyInCart = isInCart(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const getDietaryIcons = (note: string) => {
    const lower = note.toLowerCase();
    const icons = [];

    // Positives / Features
    if (lower.includes('vegan')) icons.push(<Vegan key="vegan" className="w-4 h-4 text-emerald-600" title="Vegan" />);

    if (lower.includes('gluten-free') || lower.includes('no gluten')) {
      icons.push(<WheatOff key="gf" className="w-4 h-4 text-emerald-600" title="Gluten-Free" />);
    } else if (lower.includes('gluten') || lower.includes('wheat')) {
      icons.push(<Wheat key="wheat" className="w-4 h-4 text-amber-600" title="Contains Gluten" />);
    }

    if (lower.includes('egg-free') || lower.includes('no egg')) {
      icons.push(<EggOff key="ef" className="w-4 h-4 text-emerald-600" title="Egg-Free" />);
    } else if (lower.includes('egg')) {
      icons.push(<Egg key="egg" className="w-4 h-4 text-amber-500" title="Contains Eggs" />);
    }

    // Allergens / Contains
    if (lower.includes('dairy') || lower.includes('milk') || lower.includes('cheese')) {
      icons.push(<Milk key="milk" className="w-4 h-4 text-blue-400" title="Contains Dairy" />);
    }
    if (lower.includes('nut') || lower.includes('almond') || lower.includes('pecan') || lower.includes('walnut')) {
      icons.push(<Nut key="nut" className="w-4 h-4 text-orange-700" title="Contains Nuts" />);
    }
    if (lower.includes('soy')) {
      icons.push(<Bean key="soy" className="w-4 h-4 text-lime-600" title="Contains Soy" />);
    }

    // Fallback
    if (icons.length === 0) {
      icons.push(<Info key="info" className="w-4 h-4 text-primary" />);
    }

    return icons;
  };

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-primary pt-4 sm:pt-10 lg:pt-16 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-28 lg:-mb-36 translate-y-16 lg:translate-y-24"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="p-6 lg:p-10 w-full"
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.discountType && product.discountType !== 'none' && (
                    <span className="px-3 py-1 rounded-full text-white text-xs font-medium bg-red-500 shadow-lg">
                      {product.discountType === 'percentage' ? `-${product.discountValue}%` : `-${product.discountValue?.toFixed(2)} TND`}
                      {product.discountMinQuantity && product.discountMinQuantity > 1 && ` (min ${product.discountMinQuantity})`}
                    </span>
                  )}
                  {productBadges.map(badge => (
                    <span
                      key={badge.id}
                      className="px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
                      style={{ backgroundColor: badge.color + 'CC' }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
                <h1 className="text-white font-serif text-3xl lg:text-5xl tracking-wide">
                  {product.name}
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="pt-44 lg:pt-64 pb-0 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            {category && (
              <>
                <span className="hover:text-primary transition-colors">{category.name}</span>
                <ChevronRight className="w-3 h-3" />
              </>
            )}
            <span className="text-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Info + Add to Cart */}
      <section className="pb-16 lg:pb-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left - Details (3 cols) */}
            <AnimatedSection className="lg:col-span-3 space-y-8">
              <div>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Extra Gallery Images */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {product.galleryImages.map((imgUrl, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="relative min-w-[200px] h-[200px] sm:min-w-[250px] sm:h-[250px] rounded-2xl overflow-hidden flex-shrink-0 snap-center shadow-md border border-primary/5"
                    >
                      <img src={imgUrl} alt={`${product.name} gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Ingredients */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-primary/5">
                <h3 className="text-primary font-serif text-xl mb-4">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredientsList.map((ingredient, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-cream rounded-full text-sm text-primary/80 border border-primary/10"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

            </AnimatedSection>

            {/* Right - Add to Cart (2 cols) */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/5">
                  <div className="mb-6">
                    {hasDiscount(product, quantity) ? (
                      <div>
                        <span className="text-muted-foreground text-lg line-through mr-2">{product.price.toFixed(2)} TND</span>
                        <span className="text-red-600 font-serif text-3xl font-bold">
                          {getDiscountedPrice(product, quantity).toFixed(2)} <span className="text-lg font-normal">TND</span>
                        </span>
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          {product.discountType === 'percentage' ? `-${product.discountValue}%` : `Save ${product.discountValue?.toFixed(2)} TND`}
                        </span>
                      </div>
                    ) : (
                      <span className="text-primary font-serif text-3xl font-bold">
                        {product.price.toFixed(2)} <span className="text-lg font-normal">TND</span>
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="text-primary text-xs font-medium tracking-wider mb-3 block">QUANTITY</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border border-pink/20 flex items-center justify-center text-primary hover:bg-pink hover:text-white transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-primary font-serif text-xl w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full border border-pink/20 flex items-center justify-center text-primary hover:bg-pink hover:text-white transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-3 border-t border-primary/10 mb-6">
                    <span className="text-muted-foreground text-sm">Subtotal</span>
                    <span className="text-primary font-serif text-lg font-bold">
                      {(getDiscountedPrice(product, quantity) * quantity).toFixed(2)} TND
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className={`w-full py-4 rounded-xl font-medium text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-pink text-white hover:bg-pink-dark'
                      }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {addedAnimation ? '✓ Added to Cart!' : alreadyInCart ? 'Add More to Cart' : 'Add to Cart'}
                  </motion.button>

                  {/* Quick checkout */}
                  <Link to="/shop" className="block text-center text-primary text-sm underline hover:no-underline mt-4">
                    Continue Shopping
                  </Link>
                </div>

                {/* Dietary Notes */}
                {product.dietaryNotes.length > 0 && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-primary/5">
                    <h3 className="text-primary font-serif text-xl mb-4">Dietary Information</h3>
                    <div className="space-y-3">
                      {product.dietaryNotes.map((note, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {getDietaryIcons(note)}
                          </div>
                          <span className="text-sm text-muted-foreground flex-1">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-primary font-serif text-3xl lg:text-4xl mb-4">You Might Also Like</h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <Link key={related.id} to={`/products/${related.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-3 aspect-square">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-1 group-hover:underline">
                    {related.name}
                  </h4>
                  {related.discountType && related.discountType !== 'none' ? (
                    <div>
                      <span className="text-muted-foreground text-sm line-through mr-1">{related.price.toFixed(2)}</span>
                      <span className="text-red-600 font-serif text-lg">
                        {related.discountType === 'percentage'
                          ? (related.price * (1 - (related.discountValue || 0) / 100)).toFixed(2)
                          : Math.max(0, related.price - (related.discountValue || 0)).toFixed(2)} TND
                      </span>
                    </div>
                  ) : (
                    <p className="text-primary font-serif text-lg">{related.price.toFixed(2)} TND</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="pb-12 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-2 text-primary text-sm hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to All Desserts
          </Link>
        </div>
      </section>
    </div>
  );
}
