import React, { useState } from 'react';
import { Download, ShieldCheck, UserCheck, Smartphone, Monitor, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DownloadLinks } from '../types';

interface InstallGuideSectionProps {
  links: DownloadLinks;
  onOpenDownload?: (platform?: 'mobile' | 'pc') => void;
}

export const InstallGuideSection: React.FC<InstallGuideSectionProps> = ({ links, onOpenDownload }) => {
  const [selectedTab, setSelectedTab] = useState<'mobile' | 'pc'>('mobile');

  const steps = selectedTab === 'mobile'
    ? [
        {
          num: '01',
          title: 'Klike sou Telechaje APK',
          desc: 'Telechaje vèsyon ofisyèl OmniChurch APK a (gwosè apeprè 18 MB) dirèkteman sou telefòn ou.',
          actionText: 'Telechaje APK Kounye a',
          platform: 'mobile' as const,
        },
        {
          num: '02',
          title: 'Otorize Enstalasyon an',
          desc: 'Si telefòn ou mande pèmisyon, aksepte "Enstale aplikasyon sous enkoni" pou pèmèt Android mete APK a.',
          actionText: 'Gade Sekirite & Pèmisyon',
          platform: 'mobile' as const,
        },
        {
          num: '03',
          title: 'Konekte & Jwenn Kat Manm',
          desc: 'Lanse OmniChurch, antre kòd sekirite legliz ou a, epi jwenn Kat Manm Vityèl ak kòd QR ou imedyatman!',
          actionText: 'Pare pou Itilize',
          platform: 'mobile' as const,
        },
      ]
    : [
        {
          num: '01',
          title: 'Telechaje Enstalatè PC (.EXE)',
          desc: 'Chwazi vèsyon 64-bit oswa 32-bit ki koresponn ak sistèm Windows ou a epi telechaje fichye .exe a.',
          actionText: 'Telechaje pou Windows',
          platform: 'pc' as const,
        },
        {
          num: '02',
          title: 'Lanse Enstalasyon an',
          desc: 'Klike de fwa sou "OmniChurch-Setup.exe". Si Windows SmartScreen parèt, klike "Plis enfòmasyon" epi "Egzekite kanmenm".',
          actionText: 'Gid SmartScreen',
          platform: 'pc' as const,
        },
        {
          num: '03',
          title: 'Lanse & Òganize Legliz Ou',
          desc: 'Lojisyèl la ap louvri imedyatman nan mòd offline lokal san bezwen entènèt pou enprime rapò ak anyè manm.',
          actionText: 'Pare pou Biwo',
          platform: 'pc' as const,
        },
      ];

  return (
    <section id="gid-enstalasyon" className="py-12 md:py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <span className="text-[#35c9ff] text-xs font-black tracking-[0.2em] uppercase block">
            Gid Enstalasyon Fasil
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Kijan pou Enstale OmniChurch an 3 Etap Senp
          </h2>
          <p className="text-sm sm:text-base text-blue-100/70 leading-relaxed max-w-xl mx-auto">
            Swiv etap sa yo pou w mete aplikasyon an sou telefòn ou oswa sou òdinatè w an mwens pase 1 minit.
          </p>

          {/* Platform Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 mt-2">
            <button
              onClick={() => setSelectedTab('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'mobile'
                  ? 'bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white shadow-md'
                  : 'text-blue-200/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pou Android (Telefòn)</span>
            </button>
            <button
              onClick={() => setSelectedTab('pc')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === 'pc'
                  ? 'bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white shadow-md'
                  : 'text-blue-200/60 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Pou Windows PC (Òdinatè)</span>
            </button>
          </div>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="glass p-6 sm:p-7 rounded-[22px] border border-white/10 hover:border-[#35c9ff]/40 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(3,10,25,0.6)] relative"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#35c9ff] to-blue-400 font-mono">
                  {s.num}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 group-hover:border-[#35c9ff]/60 transition-all">
                  {idx === 0 && <Download className="w-4 h-4 text-[#35c9ff]" />}
                  {idx === 1 && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  {idx === 2 && <UserCheck className="w-4 h-4 text-amber-400" />}
                </span>
              </div>

              {/* Step Info */}
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-bold text-white group-hover:text-[#35c9ff] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-200/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Bottom confirmation */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-blue-200/60">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sekirize &amp; Verifye</span>
                </span>
                <button
                  onClick={() => onOpenDownload?.(s.platform)}
                  className="text-[11px] font-bold text-[#35c9ff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Telechaje</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
