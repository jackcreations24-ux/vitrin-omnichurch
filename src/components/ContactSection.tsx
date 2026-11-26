import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, Send, Heart, ShieldCheck, Shield, FileText, Cookie, Award, ExternalLink } from 'lucide-react';
import { DEV_INFO } from '../data/defaultData';
import { DeveloperEngineConfig, EngineLang, SiteTextsConfig } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { resolveSiteTexts } from '../utils/textResolver';
import { PolicyTab } from './PoliciesModal';
import { LegalDocType } from './LegalDocumentPage';

interface ContactSectionProps {
  siteTexts?: SiteTextsConfig;
  developerEngine?: DeveloperEngineConfig;
  onOpenPolicies?: (tab?: PolicyTab) => void;
  onNavigateLegalRoute?: (docType: LegalDocType) => void;
  onOpenDonations?: () => void;
}

function getSafeExternalHref(raw?: string): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return undefined;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  siteTexts,
  developerEngine,
  onOpenPolicies,
  onNavigateLegalRoute,
  onOpenDonations,
}) => {
  const { t, lang } = useI18n();
  const activeLang: EngineLang = (['ht', 'fr', 'en', 'es'].includes(lang) ? lang : 'ht') as EngineLang;
  const resolved = resolveSiteTexts(siteTexts, t, lang);
  const footerAboutText = resolved.footerAbout;

  const donations = developerEngine?.donations;
  const donationsEnabled = Boolean(donations?.enabled && onOpenDonations);
  const enableShake = Boolean(donationsEnabled && donations?.enableShakeAnimation);
  const shakeIntervalSec = Math.min(30, Math.max(3, Number(donations?.shakeIntervalSeconds) || 8));
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!enableShake) {
      setIsShaking(false);
      return;
    }

    const triggerShake = () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 900);
    };

    const interval = setInterval(triggerShake, shakeIntervalSec * 1000);
    return () => clearInterval(interval);
  }, [enableShake, shakeIntervalSec]);

  const activeSponsors = (developerEngine?.sponsors || []).filter((s) => s.active !== false && s.name?.trim());
  const showSponsors = Boolean(developerEngine?.showSponsorsInFooter && activeSponsors.length > 0);

  const donateButtonLabel =
    donations?.localizedCopy?.[activeLang]?.screenTitle ||
    (activeLang === 'ht'
      ? 'Sipòte OmniChurch'
      : activeLang === 'fr'
      ? 'Soutenir OmniChurch'
      : activeLang === 'es'
      ? 'Apoyar a OmniChurch'
      : 'Support OmniChurch');

  const sponsorsHeading =
    activeLang === 'ht'
      ? 'Patnè & Sipòtè Ofisyèl OmniChurch Pro'
      : activeLang === 'fr'
      ? 'Partenaires & Sponsors Officiels'
      : activeLang === 'es'
      ? 'Patrocinadores y Socios Oficiales'
      : 'Official Partners & Sponsors';

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
              {footerAboutText}
            </p>
          </div>

          {/* Contact Action Buttons Box */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3.5 w-full lg:w-auto">
            <div className="text-xs font-bold text-[#35c9ff] uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.footer.supportTitle}</span>
            </div>

            <p className="text-xs text-blue-200/70 text-center lg:text-left">
              {t.footer.supportDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              {/* WhatsApp Button */}
              <a
                href={DEV_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center gap-2.5 transition shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-[1.02] cursor-pointer"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.footer.whatsappBtn}</span>
              </a>

              {/* Telegram Button */}
              <a
                href={DEV_INFO.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-950/70 hover:bg-sky-900/90 border border-sky-400/40 text-xs sm:text-sm font-bold text-sky-300 flex items-center justify-center gap-2.5 transition shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-[1.02] cursor-pointer"
                title="Telegram"
              >
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{t.footer.telegramBtn}</span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${DEV_INFO.email}`}
                className="w-full sm:w-auto px-5 py-3 rounded-xl btn-secondary hover:bg-blue-900/40 border border-blue-400/40 text-xs sm:text-sm font-bold text-blue-200 hover:text-white flex items-center justify-center gap-2.5 transition hover:scale-[1.02] cursor-pointer"
                title={t.footer.emailBtn}
              >
                <Mail className="w-4 h-4 text-[#35c9ff] shrink-0" />
                <span>{t.footer.emailBtn}</span>
              </a>

              {/* Multilingual Donations Trigger Button */}
              {donationsEnabled && (
                <button
                  type="button"
                  onClick={onOpenDonations}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600/80 to-rose-500/80 hover:from-pink-500 hover:to-rose-500 border border-pink-400/40 text-xs sm:text-sm font-extrabold text-white flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.03] cursor-pointer ${
                    isShaking ? 'animate-bounce' : ''
                  }`}
                >
                  <Heart className="w-4 h-4 text-pink-200 shrink-0" />
                  <span>{donateButtonLabel}</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Official Sponsors Strip (Synced from Cloud Firestore developer_engine) */}
        {showSponsors && (
          <div className="mt-8 p-5 rounded-2xl bg-black/35 border border-white/10 space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{sponsorsHeading}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {activeSponsors.map((sponsor) => {
                const safeHref = getSafeExternalHref(sponsor.websiteUrl);
                const safeLogo = getSafeExternalHref(sponsor.logoUrl);
                const inner = (
                  <>
                    {safeLogo && (
                      <img
                        src={safeLogo}
                        alt={sponsor.name}
                        className="w-5 h-5 rounded object-cover"
                      />
                    )}
                    <span className="font-bold text-white text-xs">{sponsor.name}</span>
                    {sponsor.tier && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase">
                        {sponsor.tier}
                      </span>
                    )}
                    {safeHref && <ExternalLink className="w-3 h-3 text-blue-200/60" />}
                  </>
                );

                return safeHref ? (
                  <a
                    key={sponsor.id || sponsor.name}
                    href={safeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={sponsor.id || sponsor.name}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Bottom with Copyright and Official Google Transparency & Policy Links */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 select-none text-center sm:text-left">
            <span>
              {t.footer.rights}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              {t.footer.madeWithLove}
            </span>
          </div>

          {/* Official Google Compliance & Clean Enterprise Legal Routes */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateLegalRoute) {
                  onNavigateLegalRoute('privacy');
                } else {
                  onOpenPolicies?.('privacy');
                }
              }}
              className="text-blue-200/70 hover:text-[#35c9ff] transition cursor-pointer flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-[#35c9ff]" />
              <span>{lang === 'ht' ? 'Politik Konfidansyalite' : lang === 'fr' ? 'Confidentialité' : lang === 'es' ? 'Privacidad' : 'Privacy Policy'}</span>
            </a>
            <span className="text-white/20 select-none">•</span>

            <a
              href="/terms-of-service"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateLegalRoute) {
                  onNavigateLegalRoute('terms');
                } else {
                  onOpenPolicies?.('terms');
                }
              }}
              className="text-blue-200/70 hover:text-[#35c9ff] transition cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-[#35c9ff]" />
              <span>{lang === 'ht' ? 'Kondisyon Itilizasyon' : lang === 'fr' ? 'Conditions' : lang === 'es' ? 'Términos' : 'Terms of Service'}</span>
            </a>
            <span className="text-white/20 select-none">•</span>

            <button
              type="button"
              onClick={() => onOpenPolicies?.('cookies')}
              className="text-blue-200/70 hover:text-amber-400 transition cursor-pointer flex items-center gap-1"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ht' ? 'Bonbon (Cookies)' : 'Cookies & Ads'}</span>
            </button>
            <span className="text-white/20 select-none">•</span>

            <button
              type="button"
              onClick={() => onOpenPolicies?.('security')}
              className="text-blue-200/70 hover:text-emerald-400 transition cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ht' ? 'Transparans Done' : 'Transparency'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};


