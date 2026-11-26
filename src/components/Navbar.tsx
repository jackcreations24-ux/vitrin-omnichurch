import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Menu,
  X,
  Globe,
  ChevronDown,
  Home,
  Layers,
  BookOpen,
  ShieldCheck,
  Quote,
  Mail,
  Scale,
  Heart,
  Check,
} from 'lucide-react';
import { SecureLivePill } from './SecureLivePill';
import { useI18n } from '../i18n/I18nContext';
import { SupportedLang } from '../i18n/translations';
import { PolicyTab } from './PoliciesModal';
import { LegalDocType } from './LegalDocumentPage';

interface NavbarProps {
  onOpenDev: () => void;
  onOpenDownload: (platform?: 'mobile' | 'pc') => void;
  liveUsers: number;
  versionBadge?: string;
  onOpenPolicies?: (tab?: PolicyTab) => void;
  onNavigateLegalRoute?: (docType: LegalDocType) => void;
  donationsEnabled?: boolean;
  onOpenDonations?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDev,
  onOpenDownload,
  liveUsers,
  versionBadge,
  onOpenPolicies,
  onNavigateLegalRoute,
  donationsEnabled,
  onOpenDonations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useI18n();

  // Close desktop dropdown menus when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setDesktopMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopMenuOpen(false);
        setLangMenuOpen(false);
      }
    };

    if (desktopMenuOpen || langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopMenuOpen, langMenuOpen]);

  const languages: Array<{ code: SupportedLang; label: string; name: string; flag: string }> = [
    { code: 'ht', label: 'HT', name: 'Kreyòl Ayisyen', flag: '🇭🇹' },
    { code: 'fr', label: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'ES', name: 'Español', flag: '🇪🇸' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setDesktopMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10 transition-all rounded-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand (Standard navigation, no secret triggers) */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => scrollTo('home')}
            title="OmniChurch"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 via-blue-600 to-blue-700 flex items-center justify-center font-black text-white text-base tracking-wider shadow-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(8,124,255,0.6)] border border-white/20">
              OC
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center">
                Omni<span className="text-[#35c9ff]">Church</span>
              </div>
              <div className="text-[10px] font-medium text-blue-200/50 tracking-wide hidden sm:block">
                {t.nav.tagline}
              </div>
            </div>
          </div>

          {/* Nav Menu (Desktop) - Clean, Expert Dropdown Container */}
          <nav className="hidden md:block relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                desktopMenuOpen
                  ? 'bg-[#087cff]/20 text-white border-[#35c9ff]/60 shadow-[0_0_15px_rgba(8,124,255,0.35)]'
                  : 'bg-white/5 hover:bg-white/10 text-blue-100/90 border-white/10 hover:border-white/20'
              }`}
              aria-expanded={desktopMenuOpen}
              aria-haspopup="true"
            >
              <Menu className="w-4 h-4 text-[#35c9ff]" />
              <span>{lang === 'ht' ? 'Meni' : lang === 'fr' ? 'Menu' : lang === 'es' ? 'Menú' : 'Menu'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-blue-300/70 transition-transform duration-200 ${
                  desktopMenuOpen ? 'rotate-180 text-[#35c9ff]' : ''
                }`}
              />
            </button>

            {/* Desktop Dropdown Menu Panel */}
            {desktopMenuOpen && (
              <div className="absolute top-full left-0 mt-2.5 w-64 p-2 rounded-2xl bg-[#020712]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50">
                <div className="text-[10px] uppercase font-black tracking-wider text-blue-200/40 px-3 py-1.5 select-none">
                  {lang === 'ht' ? 'Navigasyon Sit la' : lang === 'fr' ? 'Navigation' : lang === 'es' ? 'Navegación' : 'Navigation'}
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => scrollTo('home')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.nav.home}</span>
                  </button>

                  <button
                    onClick={() => scrollTo('features')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.nav.features}</span>
                  </button>

                  <button
                    onClick={() => scrollTo('gid-enstalasyon')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.nav.installGuide}</span>
                  </button>

                  <button
                    onClick={() => scrollTo('sekirite')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/40 transition text-left cursor-pointer group border border-emerald-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span>{t.nav.security}</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </button>

                  <button
                    onClick={() => scrollTo('temwayaj')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <Quote className="w-3.5 h-3.5" />
                    </div>
                    <span>{lang === 'ht' ? 'Temwayaj' : lang === 'fr' ? 'Témoignages' : lang === 'es' ? 'Testimonios' : 'Testimonials'}</span>
                  </button>

                  <button
                    onClick={() => scrollTo('download')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <Download className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.nav.download}</span>
                  </button>

                  <button
                    onClick={() => scrollTo('contact')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-100/85 hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span>{t.nav.contact}</span>
                  </button>

                  <div className="pt-1 mt-1 border-t border-white/10 space-y-1">
                    {donationsEnabled && onOpenDonations && (
                      <button
                        onClick={() => {
                          setDesktopMenuOpen(false);
                          onOpenDonations();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-pink-300 hover:text-white hover:bg-pink-600/20 transition text-left cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-pink-500/15 border border-pink-400/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition">
                          <Heart className="w-3.5 h-3.5" />
                        </div>
                        <span>{lang === 'ht' ? 'Sipòte / Donasyon' : lang === 'fr' ? 'Soutenir / Faire un Don' : lang === 'es' ? 'Apoyar / Donaciones' : 'Support / Donate'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setDesktopMenuOpen(false);
                        if (onNavigateLegalRoute) {
                          onNavigateLegalRoute('privacy');
                        } else {
                          onOpenPolicies?.('privacy');
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#35c9ff] hover:text-white hover:bg-blue-600/20 transition text-left cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-[#35c9ff] group-hover:scale-110 transition">
                        <Scale className="w-3.5 h-3.5" />
                      </div>
                      <span>{lang === 'ht' ? 'Regleman & Transparans' : lang === 'fr' ? 'Règlements & Confidentialité' : lang === 'es' ? 'Políticas y Términos' : 'Policies & Transparency'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Action Buttons with Ultra-Secure Live Indicator Pill, Version & Language Selector */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Stable Version Badge */}
            <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950/70 border border-[#35c9ff]/40 text-[#35c9ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35c9ff] animate-ping" />
              {versionBadge || t.nav.stableBadge}
            </span>

            {/* Interactive Language Dropdown Menu (Desktop) */}
            <div className="relative" ref={langMenuRef}>
              {(() => {
                const currentLanguage = languages.find((l) => l.code === lang) || languages[0];
                return (
                  <button
                    type="button"
                    onClick={() => setLangMenuOpen((prev) => !prev)}
                    aria-expanded={langMenuOpen}
                    aria-haspopup="listbox"
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-inner ${
                      langMenuOpen
                        ? 'bg-[#087cff]/25 text-white border-[#35c9ff]/60 shadow-[0_0_16px_rgba(8,124,255,0.45)]'
                        : 'bg-black/60 hover:bg-white/10 text-white border-white/15 hover:border-[#35c9ff]/40'
                    }`}
                    title={currentLanguage.name}
                  >
                    <Globe className="w-3.5 h-3.5 text-[#35c9ff] shrink-0" />
                    <span>{currentLanguage.flag}</span>
                    <span className="whitespace-nowrap font-extrabold text-[#35c9ff]">
                      {currentLanguage.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-blue-300/80 transition-transform duration-200 ${
                        langMenuOpen ? 'rotate-180 text-[#35c9ff]' : ''
                      }`}
                    />
                  </button>
                );
              })()}

              {langMenuOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 top-full mt-2.5 w-52 p-1.5 rounded-2xl bg-[#020712]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 space-y-1"
                >
                  {languages.map((l) => {
                    const isActive = lang === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setLang(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_15px_rgba(8,124,255,0.5)] font-extrabold border border-white/25'
                            : 'text-blue-100/80 hover:text-white hover:bg-white/10 font-semibold'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-sm">{l.flag}</span>
                          <span className="whitespace-nowrap">{l.name}</span>
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Live Indicator Pill - Only authentic point of access via 10-second continuous hold */}
            <SecureLivePill liveUsers={liveUsers} onOpenDev={onOpenDev} />

            {/* Quick Download Button */}
            <button
              onClick={() => onOpenDownload('mobile')}
              className="btn-gradient px-4 py-2 rounded-xl text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>{t.nav.quickDownload}</span>
            </button>
          </div>

          {/* Mobile hamburger & mobile live pill */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick mobile language pill */}
            <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg border border-white/15 text-[10px] font-bold">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-1 rounded ${lang === l.code ? 'text-[#35c9ff] font-extrabold' : 'text-blue-200/50'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <SecureLivePill liveUsers={liveUsers} onOpenDev={onOpenDev} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[rgba(10,28,59,0.6)] border border-white/10 text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1e4d8c]/40 space-y-3 bg-[#020712]/95 backdrop-blur-2xl">
            <div className="flex items-center justify-between px-4 pb-2 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-950/70 border border-[#35c9ff]/40 text-[#35c9ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35c9ff] animate-ping" />
                {versionBadge || t.nav.stableBadge}
              </span>
              <span className="text-[11px] text-green-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {liveUsers} an liy
              </span>
            </div>
            <div className="flex flex-col gap-2 font-semibold text-[#a6c1e3] px-2">
              <button
                onClick={() => scrollTo('home')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => scrollTo('features')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {t.nav.features}
              </button>
              <button
                onClick={() => scrollTo('gid-enstalasyon')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {t.nav.installGuide}
              </button>
              <button
                onClick={() => scrollTo('sekirite')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
              >
                {t.nav.security}
              </button>
              <button
                onClick={() => scrollTo('temwayaj')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {lang === 'ht' ? 'Temwayaj' : lang === 'fr' ? 'Témoignages' : lang === 'es' ? 'Testimonios' : 'Testimonials'}
              </button>
              <button
                onClick={() => scrollTo('download')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {t.nav.download}
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] hover:text-white transition cursor-pointer"
              >
                {t.nav.contact}
              </button>
              {donationsEnabled && onOpenDonations && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonations();
                  }}
                  className="text-left py-2 px-3 rounded-lg hover:bg-pink-950/40 text-pink-300 hover:text-white transition cursor-pointer flex items-center gap-2 border border-pink-500/20"
                >
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>{lang === 'ht' ? 'Sipòte / Donasyon' : lang === 'fr' ? 'Soutenir / Faire un Don' : lang === 'es' ? 'Apoyar / Donaciones' : 'Support / Donate'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateLegalRoute) {
                    onNavigateLegalRoute('privacy');
                  } else {
                    onOpenPolicies?.('privacy');
                  }
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#071d42] text-[#35c9ff] hover:text-white transition cursor-pointer flex items-center gap-2 border border-cyan-500/20"
              >
                <Scale className="w-4 h-4 text-[#35c9ff]" />
                <span>{lang === 'ht' ? 'Regleman & Transparans Sit la' : lang === 'fr' ? 'Règlements & Confidentialité' : lang === 'es' ? 'Políticas y Términos' : 'Policies & Transparency'}</span>
              </button>
            </div>

            {/* Mobile Language Selector Full Row */}
            <div className="px-2 pt-2 border-t border-white/10">
              <div className="text-[11px] text-blue-200/60 font-semibold mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#35c9ff]" />
                <span>Chwazi Lang / Language / Langue / Idioma</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-between border ${
                      lang === l.code
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-white/40 shadow-[0_0_15px_rgba(8,124,255,0.6)] font-extrabold'
                        : 'bg-white/5 text-blue-200/80 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.name}</span>
                    </div>
                    {lang === l.code && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e4d8c]/30 px-2">
              <button
                onClick={() => {
                  scrollTo('download');
                  setMobileMenuOpen(false);
                }}
                className="btn-gradient w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,124,255,0.4)] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.nav.quickDownload} OmniChurch</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
