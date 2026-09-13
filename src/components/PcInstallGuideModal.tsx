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
    onDownload('pc', `Windows Setup (${detectedArch}-bit) depi Gid la`);
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
                <h3 className="text-lg font-black text-white">Gid Enstalasyon Entelijan pou PC</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                  {detectedArch}-bit
                </span>
              </div>
              <p className="text-xs text-blue-200/70">
                Solisyon etap-pa-etap pou Windows 11, 10, 8 ak 7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-blue-200/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Fèmen gid la"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Arch Alert Banner */}
        <div className="px-6 py-3 bg-cyan-950/50 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Achitekti detekte sou PC ou: <strong className="text-white">{detectedArch}-bit ({detectedArch === '64' ? 'x64' : 'x86'})</strong>
            </span>
          </div>
          <button
            onClick={handleDownloadInstaller}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Telechaje {fileName}</span>
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
            <span>4 Etap Enstalasyon</span>
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
            <span>Kijan pou Verifye Achitekti PC</span>
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
            <span>Depanaj SmartScreen &amp; Sekirite</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Telechaje Fichye Enstalasyon an</h4>
                  <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                    Klike sou bouton telechajman an pou resevwa fichye{' '}
                    <code className="px-1.5 py-0.5 rounded bg-black/50 text-cyan-300 border border-white/10 font-mono">
                      {fileName}
                    </code>{' '}
                    ki adapte espesyalman pou achitekti {detectedArch}-bit PC ou a.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Ouvri Fichye Telechaje a</h4>
                  <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                    Ale nan dosye <strong className="text-white">Downloads</strong> ou an sou Windows epi fè doub-klik sou{' '}
                    <strong className="text-cyan-300">{fileName}</strong> pou lanse asistan enstalasyon an.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Si Windows SmartScreen parèt</h4>
                  <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                    Kòm se yon nouvo lojisyèl kretyen endepandan, Windows ka montre &ldquo;Windows protected your PC&rdquo;.
                    Senpleman klike sou{' '}
                    <strong className="text-amber-300 underline underline-offset-2">More info (Plis enfòmasyon)</strong>{' '}
                    epi klike sou{' '}
                    <strong className="text-green-300">Run anyway (Egzekite kanmenm)</strong>.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Fini Enstalasyon an &amp; Kòmanse Itilize</h4>
                  <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">
                    Swiv etap rapid yo nan asistan an. Yon rakousi &ldquo;OmniChurch&rdquo; ap parèt sou Desktop ou pou w lanse aplikasyon an tout kote menm san entènèt.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/20 text-xs text-blue-200 leading-relaxed">
                <strong className="text-white block text-sm mb-1">Poukisa achitekti a enpòtan?</strong>
                Yon Windows 64-bit ka egzekite aplikasyon 64-bit ak 32-bit. Men yon Windows 32-bit ka sèlman egzekite vèsyon 32-bit (x86).
                Sistèm nou an detekte otomatikman ke w sou yon PC <strong className="text-cyan-300">{detectedArch}-bit</strong>.
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                  Metòd 1: Kourkouti Klavye Windows
                </h4>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-2">
                  <p className="text-blue-100">
                    Peze <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 font-mono text-cyan-300">Win</kbd> + <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 font-mono text-cyan-300">Pause/Break</kbd> sou klavye ou, oswa ale nan:
                  </p>
                  <p className="font-mono text-[11px] text-cyan-300 bg-white/5 p-2 rounded border border-white/10">
                    Settings &gt; System &gt; About &gt; &ldquo;System type&rdquo;
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                  Metòd 2: Kòmand Rapò Sistèm
                </h4>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs flex items-center justify-between gap-3">
                  <div>
                    <span className="text-blue-200/70 block text-[11px]">Peze Win + R epi tape:</span>
                    <span className="font-mono font-bold text-white text-sm">msinfo32</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 text-xs transition cursor-pointer"
                  >
                    {copiedCmd ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd ? 'Kopye!' : 'Kopye'}</span>
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
                  <h4 className="font-bold text-amber-300 text-sm">Poukisa Windows poze kesyon sekirite?</h4>
                  <p className="text-amber-100/80 leading-relaxed">
                    Lè yon lojisyèl fèk telechaje sou entènèt san yon sètifika antrepriz Microsoft chè, filtè Defender SmartScreen verifye l.
                    OmniChurch se yon lojisyèl kretyen 100% sen, san viris, san piblisite kache.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                <h4 className="font-bold text-white text-sm">Etap pou debloke enstalasyon an:</h4>
                <ol className="list-decimal list-inside space-y-2 text-blue-200/80">
                  <li>
                    Klike sou lyen ble ki di <strong className="text-white">&ldquo;More info&rdquo;</strong> oswa <strong className="text-white">&ldquo;Plis enfòmasyon&rdquo;</strong>.
                  </li>
                  <li>
                    Yon dezyèm bouton ap parèt anba: klike sou <strong className="text-green-300">&ldquo;Run anyway&rdquo;</strong> (Egzekite kanmenm).
                  </li>
                  <li>
                    Si w gen yon antivirus twazyèm pati (Avast, AVG, Norton), ou ka ajoute fichye a kòm eksepsyon ki an sekirite.
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
            <span>Fichye: {fileName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-blue-200 hover:text-white hover:bg-white/5 transition"
            >
              Fèmen
            </button>
            <button
              onClick={handleDownloadInstaller}
              className="btn-gradient px-4 py-2 rounded-xl text-white font-black text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Telechaje Kounye a ({detectedArch}-bit)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
