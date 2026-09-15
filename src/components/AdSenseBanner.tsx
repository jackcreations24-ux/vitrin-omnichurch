import React, { useEffect, useRef } from 'react';
import { AdSenseConfig } from '../types';
import { Sparkles, Eye, ShieldCheck } from 'lucide-react';

interface AdSenseBannerProps {
  config: AdSenseConfig;
  slot?: string;
  positionLabel: string;
  className?: string;
  format?: 'horizontal' | 'rectangle' | 'auto';
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  config,
  slot,
  positionLabel,
  className = '',
  format = 'auto',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    if (config.enabled && config.publisherId && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Safe catch for adblockers or re-render
        console.debug('AdSense push notice:', err);
      }
    }
  }, [config.enabled, config.publisherId, slot]);

  // If disabled, don't show anything
  if (!config.enabled) {
    return null;
  }

  const rawPubId = (config.publisherId || '').trim();
  const normalizedPubId = rawPubId
    ? rawPubId.startsWith('ca-pub-')
      ? rawPubId
      : rawPubId.startsWith('pub-')
        ? `ca-${rawPubId}`
        : `ca-pub-${rawPubId}`
    : '';

  // If publisher ID is valid and not in pure preview badge only mode, render real ad code
  const isRealAdReady = normalizedPubId.startsWith('ca-pub-') && normalizedPubId.length > 10;

  return (
    <div className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}>
      <div className="relative rounded-2xl p-3 sm:p-4 bg-gradient-to-r from-[rgba(4,14,35,0.7)] via-[rgba(6,22,54,0.6)] to-[rgba(4,14,35,0.7)] border border-white/10 shadow-lg overflow-hidden backdrop-blur-sm">
        
        {/* Compliance Label required by Google AdSense Policy */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5 text-[10px] text-blue-200/50 uppercase tracking-widest font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Piblisite / Advertisement</span>
          </span>
          <span className="text-[9px] text-blue-300/40">
            {positionLabel} {isRealAdReady ? `• ${normalizedPubId}` : '• Mòd Apèsi'}
          </span>
        </div>

        <div className="py-2 flex items-center justify-center min-h-[90px]">
          {isRealAdReady ? (
            /* Real Google AdSense Unit */
            <div className="w-full text-center overflow-hidden">
              <ins
                ref={adRef}
                className="adsbygoogle block"
                style={{ display: 'block', minHeight: '90px' }}
                data-ad-client={normalizedPubId}
                data-ad-slot={slot || undefined}
                data-ad-format={format}
                data-full-width-responsive="true"
              />
            </div>
          ) : (
            /* Professional AdSense Placeholder for Preview / Testing */
            <div className="w-full py-4 px-3 rounded-xl border border-dashed border-cyan-400/30 bg-black/40 text-center flex flex-col items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35c9ff]/10 border border-cyan-400/30 text-xs font-bold text-[#35c9ff]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Espas Anons Google AdSense ({positionLabel})</span>
              </div>
              <p className="text-xs text-blue-200/70 max-w-md">
                {config.publisherId
                  ? `ID Kliyan aktyèl: ${config.publisherId} — Anons yo ap parèt otomatikman lè Google valide domèn nan.`
                  : 'Pou aktive anons reyèl yo, antre "ID Kliyan" Google AdSense ou (egz: ca-pub-XXXXXXXXXXXXXXXX) nan Panel Dev la.'}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-blue-300/50 font-semibold">
                <span>✓ Fòma Responsif</span>
                <span>•</span>
                <span>✓ Konfòm ak Règleman Google</span>
                <span>•</span>
                <span>✓ Pa Ralanti Sit la</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
