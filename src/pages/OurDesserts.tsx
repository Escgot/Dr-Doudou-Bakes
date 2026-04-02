import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { useLanguage } from '@/context/LanguageContext';

export function OurDesserts() {
  const { t } = useLanguage();
  const categories = [
    {
      image: '/images/desserts/single-serve.jpg',
      title: t('prod.p1.title'),
      description: t('prod.p1.desc'),
    },
    {
      image: '/images/desserts/prepackaged.jpg',
      title: t('prod.p2.title'),
      description: t('prod.p2.desc'),
    },
    {
      image: '/images/desserts/seasonal-pie.jpg',
      title: t('prod.p3.title'),
      description: t('prod.p3.desc'),
    },
    {
      image: '/images/desserts/premium-cake.jpg',
      title: t('prod.p4.title'),
      description: t('prod.p4.desc'),
    },
    {
      image: '/images/desserts/cheesecake.jpg',
      title: t('prod.p5.title'),
      description: t('prod.p5.desc'),
    },
    {
      image: '/images/desserts/brownies.jpg',
      title: t('prod.p6.title'),
      description: t('prod.p6.desc'),
    },
    {
      image: '/images/desserts/cake-slice.jpg',
      title: t('desserts.cat.p7.title'),
      description: t('desserts.cat.p7.desc'),
    },
    {
      image: '/images/desserts/chocolate-roll.jpg',
      title: t('desserts.cat.p8.title'),
      description: t('desserts.cat.p8.desc'),
    },
    {
      image: '/images/desserts/honey-cake.jpg',
      title: t('desserts.cat.p9.title'),
      description: t('desserts.cat.p9.desc'),
    },
    {
      image: '/images/desserts/macarons.jpg',
      title: t('desserts.cat.p10.title'),
      description: t('desserts.cat.p10.desc'),
    },
    {
      image: '/images/desserts/fruit-tart.jpg',
      title: t('desserts.cat.p11.title'),
      description: t('desserts.cat.p11.desc'),
    },
    {
      image: '/images/desserts/chocolate-truffles.jpg',
      title: t('desserts.cat.p12.title'),
      description: t('desserts.cat.p12.desc'),
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % categories.length));
  }, [categories.length]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + categories.length) % categories.length));
  }, [categories.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="bg-primary pt-10 lg:pt-16 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-28 lg:-mb-36 translate-y-16 lg:translate-y-24"
          >
            <img
              src="/images/desserts/cheesecake.jpg"
              alt="Premium cake artisanal"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-white font-serif text-4xl lg:text-6xl tracking-wide">
                  {t('desserts.hero')}
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid - Instagram style gallery */}
      <section className="pt-44 lg:pt-64 pb-20 lg:pb-28 bg-[#FEF6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-arabicMain text-5xl lg:text-7xl text-primary block mb-2 opacity-80">
              {t('desserts.gallery.subtitle')}
            </span>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
              {t('desserts.gallery.title')}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto font-serif italic">
              {t('desserts.gallery.desc')}
            </p>
          </AnimatedSection>

          <StaggerContainer className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {categories.map((category, index) => (
              <StaggerItem key={index} className="break-inside-avoid">
                <div
                  className="polaroid relative group hover:z-10 cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative overflow-hidden mb-4 border border-border">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
                      <p className="text-white text-sm font-sans leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-primary font-serif text-lg font-semibold tracking-wider mb-1">
                      {category.title}
                    </h4>
                    <p className="font-arabicSecondary text-primary/60 text-sm">
                      {t('desserts.badge')}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 lg:py-24 bg-accent-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h3 className="text-white font-serif text-3xl lg:text-5xl mb-6">
                {t('desserts.innov.title')}
              </h3>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-4">
                {t('desserts.innov.p1')}
              </p>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                {t('desserts.innov.p2')}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/desserts/trend-innovation.jpg"
                  alt="Dessert innovation"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4 transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Main Image Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[90vh] px-16 md:px-24 outline-none flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={categories[selectedIndex].image}
                  alt={categories[selectedIndex].title}
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
                />
                <div className="text-center text-white/90 mt-6 max-w-2xl bg-black/50 px-6 py-4 rounded-xl backdrop-blur-md">
                  <h3 className="font-serif text-2xl lg:text-3xl mb-2">{categories[selectedIndex].title}</h3>
                  <p className="text-sm md:text-base font-sans leading-relaxed text-white/80">{categories[selectedIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Nav */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4 transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
