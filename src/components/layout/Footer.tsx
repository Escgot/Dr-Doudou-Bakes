import { Link } from 'react-router-dom';
import { Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#2D1B16] text-cream relative overflow-hidden border-t border-white/5 mt-auto">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src="/images/logo.webp" alt="Dr Doudou Bakes logo" className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -inset-2 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-brand text-2xl sm:text-3xl tracking-[0.2em] uppercase">Dr Doudou</span>
                  <span className="text-amber-500 font-brand text-xs sm:text-sm tracking-[0.4em] uppercase ml-1">Bakes</span>
                </div>
              </div>
            </Link>
            <p className="text-cream/60 font-serif text-base sm:text-lg leading-relaxed max-w-sm">
              Artisanal desserts crafted with passion. We bring the finest ingredients together to create unforgettable moments of sweetness.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col items-center md:items-start">
            <h3 className="font-brand text-xs tracking-[0.2em] text-white/40 uppercase mb-6">Explore</h3>
            <ul className="flex flex-col gap-4 items-center md:items-start">
              {[
                { label: t('nav.desserts'), href: '/our-desserts' },
                { label: t('nav.shop'), href: '/shop' },
                { label: t('nav.recipes'), href: '/recipes' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-cream/70 hover:text-white font-medium text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="font-brand text-xs tracking-[0.2em] text-white/40 uppercase mb-6">Company</h3>
            <ul className="flex flex-col gap-4 items-center md:items-start">
              {[
                { label: t('nav.about'), href: '/about' },
                { label: t('nav.contact'), href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-cream/70 hover:text-white font-medium text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="font-brand text-xs tracking-[0.2em] text-white/40 uppercase mb-6">Connect</h3>
            <div className="flex flex-col gap-4 items-center md:items-start text-cream/70 text-sm">
              <a href="https://www.instagram.com/dr_doudou_bakes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-amber-400/50 transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>Instagram</span>
              </a>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white/40" />
                </div>
                <span>Sfax, Tunisia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-center md:text-left">
            © {new Date().getFullYear()} Dr Doudou Bakes. All rights reserved.
          </p>
          <div className="flex gap-8 items-center">
            <Link to="/admin" className="text-white/40 hover:text-white text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
