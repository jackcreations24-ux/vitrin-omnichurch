import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Apple,
  Monitor,
  Download,
  Check,
  Sparkles,
  Clock,
  Cpu,
  Bell,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { DownloadLinks, SiteTextsConfig } from '../types';
import { detectDevice, detectArchitecture, DeviceDetectionResult } from '../utils/deviceDetect';
import { DEFAULT_SITE_TEXTS } from '../data/defaultData';
import { PcInstallGuideModal } from './PcInstallGuideModal';

interface DownloadSectionProps {
  links: DownloadLinks;
  siteTexts?: SiteTextsConfig;
  detectedArch?: '64' | '32';
  onOpenPcGuide?: () => void;
  onTrackDownload: (platform: 'mobile' | 'pc', name: string) => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  links,
  siteTexts,
  detectedArch: propDetectedArch,
  onOpenPcGuide,
  onTrackDownload,
}) => {
  const texts = siteTexts || DEFAULT_SITE_TEXTS;
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>(() => detectDevice());
  const [activeDetectedArch, setActiveDetectedArch] = useState<'64' | '32'>(() => {
    if (propDetectedArch) return propDetectedArch;
    return detectArchitecture();
  });
  const [selectedArch, setSelectedArch] = useState<'64' | '32'>('64');
  const [notifiedEmail, setNotifiedEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [comingSoonToast, setComingSoonToast] = useState<string | null>(null);
  const [localGuideOpen, setLocalGuideOpen] = useState(false);

  // Detect and synchronize architecture via navigator.platform or navigator.userAgent
  useEffect(() => {
    const info = detectDevice();
    setDeviceInfo(info);
    const arch = propDetectedArch || detectArchitecture();
    setActiveDetectedArch(arch);
    setSelectedArch(arch);
  }, [propDetectedArch]);

  const handleDownloadClick = (platform: 'mobile' | 'pc', name: string, url?: string) => {
    onTrackDownload(platform, name);
    if (url && url !== '#') {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = platform === 'mobile' ? 'OmniChurch-v2.4.apk' : `OmniChurch-Setup-${name.includes('32') ? 'x86' : 'x64'}.exe`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const showComingSoonAlert = (platform: string) => {
    setComingSoonToast(`Vèsyon ${platform} lan ap prepare kounye a pa ekip OmniChurch la. Enskri imèl ou anba pou resevwa yon alèt le li pare!`);
    setTimeout(() => {
      setComingSoonToast(null);
    }, 6000);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifiedEmail) {
      setIsNotified(true);
      setTimeout(() => {
        setIsNotified(false);
        setNotifiedEmail('');
      }, 5000);
    }
  };

  const handleOpenGuide = () => {
    if (onOpenPcGuide) {
      onOpenPcGuide();
    } else {
      setLocalGuideOpen(true);
    }
  };

  const winActiveUrl = selectedArch === '64' ? links.pc : (links.pc32 || links.pc);

  // Dynamically calculate download button label based on detected architecture
  const isSelectedArchDetected = selectedArch === activeDetectedArch;
  const isUserOnWindows = deviceInfo.isWindows;

  let dynamicButtonLabel = `Telechaje Windows (${selectedArch}-bit)`;
  if (isUserOnWindows && isSelectedArchDetected) {
    dynamicButtonLabel = `Telechaje Windows (${selectedArch}-bit) • Rekòmande pou PC Ou`;
  } else if (selectedArch === '32') {
    dynamicButtonLabel = `Telechaje Windows 32-bit (x86) • Mòd Konpatibilite`;
  } else {
    dynamicButtonLabel = `Telechaje Windows 64-bit (x64) Pro`;
  }

  return (
    <section id="download" className="py-14 md:py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-[#35c9ff] text-xs font-black tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#35c9ff]" />
            <span>Telechajman Santralize</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {texts.downloadTitle}
          </h2>
          <p className="text-sm sm:text-base text-blue-100/70 leading-relaxed max-w-2xl mx-auto">
            {texts.downloadSubtitle}
          </p>

          {/* Intelligent Device Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 pt-2 px-3.5 py-2 rounded-2xl bg-blue-950/70 border border-cyan-400/20 text-xs text-blue-200">
            <Cpu className="w-4 h-4 text-[#35c9ff]" />
            <span>Aparèy ou an detekte kòm:</span>
            <span className="font-extrabold text-white px-2 py-0.5 rounded bg-blue-900/60 border border-blue-400/30">
              {deviceInfo.isWindows ? `Windows PC (${deviceInfo.bitness}-bit)` : deviceInfo.osName}
            </span>
            <span className="text-green-400 font-bold text-[11px]">✓ Telechajman rekòmande a prepare</span>
          </div>
        </div>

        {/* Coming Soon notification toast */}
        {comingSoonToast && (
          <div className="max-w-xl mx-auto mb-8 p-4 rounded-2xl bg-amber-950/90 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-3 shadow-2xl animate-fadeIn">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block text-sm">Ap Vini Talè (Coming Soon)</span>
              <p className="mt-1 leading-relaxed">{comingSoonToast}</p>
            </div>
          </div>
        )}

        {/* 4 Cards: Android (Available), Windows PC (Available with 64/32 switch), iOS (Coming Soon), Mac (Coming Soon) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Card 1: Android APK (AVAILABLE NOW) */}
          <div className="glass p-6 rounded-[22px] border-green-500/30 hover:border-green-400/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(3,10,25,0.6)]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-600/30 border border-green-400/30 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform shadow-lg">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-green-950/80 border border-green-500/40 text-green-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  DISPONIB KOUNYE A
                </span>
              </div>

              <div className="text-[10px] font-extrabold text-[#35c9ff] tracking-wider uppercase">ANDROID MOBILE</div>
              <h3 className="text-xl font-extrabold text-white mt-1 mb-2">OmniChurch APK</h3>
              <p className="text-xs text-blue-200/65 leading-relaxed mb-4">
                Enstale fichye APK dirèkteman sou telefòn oswa tablèt Android ou san w pa bezwen pase pa Play Store.
              </p>

              <div className="space-y-2 text-xs text-blue-100/80 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Vèsyon 1.0.0 Stable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Gwosè Fichye: ~18 MB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Android 7.0 oswa pi resan</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownloadClick('mobile', 'Android APK', links.android)}
              className="btn-gradient w-full py-3.5 px-4 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
            >
              <Download className="w-4 h-4" />
              <span>Telechaje APK Dirèk (~18 MB)</span>
            </button>
          </div>

          {/* Card 2: Windows Desktop PC (64-bit / 32-bit Intelligent) */}
          <div className="glass p-6 rounded-[22px] border-cyan-400/40 hover:border-cyan-400/70 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(3,10,25,0.6)] relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-cyan-400/30 flex items-center justify-center text-[#35c9ff] group-hover:scale-105 transition-transform shadow-lg">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-950/80 border border-[#35c9ff]/40 text-[#35c9ff] flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  DETEKSYON SMART
                </span>
              </div>

              <div className="text-[10px] font-extrabold text-[#35c9ff] tracking-wider uppercase">WINDOWS DESKTOP</div>
              <h3 className="text-xl font-extrabold text-white mt-1 mb-2">OmniChurch PC</h3>
              <p className="text-xs text-blue-200/65 leading-relaxed mb-3">
                Lojisyèl biwo pou jesyon ak sekretarya legliz la. Fonksyone offline e fasil pou enprime rapò.
              </p>

              {/* Architecture Selector 64-bit vs 32-bit */}
              <div className="mb-4 p-2 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-200/70 mb-1.5 px-1">
                  <span>Chwazi Achitekti:</span>
                  <span className="text-[#35c9ff]">
                    {deviceInfo.isWindows ? `Detekte: ${deviceInfo.bitness}-bit` : 'Windows'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedArch('64')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      selectedArch === '64'
                        ? 'bg-[#35c9ff] text-[#020712] shadow-md'
                        : 'bg-white/5 text-blue-200/70 hover:text-white'
                    }`}
                  >
                    <span>64-bit (x64)</span>
                    {activeDetectedArch === '64' && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-black/20 font-black text-cyan-900">
                        ★ Detekte
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedArch('32')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      selectedArch === '32'
                        ? 'bg-[#35c9ff] text-[#020712] shadow-md'
                        : 'bg-white/5 text-blue-200/70 hover:text-white'
                    }`}
                  >
                    <span>32-bit (x86)</span>
                    {activeDetectedArch === '32' && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-black/20 font-black text-cyan-900">
                        ★ Detekte
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-blue-100/80 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Windows 11 / 10 / 8 / 7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Enstalatè {selectedArch}-bit konpatib</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Enprime anyè &amp; rapò dim</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleDownloadClick('pc', `Windows Installer (${selectedArch}-bit)`, winActiveUrl)}
                className="btn-gradient w-full py-3.5 px-4 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform"
              >
                <Download className="w-4 h-4" />
                <span>{dynamicButtonLabel}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenGuide}
                className="w-full py-2 px-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 hover:border-cyan-400/60 text-cyan-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                title="Gid Enstalasyon Entelijan pou PC"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Gid Enstalasyon PC ({selectedArch}-bit)</span>
                <ChevronRight className="w-3 h-3 text-cyan-400/60 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Apple iOS (iPhone & iPad) -> COMING SOON */}
          <div className="glass p-6 rounded-[22px] border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(3,10,25,0.6)] relative opacity-95">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-lg">
                  <Apple className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-950/90 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                  COMING SOON
                </span>
              </div>

              <div className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase">APPLE iOS</div>
              <h3 className="text-xl font-extrabold text-white mt-1 mb-2">iPhone &amp; iPad</h3>
              <p className="text-xs text-blue-200/65 leading-relaxed mb-4">
                Vèsyon natif pou aparèy Apple ap finalize kounye a pou distribisyon ofisyèl sou Apple App Store.
              </p>

              <div className="space-y-2 text-xs text-blue-100/80 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-amber-200/80">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">Estati: Ap Vini Talè</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Konpatib iOS 16.0 oswa pi resan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Entegrasyon Apple Push &amp; iCloud</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showComingSoonAlert('Apple iOS (iPhone / iPad)')}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ap Vini Talè sou App Store</span>
            </button>
          </div>

          {/* Card 4: Apple Mac macOS -> COMING SOON */}
          <div className="glass p-6 rounded-[22px] border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-[0_10px_30px_rgba(3,10,25,0.6)] relative opacity-95">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-lg">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-950/90 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                  COMING SOON
                </span>
              </div>

              <div className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase">APPLE MAC</div>
              <h3 className="text-xl font-extrabold text-white mt-1 mb-2">macOS Universal</h3>
              <p className="text-xs text-blue-200/65 leading-relaxed mb-4">
                Vèsyon pou òdinatè Apple Mac (Apple Silicon M1/M2/M3 ak Intel) ap prepare pou kominote a.
              </p>

              <div className="space-y-2 text-xs text-blue-100/80 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-amber-200/80">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">Estati: Ap Vini Talè</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Pou Apple Silicon &amp; Intel Mac</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Fichye .dmg enstalasyon fasil</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showComingSoonAlert('Apple Mac (macOS)')}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ap Vini Talè sou Mac (.dmg)</span>
            </button>
          </div>

        </div>

        {/* Email Notification for Coming Soon Releases */}
        <div className="mt-10 p-5 sm:p-6 rounded-[22px] glass border border-amber-500/30 bg-gradient-to-r from-blue-950/40 via-[#071738]/60 to-amber-950/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-sm font-bold text-white">
                Ou vle resevwa alèt le vèsyon iOS ak Mac la disponib?
              </span>
            </div>
            <p className="text-xs text-blue-200/60">
              Antre adrès imèl ou pou resevwa lyen ofisyèl la premye moman li soti sou App Store ak Mac.
            </p>
          </div>

          <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-2">
            <input
              type="email"
              placeholder="adrès.imèl@egzanp.com"
              value={notifiedEmail}
              onChange={(e) => setNotifiedEmail(e.target.value)}
              required
              className="px-4 py-3 sm:py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-blue-200/40 focus:outline-none focus:border-[#35c9ff] w-full md:w-64"
            />
            <button
              type="submit"
              className="btn-gradient w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl text-white font-bold text-xs shrink-0 cursor-pointer"
            >
              {isNotified ? '✓ Anrejistre!' : 'Fè m Konnen'}
            </button>
          </form>
        </div>

      </div>

      {/* Fallback Smart PC Guide Modal */}
      {localGuideOpen && (
        <PcInstallGuideModal
          isOpen={localGuideOpen}
          onClose={() => setLocalGuideOpen(false)}
          detectedArch={activeDetectedArch}
          links={links}
          onDownload={handleDownloadClick}
        />
      )}
    </section>
  );
};

