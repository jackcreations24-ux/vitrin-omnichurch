import React, { useState } from 'react';
import {
  X,
  Apple,
  Share2,
  PlusSquare,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface IosInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IosInstallGuideModal: React.FC<IosInstallGuideModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useI18n();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const iosUrl = 'https://ios.omnichurch.download/';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(iosUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleOpenIosSite = () => {
    window.open(iosUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-[#061430] border border-cyan-400/40 rounded-3xl shadow-[0_30px_90px_rgba(3,15,40,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-cyan-950/70">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-600/40 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-lg">
              <Apple className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {lang === 'ht' ? 'Gid Enstalasyon PWA sou iOS (iPhone & iPad)' : lang === 'fr' ? 'Guide d’installation PWA iOS (iPhone & iPad)' : 'iOS PWA Installation Guide (iPhone & iPad)'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                  Ultra Pro PWA
                </span>
              </div>
              <p className="text-xs text-blue-200/70 mt-0.5">
                {lang === 'ht' ? 'Enstale OmniChurch dirèkteman sou ekran iPhone ou nan mwens pase 30 segonn' : 'Installez OmniChurch directement sur votre iPhone en moins de 30 secondes'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-blue-200/70 hover:text-white transition cursor-pointer"
            title="Fèmen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Launch Bar */}
        <div className="px-6 py-3.5 bg-cyan-950/60 border-b border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="font-mono text-xs bg-black/40 px-2.5 py-1 rounded-lg border border-cyan-400/30 text-cyan-300 select-all">
              {iosUrl}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-cyan-300" />}
              <span>{copiedLink ? (lang === 'ht' ? 'Kopye!' : 'Copié!') : (lang === 'ht' ? 'Kopye Lyen an' : 'Copier le lien')}</span>
            </button>
            <button
              onClick={handleOpenIosSite}
              className="btn-gradient px-4 py-1.5 rounded-xl text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg transition cursor-pointer hover:scale-105"
            >
              <span>{lang === 'ht' ? 'Louvri sou Safari iOS' : 'Ouvrir sur Safari iOS'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-black/30 text-xs font-bold text-center">
          <button
            onClick={() => setActiveStep(1)}
            className={`py-3 px-2 transition-all border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeStep === 1 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-black">1</span>
            <span>Safari</span>
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`py-3 px-2 transition-all border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeStep === 2 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-black">2</span>
            <span>Pataje</span>
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`py-3 px-2 transition-all border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeStep === 3 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-black">3</span>
            <span>Ekran Akèy</span>
          </button>
          <button
            onClick={() => setActiveStep(4)}
            className={`py-3 px-2 transition-all border-b-2 flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
              activeStep === 4 ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-transparent text-blue-200/60 hover:text-white'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-black">4</span>
            <span>Pare!</span>
          </button>
        </div>

        {/* Modal Body with Simulated Screenshots */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-blue-100/90">
          
          {activeStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-base shrink-0">
                  1
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'ht' ? 'Etap 1: Louvri lyen an nan navigatè Safari sou iPhone' : 'Étape 1 : Ouvrez le lien dans Safari sur votre iPhone'}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-200/70 leading-relaxed">
                    {lang === 'ht'
                      ? 'Pran iPhone ou, lanse navigatè ofisyèl **Safari** an (asire w ou pa itilize lòt navigatè tankou Chrome oubyen Firefox paske iOS mande Safari pou PWA). Antre oubyen klike sou lyen espesyal iOS la:'
                      : 'Ouvrez Safari sur votre iPhone (requis pour installer les PWA sur iOS). Accédez au lien officiel :'}
                  </p>
                  <div className="p-3 rounded-xl bg-black/60 border border-cyan-400/45 flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan-300 font-bold">{iosUrl}</span>
                    <button
                      onClick={handleOpenIosSite}
                      className="px-3 py-1 rounded-lg bg-cyan-500 text-black font-extrabold text-xs hover:bg-cyan-400 transition"
                    >
                      Louvri
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated iPhone Safari UI Screenshot */}
              <div className="relative max-w-sm mx-auto bg-[#020817] border-4 border-slate-700 rounded-[36px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-700 rounded-full"></div>
                <div className="mt-4 pt-3 pb-2 px-3 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-mono text-[10px] text-cyan-300 truncate">ios.omnichurch.download</span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                </div>
                <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-cyan-950/60 border border-cyan-400/30 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#35c9ff]/20 mx-auto flex items-center justify-center text-[#35c9ff]">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-white text-sm">OmniChurch iOS PWA</div>
                  <p className="text-[11px] text-blue-200/70">Platfòm Dijital Legliz la nan pòch ou</p>
                </div>
                <div className="py-2 bg-slate-950/80 rounded-xl px-4 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>← Safari</span>
                  <span className="text-cyan-400 font-bold">Tape lyen an anlè</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-base shrink-0">
                  2
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'ht' ? 'Etap 2: Tape bouton Pataje (Share) nan Safari' : 'Étape 2 : Tapez sur le bouton Partager dans Safari'}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-200/70 leading-relaxed">
                    {lang === 'ht'
                      ? 'Nan pati anba ekran Safari an (oswa anlè sou iPad), chèche epi tape icon **Pataje** a (li sanble ak yon kare ak yon flèch ki ap monte anlè ⬆️).'
                      : 'En bas de l’écran Safari (ou en haut sur iPad), touchez l’icône **Partager** (le carré avec une flèche vers le haut).'}
                  </p>
                </div>
              </div>

              {/* Simulated Safari Bottom Toolbar */}
              <div className="relative max-w-sm mx-auto bg-[#020817] border-4 border-slate-700 rounded-[36px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-center">
                <div className="py-6 space-y-3">
                  <p className="text-xs text-blue-200/60">Gade nanba ekran iPhone ou a:</p>
                  <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 shadow-xl">
                    <span className="text-slate-400 text-xs">◀</span>
                    <span className="text-slate-400 text-xs">▶</span>
                    <div className="p-3 rounded-2xl bg-cyan-500 text-black shadow-lg animate-bounce">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <span className="text-slate-400 text-xs">📖</span>
                    <span className="text-slate-400 text-xs">📚</span>
                  </div>
                  <p className="text-xs font-bold text-cyan-300 mt-2">↑ Tape ikòn Pataje sa a</p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black text-base shrink-0">
                  3
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'ht' ? 'Etap 3: Chwazi "Ajoute sou ekran d\'akèy"' : 'Étape 3 : Sélectionnez "Sur l’écran d’accueil"'}
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-200/70 leading-relaxed">
                    {lang === 'ht'
                      ? 'Nan meni ki parèt la, glise desann epi chwazi opsyon **"Ajiste sou ekran d’akèy"** (oswa *Add to Home Screen*). Lè sa a, antre non ou vle pou aplikasyon an (pa egzanp: **OmniChurch**) epi tape **"Ajoute"** anlè a dwat.'
                      : 'Dans le menu de partage qui s’affiche, faites défiler et touchez **"Sur l’écran d’accueil"**, puis confirmez en cliquant sur **"Ajouter"**.'}
                  </p>
                </div>
              </div>

              {/* Simulated iOS Share Sheet Menu */}
              <div className="relative max-w-sm mx-auto bg-slate-900 border-4 border-slate-700 rounded-[36px] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-2"></div>
                <div className="p-3 rounded-xl bg-slate-800 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black font-black">
                    OC
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">OmniChurch - PWA iOS</div>
                    <div className="text-[10px] text-slate-400">ios.omnichurch.download</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 text-xs text-slate-300 flex items-center justify-between">
                    <span>Kopiye lyen an</span>
                    <span>📋</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-xs text-cyan-300 font-bold flex items-center justify-between">
                    <span>Ajoute sou ekran d’akèy</span>
                    <PlusSquare className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 text-xs text-slate-300 flex items-center justify-between">
                    <span>Ajoute nan Favori</span>
                    <span>⭐</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-base shrink-0">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-white">
                    {lang === 'ht' ? 'Felisitasyon! Aplikasyon an pare sou iPhone ou' : 'Félicitations ! L’application est installée sur votre iPhone'}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    {lang === 'ht'
                      ? 'Koulye a, w ap jwenn ikòn **OmniChurch** sou ekran akèy iPhone ou an tèt lòt aplikasyon w yo. Ou kapab itilize li nenpòt kote san pwoblèm!'
                      : 'Vous trouverez désormais l’icône OmniChurch sur l’écran d’accueil de votre iPhone, prête à être utilisée à tout moment.'}
                  </p>
                </div>
              </div>

              {/* QR Code Quick Scan for iOS */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-24 h-24 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-lg">
                  <QrCode className="w-20 h-20 text-[#020712]" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Flash QR Kòd la</span>
                  <h5 className="text-sm font-extrabold text-white">Eskane ak Kamera iPhone ou</h5>
                  <p className="text-xs text-blue-200/70">
                    Louvri kamera iPhone ou epi eskane kòd sa a pou ouvri <code className="text-cyan-300">ios.omnichurch.download</code> imedyatman.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation between steps */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeStep === 1 ? 'opacity-40 cursor-not-allowed bg-white/5 text-slate-400' : 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
              }`}
            >
              ← Anvan
            </button>
            <span className="text-xs text-blue-200/60 font-mono">Etap {activeStep} / 4</span>
            {activeStep < 4 ? (
              <button
                onClick={() => setActiveStep((prev) => Math.min(4, prev + 1))}
                className="btn-gradient px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Pwochen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Fini</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
