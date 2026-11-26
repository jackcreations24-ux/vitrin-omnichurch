import React, { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Heart,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Wallet,
  X,
} from 'lucide-react';
import { DeveloperEngineDonations, EngineLang } from '../types';
import { useI18n } from '../i18n/I18nContext';

interface DonationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  donations: DeveloperEngineDonations;
}

export const DonationsModal: React.FC<DonationsModalProps> = ({
  isOpen,
  onClose,
  donations,
}) => {
  const { lang } = useI18n();
  const activeLang: EngineLang = (['ht', 'fr', 'en', 'es'].includes(lang)
    ? lang
    : 'ht') as EngineLang;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen || !donations.enabled) return null;

  const copy = donations.localizedCopy[activeLang] || donations.localizedCopy.ht;

  const handleCopy = async (key: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // ignore clipboard error
    }
  };

  const labels = {
    ht: {
      copy: 'Kopye',
      copied: 'Kopye!',
      openPaypal: 'Ale sou PayPal.me',
      noChannels: 'Pa gen okenn kanal peman aktive pou kounye a.',
      close: 'Fèmen',
      safeNotice: '100% Transparan • Kontribisyon Volontè pou Ekosistèm OmniChurch Pro',
    },
    fr: {
      copy: 'Copier',
      copied: 'Copié !',
      openPaypal: 'Ouvrir PayPal.me',
      noChannels: 'Aucun canal de paiement activé pour le moment.',
      close: 'Fermer',
      safeNotice: '100% Transparent • Contribution Volontaire pour OmniChurch Pro',
    },
    en: {
      copy: 'Copy',
      copied: 'Copied!',
      openPaypal: 'Open PayPal.me',
      noChannels: 'No payment channels are currently enabled.',
      close: 'Close',
      safeNotice: '100% Transparent • Voluntary Support for OmniChurch Pro',
    },
    es: {
      copy: 'Copiar',
      copied: '¡Copiado!',
      openPaypal: 'Abrir PayPal.me',
      noChannels: 'No hay canales de pago habilitados en este momento.',
      close: 'Cerrar',
      safeNotice: '100% Transparente • Aporte Voluntario para OmniChurch Pro',
    },
  }[activeLang];

  const hasAnyChannel =
    donations.paypalEnabled ||
    donations.binanceEnabled ||
    donations.wiseEnabled ||
    donations.moncashEnabled ||
    donations.zelleEnabled;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[24px] bg-[#030917] border border-cyan-500/35 shadow-[0_0_60px_rgba(8,124,255,0.35)] text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {copy.screenTitle}
              </h2>
              <p className="text-xs text-blue-200/70">{copy.screenSubtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label={labels.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-left">
          {/* Developer Bio Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 to-cyan-950/40 border border-cyan-400/25 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#087cff]/25 border border-[#35c9ff]/40 flex items-center justify-center text-[#35c9ff]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">
                    {donations.developerName}
                  </div>
                  <div className="text-[11px] font-semibold text-[#35c9ff]">
                    {copy.developerRole}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-blue-200/75">
                {donations.developerEmail && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                    <Mail className="w-3 h-3 text-[#35c9ff]" />
                    <span>{donations.developerEmail}</span>
                  </span>
                )}
                {donations.developerPhone && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>{donations.developerPhone}</span>
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              {copy.developerBio}
            </p>
            {copy.customNote && (
              <p className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-500/25 rounded-xl px-3 py-2">
                {copy.customNote}
              </p>
            )}
          </div>

          {/* Payment Channels */}
          {!hasAnyChannel ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-blue-200/60">
              {labels.noChannels}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* PayPal */}
              {donations.paypalEnabled && (
                <div className="p-4 rounded-2xl bg-black/40 border border-blue-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-sky-300 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" />
                      PayPal
                    </span>
                    {donations.paypalMeUrl && (
                      <a
                        href={donations.paypalMeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#35c9ff] hover:underline flex items-center gap-1"
                      >
                        <span>{labels.openPaypal}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {donations.paypalEmail && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        {donations.paypalEmail}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('paypal', donations.paypalEmail)}
                        className="text-[11px] font-bold text-[#35c9ff] hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'paypal' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'paypal' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* MonCash */}
              {donations.moncashEnabled && (
                <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" />
                      MonCash (Haiti)
                    </span>
                    {donations.moncashName && (
                      <span className="text-[11px] text-blue-200/70">
                        {donations.moncashName}
                      </span>
                    )}
                  </div>
                  {donations.moncashNumber && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        {donations.moncashNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('moncash', donations.moncashNumber)}
                        className="text-[11px] font-bold text-rose-300 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'moncash' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'moncash' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Binance */}
              {donations.binanceEnabled && (
                <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" />
                      Binance Pay / USDT
                    </span>
                    {donations.binanceNetwork && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold">
                        {donations.binanceNetwork}
                      </span>
                    )}
                  </div>
                  {donations.binancePayId && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-1.5 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        ID: {donations.binancePayId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('binanceId', donations.binancePayId)}
                        className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'binanceId' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'binanceId' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                  {donations.binanceUsdtAddress && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-1.5 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        {donations.binanceUsdtAddress}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('binanceUsdt', donations.binanceUsdtAddress)
                        }
                        className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'binanceUsdt' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'binanceUsdt' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Wise */}
              {donations.wiseEnabled && (
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4" />
                      Wise Transfer
                    </span>
                    {donations.wiseTag && (
                      <span className="text-[11px] font-mono text-emerald-200">
                        {donations.wiseTag}
                      </span>
                    )}
                  </div>
                  {(donations.wiseEmail || donations.wiseIban) && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        {donations.wiseIban || donations.wiseEmail}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('wise', donations.wiseIban || donations.wiseEmail)
                        }
                        className="text-[11px] font-bold text-emerald-300 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'wise' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'wise' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Zelle */}
              {donations.zelleEnabled && (
                <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 space-y-2 sm:col-span-2">
                  <span className="text-xs font-extrabold text-purple-300 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" />
                    Zelle (USA)
                  </span>
                  {donations.zelleInfo && (
                    <div className="flex items-center justify-between gap-2 bg-white/5 rounded-xl px-3 py-2 text-xs">
                      <span className="font-mono text-blue-100 truncate">
                        {donations.zelleInfo}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy('zelle', donations.zelleInfo)}
                        className="text-[11px] font-bold text-purple-300 hover:text-white flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedKey === 'zelle' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === 'zelle' ? labels.copied : labels.copy}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-white/[0.02] text-[11px] text-blue-200/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{labels.safeNotice}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold cursor-pointer transition"
          >
            {labels.close}
          </button>
        </div>
      </div>
    </div>
  );
};
