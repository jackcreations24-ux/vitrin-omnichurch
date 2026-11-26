import React, { useEffect, useState } from 'react';
import { Download, ShieldCheck, X, CheckCircle2, Smartphone, Monitor } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export interface DownloadToastProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'mobile' | 'pc';
  fileName: string;
  duration?: number;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({
  isOpen,
  onClose,
  platform,
  fileName,
  duration = 5000,
}) => {
  const { lang } = useI18n();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPercent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPercent);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, duration, onClose, fileName]);

  if (!isOpen) return null;

  const labels = {
    ht: {
      title: 'Telechajman an Kòmanse!',
      desc: `Fichye "${fileName}" ap telechaje kounye a sou aparèy ou an.`,
      security: '100% Verifye • Zewo viris • Enstalasyon dirèk',
      platformMobile: 'Android APK',
      platformPc: 'Windows PC Installer',
    },
    fr: {
      title: 'Téléchargement Lancé !',
      desc: `Le fichier "${fileName}" se télécharge actuellement sur votre appareil.`,
      security: '100% Vérifié • Aucun virus • Installation directe',
      platformMobile: 'Android APK',
      platformPc: 'Installateur Windows PC',
    },
    en: {
      title: 'Download Started!',
      desc: `The file "${fileName}" is now downloading to your device.`,
      security: '100% Verified • Virus-free • Direct installation',
      platformMobile: 'Android APK',
      platformPc: 'Windows PC Installer',
    },
    es: {
      title: '¡Descarga Iniciada!',
      desc: `El archivo "${fileName}" se está descargando ahora en su dispositivo.`,
      security: '100% Verificado • Sin virus • Instalación directa',
      platformMobile: 'Android APK',
      platformPc: 'Instalador Windows PC',
    },
  }[lang] || {
    title: 'Telechajman an Kòmanse!',
    desc: `Fichye "${fileName}" ap telechaje kounye a sou aparèy ou an.`,
    security: '100% Verifye • Zewo viris • Enstalasyon dirèk',
    platformMobile: 'Android APK',
    platformPc: 'Windows PC Installer',
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 left-4 sm:left-auto sm:w-[420px] z-[70] transition-all duration-300 animate-in fade-in slide-in-from-top-4"
    >
      <div className="relative rounded-2xl bg-[#030e24]/95 backdrop-blur-2xl border border-cyan-400/40 shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(8,124,255,0.25)] p-4 sm:p-4.5 overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />

        <div className="relative flex items-start gap-3.5">
          {/* Animated Download Icon Pill */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(53,201,255,0.3)] shrink-0">
            <Download className="w-5 h-5 animate-bounce text-cyan-300" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <span>{labels.title}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h4>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                {platform === 'mobile' ? (
                  <Smartphone className="w-2.5 h-2.5 text-cyan-300" />
                ) : (
                  <Monitor className="w-2.5 h-2.5 text-cyan-300" />
                )}
                <span>{platform === 'mobile' ? labels.platformMobile : labels.platformPc}</span>
              </span>
            </div>

            <p className="text-xs text-blue-100/90 mt-1 leading-snug line-clamp-2">
              {labels.desc}
            </p>

            <div className="flex items-center gap-1.5 mt-2 text-[10.5px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{labels.security}</span>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-blue-200/60 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
            title="Fèmen"
            aria-label="Fèmen notifikasyon an"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar (countdown to auto-dismiss) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#087cff] via-[#35c9ff] to-emerald-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
