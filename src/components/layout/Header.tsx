import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();

  const navItems = [
    { href: '/our-desserts', label: t('nav.desserts') },
    { href: '/shop', label: t('nav.shop') },
    { href: '/recipes', label: t('nav.recipes') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Only hide/show after scrolling past the header area
      if (currentScrollY > 100) {
        setIsHidden(currentScrollY > lastScrollY);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg' : 'bg-primary'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Mobile Icons Row */}
        <div className="flex items-center justify-between lg:justify-center py-2 sm:py-3 lg:py-6">
          {/* Spacer for mobile centering (balances the right-side icons) */}
          <div className="w-[72px] sm:w-[88px] lg:hidden flex-shrink-0" />

          <Link to="/" className="flex items-center justify-center gap-1.5 sm:gap-4 lg:gap-6 group flex-shrink-0">
            <span className="text-white font-brand text-[11px] min-[375px]:text-xs sm:text-base lg:text-2xl tracking-[0.1em] sm:tracking-[0.2em] uppercase drop-shadow-sm whitespace-nowrap">
              Dr Doudou
            </span>
            <div className="relative flex-shrink-0">
              <img
                src="/images/logo.webp"
                alt="Dr Doudou Bakes logo"
                className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute -inset-2 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-white font-brand text-[11px] min-[375px]:text-xs sm:text-base lg:text-2xl tracking-[0.1em] sm:tracking-[0.2em] uppercase drop-shadow-sm whitespace-nowrap">
              Bakes
            </span>
          </Link>

          {/* Mobile Cart + Menu */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleCart}
              className="relative text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-amber-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="text-white p-1.5 sm:p-2">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary/95 backdrop-blur-2xl border-l border-white/10 w-[85vw] sm:w-[400px] p-8 flex flex-col">
                <div className="flex items-center mb-12">
                  <span className="text-white/40 font-brand tracking-[0.3em] text-xs uppercase">Navigation</span>
                </div>
                
                <div className="flex flex-col gap-6 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center text-3xl sm:text-4xl font-serif transition-all duration-300 ${
                        location.pathname === item.href 
                          ? 'text-white translate-x-2' 
                          : 'text-white/60 hover:text-white hover:translate-x-2'
                      }`}
                    >
                      <span className={`transition-all duration-300 text-amber-500 mr-4 text-2xl ${
                        location.pathname === item.href ? 'opacity-100' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}>
                        ✦
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-8">
                  <button
                    onClick={() => { toggleLanguage(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-3 text-primary bg-gradient-to-r from-cream to-white text-sm font-bold tracking-[0.2em] px-6 py-4 rounded-full hover:shadow-[0_0_20px_rgba(255,248,247,0.3)] hover:scale-[1.02] transition-all duration-300 w-full uppercase"
                  >
                    {language === 'EN' ? 'Français' : language === 'FR' ? 'العربية' : 'English'} <span className="text-lg">🌐</span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-3 opacity-40">
                    <img src="/images/logo.webp" alt="logo" className="w-8 h-8 object-contain grayscale" />
                    <span className="text-white font-brand text-[10px] tracking-widest uppercase">Dr Doudou</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-white/20">
          <div className="flex items-center justify-center py-4 relative">
            <ul className="flex justify-center items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`text-white text-xs font-medium tracking-widest hover:opacity-80 transition-opacity duration-200 ${location.pathname === item.href ? 'opacity-100' : 'opacity-90'
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="absolute right-0 flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-pink text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => toggleLanguage()}
                className="text-primary bg-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-full hover:bg-cream-dark transition-colors duration-200 uppercase"
              >
                {language} 🌐
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
