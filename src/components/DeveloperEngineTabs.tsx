import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Award,
  Check,
  CheckCircle2,
  Cloud,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  Monitor,
  Plus,
  RefreshCw,
  Rocket,
  Save,
  Scale,
  Shield,
  Smartphone,
  Trash2,
  Wallet,
  Wrench,
} from 'lucide-react';
import {
  CloudSyncVerificationResult,
  DeveloperEngineConfig,
  DeveloperEngineSponsor,
  EngineLang,
} from '../types';
import {
  BUILTIN_PRIVACY_DOCS,
  BUILTIN_TERMS_DOCS,
  SUPER_DEVELOPER_EMAIL,
} from '../data/developerEngineDefaults';
import {
  pushAndVerifyDeveloperEngine,
  saveDeveloperEngine,
} from '../lib/firebase';
import { LegalDocType } from './LegalDocumentPage';

export type EngineTabId = 'legal' | 'releases' | 'donations' | 'maintenance';

interface DeveloperEngineTabsProps {
  activeSubTab: EngineTabId;
  engineConfig: DeveloperEngineConfig;
  isGoogleAuthenticated: boolean;
  authenticatedEmail?: string | null;
  onRequireGoogleAuth: () => Promise<void>;
  onPreviewLegalRoute: (docType: LegalDocType) => void;
  onEngineUpdated?: (updated: DeveloperEngineConfig) => void;
}

const LANG_PILLS: Array<{ code: EngineLang; flag: string; label: string }> = [
  { code: 'ht', flag: '🇭🇹', label: 'Kreyòl Ayisyen' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

export const DeveloperEngineTabs: React.FC<DeveloperEngineTabsProps> = ({
  activeSubTab,
  engineConfig,
  isGoogleAuthenticated,
  authenticatedEmail,
  onRequireGoogleAuth,
  onPreviewLegalRoute,
  onEngineUpdated,
}) => {
  const [draft, setDraft] = useState<DeveloperEngineConfig>(engineConfig);
  const [legalLang, setLegalLang] = useState<EngineLang>('ht');
  const [legalSubDoc, setLegalSubDoc] = useState<'privacy' | 'terms'>('privacy');
  const [releaseLang, setReleaseLang] = useState<EngineLang>('ht');
  const [donateLang, setDonateLang] = useState<EngineLang>('ht');

  const [isSaving, setIsSaving] = useState(false);
  const [isVerifyingSync, setIsVerifyingSync] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [verificationResult, setVerificationResult] =
    useState<CloudSyncVerificationResult | null>(null);

  useEffect(() => {
    setDraft(engineConfig);
  }, [engineConfig]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  const handleSavePartial = async (
    partial: Partial<DeveloperEngineConfig>,
    successLabel: string
  ) => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      await saveDeveloperEngine(partial);
      onEngineUpdated?.({ ...draft, ...partial });
      showToast('success', successLabel);
    } catch (err: unknown) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Erè pandan ekriti Firestore la.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handlePushAndVerify = async () => {
    setIsVerifyingSync(true);
    setStatusMessage(null);
    try {
      const result = await pushAndVerifyDeveloperEngine(draft);
      setVerificationResult(result);
      onEngineUpdated?.(draft);
      showToast(
        'success',
        `Push & Verify Reyisi (${result.latencyMs}ms)! 100% Parite konfime ak getDocFromServer sou ${result.documentPath}.`
      );
    } catch (err: unknown) {
      showToast(
        'error',
        err instanceof Error
          ? err.message
          : 'Echèk verifikasyon Cloud Firestore.'
      );
    } finally {
      setIsVerifyingSync(false);
    }
  };

  const handleAddSponsor = () => {
    const newSponsor: DeveloperEngineSponsor = {
      id: `sp-${Date.now()}`,
      name: 'Nouvo Patnè / Sponsò',
      tagline: 'Patnè Ofisyèl Kominote Kretyèn',
      websiteUrl: 'https://omnichurch.download',
      logoUrl: '',
      tier: 'Gold Partner',
      active: true,
    };
    setDraft((prev) => ({
      ...prev,
      sponsors: [...(prev.sponsors || []), newSponsor],
    }));
  };

  return (
    <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
      {/* Unified Push & Verify Cloud Sync Header Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#041533] via-[#071f47] to-[#041533] border border-[#35c9ff]/35 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              app_config/developer_engine
            </span>
            {isGoogleAuthenticated ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#087cff]/20 text-[#35c9ff] border border-[#35c9ff]/40">
                <CheckCircle2 className="w-3 h-3" />
                Google Auth: {authenticatedEmail}
              </span>
            ) : (
              <button
                type="button"
                onClick={onRequireGoogleAuth}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 cursor-pointer"
              >
                <AlertTriangle className="w-3 h-3" />
                Konekte Google ({SUPER_DEVELOPER_EMAIL}) pou Ekri
              </button>
            )}
          </div>
          <p className="text-[11px] text-blue-200/75">
            Tout chanjman isit la senkronize an tan reyèl ant{' '}
            <strong className="text-white">omnichurch.download</strong>,{' '}
            <strong className="text-white">OmniChurch Web App</strong>, ak{' '}
            <strong className="text-white">Android App</strong>.
          </p>
        </div>

        <button
          type="button"
          disabled={isVerifyingSync || isSaving}
          onClick={handlePushAndVerify}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-[#020712] font-black text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isVerifyingSync ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Cloud className="w-4 h-4" />
          )}
          <span>
            {isVerifyingSync
              ? 'Verifikasyon Sèvè...'
              : 'Push & Verify Cloud Sync'}
          </span>
        </button>
      </div>

      {/* Status & Server Verification Result Banner */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/70 border-red-500/40 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {verificationResult && (
        <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/30 text-[11px] text-blue-100/90 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <span className="text-blue-200/50 block">Sèvè Parite</span>
            <strong className="text-emerald-400">
              {verificationResult.verified ? '100% VERIFYE' : 'AVÈTISMAN'}
            </strong>
          </div>
          <div>
            <span className="text-blue-200/50 block">Vèsyon Sèvè</span>
            <strong className="text-white font-mono">
              v{verificationResult.serverVersion}
            </strong>
          </div>
          <div>
            <span className="text-blue-200/50 block">Latans (Round-Trip)</span>
            <strong className="text-[#35c9ff] font-mono">
              {verificationResult.latencyMs} ms
            </strong>
          </div>
          <div>
            <span className="text-blue-200/50 block">Sponsò / Antretyen</span>
            <strong className="text-white">
              {verificationResult.sponsorsCount} Sponsò •{' '}
              {verificationResult.maintenanceMode ? 'ANTRETYEN ON' : 'NÒMAL'}
            </strong>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB A: LEGAL DOCUMENTS & URLs (`legalConfig`)                       */}
      {/* =================================================================== */}
      {activeSubTab === 'legal' && (
        <div className="space-y-5">
          {/* Official URLs & Routing Behavior */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#35c9ff]" />
                <h4 className="text-sm font-bold text-white">
                  URL Ofisyèl &amp; Kondwit Dokiman Legal (`legalConfig`)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPreviewLegalRoute('privacy')}
                  className="px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-[11px] font-bold text-[#35c9ff] flex items-center gap-1 cursor-pointer"
                >
                  <span>Apèsi /privacy-policy</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => onPreviewLegalRoute('terms')}
                  className="px-2.5 py-1 rounded-lg bg-blue-950/70 hover:bg-blue-900 border border-blue-500/40 text-[11px] font-bold text-[#35c9ff] flex items-center gap-1 cursor-pointer"
                >
                  <span>Apèsi /terms-of-service</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#bedaff]">
                  Official Privacy Policy URL
                </label>
                <input
                  type="url"
                  value={draft.legalConfig.officialPrivacyUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      legalConfig: {
                        ...draft.legalConfig,
                        officialPrivacyUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://omnichurch.download/privacy-policy"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#bedaff]">
                  Official Terms of Service URL
                </label>
                <input
                  type="url"
                  value={draft.legalConfig.officialTermsUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      legalConfig: {
                        ...draft.legalConfig,
                        officialTermsUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://omnichurch.download/terms-of-service"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-xs text-blue-100/85 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={draft.legalConfig.useExternalLinksOnClick}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    legalConfig: {
                      ...draft.legalConfig,
                      useExternalLinksOnClick: e.target.checked,
                    },
                  })
                }
                className="rounded border-white/20 bg-black/50 text-[#087cff]"
              />
              <span>
                Aktive <code className="text-[#35c9ff]">useExternalLinksOnClick</code> pou aplikasyon mobil ak web la ouvri URL ofisyèl yo lè yo klike sou lyen legal yo
              </span>
            </label>
          </div>

          {/* 4-Language Editor for Custom Privacy & Terms */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
                <button
                  type="button"
                  onClick={() => setLegalSubDoc('privacy')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    legalSubDoc === 'privacy'
                      ? 'bg-[#087cff] text-white'
                      : 'text-blue-200/70 hover:text-white'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Privacy Policy</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLegalSubDoc('terms')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    legalSubDoc === 'terms'
                      ? 'bg-[#087cff] text-white'
                      : 'text-blue-200/70 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Terms of Service</span>
                </button>
              </div>

              {/* Language Pills */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 flex-wrap">
                {LANG_PILLS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLegalLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      legalLang === l.code
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                        : 'text-blue-200/70 hover:text-white'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const targetMapKey =
                legalSubDoc === 'privacy' ? 'customPrivacy' : 'customTerms';
              const builtIn =
                legalSubDoc === 'privacy'
                  ? BUILTIN_PRIVACY_DOCS[legalLang]
                  : BUILTIN_TERMS_DOCS[legalLang];
              const currentDoc =
                draft.legalConfig[targetMapKey]?.[legalLang] || {};

              const updateDocField = (
                field: 'title' | 'lastUpdatedDate' | 'content',
                val: string
              ) => {
                setDraft((prev) => ({
                  ...prev,
                  legalConfig: {
                    ...prev.legalConfig,
                    [targetMapKey]: {
                      ...prev.legalConfig[targetMapKey],
                      [legalLang]: {
                        ...prev.legalConfig[targetMapKey]?.[legalLang],
                        [field]: val,
                      },
                    },
                  },
                }));
              };

              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-cyan-300/80">
                      Lang aktif:{' '}
                      <strong>
                        {LANG_PILLS.find((x) => x.code === legalLang)?.label}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => ({
                          ...prev,
                          legalConfig: {
                            ...prev.legalConfig,
                            [targetMapKey]: {
                              ...prev.legalConfig[targetMapKey],
                              [legalLang]: { ...builtIn },
                            },
                          },
                        }));
                      }}
                      className="text-[11px] text-[#35c9ff] hover:underline font-bold cursor-pointer"
                    >
                      Chaje Modèl Ofisyèl ({legalLang.toUpperCase()})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-[#bedaff]">
                        Tit Dokiman an
                      </label>
                      <input
                        type="text"
                        value={currentDoc.title ?? builtIn.title}
                        onChange={(e) => updateDocField('title', e.target.value)}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#bedaff]">
                        Dat Dènye Mizajou
                      </label>
                      <input
                        type="text"
                        value={
                          currentDoc.lastUpdatedDate ?? builtIn.lastUpdatedDate
                        }
                        onChange={(e) =>
                          updateDocField('lastUpdatedDate', e.target.value)
                        }
                        placeholder="2026-11-26"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Kontni Dokiman (Itilize ## pou Tit ak - pou Lis)
                    </label>
                    <textarea
                      rows={10}
                      value={currentDoc.content ?? builtIn.content}
                      onChange={(e) => updateDocField('content', e.target.value)}
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-[#35c9ff]"
                    />
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  const updatedLegal = {
                    ...draft.legalConfig,
                    lastLegalUpdatedAt: new Date().toISOString(),
                  };
                  setDraft((prev) => ({ ...prev, legalConfig: updatedLegal }));
                  handleSavePartial(
                    { legalConfig: updatedLegal },
                    'Dokiman legal ak URL ofisyèl yo anrejistre nan Cloud Firestore!'
                  );
                }}
                className="btn-gradient px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Anrejistre Dokiman Legal nan Firestore</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB B: PC & MOBILE RELEASE MANAGER (`appUpdate` / `appUpdates`)     */}
      {/* =================================================================== */}
      {activeSubTab === 'releases' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#35c9ff]" />
                <h4 className="text-sm font-bold text-white">
                  Jesyon Vèsyon &amp; Mizajou PC / Android (`appUpdate` &amp; `appUpdates`)
                </h4>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.appUpdate.enabled}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-white/20 bg-black/50 text-[#087cff]"
                />
                <span>Aktive Piblikasyon Mizajou</span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Latest Version
                </label>
                <input
                  type="text"
                  value={draft.appUpdate.latestVersion}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        latestVersion: e.target.value,
                      },
                    })
                  }
                  placeholder="1.1.0"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Current Version
                </label>
                <input
                  type="text"
                  value={draft.appUpdate.currentVersion}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        currentVersion: e.target.value,
                      },
                    })
                  }
                  placeholder="1.1.0"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Min Required
                </label>
                <input
                  type="text"
                  value={draft.appUpdate.minRequiredVersion}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        minRequiredVersion: e.target.value,
                      },
                    })
                  }
                  placeholder="1.0.0"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Release Date
                </label>
                <input
                  type="text"
                  value={draft.appUpdate.releaseDate}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        releaseDate: e.target.value,
                      },
                    })
                  }
                  placeholder="2026-11-26"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Channel
                </label>
                <select
                  value={draft.appUpdate.channel}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        channel: e.target.value as 'stable' | 'beta' | 'urgent',
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                >
                  <option value="stable">Stable</option>
                  <option value="beta">Beta</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Target Platform
                </label>
                <select
                  value={draft.appUpdate.targetPlatform}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        targetPlatform: e.target.value as
                          | 'all'
                          | 'android'
                          | 'web',
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                >
                  <option value="all">All (PC + Android + Web)</option>
                  <option value="android">Android</option>
                  <option value="web">Web</option>
                </select>
              </div>

              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-bold text-amber-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.appUpdate.isMandatory}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        isMandatory: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-white/20 bg-black/50 text-amber-500"
                />
                <span>Mizajou Obligatwa (Mandatory)</span>
              </label>
            </div>

            {/* Download URLs */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Portal Download URL (Defo pou App Android / Web)
                </label>
                <input
                  type="url"
                  value={draft.appUpdate.downloadUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      appUpdate: {
                        ...draft.appUpdate,
                        downloadUrl: e.target.value,
                      },
                    })
                  }
                  placeholder="https://omnichurch.download"
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Android APK URL</span>
                  </label>
                  <input
                    type="url"
                    value={draft.appUpdate.androidDownloadUrl || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        appUpdate: {
                          ...draft.appUpdate,
                          androidDownloadUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://github.com/.../OmniChurch.apk"
                    className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#35c9ff] flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Windows EXE (64-bit) URL</span>
                  </label>
                  <input
                    type="url"
                    value={draft.appUpdate.pcDownloadUrl || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        appUpdate: {
                          ...draft.appUpdate,
                          pcDownloadUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://github.com/.../OmniChurch.Setup.x64.exe"
                    className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-blue-200/80">
                    Windows EXE (32-bit x86) URL
                  </label>
                  <input
                    type="url"
                    value={draft.appUpdate.pc32DownloadUrl || ''}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        appUpdate: {
                          ...draft.appUpdate,
                          pc32DownloadUrl: e.target.value,
                        },
                      })
                    }
                    placeholder="https://github.com/.../OmniChurch.Setup.ia32.exe"
                    className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#35c9ff]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4-Language Release Highlights & Notice */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#35c9ff]" />
                <h5 className="text-xs sm:text-sm font-bold text-white">
                  Nòt Mizajou &amp; Pwen Kle (4 Lang)
                </h5>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
                {LANG_PILLS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setReleaseLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      releaseLang === l.code
                        ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                        : 'text-blue-200/70 hover:text-white'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#bedaff]">
                Pwen Kle Vèsyon an ({releaseLang.toUpperCase()}) — Yon pwen pa liy
              </label>
              <textarea
                rows={4}
                value={(draft.appUpdate.highlights?.[releaseLang] || []).join('\n')}
                onChange={(e) => {
                  const lines = e.target.value.split('\n');
                  setDraft({
                    ...draft,
                    appUpdate: {
                      ...draft.appUpdate,
                      highlights: {
                        ...draft.appUpdate.highlights,
                        [releaseLang]: lines,
                      },
                    },
                  });
                }}
                className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#bedaff]">
                Avi Enpòtan ({releaseLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={draft.appUpdate.importantNotice?.[releaseLang] || ''}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    appUpdate: {
                      ...draft.appUpdate,
                      importantNotice: {
                        ...draft.appUpdate.importantNotice,
                        [releaseLang]: e.target.value,
                      },
                    },
                  })
                }
                className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  const cleanedHighlights = {
                    ht: (draft.appUpdate.highlights.ht || []).filter((s) =>
                      s.trim()
                    ),
                    fr: (draft.appUpdate.highlights.fr || []).filter((s) =>
                      s.trim()
                    ),
                    en: (draft.appUpdate.highlights.en || []).filter((s) =>
                      s.trim()
                    ),
                    es: (draft.appUpdate.highlights.es || []).filter((s) =>
                      s.trim()
                    ),
                  };
                  const cleanRelease = {
                    ...draft.appUpdate,
                    highlights: cleanedHighlights,
                  };
                  handleSavePartial(
                    { appUpdate: cleanRelease, appUpdates: cleanRelease },
                    `Vèsyon v${cleanRelease.latestVersion} (appUpdate & appUpdates) anrejistre nan Firestore!`
                  );
                }}
                className="btn-gradient px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Anrejistre Release nan Firestore</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB C: MULTILINGUAL DONATE MANAGER (`donations`)                    */}
      {/* =================================================================== */}
      {activeSubTab === 'donations' && (
        <div className="space-y-5">
          {/* General & Shake Settings */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <h4 className="text-sm font-bold text-white">
                  Paramèt Jeneral &amp; Animasyon Don (`donations`)
                </h4>
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.donations.enabled}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        enabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-white/20 bg-black/50 text-[#087cff]"
                />
                <span>Aktive Donasyon yo</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Non Devlopè
                </label>
                <input
                  type="text"
                  value={draft.donations.developerName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        developerName: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Imèl Devlopè
                </label>
                <input
                  type="email"
                  value={draft.donations.developerEmail}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        developerEmail: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#bedaff]">
                  Telefòn Devlopè
                </label>
                <input
                  type="text"
                  value={draft.donations.developerPhone}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        developerPhone: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-blue-100/85 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.donations.enableShakeAnimation}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        enableShakeAnimation: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-white/20 bg-black/50 text-[#087cff]"
                />
                <span>Animasyon Souke Bouton (Shake)</span>
              </label>

              <div className="flex items-center gap-2 text-xs text-blue-100/85">
                <span>Entèval (3–30s):</span>
                <input
                  type="number"
                  min={3}
                  max={30}
                  value={draft.donations.shakeIntervalSeconds}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        shakeIntervalSeconds: Math.min(
                          30,
                          Math.max(3, Number(e.target.value) || 8)
                        ),
                      },
                    })
                  }
                  className="w-16 bg-[#020712] border border-[#1b4882] rounded-lg px-2 py-1 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Multilingual Copy (`localizedCopy`) */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#35c9ff]" />
                <span>Tèks Ekran Donasyon (4 Lang)</span>
              </h5>

              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
                {LANG_PILLS.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setDonateLang(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      donateLang === l.code
                        ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white'
                        : 'text-blue-200/70 hover:text-white'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const currentCopy = draft.donations.localizedCopy[donateLang];
              const updateCopy = (
                field: keyof typeof currentCopy,
                value: string
              ) => {
                setDraft((prev) => ({
                  ...prev,
                  donations: {
                    ...prev.donations,
                    localizedCopy: {
                      ...prev.donations.localizedCopy,
                      [donateLang]: {
                        ...prev.donations.localizedCopy[donateLang],
                        [field]: value,
                      },
                    },
                  },
                }));
              };

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Screen Title
                    </label>
                    <input
                      type="text"
                      value={currentCopy.screenTitle}
                      onChange={(e) => updateCopy('screenTitle', e.target.value)}
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Developer Role
                    </label>
                    <input
                      type="text"
                      value={currentCopy.developerRole}
                      onChange={(e) =>
                        updateCopy('developerRole', e.target.value)
                      }
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Screen Subtitle
                    </label>
                    <input
                      type="text"
                      value={currentCopy.screenSubtitle}
                      onChange={(e) =>
                        updateCopy('screenSubtitle', e.target.value)
                      }
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Developer Bio
                    </label>
                    <textarea
                      rows={2}
                      value={currentCopy.developerBio}
                      onChange={(e) =>
                        updateCopy('developerBio', e.target.value)
                      }
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-[#bedaff]">
                      Custom Note
                    </label>
                    <textarea
                      rows={2}
                      value={currentCopy.customNote}
                      onChange={(e) => updateCopy('customNote', e.target.value)}
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 5 Payment Channels */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <h5 className="text-xs sm:text-sm font-bold text-white">
                Kanal Peman (PayPal, Binance, Wise, MonCash, Zelle)
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* PayPal */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-sky-300 cursor-pointer">
                  <span>PayPal</span>
                  <input
                    type="checkbox"
                    checked={draft.donations.paypalEnabled}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        donations: {
                          ...draft.donations,
                          paypalEnabled: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
                <input
                  type="email"
                  placeholder="PayPal Email"
                  value={draft.donations.paypalEmail}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        paypalEmail: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="url"
                  placeholder="https://paypal.me/..."
                  value={draft.donations.paypalMeUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        paypalMeUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              {/* MonCash */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-rose-300 cursor-pointer">
                  <span>MonCash</span>
                  <input
                    type="checkbox"
                    checked={draft.donations.moncashEnabled}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        donations: {
                          ...draft.donations,
                          moncashEnabled: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
                <input
                  type="text"
                  placeholder="Nimewo MonCash (+509...)"
                  value={draft.donations.moncashNumber}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        moncashNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Non Kont MonCash"
                  value={draft.donations.moncashName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        moncashName: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              {/* Binance */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-amber-300 cursor-pointer">
                  <span>Binance Pay / USDT</span>
                  <input
                    type="checkbox"
                    checked={draft.donations.binanceEnabled}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        donations: {
                          ...draft.donations,
                          binanceEnabled: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
                <input
                  type="text"
                  placeholder="Binance Pay ID"
                  value={draft.donations.binancePayId}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        binancePayId: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="USDT Address"
                  value={draft.donations.binanceUsdtAddress}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        binanceUsdtAddress: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
                <input
                  type="text"
                  placeholder="Network (ex: TRC20)"
                  value={draft.donations.binanceNetwork}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        binanceNetwork: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              {/* Wise */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <label className="flex items-center justify-between text-xs font-bold text-emerald-300 cursor-pointer">
                  <span>Wise</span>
                  <input
                    type="checkbox"
                    checked={draft.donations.wiseEnabled}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        donations: {
                          ...draft.donations,
                          wiseEnabled: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
                <input
                  type="email"
                  placeholder="Wise Email"
                  value={draft.donations.wiseEmail}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        wiseEmail: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Wise Tag (@...)"
                  value={draft.donations.wiseTag}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        wiseTag: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Wise IBAN"
                  value={draft.donations.wiseIban}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        wiseIban: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                />
              </div>

              {/* Zelle */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 sm:col-span-2">
                <label className="flex items-center justify-between text-xs font-bold text-purple-300 cursor-pointer">
                  <span>Zelle</span>
                  <input
                    type="checkbox"
                    checked={draft.donations.zelleEnabled}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        donations: {
                          ...draft.donations,
                          zelleEnabled: e.target.checked,
                        },
                      })
                    }
                  />
                </label>
                <input
                  type="text"
                  placeholder="Zelle Email / Phone Info"
                  value={draft.donations.zelleInfo}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      donations: {
                        ...draft.donations,
                        zelleInfo: e.target.value,
                      },
                    })
                  }
                  className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() =>
                  handleSavePartial(
                    { donations: draft.donations },
                    'Konfigirasyon Donasyon (4 lang & 5 kanal) anrejistre nan Firestore!'
                  )
                }
                className="btn-gradient px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Anrejistre Donasyon nan Firestore</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB D: MAINTENANCE & SPONSORS                                       */}
      {/* =================================================================== */}
      {activeSubTab === 'maintenance' && (
        <div className="space-y-5">
          {/* Maintenance Mode */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">
                  Mòd Antretyen Global (`maintenanceMode`)
                </h4>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-amber-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.maintenanceMode}
                  onChange={(e) =>
                    setDraft({ ...draft, maintenanceMode: e.target.checked })
                  }
                />
                <span>{draft.maintenanceMode ? 'AKTIVE' : 'ETENN'}</span>
              </label>
            </div>
            <textarea
              rows={2}
              value={draft.maintenanceMessage}
              onChange={(e) =>
                setDraft({ ...draft, maintenanceMessage: e.target.value })
              }
              placeholder="Mesaj antretyen k ap parèt sou tout app yo ak omnichurch.download..."
              className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Sponsors */}
          <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">
                  Sponsò &amp; Patnè Ofisyèl (`sponsors`)
                </h4>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-blue-100/85 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.showSponsorsInFooter}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        showSponsorsInFooter: e.target.checked,
                      })
                    }
                  />
                  <span>Afiche nan Footer</span>
                </label>

                <button
                  type="button"
                  onClick={handleAddSponsor}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-xs font-bold text-emerald-200 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajoute Sponsò</span>
                </button>
              </div>
            </div>

            {draft.sponsors.length === 0 ? (
              <p className="text-xs text-blue-200/50 text-center py-4">
                Pa gen okenn sponsò anrejistre pou kounye a.
              </p>
            ) : (
              <div className="space-y-3">
                {draft.sponsors.map((sp, idx) => (
                  <div
                    key={sp.id || idx}
                    className="p-3 rounded-xl bg-black/40 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                  >
                    <input
                      type="text"
                      placeholder="Non Sponsò"
                      value={sp.name}
                      onChange={(e) => {
                        const updated = [...draft.sponsors];
                        updated[idx] = { ...sp, name: e.target.value };
                        setDraft({ ...draft, sponsors: updated });
                      }}
                      className="bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="Sit Entènèt (https://...)"
                      value={sp.websiteUrl || ''}
                      onChange={(e) => {
                        const updated = [...draft.sponsors];
                        updated[idx] = { ...sp, websiteUrl: e.target.value };
                        setDraft({ ...draft, sponsors: updated });
                      }}
                      className="bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Deskripsyon / Tagline"
                      value={sp.tagline || ''}
                      onChange={(e) => {
                        const updated = [...draft.sponsors];
                        updated[idx] = { ...sp, tagline: e.target.value };
                        setDraft({ ...draft, sponsors: updated });
                      }}
                      className="bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <label className="flex items-center gap-1.5 text-xs text-blue-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sp.active !== false}
                          onChange={(e) => {
                            const updated = [...draft.sponsors];
                            updated[idx] = { ...sp, active: e.target.checked };
                            setDraft({ ...draft, sponsors: updated });
                          }}
                        />
                        <span>Aktif</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const filtered = draft.sponsors.filter(
                            (_, i) => i !== idx
                          );
                          setDraft({ ...draft, sponsors: filtered });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-950/50 hover:bg-red-900/70 border border-red-500/30 text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Retire</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() =>
                  handleSavePartial(
                    {
                      maintenanceMode: draft.maintenanceMode,
                      maintenanceMessage: draft.maintenanceMessage,
                      sponsors: draft.sponsors,
                      showSponsorsInFooter: draft.showSponsorsInFooter,
                    },
                    'Estati Antretyen ak Sponsò yo anrejistre nan Cloud Firestore!'
                  )
                }
                className="btn-gradient px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Anrejistre Antretyen &amp; Sponsò</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
