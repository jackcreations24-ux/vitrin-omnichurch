import React, { useState, useEffect } from 'react';
import { X, Smartphone, Monitor, Download, Apple, QrCode, Check, Clock, Cpu, Bell } from 'lucide-react';
import { DownloadLinks } from '../types';
import { detectDevice, DeviceDetectionResult } from '../utils/deviceDetect';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'mobile' | 'pc';
  links: DownloadLinks;
  onTrackDownload: (platform: 'mobile' | 'pc', label: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  platform,
  links,
  onTrackDownload,
}) => {
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceDetectionResult>(() => detectDevice());
  const [comingSoonNotice, setComingSoonNotice] = useState<string | null>(null);

  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  if (!isOpen) return null;

  const handleDownload = (type: 'mobile' | 'pc', name: string, url: string) => {
    onTrackDownload(type, name);
    setDownloadStarted(name);
    setTimeout(() => {
      setDownloadStarted(null);
      if (url && url !== '#') {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.download = type === 'mobile' ? 'OmniChurch-v2.4.apk' : `OmniChurch-Setup-${name.includes('32') ? 'x86' : 'x64'}.exe`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }, 600);
  };

  const handleComingSoon = (platformTitle: string) => {
    setComingSoonNotice(`Vèsyon ${platformTitle} lan ap devlope aktivman epi l ap disponib talè sou magazen ofisyèl la.`);
    setTimeout(() => {
      setComingSoonNotice(null);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass rounded-[24px] p-6 sm:p-8 border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl btn-secondary text-blue-200/70 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {platform === 'mobile' ? (
          /* Mobile options */
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-white/10 flex items-center justify-center text-[#35c9ff]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Telechaje OmniChurch Mobile</h3>
                <p className="text-xs text-blue-200/60">Chwazi vèsyon pou telefòn oswa tablèt ou a</p>
              </div>
            </div>

            {comingSoonNotice && (
              <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 animate-fadeIn">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{comingSoonNotice}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Android APK */}
              <div className="p-4 rounded-2xl bg-black/50 border border-green-500/30 hover:border-green-400/60 transition flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Android APK Dirèk</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-green-950/80 text-green-400 border border-green-500/30">
                      DISPONIB • 38 MB
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/60 mt-0.5">Enstale san pase pa Play Store</p>
                </div>

                <button
                  onClick={() => handleDownload('mobile', 'Android APK', links.android)}
                  className="btn-gradient px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {downloadStarted === 'Android APK' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>Kòmanse...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Telechaje</span>
                    </>
                  )}
                </button>
              </div>

              {/* iOS (iPhone & iPad) -> COMING SOON */}
              <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Apple iOS / iPhone</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-950/80 text-amber-300 border border-amber-500/30">
                      AP VINI TALÈ
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/60 mt-0.5">Vèsyon App Store ap prepare</p>
                </div>

                <button
                  onClick={() => handleComingSoon('Apple iOS')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Coming Soon</span>
                </button>
              </div>
            </div>

            {/* QR Code helper */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                <QrCode className="w-12 h-12 text-[#020712]" />
              </div>
              <div className="text-xs text-blue-200/70">
                <span className="font-bold text-white block">Eskane ak Kamera Telefòn Ou</span>
                Pou telechaje fichye APK a dirèkteman sou telefòn ou san kopye okenn lyen.
              </div>
            </div>
          </div>
        ) : (
          /* PC options */
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-white/10 flex items-center justify-center text-[#35c9ff]">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Telechaje OmniChurch pou PC</h3>
                <p className="text-xs text-blue-200/60">
                  {deviceInfo.isWindows
                    ? `Sistèm ou detekte: Windows (${deviceInfo.bitness}-bit)`
                    : 'Chwazi vèsyon ki koresponn ak machin ou an'}
                </p>
              </div>
            </div>

            {comingSoonNotice && (
              <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 animate-fadeIn">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{comingSoonNotice}</span>
              </div>
            )}

            <div className="space-y-3">
              {/* Windows 64-bit */}
              <div className={`p-4 rounded-2xl bg-black/50 border transition flex items-center justify-between ${
                deviceInfo.is64Bit ? 'border-[#35c9ff]/60 shadow-[0_0_15px_rgba(53,201,255,0.15)]' : 'border-white/10'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Windows 64-bit (x64)</span>
                    {deviceInfo.is64Bit && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#35c9ff]/20 text-[#35c9ff] border border-cyan-400/40">
                        REKÒMANDE POU PC OU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-200/60 mt-0.5">Pou Windows 11 ak majorite Windows 10</p>
                </div>

                <button
                  onClick={() => handleDownload('pc', 'Windows 64-bit', links.pc)}
                  className="btn-gradient px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {downloadStarted === 'Windows 64-bit' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>Kòmanse...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Telechaje</span>
                    </>
                  )}
                </button>
              </div>

              {/* Windows 32-bit */}
              <div className={`p-4 rounded-2xl bg-black/50 border transition flex items-center justify-between ${
                !deviceInfo.is64Bit && deviceInfo.isWindows ? 'border-[#35c9ff]/60 shadow-[0_0_15px_rgba(53,201,255,0.15)]' : 'border-white/10'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Windows 32-bit (x86)</span>
                    {!deviceInfo.is64Bit && deviceInfo.isWindows && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#35c9ff]/20 text-[#35c9ff] border border-cyan-400/40">
                        REKÒMANDE POU PC OU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-blue-200/60 mt-0.5">Pou pi ansyen PC Windows 7/8/10 32-bit</p>
                </div>

                <button
                  onClick={() => handleDownload('pc', 'Windows 32-bit', links.pc32 || links.pc)}
                  className="btn-secondary px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {downloadStarted === 'Windows 32-bit' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>Kòmanse...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Telechaje</span>
                    </>
                  )}
                </button>
              </div>

              {/* Apple Mac (macOS) -> COMING SOON */}
              <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Apple Mac (macOS)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-950/80 text-amber-300 border border-amber-500/30">
                      AP VINI TALÈ
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/60 mt-0.5">Fichye .dmg pou Mac M1/M2/M3 &amp; Intel</p>
                </div>

                <button
                  onClick={() => handleComingSoon('Apple Mac (macOS)')}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Coming Soon</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

