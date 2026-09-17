import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export function ScrollToTopButton() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      id="scroll-to-top-button"
      onClick={scrollToTop}
      type="button"
      aria-label={t.footer.backToTop || 'Monte Anlè'}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-br from-[#087cff] to-[#044fad] text-white shadow-[0_8px_25px_rgba(8,124,255,0.45)] border border-[#35c9ff]/60 hover:brightness-110 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(53,201,255,0.6)] active:translate-y-0 transition-all duration-300 flex items-center justify-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#35c9ff]/50"
      title={t.footer.backToTop || 'Monte Anlè'}
    >
      <ArrowUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="sr-only">{t.footer.backToTop || 'Monte Anlè'}</span>
    </button>
  );
}
