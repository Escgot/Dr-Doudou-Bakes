import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const footerLinks = {
  column1: [
    { label: 'Our Desserts', href: '/our-desserts' },
    { label: 'Recipes', href: '/recipes' },
  ],
  column2: [
    { label: 'About Us', href: '/about' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Dr Doudou Bakes logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-brand text-lg tracking-wide">
                Dr Doudou Bakes
              </span>
            </Link>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-3">
            {footerLinks.column1.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/80 text-sm hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-3">
            {footerLinks.column2.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-white/80 text-sm hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="text-white/80 text-sm hover:text-white transition-colors duration-200 mt-1"
            >
              Contact Us
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/dr_doudou_bakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-200 mb-2"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <address className="text-white/80 text-sm not-italic">
              Dr Doudou Bakes<br />
              Sfax, Tunisia
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-xs">
              © 2026, <Link to="/" className="hover:text-white transition-colors">Dr Doudou Bakes</Link>
            </p>
            <div className="flex gap-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
