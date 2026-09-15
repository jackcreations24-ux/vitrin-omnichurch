import React, { useState } from 'react';
import {
  X,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Download,
  HelpCircle,
  Cpu,
  ChevronRight,
  ShieldAlert,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';
import { DownloadLinks } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface PcInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  detectedArch: '64' | '32';
  links: DownloadLinks;
  onDownload: (platform: 'mobile' | 'pc', name: string) => void;
}

export const PcInstallGuideModal: React.FC<PcInstallGuideModalProps> = ({
  isOpen,
  onClose,
  detectedArch,
  links,
  onDownload,
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'guide' | 'verify' | 'troubleshoot'>('guide');
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const downloadUrl = detectedArch === '64' ? links.pc : (links.pc32 || links.pc);
  const fileName = detectedArch === '64' ? 'OmniChurch-Setup-x64.exe' : 'OmniChurch-Setup-x86.exe';

  const handleCopy = () => {
    navigator.clipboard.writeText('msinfo32');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleDownloadInstaller = () => {
    onDownload('pc', `Windows Setup (${detectedArch}-bit)`);
    if (downloadUrl && downloadUrl !== '#') {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#05132d] border border-cyan-400/40 rounded-3xl shadow-[0_25px_80px_rgba(0,10,35,0.9)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-blue-950/60 to-cyan-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{t.installGuide.title} (PC)</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                  {detectedArch}-bit
                </span>
              </div>
              <p className="text-xs text-blue-200/70">
                {t.installGuide.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-blue-200/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Arch Alert Banner */}
        <div className="px-6 py-3 bg-cyan-950/50 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              {detectedArch}-bit ({detectedArch === '64' ? 'x64' : 'x86'})
            </span>
          </div>
          <button
            onClick={handleDownloadInstaller}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.nav.quickDownload} {fileName}</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-black/20 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.installGuide.tabPc}</span>
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'verify'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Verify (32/64-bit)</span>
          </button>
          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'troubleshoot'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SmartScreen</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              {t.installGuide.pcSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{step.title}</h4>
                    <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/20 text-xs text-blue-200 leading-relaxed">
                <strong className="text-white block text-sm mb-1">Architecture</strong>
                Windows 64-bit / 32-bit: <strong className="text-cyan-300">{detectedArch}-bit</strong>.
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                  Shortcut
                </h4>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
                  <p className="text-blue-100">
                    Press <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 font-mono text-cyan-300">Win</kbd> + <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 font-mono text-cyan-300">Pause/Break</kbd>
                  </p>
                  <p className="font-mono text-[11px] text-cyan-300 bg-white/5 p-2 rounded border border-white/10">
                    Settings &gt; System &gt; About
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                  Command
                </h4>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs flex items-center justify-between gap-3">
                  <div>
                    <span className="text-blue-200/70 block text-[11px]">Win + R:</span>
                    <span className="font-mono font-bold text-white text-sm">msinfo32</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 text-xs transition cursor-pointer"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'troubleshoot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-amber-300 text-sm">Windows SmartScreen</h4>
                  <p className="text-amber-100/80 leading-relaxed">
                    Click &ldquo;More info&rdquo; &rarr; &ldquo;Run anyway&rdquo;.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                <h4 className="font-bold text-white text-sm">Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-blue-200/80">
                  <li>
                    Click <strong className="text-white">&ldquo;More info&rdquo;</strong>.
                  </li>
                  <li>
                    Click <strong className="text-green-300">&ldquo;Run anyway&rdquo;</strong>.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-blue-200/60 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>{fileName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-blue-200 hover:text-white hover:bg-white/5 transition"
            >
              Close
            </button>
            <button
              onClick={handleDownloadInstaller}
              className="btn-gradient px-4 py-2 rounded-xl text-white font-black text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.quickDownload} ({detectedArch}-bit)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

