import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Hero Section
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-primary pt-8 lg:pt-12 pb-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl z-20 -mb-20 lg:-mb-28 translate-y-8"
        >
          <img
            src="/images/desserts/cake-slice.jpg"
            alt="Premium dessert with chocolate ganache"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center"
            >
              <img
                src="/images/logo.png"
                alt="Dr Doudou Bakes logo"
                className="w-20 h-20 lg:w-28 lg:h-28 object-contain mx-auto mb-4"
              />
              <h1 className="text-white font-brand text-3xl lg:text-5xl tracking-wide">
                {t('hero.title')}
              </h1>
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
    <section className="py-16 lg:py-24 bg-cream">
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
              className="w-16 h-10 fill-primary"
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
                  src="/images/desserts/whisk-cream.png"
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
              <Link to="/about" className="text-primary underline hover:no-underline">
                {t('cap.desc2')}
              </Link>.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {capabilities.map((capability, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/20">
                  <AccordionTrigger className="text-primary text-sm font-medium tracking-wider py-4 hover:no-underline">
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

  const products = [
    { image: '/images/desserts/single-serve.jpg', title: 'SINGLE-SERVE', description: 'Our chef-crafted snacks and mini desserts deliver exceptional flavor and shelf appeal in a single-serving size.' },
    { image: '/images/desserts/prepackaged.jpg', title: 'PREPACKAGED', description: 'Retail-ready classic bakery items in convenient packaging, perfectly portioned, and available in a range of sizes.' },
    { image: '/images/desserts/seasonal-pie.jpg', title: 'SEASONAL & NEW', description: 'Explore desserts with standout appeal that drive relevance all year.' },
    { image: '/images/desserts/premium-cake.jpg', title: 'PREMIUM CAKES', description: 'Visually stunning, scratch-made multi-layer bar cakes, round cakes, molten, and gluten-free cakes crafted to perfection.' },
    { image: '/images/desserts/cheesecake.jpg', title: 'PREMIUM CHEESECAKES', description: 'An impressive assortment of smooth & creamy cheesecakes made with real cream cheese and fresh ingredients.' },
    { image: '/images/desserts/brownies.jpg', title: 'BROWNIES & BARS', description: 'A premium collection of dessert bars and brownies with our signature layering capabilities, ideal for on-the-go formats.' },
  ];

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
  }, []);

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
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-primary font-sans text-sm font-semibold tracking-wider mb-2">
                  {product.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {product.description}
                </p>
                <Link
                  to="/our-desserts"
                  className="text-primary text-sm font-medium underline hover:no-underline"
                >
                  Explore
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
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
                className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary-dark transition-colors duration-300"
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
      <div className="h-20 lg:h-32" />
      <WelcomeSection />
      <TwoColumnSection
        imageSrc="/images/desserts/cake-slice.jpg"
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
      <ParallaxImage />
      <ContactSection />
    </div>
  );
}
