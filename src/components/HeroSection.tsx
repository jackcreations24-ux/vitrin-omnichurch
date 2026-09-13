import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  Download,
  Check,
  Apple,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  MessageSquare,
  Sparkles,
  ArrowDownToLine,
  Cpu,
  HelpCircle,
} from 'lucide-react';
import { VirtualMembershipCard } from './VirtualMembershipCard';
import { DownloadLinks, SiteTextsConfig } from '../types';
import { detectDevice, DeviceDetectionResult } from '../utils/deviceDetect';
import { DEFAULT_SITE_TEXTS } from '../data/defaultData';

interface HeroSectionProps {
  links: DownloadLinks;
  siteTexts?: SiteTextsConfig;
  onOpenDownload: (platform: 'mobile' | 'pc') => void;
  onOpenDev: () => void;
  onTrackDownload?: (platform: 'mobile' | 'pc', name: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  links,
  siteTexts,
  onOpenDownload,
  onOpenDev,
  onTrackDownload,
}) => {
  const texts = siteTexts || DEFAULT_SITE_TEXTS;
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>(() => detectDevice());
  const [selectedWinArch, setSelectedWinArch] = useState<'64' | '32'>('64');
  const [comingSoonNotice, setComingSoonNotice] = useState<string | null>(null);

  useEffect(() => {
    const info = detectDevice();
    setDeviceInfo(info);
    setSelectedWinArch(info.is64Bit ? '64' : '32');
  }, []);

  const handleDownloadDirect = (platform: 'mobile' | 'pc', name: string, url: string) => {
    if (onTrackDownload) {
      onTrackDownload(platform, name);
    }
    setDownloadFeedback(name);

    // Trigger download
    if (url && url !== '#') {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = platform === 'mobile' ? 'OmniChurch-v2.4.apk' : `OmniChurch-Setup-${name.includes('32') ? 'x86' : 'x64'}.exe`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      onOpenDownload(platform);
    }

    setTimeout(() => {
      setDownloadFeedback(null);
    }, 4000);
  };

  const handleComingSoon = (platformName: string) => {
    setComingSoonNotice(`Vèsyon ${platformName} lan ap devlope aktivman epi l ap disponib talè! Pou kounye a, telechaje vèsyon Android oswa Windows PC a.`);
    setTimeout(() => {
      setComingSoonNotice(null);
    }, 5000);
  };

  const pcDownloadUrl = selectedWinArch === '64' ? links.pc : (links.pc32 || links.pc);
  const pcDownloadLabel = `Windows (${selectedWinArch}-bit)`;

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Welcome, Value Proposition & Intelligent Downloads */}
          <div className="lg:col-span-7 text-left space-y-6 relative">
            
            {/* Decorative Virtual Membership Card in background on the right behind the welcome section */}
            <div className="hidden sm:block absolute -top-4 right-0 lg:-right-6 z-0 opacity-75 hover:opacity-100 transition-opacity duration-500 transform scale-80 sm:scale-90 lg:scale-95 origin-top-right pointer-events-auto">
              <VirtualMembershipCard />
            </div>

            {/* Welcome to OmniChurch - Luminous Brand Eyebrow */}
            <div className="flex flex-wrap items-center gap-2.5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-cyan-950/60 to-blue-950/80 border border-[#35c9ff]/40 shadow-[0_0_20px_rgba(53,201,255,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-[#35c9ff] animate-pulse" />
                <span className="text-xs font-black tracking-widest text-[#35c9ff] uppercase">
                  {texts.heroEyebrow}
                </span>
                {texts.heroEyebrowSub && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                    <span className="text-[11px] text-blue-100/90 font-semibold">
                      {texts.heroEyebrowSub}
                    </span>
                  </>
                )}
              </div>

              {texts.heroBadge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-green-950/60 border border-green-500/30 text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  {texts.heroBadge}
                </span>
              )}
            </div>

            {/* Main Headline: Professional and Impactful */}
            <div className="space-y-3 relative z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.03] tracking-tight text-white">
                {texts.heroTitlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#35c9ff] to-blue-400 drop-shadow-[0_0_30px_rgba(8,124,255,0.5)]">
                  {texts.heroTitleHighlight}
                </span>
                {texts.heroSubtitle && (
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-100/95 mt-2">
                    {texts.heroSubtitle}
                  </span>
                )}
              </h1>
              <p className="text-blue-100/75 text-base sm:text-lg max-w-xl leading-relaxed pt-1">
                {texts.heroDescription}
              </p>
            </div>

            {/* Intelligent Architecture Detection Alert (Detects 64-bit or 32-bit PC) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[rgba(6,22,54,0.85)] to-[rgba(10,32,75,0.7)] border border-cyan-400/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#35c9ff]/15 flex items-center justify-center shrink-0 text-[#35c9ff]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <span>Deteksyon Otomatik Sistèm Ou:</span>
                    <span className="text-[#35c9ff] font-extrabold uppercase">
                      {deviceInfo.isWindows
                        ? `Windows (${deviceInfo.bitness}-bit ${deviceInfo.cpuArch})`
                        : deviceInfo.osName}
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-200/65">
                    {deviceInfo.isWindows
                      ? `Siti a adapte telechajman an otomatikman pou achitekti ${deviceInfo.bitness}-bit PC w la.`
                      : 'Chwazi vèsyon ki koresponn ak aparèy ou an pi ba a.'}
                  </div>
                </div>
              </div>

              {/* Bit Architecture Switcher */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedWinArch('64')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedWinArch === '64'
                      ? 'bg-[#35c9ff] text-[#020712] shadow-sm'
                      : 'text-blue-200/60 hover:text-white'
                  }`}
                >
                  64-bit {deviceInfo.is64Bit && '★'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedWinArch('32')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedWinArch === '32'
                      ? 'bg-[#35c9ff] text-[#020712] shadow-sm'
                      : 'text-blue-200/60 hover:text-white'
                  }`}
                >
                  32-bit {!deviceInfo.is64Bit && '★'}
                </button>
              </div>
            </div>

            {/* DOWNLOAD ACTION BUTTONS */}
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-blue-200/70 uppercase tracking-wider flex items-center gap-2">
                <ArrowDownToLine className="w-3.5 h-3.5 text-[#35c9ff]" />
                <span>Telechaje vèsyon ofisyèl la sou aparèy ou an:</span>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {/* 1. Android Download Button (Available Now) */}
                <button
                  onClick={() => handleDownloadDirect('mobile', 'Android APK', links.android)}
                  className="btn-gradient w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center sm:justify-start gap-3 shadow-[0_10px_30px_rgba(8,124,255,0.4)] hover:scale-[1.02] transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                    {downloadFeedback === 'Android APK' ? (
                      <Check className="w-5 h-5 text-green-300 animate-bounce" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-blue-100/80 leading-none">Telechaje pou</div>
                    <div className="text-base font-extrabold leading-tight">Android (APK)</div>
                  </div>
                  <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                    ~18 MB
                  </span>
                </button>

                {/* 2. PC Windows Download Button (Smart 64-bit / 32-bit) */}
                <button
                  onClick={() => handleDownloadDirect('pc', pcDownloadLabel, pcDownloadUrl)}
                  className="btn-secondary w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center sm:justify-start gap-3 hover:scale-[1.02] transition-all cursor-pointer group relative"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                    {downloadFeedback === pcDownloadLabel ? (
                      <Check className="w-5 h-5 text-green-300 animate-bounce" />
                    ) : (
                      <Monitor className="w-5 h-5 text-[#35c9ff]" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-blue-200/60 leading-none">Telechaje pou PC</div>
                    <div className="text-base font-extrabold leading-tight text-white">
                      Windows ({selectedWinArch}-bit)
                    </div>
                  </div>
                  <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-400/20 text-[#35c9ff] border border-blue-400/30">
                    .exe
                  </span>
                </button>
              </div>

              {/* Discreet Apple iOS & Mac notice without duplicate fake buttons */}
              <div className="flex items-center gap-2 text-xs text-blue-200/60 pt-0.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  AP VINI TALÈ
                </span>
                <span>Vèsyon pou Apple iOS (iPhone) ak Mac ap prepare pou App Store.</span>
              </div>

              {/* Feedback toast if downloaded */}
              {downloadFeedback && (
                <div className="p-3 rounded-xl bg-green-950/70 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Telechajman {downloadFeedback} an kòmanse! Tcheke dosye telechajman sou aparèy ou an.</span>
                </div>
              )}

              {/* Coming Soon Alert Modal Toast */}
              {comingSoonNotice && (
                <div className="p-3.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs font-medium flex items-start gap-2.5 animate-fadeIn">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">Ap Vini Talè (Coming Soon):</span>
                    {comingSoonNotice}
                  </div>
                </div>
              )}
            </div>

            {/* Trust highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-blue-200/60">
              <span className="flex items-center gap-1.5 text-blue-200/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>100% Gratis pou kòmanse</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-200/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Enstalasyon an 1 minit</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-200/90 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Fèt pou Kominote Kretyen an</span>
              </span>
            </div>

            {/* Showcase Quick feature pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass p-3 rounded-2xl text-center hover:border-cyan-400/40 transition-colors">
                <div className="text-lg">🪪</div>
                <div className="text-xs font-bold text-white mt-1">Kat Manm Dijital</div>
                <div className="text-[10px] text-blue-200/50">Kòd QR vityèl</div>
              </div>
              <div className="glass p-3 rounded-2xl text-center hover:border-cyan-400/40 transition-colors">
                <div className="text-lg">📷</div>
                <div className="text-xs font-bold text-white mt-1">Siveyans Prezans</div>
                <div className="text-[10px] text-blue-200/50">Eskanè papòt rapid</div>
              </div>
              <div className="glass p-3 rounded-2xl text-center hover:border-cyan-400/40 transition-colors">
                <div className="text-lg">📢</div>
                <div className="text-xs font-bold text-white mt-1">Anons &amp; Notifikasyon</div>
                <div className="text-[10px] text-blue-200/50">Mesaj dirèk an mas</div>
              </div>
              <div className="glass p-3 rounded-2xl text-center hover:border-cyan-400/40 transition-colors">
                <div className="text-lg">🔒</div>
                <div className="text-xs font-bold text-white mt-1">100% Offline</div>
                <div className="text-[10px] text-blue-200/50">Bazdone lokal sekirize</div>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Smartphone Showcase Mockup (Vitrine of OmniChurch App) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Ambient Background glow under mockup */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#087cff]/30 to-[#35c9ff]/20 blur-3xl rounded-full -z-10 transform scale-90"></div>

            {/* Floating Badge 1: Android APK Ready (desktop & tablet) */}
            <div className="hidden sm:flex absolute -top-3 -left-4 sm:-left-6 glass px-3.5 py-2 rounded-2xl border border-cyan-400/40 text-xs font-bold text-white shadow-xl items-center gap-2 z-20 animate-bounce duration-1000">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_#3df58b]"></span>
              <span>📱 Android APK Pare (38 MB)</span>
            </div>

            {/* Floating Badge 2: Windows PC 64/32 (desktop & tablet) */}
            <div className="hidden sm:flex absolute -bottom-3 -right-4 sm:-right-6 glass px-3.5 py-2 rounded-2xl border border-blue-500/40 text-xs font-bold text-white shadow-xl items-center gap-2 z-20">
              <Monitor className="w-4 h-4 text-[#35c9ff]" />
              <span>💻 PC {deviceInfo.bitness}-bit pare pou biwo</span>
            </div>

            {/* Real Smartphone Frame Mockup */}
            <div className="w-full max-w-[330px] rounded-[42px] p-3.5 bg-[#030915] border-[3px] border-white/20 shadow-[0_30px_90px_rgba(8,124,255,0.45)] relative overflow-hidden backdrop-blur-xl">
              
              {/* Dynamic Island / Speaker Pill */}
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#112240] mr-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#112240]"></div>
              </div>

              {/* Mobile Screen Display Container */}
              <div className="rounded-[32px] bg-gradient-to-b from-[#07193b] via-[#041026] to-[#020712] p-4 text-left border border-white/10 space-y-4">
                
                {/* App Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                      O
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">OmniChurch Pro</div>
                      <div className="text-[9px] text-green-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Konekte sou Cloud
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-blue-200">
                    v2.4
                  </span>
                </div>

                {/* Church Header Card inside App */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-blue-200/60 font-semibold uppercase">Legliz Pa W la</div>
                  <div className="text-sm font-black text-white mt-0.5">Tabènak de Gras</div>
                  <div className="text-[10px] text-blue-200/70 mt-0.5">Pastè Pierre-Richard Louis</div>
                </div>

                {/* Live Stats Row inside App */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[9px] text-blue-200/50 uppercase font-bold">Total Manm</div>
                    <div className="text-lg font-black text-white mt-0.5">1,248</div>
                    <div className="text-[9px] text-green-400 font-semibold">+14 mwa sa</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[9px] text-blue-200/50 uppercase font-bold">Prezans Kil</div>
                    <div className="text-lg font-black text-[#35c9ff] mt-0.5">94.8%</div>
                    <div className="text-[9px] text-blue-200/60 font-semibold">Dimanch pase</div>
                  </div>
                </div>

                {/* Quick App Navigation Modules */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-blue-200/60 font-bold uppercase tracking-wider">
                    Modil Disponib Yo
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                      <span className="text-sm">👥</span>
                      <span className="text-white font-bold text-[11px]">Anyè Manm</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                      <span className="text-sm">💬</span>
                      <span className="text-white font-bold text-[11px]">SMS Kominote</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                      <span className="text-sm">💰</span>
                      <span className="text-white font-bold text-[11px]">Finans &amp; Dim</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                      <span className="text-sm">📅</span>
                      <span className="text-white font-bold text-[11px]">Evènman Kil</span>
                    </div>
                  </div>
                </div>

                {/* Live Announcement inside App */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-[#35c9ff]/30 text-xs">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#35c9ff] font-bold uppercase">
                    <span>📢 Dènye Anons Voye</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-1">
                    Gwo sèvis adorasyon dimanch maten a 9:00 AM
                  </div>
                  <div className="text-[9px] text-green-400 mt-0.5">
                    ✓ Voye bay 1,248 manm sou telefòn yo
                  </div>
                </div>

                {/* App Active Status Indicator */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-[11px] text-blue-200/80">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Sistèm nan fonksyone nòmalman
                  </span>
                  <span className="font-bold text-white text-[10px] px-1.5 py-0.5 rounded bg-white/10">v2.4 Pro</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

