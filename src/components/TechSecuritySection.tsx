import React from 'react';
import {
  ShieldCheck,
  Lock,
  WifiOff,
  Cpu,
  CloudCheck,
  CheckCircle2,
  FileKey2,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const TechSecuritySection: React.FC = () => {
  const { t } = useI18n();

  const pillarIcons = [WifiOff, Lock, Cpu, CloudCheck];

  return (
    <section id="sekirite" className="py-14 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.security.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.security.title}
          </h2>
          <p className="text-sm sm:text-base text-blue-100/60 leading-relaxed max-w-2xl mx-auto">
            {t.security.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {t.security.pillars.map((item, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={idx}
                className="glass p-5 sm:p-6 rounded-[20px] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/30 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 shadow-inner">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 block">
                    {item.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-blue-200/60 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/10 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-blue-100/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Architecture & Privacy Assurance Banner */}
        <div className="glass p-5 sm:p-8 rounded-[24px] border border-white/10 bg-gradient-to-br from-emerald-950/20 via-[#031129] to-[#041a3d]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <FileKey2 className="w-5 h-5 text-emerald-400" />
                <span>{t.security.specsTitle}</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100/70 leading-relaxed">
                {t.security.subtitle}
              </p>
            </div>

            {/* Quick Tech Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 w-full lg:w-auto">
              {t.security.specs.map((spec, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] text-blue-200/50 font-medium">{spec.label}</div>
                  <div className="text-[11px] sm:text-xs font-bold text-emerald-300 font-mono mt-0.5 break-words">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

