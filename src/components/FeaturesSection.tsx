import React from 'react';
import { CreditCard, QrCode, Bell, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { SiteTextsConfig } from '../types';
import { DEFAULT_SITE_TEXTS } from '../data/defaultData';
import { useI18n } from '../i18n/I18nContext';

interface FeaturesSectionProps {
  siteTexts?: SiteTextsConfig;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ siteTexts }) => {
  const { t, lang } = useI18n();
  const isCustomEdited = siteTexts && (siteTexts.featuresTitle !== DEFAULT_SITE_TEXTS.featuresTitle || siteTexts.feature1Title !== DEFAULT_SITE_TEXTS.feature1Title);

  const eyebrow = (isCustomEdited && lang === 'ht') ? siteTexts.featuresEyebrow : t.features.eyebrow;
  const title = (isCustomEdited && lang === 'ht') ? siteTexts.featuresTitle : t.features.title;
  const description = (isCustomEdited && lang === 'ht') ? siteTexts.featuresDescription : t.features.description;

  const features = [
    {
      icon: CreditCard,
      title: (isCustomEdited && lang === 'ht') ? siteTexts.feature1Title : t.features.f1.title,
      description: (isCustomEdited && lang === 'ht') ? siteTexts.feature1Desc : t.features.f1.desc,
      badge: t.features.f1.badge,
      benefits: t.features.f1.benefits,
    },
    {
      icon: QrCode,
      title: (isCustomEdited && lang === 'ht') ? siteTexts.feature2Title : t.features.f2.title,
      description: (isCustomEdited && lang === 'ht') ? siteTexts.feature2Desc : t.features.f2.desc,
      badge: t.features.f2.badge,
      benefits: t.features.f2.benefits,
    },
    {
      icon: Bell,
      title: (isCustomEdited && lang === 'ht') ? siteTexts.feature3Title : t.features.f3.title,
      description: (isCustomEdited && lang === 'ht') ? siteTexts.feature3Desc : t.features.f3.desc,
      badge: t.features.f3.badge,
      benefits: t.features.f3.benefits,
    },
    {
      icon: ShieldCheck,
      title: (isCustomEdited && lang === 'ht') ? siteTexts.feature4Title : t.features.f4.title,
      description: (isCustomEdited && lang === 'ht') ? siteTexts.feature4Desc : t.features.f4.desc,
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
