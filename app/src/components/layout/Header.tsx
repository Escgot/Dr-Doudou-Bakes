import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';



import { useLanguage } from '@/context/LanguageContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { label: t('nav.desserts'), href: '/our-desserts' },
    { label: t('nav.recipes'), href: '/recipes' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
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
        {/* Logo Section */}
        <div className="flex justify-center py-6">
          <Link to="/" className="flex items-center gap-4 lg:gap-6 group">
            <span className="text-white font-brand text-xl lg:text-2xl tracking-[0.2em] uppercase drop-shadow-sm">
              Dr Doudou
            </span>
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Dr Doudou Bakes logo"
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute -inset-2 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-white font-brand text-xl lg:text-2xl tracking-[0.2em] uppercase drop-shadow-sm">
              Bakes
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="border-t border-white/20 relative">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center py-4 relative">
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
            <button
              onClick={toggleLanguage}
              className="absolute right-0 text-primary bg-cream text-xs font-bold tracking-widest px-4 py-1.5 rounded-full hover:bg-cream-dark transition-colors duration-200"
            >
              {language === 'EN' ? 'FR' : 'EN'} 🌐
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-end py-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="text-white p-2">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary border-primary-dark w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white text-sm font-medium tracking-widest hover:opacity-80 transition-opacity duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={toggleLanguage}
                    className="text-primary bg-cream text-sm font-bold tracking-widest px-4 py-2 rounded-full hover:bg-cream-dark transition-colors duration-200 text-center mt-4 w-1/2"
                  >
                    Switch to {language === 'EN' ? 'FR' : 'EN'} 🌐
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
