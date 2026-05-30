import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedSection';
import { useLanguage } from '@/context/LanguageContext';

export function About() {
  const { t, language } = useLanguage();





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
              src="/images/about/chocolate-spoon.jpg"
              alt="Artisan chocolate crafting"
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
                  {t('about.hero')}
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Matches Our Desserts Style */}
      <section className="pt-44 lg:pt-64 pb-16 lg:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="mb-16">
            <span className="font-arabicMain text-5xl lg:text-7xl text-primary block mb-2 opacity-80">
              {language === 'AR' ? '' : 'من نحن'}
            </span>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
              {t('about.intro.title')}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
              {t('about.intro.desc')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="flex justify-center">
                <img
                  src="/images/logo.webp"
                  alt="Dr Doudou Bakes logo"
                  className="w-40 h-40 lg:w-56 lg:h-56 object-contain"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h3 className="text-primary font-serif text-2xl lg:text-4xl mb-6">
                {t('about.story.title')}
              </h3>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-4">
                {t('about.story.p1')}
              </p>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-4">
                {t('about.story.p2')}
              </p>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                {t('about.story.p3')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 lg:py-24 bg-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <blockquote className="text-white font-serif text-2xl lg:text-4xl leading-relaxed mb-8">
              {t('about.quote.text')}
            </blockquote>
            <cite className="text-white/80 text-sm font-medium tracking-wider not-italic">
              {t('about.quote.author')}
            </cite>
          </AnimatedSection>
        </div>
      </section>

      {/* Creators Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-arabicMain text-4xl lg:text-6xl text-primary block mb-2 opacity-80">
              {t('about.creators.subtitle')}
            </span>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
              {t('about.creators.title')}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto font-serif italic">
              {t('about.creators.desc')}
            </p>
          </AnimatedSection>

          <StaggerContainer className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-16 max-w-4xl mx-auto">
            {/* Dorra Ben Mahmoud */}
            <StaggerItem className="w-full">
              <div className="text-center p-10 lg:p-14 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink/10 hover:border-pink/30 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(232,108,139,0.12)] transition-all duration-500">
                <h3 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
                  Dorra Ben Mahmoud
                </h3>
                <div className="w-12 h-px bg-pink/40 mx-auto mb-4" />
                <p className="text-primary/70 font-sans text-sm tracking-[0.25em] font-medium uppercase">
                  {t('about.creators.ceo')}
                </p>
              </div>
            </StaggerItem>

            {/* Molka Ben Mahmoud */}
            <StaggerItem className="w-full">
              <div className="text-center p-10 lg:p-14 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink/10 hover:border-pink/30 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(232,108,139,0.12)] transition-all duration-500">
                <h3 className="text-primary font-serif text-3xl lg:text-4xl mb-4">
                  Molka Ben Mahmoud
                </h3>
                <div className="w-12 h-px bg-pink/40 mx-auto mb-4" />
                <p className="text-primary/70 font-sans text-sm tracking-[0.25em] font-medium uppercase">
                  {t('about.creators.cofounder')}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      {/* Brands Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection className="mb-16">
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4">
              {t('about.brands.title')}
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { id: 'HAYA', name: 'HAYA', url: 'https://www.instagram.com/haya.medwear/', logo: '/images/brands/haya.jpg', bgColor: '#ebbec1' },
              { id: 'ScrubzHub', name: 'ScrubzHub', url: 'https://www.instagram.com/scrubzhub/', logo: '/images/brands/scrubzhub.jpg', bgColor: '#fcfbf7' },
              { id: 'MUGS CORNER', name: 'MUGS CORNER', url: 'https://www.instagram.com/mugs__corner/', logo: '/images/brands/mugs_corner.jpg', bgColor: '#fff6e6' },
            ].map((brand, index) => (
              <StaggerItem key={index}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div
                    className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] border-[6px] border-white/50 backdrop-blur-md transform group-hover:-translate-y-2 transition-all duration-500 flex items-center justify-center mb-8 p-6"
                    style={{ backgroundColor: brand.bgColor }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-3">
                    {brand.name}
                  </h3>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center text-muted-foreground hover:text-pink transition-colors duration-300"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">
              {t('about.cta.desc')}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-pink text-white rounded-full px-8 py-3 hover:bg-pink-dark transition-colors duration-300"
            >
              {t('about.cta.btn')}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
