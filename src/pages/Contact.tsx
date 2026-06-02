import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';

export function Contact() {
  const { t, language } = useLanguage();
  const { addContactMessage } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitState !== 'idle') setSubmitState('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('submitting');

    try {
      await addContactMessage({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        source: 'contact-page',
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmitState('success');
    } catch (error) {
      console.error('Contact message submit error:', error);
      setSubmitState('error');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary pt-4 sm:pt-10 lg:pt-16 pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-video shadow-[0_25px_60px_rgba(0,0,0,0.4)] z-20 -mb-20 sm:-mb-28 lg:-mb-36 translate-y-10 sm:translate-y-16 lg:translate-y-24"
          >
            <img
              src="/images/desserts/chocolate-mixing.webp"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-white font-serif text-3xl sm:text-4xl lg:text-6xl tracking-wide">
                  {t('nav.contact')}
                </h1>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area - Seamless Cinematic Background */}
      <div className="bg-[#FEF6ED]">
        {/* Contact Form & Info Section */}
        <section className="pt-32 sm:pt-44 lg:pt-64 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left Contact Info */}
              <AnimatedSection className="mb-16">
                <span className="font-arabicMain text-5xl lg:text-7xl text-primary block mb-2 opacity-80">
                  {language === 'AR' ? '' : 'اتصل بنا'}
                </span>
                <h2 className="text-primary font-serif text-3xl lg:text-5xl mb-4 leading-tight">
                  {t('contact.title')}
                </h2>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-12">
                  Whether you want to place an order, share a memory, or simply say hello — our door is always open.
                </p>

                <div className="space-y-8">

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-primary font-serif text-lg tracking-wider mb-1">
                        Phone
                      </h4>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        (+216) 99 270 488
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-primary font-serif text-lg tracking-wider mb-1">
                        Email
                      </h4>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        info@drdoudoudoubakes.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-primary font-serif text-lg tracking-wider mb-1">
                        Instagram
                      </h4>
                      <a
                        href="https://www.instagram.com/dr_doudou_bakes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-base leading-relaxed hover:text-primary transition-colors"
                      >
                        {t('contact.follow.instagram')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Facebook className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-primary font-serif text-lg tracking-wider mb-1">
                        Facebook
                      </h4>
                      <a
                        href="https://www.facebook.com/profile.php?id=61589840379816"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-base leading-relaxed hover:text-primary transition-colors"
                      >
                        {t('contact.follow.facebook')}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right Form Card */}
              <AnimatedSection delay={0.2} className="w-full max-w-2xl mx-auto lg:mx-0">
                <div className="bg-[#F8F5F0] rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[#A4886E] text-sm font-serif mb-3 block">{t('contact.name.label')} *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={event => handleInputChange('name', event.target.value)}
                          placeholder={t('contact.name.placeholder')}
                          className="w-full px-5 py-4 bg-[#FCFBF8] border border-[#EAE1D2] rounded-xl text-base md:text-lg text-[#5C4A3D] placeholder:text-[#B3A698] focus:outline-none focus:border-[#C4A98C] focus:ring-1 focus:ring-[#C4A98C] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[#A4886E] text-sm font-serif mb-3 block">{t('contact.phone.label')} *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={event => handleInputChange('phone', event.target.value)}
                          placeholder="(+216) 99 270 488"
                          className="w-full px-5 py-4 bg-[#FCFBF8] border border-[#EAE1D2] rounded-xl text-base md:text-lg text-[#5C4A3D] placeholder:text-[#B3A698] focus:outline-none focus:border-[#C4A98C] focus:ring-1 focus:ring-[#C4A98C] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#A4886E] text-sm font-serif mb-3 block">
                        {t('contact.email.label')} <span className="text-xs opacity-60 font-sans ml-1">({language === 'AR' ? 'اختياري' : 'Optional'})</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={event => handleInputChange('email', event.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 bg-[#FCFBF8] border border-[#EAE1D2] rounded-xl text-base md:text-lg text-[#5C4A3D] placeholder:text-[#B3A698] focus:outline-none focus:border-[#C4A98C] focus:ring-1 focus:ring-[#C4A98C] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[#A4886E] text-sm font-serif mb-3 block">{t('contact.message.label')}</label>
                      <textarea
                        value={formData.message}
                        onChange={event => handleInputChange('message', event.target.value)}
                        placeholder={t('contact.message.placeholder')}
                        required
                        rows={5}
                        className="w-full px-5 py-4 bg-[#FCFBF8] border border-[#EAE1D2] rounded-xl text-base md:text-lg text-[#5C4A3D] placeholder:text-[#B3A698] focus:outline-none focus:border-[#C4A98C] focus:ring-1 focus:ring-[#C4A98C] transition-all resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={submitState === 'submitting'}
                        className="w-full bg-[#75553C] hover:bg-[#5D422E] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl py-4 font-serif tracking-widest text-sm md:text-base transition-colors duration-300 shadow-md uppercase"
                      >
                        {submitState === 'submitting' ? t('contact.submit.sending') : t('contact.submit.btn')}
                      </button>
                      {submitState === 'success' && (
                        <p className="text-center text-sm text-emerald-700">{t('contact.submit.success')}</p>
                      )}
                      {submitState === 'error' && (
                        <p className="text-center text-sm text-red-700">{t('contact.submit.error')}</p>
                      )}
                    </div>
                  </form>
                </div>

                <div className="text-center space-y-3">
                  <h2 className="font-arabicMain text-4xl md:text-5xl text-[#C4A98C]">
                    {language === 'AR' ? t('contact.welcome') : 'أهلاً بكم في أي وقت'}
                  </h2>
                  <p className="font-serif text-[#5C4A3D] text-lg md:text-xl">
                    {t('contact.welcome')}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
