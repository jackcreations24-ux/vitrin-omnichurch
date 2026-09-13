import React from 'react';
import { Mail, MessageCircle, Send, ArrowUp, Heart, ShieldCheck, Settings } from 'lucide-react';
import { DEV_INFO, DEFAULT_SITE_TEXTS } from '../data/defaultData';
import { SiteTextsConfig } from '../types';

interface ContactSectionProps {
  siteTexts?: SiteTextsConfig;
  onOpenDev?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ siteTexts, onOpenDev }) => {
  const texts = siteTexts || DEFAULT_SITE_TEXTS;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-[var(--bg)]/95 pt-12 sm:pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Main Contact Card */}
        <div className="glass p-5 sm:p-8 lg:p-10 rounded-[22px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          <div className="space-y-3 text-center lg:text-left w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#35c9ff] to-[#087cff] flex items-center justify-center font-extrabold text-white text-lg shadow-[0_0_20px_rgba(8,124,255,0.6)]">
                O
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Omni<span className="text-[#35c9ff]">Church</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/60 max-w-md mx-auto lg:mx-0">
              {texts.footerAbout}
            </p>
          </div>

          {/* Contact Action Buttons Box (Only buttons visible, phone & email hidden/secret) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3.5 w-full lg:w-auto">
            <div className="text-xs font-bold text-[#35c9ff] uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sipò &amp; Kominikasyon</span>
            </div>

            <p className="text-xs text-blue-200/70 text-center lg:text-left">
              Chwazi yon kanal pou kontakte ekip sipò OmniChurch la dirèkteman:
            </p>

            {/* ONLY ACTION BUTTONS - RAW NUMBER AND EMAIL ARE SECRET */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              {/* WhatsApp Button */}
              <a
                href={DEV_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center gap-2.5 transition shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-[1.02] cursor-pointer"
                title="Kontakte nou sou WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* Telegram Button */}
              <a
                href={DEV_INFO.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-950/70 hover:bg-sky-900/90 border border-sky-400/40 text-xs sm:text-sm font-bold text-sky-300 flex items-center justify-center gap-2.5 transition shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-[1.02] cursor-pointer"
                title="Rejwenn nou sou Telegram"
              >
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Telegram</span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${DEV_INFO.email}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl btn-secondary hover:bg-blue-900/40 border border-blue-400/40 text-xs sm:text-sm font-bold text-blue-200 hover:text-white flex items-center justify-center gap-2.5 transition hover:scale-[1.02] cursor-pointer"
                title="Voye yon Imèl bay sipò a"
              >
                <Mail className="w-4 h-4 text-[#35c9ff] shrink-0" />
                <span>Voye yon Imèl</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 select-none text-center sm:text-left">
            <span>{DEV_INFO.copyright}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Fèt ak <Heart className="w-3 h-3 text-red-400 fill-current" /> pou kominote kretyen yo
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDev && (
              <button
                onClick={onOpenDev}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-blue-200/70 hover:text-white transition flex items-center gap-1.5 font-semibold text-xs cursor-pointer"
                title="Ouvri Panèl Administrasyon OmniChurch (Modpas: OmniChurch@2026)"
              >
                <Settings className="w-3.5 h-3.5 text-[#35c9ff]" />
                <span className="hidden xs:inline">Panèl Admin</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="btn-secondary p-2.5 rounded-xl text-blue-200/80 hover:text-white transition flex items-center gap-1.5 font-bold cursor-pointer"
              title="Retounen anlè"
            >
              <ArrowUp className="w-4 h-4 text-[#35c9ff]" />
              <span className="hidden sm:inline">Anlè</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

