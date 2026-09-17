import React from 'react';
import { CreditCard, QrCode, Bell, ShieldCheck, Check, Smartphone } from 'lucide-react';
import { SiteTextsConfig } from '../types';
import { DEFAULT_SITE_TEXTS } from '../data/defaultData';
import { useI18n } from '../i18n/I18nContext';
import { VirtualMembershipCard } from './VirtualMembershipCard';
import { resolveSiteTexts } from '../utils/textResolver';

interface FeaturesSectionProps {
  siteTexts?: SiteTextsConfig;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ siteTexts }) => {
  const { t, lang } = useI18n();
  const resolved = resolveSiteTexts(siteTexts, t, lang);

  const eyebrow = resolved.featuresEyebrow;
  const title = resolved.featuresTitle;
  const description = resolved.featuresDescription;

  const features = [
    {
      icon: CreditCard,
      title: resolved.feature1Title,
      description: resolved.feature1Desc,
      badge: t.features.f1.badge,
      benefits: t.features.f1.benefits,
    },
    {
      icon: QrCode,
      title: resolved.feature2Title,
      description: resolved.feature2Desc,
      badge: t.features.f2.badge,
      benefits: t.features.f2.benefits,
    },
    {
      icon: Bell,
      title: resolved.feature3Title,
      description: resolved.feature3Desc,
      badge: t.features.f3.badge,
      benefits: t.features.f3.benefits,
    },
    {
      icon: ShieldCheck,
      title: resolved.feature4Title,
      description: resolved.feature4Desc,
      badge: t.features.f4.badge,
      benefits: t.features.f4.benefits,
    },
  ];

  return (
    <section id="features" className="py-14 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-[#35c9ff] text-xs font-black tracking-[0.2em] uppercase block">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-blue-100/60 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Highlight Banner: 3D Virtual Membership Card for Both Mobile and Desktop */}
        <div className="mb-10 sm:mb-14 p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06183d]/90 via-[#030d22]/95 to-black border border-[#35c9ff]/30 shadow-[0_20px_50px_rgba(0,0,0,0.65)] relative overflow-hidden">
          {/* Subtle Ambient Aura Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#087cff]/20 to-[#35c9ff]/20 blur-3xl rounded-full -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
            {/* Left Content */}
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087cff]/20 text-[#35c9ff] border border-[#35c9ff]/30 text-xs font-extrabold tracking-wide">
                <span>Eksklizif sou OmniChurch</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                🪪 Kat Manm Vityèl 3D Sekirize
              </h3>

              <p className="text-xs sm:text-sm text-blue-100/75 leading-relaxed">
                Chak fidèl nan asanble a resevwa yon kat manm vityèl 3D ak kòd QR inik, siyati pastè a, ak idantifyan RFID sekirize. Li fonksyone san entènèt sou telefòn Android ak PC.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-blue-200/90 pt-1">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Wotasyon 3D Rekto / Vèso</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kòd QR Eskane pou Prezans</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Valab san Koneksyon Entènèt</span>
                </span>
              </div>
            </div>

            {/* Right: Interactive 3D Card Display */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full sm:w-auto">
              <VirtualMembershipCard />
              <p className="text-[11px] text-blue-200/50 mt-3 font-medium flex items-center gap-1.5">
                <span>👆</span>
                <span>Klike oswa pase dwèt sou kat la pou w vire l (Rekto / Vèso)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass p-6 rounded-[18px] hover:border-[#35c9ff]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-white/10 flex items-center justify-center mb-4 text-[#35c9ff] shadow-inner">
                    <Icon className="w-6 h-6 text-[#35c9ff]" />
                  </div>

                  <span className="text-[10px] font-bold text-[#35c9ff] uppercase tracking-wider mb-1 block">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-blue-200/60 leading-relaxed mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  {item.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-blue-100/80">
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
