import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

// Hero Section
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-primary pt-10 lg:pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-28 lg:-mb-36 translate-y-16 lg:translate-y-24"
          style={{ aspectRatio: '16 / 9' }}
        >
          {/* Hero Background Image */}
          <img
            src="/images/desserts/cake-slice.webp"
            alt="Artisan dessert crafting"
            className="w-full h-full object-cover scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/20 flex flex-col items-center justify-center pt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center px-6"
            >
              {/* Logo icon */}
              <motion.img
                src="/images/logo.webp"
                alt="Dr Doudou Bakes logo"
                className="w-24 h-24 lg:w-48 lg:h-48 object-contain mx-auto mb-2 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />

              {/* Brand Name */}
              <h1 className="text-white font-brand text-4xl sm:text-5xl lg:text-7xl xl:text-8xl tracking-widest drop-shadow-md uppercase mb-2">
                Dr Doudou
              </h1>

              {/* Decorative Divider with Sub-text */}
              <div className="flex items-center justify-center gap-4 lg:gap-6 mt-4 mb-10">
                <span className="block w-24 lg:w-48 h-[2px] bg-white/60 rounded-full" />
                <div className="flex items-center">
                  <span className="text-white font-sans text-xs sm:text-sm lg:text-base tracking-[0.5em] font-bold uppercase whitespace-nowrap">
                    Bakes
                  </span>
                  <span className="text-white/70 text-[10px] lg:text-xs font-sans ml-1 -mt-1">TM</span>
                </div>
                <span className="block w-24 lg:w-48 h-[2px] bg-white/60 rounded-full" />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center px-4"
            >
              <button
                onClick={() => navigate('/our-desserts')}
                className="bg-white text-primary px-8 py-4 rounded-full font-bold tracking-widest hover:bg-cream hover:scale-105 transition-all duration-300 uppercase shadow-lg text-sm sm:text-base w-full sm:w-auto"
              >
                View Desserts
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="bg-pink text-white px-8 py-4 rounded-full font-bold tracking-widest hover:bg-pink-dark hover:scale-105 transition-all duration-300 uppercase shadow-lg text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto border border-pink-light"
              >
                <ShoppingBag className="w-5 h-5" /> Order Delivery Now
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Welcome Section
function WelcomeSection() {
  const { t } = useLanguage();

  return (
    <section className="pt-52 lg:pt-80 pb-16 lg:py-24 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-primary text-xs font-medium tracking-[0.2em] mb-6">
            {t('welcome.subtitle')}
          </p>
          <h2 className="text-primary font-serif text-3xl lg:text-5xl leading-tight mb-8">
            {t('welcome.title1')}<br />
            {t('welcome.title2')}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            {t('welcome.desc')}
          </p>
          <div className="mt-8 flex justify-center">
            <svg
              viewBox="0 0 60 40"
              className="w-16 h-10 fill-pink"
            >
              <path d="M30 0c-5 0-10 5-10 10 0 3 1.5 5.5 4 7-8 2-14 9-14 17 0 2.5.5 5 1.5 7h37c1-2 1.5-4.5 1.5-7 0-8-6-15-14-17 2.5-1.5 4-4 4-7 0-5-5-10-10-10z" />
            </svg>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Two Column Section Component
function TwoColumnSection({
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  icon,
  title,
  description,
}: {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  icon?: React.ReactNode;
  title: string;
  description: string;
}) {
  const content = (
    <AnimatedSection className={`flex flex-col justify-center ${imagePosition === 'left' ? 'lg:order-2' : ''}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-4">{title}</h3>
      <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">{description}</p>
    </AnimatedSection>
  );

  const image = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`${imagePosition === 'left' ? 'lg:order-1' : ''}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-2xl object-cover"
      />
    </motion.div>
  );

  return (
    <section className="py-12 lg:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {image}
              {content}
            </>
          ) : (
            <>
              {content}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// Capabilities Section
function CapabilitiesSection() {
  const { t } = useLanguage();

  const capabilities = [
    t('cap.c1'),
    t('cap.c2'),
    t('cap.c3'),
    t('cap.c4'),
    t('cap.c5'),
    t('cap.c6'),
  ];

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative flex justify-center">
              <div className="w-64 h-80 lg:w-80 lg:h-96 bg-secondary rounded-full flex items-center justify-center">
                <img
                  src="/images/desserts/whisk-cream.webp"
                  alt="Whisk with cream"
                  className="w-48 h-auto object-contain animate-float"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-4">
              {t('cap.title')}
            </h3>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
              {t('cap.desc1')}
              <Link to="/about" className="text-pink underline hover:no-underline">
                {t('cap.desc2')}
              </Link>.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {capabilities.map((capability, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/20">
                  <AccordionTrigger className="text-primary text-sm font-medium tracking-wider py-4 hover:no-underline text-left">
                    {capability}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {t('cap.detail').replace('{0}', capability.toLowerCase())}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Quote Section
function QuoteSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-accent-green">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <blockquote className="text-white font-serif text-2xl lg:text-4xl leading-relaxed mb-8">
            {t('quote.text')}
          </blockquote>
          <cite className="text-white/80 text-sm font-medium tracking-wider not-italic">
            {t('quote.author')}
          </cite>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Product Carousel
function ProductCarousel() {
  const { t } = useLanguage();
  const { publishedProducts, getBadgesForProduct } = useProducts();
  const { addToCart, isInCart } = useCart();

  // Get top 6 products
  const carouselProducts = publishedProducts.slice(0, 6);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [carouselProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
            {t('prod.title')}
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
            {t('prod.desc')}
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {carouselProducts.map((product, index) => {
              const badges = getBadgesForProduct(product);
              const inCart = isInCart(product.id);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-primary/5 transition-all duration-300"
                >
                  <Link to={`/products/${product.slug}`} className="flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {badges.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider" style={{ color: badges[0].color }}>
                            {badges[0].label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h4 className="text-primary font-sans text-sm font-semibold tracking-wider line-clamp-2">
                          {product.name}
                        </h4>
                        <span className="text-primary font-bold whitespace-nowrap text-sm">
                          {product.price.toFixed(2)} TND
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                        {product.description}
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className={`w-full py-2.5 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 text-sm ${inCart
                          ? 'bg-secondary text-primary border border-pink/20 hover:bg-pink hover:text-white'
                          : 'bg-pink text-white hover:bg-pink-dark'
                          }`}
                      >
                        <ShoppingBag className="w-4 h-4" /> {inCart ? 'Add More' : 'Add to Cart'}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      q: "How far in advance should I place my order?",
      a: "We recommend placing your order at least 24 hours in advance. For orders placed before 4:00 PM, we offer next-day delivery (excluding Sundays)."
    },
    {
      q: "Do you offer gluten-free or vegan options?",
      a: "Absolutely! We believe everyone deserves an extraordinary dessert. We offer several dedicated gluten-free and vegan options. You can easily find them by looking for the green dietary badges on our products in the Shop, or simply select the 'Gluten-Free' category. Our Artisan Chocolate Truffles, for example, have a delicious vegan option!"
    },
    {
      q: "Where do you deliver?",
      a: "Currently, we offer hand-delivery within the Sfax greater area. We ensure all our desserts arrive in perfect condition using our temperature-controlled vehicles."
    },
    {
      q: "How should I store my desserts?",
      a: "Most of our cakes and cheesecakes should be kept refrigerated and brought to room temperature 30 minutes before serving. Macarons and brownies can be kept at room temperature in an airtight container for up to 3 days."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            Got questions? We've got answers.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl p-6 shadow-sm border border-primary/5">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b border-primary/10 last:border-0">
                <AccordionTrigger className="text-primary text-base font-medium py-5 hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Parallax Image Section
function ParallaxImage() {
  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/images/desserts/chocolate-mixing.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/10" />
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              {t('contact.desc')}
            </p>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('contact.name')}
                  className="w-full px-4 py-3 bg-inputBg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder={t('contact.phone')}
                  className="w-full px-4 py-3 bg-inputBg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <input
                type="email"
                placeholder={t('contact.email')}
                className="w-full px-4 py-3 bg-inputBg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder={t('contact.message')}
                rows={4}
                className="w-full px-4 py-3 bg-inputBg rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-pink text-white rounded-full py-3 hover:bg-pink-dark transition-colors duration-300"
              >
                {t('contact.submit')}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Main Home Component
export function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-cream">
      <HeroSection />
      <WelcomeSection />
      <TwoColumnSection
        imageSrc="/images/desserts/cocoa-powder.jpg"
        imageAlt="Layered cake slice"
        imagePosition="right"
        title={t('col1.title')}
        description={t('col1.desc')}
      />
      <TwoColumnSection
        imageSrc="/images/desserts/chocolate-roll.jpg"
        imageAlt="Chocolate dessert roll"
        imagePosition="left"
        title={t('col2.title')}
        description={t('col2.desc')}
      />
      <CapabilitiesSection />
      <QuoteSection />
      <ProductCarousel />
      <FAQSection />
      <ParallaxImage />
      <ContactSection />
    </div>
  );
}
