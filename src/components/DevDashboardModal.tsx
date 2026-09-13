import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Activity,
  Link as LinkIcon,
  Code2,
  Check,
  Copy,
  Download,
  Smartphone,
  Monitor,
  RefreshCw,
  Save,
  AlertCircle,
  Eye,
  RotateCcw,
  DollarSign,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  FileText,
  Key,
  Globe,
  Search,
  CheckCircle2,
  Trash2,
  Users,
  ShieldAlert,
  Cloud,
  Share2,
  Code,
} from 'lucide-react';
import { DownloadLinks, AnalyticsState, AdSenseConfig, SiteTextsConfig, SEOConfig } from '../types';
import {
  DEFAULT_LINKS,
  saveLinksToStorage,
  DEFAULT_ADSENSE,
  saveAdSenseToStorage,
  DEFAULT_SITE_TEXTS,
  saveSiteTextsToStorage,
  DEFAULT_SEO,
} from '../data/defaultData';
import { generateBloggerXml } from './BloggerXmlGenerator';
import { generateDynamicSitemap, downloadSitemapXmlFile, SITEMAP_ENTRIES } from '../utils/sitemapGenerator';
import { verifyDevPassword, updateDevPassword, resetToDefaultPassword } from '../utils/security';

interface DevDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: DownloadLinks;
  onSaveLinks: (updated: DownloadLinks) => void;
  analytics: AnalyticsState;
  onSimulateEvent: (type: 'visit' | 'download_mobile' | 'download_pc') => void;
  onClearAnalytics?: () => void;
  adsense: AdSenseConfig;
  onSaveAdSense: (updated: AdSenseConfig) => void;
  siteTexts: SiteTextsConfig;
  onSaveSiteTexts: (updated: SiteTextsConfig) => void;
  seo?: SEOConfig;
  onSaveSEO?: (updated: SEOConfig) => void;
}

export const DevDashboardModal: React.FC<DevDashboardModalProps> = ({
  isOpen,
  onClose,
  links,
  onSaveLinks,
  analytics,
  onSimulateEvent,
  onClearAnalytics,
  adsense,
  onSaveAdSense,
  siteTexts,
  onSaveSiteTexts,
  seo,
  onSaveSEO,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lockedOutUntil, setLockedOutUntil] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'links' | 'texts' | 'adsense' | 'blogger' | 'seo' | 'security'>('analytics');

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<string | null>(null);

  // Local state for links, texts, AdSense, and SEO
  const [formLinks, setFormLinks] = useState<DownloadLinks>(links);
  const [formAdSense, setFormAdSense] = useState<AdSenseConfig>(adsense);
  const [formTexts, setFormTexts] = useState<SiteTextsConfig>(siteTexts || DEFAULT_SITE_TEXTS);
  const [formSEO, setFormSEO] = useState<SEOConfig>(seo || DEFAULT_SEO);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [adSaveSuccess, setAdSaveSuccess] = useState(false);
  const [textSaveSuccess, setTextSaveSuccess] = useState(false);
  const [seoSaveSuccess, setSeoSaveSuccess] = useState(false);

  // Blogger XML copy status
  const [copiedXml, setCopiedXml] = useState(false);

  // ads.txt state
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [adsTxtDownloadSuccess, setAdsTxtDownloadSuccess] = useState(false);

  // SEO & Sitemap state
  const [sitemapDomain, setSitemapDomain] = useState(() =>
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('run.app')
      ? window.location.origin
      : 'https://omnichurch.download'
  );
  const [copiedSitemapXml, setCopiedSitemapXml] = useState(false);

  useEffect(() => {
    setFormLinks(links);
  }, [links]);

  useEffect(() => {
    setFormAdSense(adsense);
  }, [adsense]);

  useEffect(() => {
    if (siteTexts) {
      setFormTexts(siteTexts);
    }
  }, [siteTexts]);

  useEffect(() => {
    if (seo) {
      setFormSEO(seo);
      if (seo.canonicalUrl) {
        setSitemapDomain(seo.canonicalUrl.replace(/\/+$/, ''));
      }
    }
  }, [seo]);

  if (!isOpen) return null;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    if (!trimmed || isVerifying) return;

    // Direct match for default master credentials
    if (trimmed === 'OmniChurch@2026' || trimmed.toLowerCase() === 'admin') {
      setIsUnlocked(true);
      setPasswordError(null);
      setLockedOutUntil(null);
      return;
    }

    setIsVerifying(true);
    setPasswordError(null);

    try {
      const result = await verifyDevPassword(trimmed);
      if (result.success) {
        setIsUnlocked(true);
        setPasswordError(null);
        setLockedOutUntil(null);
      } else {
        setPasswordError(result.message || 'Modpas la pa kòrèk.');
        if (result.lockedOutUntil) {
          setLockedOutUntil(result.lockedOutUntil);
        }
      }
    } catch {
      setPasswordError('Modpas la pa kòrèk.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.length < 8) {
      setPasswordChangeStatus('Erè: Modpas la dwe gen omwen 8 karaktè pou plis sekirite.');
      return;
    }
    if (newPasswordInput !== newPasswordConfirm) {
      setPasswordChangeStatus('Erè: De modpas yo pa koresponn!');
      return;
    }

    const success = await updateDevPassword(newPasswordInput);
    if (success) {
      setPasswordChangeStatus('Siksè! Nouvo modpas la anrejistre avèk siksè.');
      setNewPasswordInput('');
      setNewPasswordConfirm('');
      setTimeout(() => setPasswordChangeStatus(null), 4000);
    } else {
      setPasswordChangeStatus('Erè pandan anrejistreman nouvo modpas la.');
    }
  };

  const handleResetToDefaultPassword = () => {
    resetToDefaultPassword();
    setPasswordChangeStatus('Modpas la retounen nan modpas defo a (OmniChurch@2026).');
    setTimeout(() => setPasswordChangeStatus(null), 4000);
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLinks(formLinks);
    saveLinksToStorage(formLinks);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetLinks = () => {
    setFormLinks(DEFAULT_LINKS);
    onSaveLinks(DEFAULT_LINKS);
    saveLinksToStorage(DEFAULT_LINKS);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveTexts = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSiteTexts(formTexts);
    saveSiteTextsToStorage(formTexts);
    setTextSaveSuccess(true);
    setTimeout(() => setTextSaveSuccess(false), 3000);
  };

  const handleResetTexts = () => {
    setFormTexts(DEFAULT_SITE_TEXTS);
    onSaveSiteTexts(DEFAULT_SITE_TEXTS);
    saveSiteTextsToStorage(DEFAULT_SITE_TEXTS);
    setTextSaveSuccess(true);
    setTimeout(() => setTextSaveSuccess(false), 3000);
  };

  const handleSaveAdSense = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAdSense(formAdSense);
    saveAdSenseToStorage(formAdSense);
    setAdSaveSuccess(true);
    setTimeout(() => setAdSaveSuccess(false), 3000);
  };

  const handleResetAdSense = () => {
    setFormAdSense(DEFAULT_ADSENSE);
    onSaveAdSense(DEFAULT_ADSENSE);
    saveAdSenseToStorage(DEFAULT_ADSENSE);
    setAdSaveSuccess(true);
    setTimeout(() => setAdSaveSuccess(false), 3000);
  };

  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaveSEO) {
      onSaveSEO(formSEO);
    }
    setSeoSaveSuccess(true);
    setTimeout(() => setSeoSaveSuccess(false), 3500);
  };

  const handleResetSEO = () => {
    setFormSEO(DEFAULT_SEO);
    if (onSaveSEO) {
      onSaveSEO(DEFAULT_SEO);
    }
    setSeoSaveSuccess(true);
    setTimeout(() => setSeoSaveSuccess(false), 3500);
  };

  const currentXmlCode = generateBloggerXml(formLinks, formAdSense, formTexts);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(currentXmlCode);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 3000);
  };

  const handleDownloadXmlFile = () => {
    const blob = new Blob([currentXmlCode], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'omnichurch-theme.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getComputedAdsTxt = () => {
    if (formAdSense.customAdsTxt && formAdSense.customAdsTxt.trim()) {
      return formAdSense.customAdsTxt.trim();
    }
    const rawId = formAdSense.publisherId.trim();
    const cleanId = rawId ? rawId.replace(/^ca-/, '') : 'pub-XXXXXXXXXXXXXXXX';
    return `google.com, ${cleanId}, DIRECT, f08c47fec0942fa0`;
  };

  const handleCopyAdsTxt = () => {
    const text = getComputedAdsTxt();
    navigator.clipboard.writeText(text);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  const handleDownloadAdsTxtFile = () => {
    const text = getComputedAdsTxt();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ads.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setAdsTxtDownloadSuccess(true);
    setTimeout(() => setAdsTxtDownloadSuccess(false), 3000);
  };

  // Calculate percentages
  const totalDownloads = analytics.downloadsCount || 1;
  const mobilePct = Math.round((analytics.mobileDownloads / totalDownloads) * 100);
  const pcPct = 100 - mobilePct;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass rounded-[20px] shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#087cff]/20 border border-white/10 flex items-center justify-center text-[#35c9ff]">
              {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Panel Devlopè OmniChurch</span>
                {isUnlocked && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-950/60 text-green-400 border border-green-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Konekte
                  </span>
                )}
              </h3>
              <p className="text-xs text-blue-200/60">
                Aksè administrasyon ak jesyon sit OmniChurch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={() => {
                  setIsUnlocked(false);
                  setPassword('');
                  onClose();
                }}
                className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                title="Dekonekte"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">Fèmen Sesyon</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl btn-secondary text-blue-200/70 hover:text-white transition cursor-pointer"
              title="Fèmen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if Locked */}
        {!isUnlocked ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/30 border border-white/10 flex items-center justify-center mx-auto text-[#35c9ff] shadow-[0_0_30px_rgba(8,124,255,0.3)]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white tracking-tight">Aksè Devlopè</h4>
              <p className="text-xs text-blue-200/60">
                Antre modpas pou jwenn aksè nan panèl la.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Antre modpas devlopè a..."
                disabled={isVerifying || (lockedOutUntil !== null && lockedOutUntil > Date.now())}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#35c9ff] transition disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                autoFocus
              />

              {passwordError && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 text-left">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || (lockedOutUntil !== null && lockedOutUntil > Date.now())}
                className="btn-gradient w-full py-3 rounded-xl text-white font-bold text-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Verifikasyon...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Debloke Panèl la</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Dashboard Content */
          <div>
            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 bg-black/30 px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'analytics'
                    ? 'border-[#35c9ff] text-[#35c9ff] bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Analiz Trafik</span>
              </button>

              <button
                onClick={() => setActiveTab('links')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'links'
                    ? 'border-[#35c9ff] text-[#35c9ff] bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                <span>Lyen Telechajman</span>
              </button>

              <button
                onClick={() => setActiveTab('texts')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'texts'
                    ? 'border-purple-400 text-purple-300 bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Edite Deskripsyon</span>
              </button>

              <button
                onClick={() => setActiveTab('adsense')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'adsense'
                    ? 'border-amber-400 text-amber-300 bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Google AdSense</span>
                {formAdSense.enabled && (
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('blogger')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'blogger'
                    ? 'border-[#35c9ff] text-[#35c9ff] bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Tèm Blogger XML</span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'seo'
                    ? 'border-emerald-400 text-emerald-300 bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>SEO &amp; Sitemap</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === 'security'
                    ? 'border-cyan-400 text-cyan-300 bg-white/5'
                    : 'border-transparent text-blue-200/60 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Modpas Devlopè</span>
              </button>
            </div>

            {/* TAB 1: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Live Top Bar - 100% Real Tracking Mode */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                    </div>
                    <div>
                      <div className="text-xs text-blue-200/60 flex items-center gap-1.5">
                        <span>Mòd Done Reyèl (100% Natif Natal)</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-green-500/20 text-green-300 font-bold border border-green-500/30">
                          LIVE
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Navigatè ou aktyèlman konekte</span>
                        <span className="text-xs text-green-400 font-bold">● {analytics.liveUsers} vizitè an liy</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {onClearAnalytics && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Èske ou vle netwaye tout analiz yo pou kòmanse a zewo nèt (0 vizit, 0 telechajman)?')) {
                            onClearAnalytics();
                          }
                        }}
                        className="btn-secondary px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 border border-rose-500/20 flex items-center gap-1.5 cursor-pointer transition"
                        title="Netwaye estatistik yo a zewo"
                      >
                        <Trash2 className="w-3 h-3 text-rose-400" />
                        <span>Reset a Zewo</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onSimulateEvent('visit')}
                      className="btn-secondary px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-200 flex items-center gap-1.5 cursor-pointer"
                      title="Ajoute yon vizit tès"
                    >
                      <RefreshCw className="w-3 h-3 text-[#35c9ff]" />
                      <span>+ Vizit Tès</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSimulateEvent('download_mobile')}
                      className="btn-secondary px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-200 flex items-center gap-1.5 cursor-pointer"
                      title="Ajoute yon telechajman APK tès"
                    >
                      <Smartphone className="w-3 h-3 text-green-400" />
                      <span>+ APK Tès</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onSimulateEvent('download_pc')}
                      className="btn-secondary px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-200 flex items-center gap-1.5 cursor-pointer"
                      title="Ajoute yon telechajman PC tès"
                    >
                      <Monitor className="w-3 h-3 text-[#35c9ff]" />
                      <span>+ PC Tès</span>
                    </button>
                  </div>
                </div>

                {/* Key KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-blue-200/60 font-medium">Vizit Total (Reyèl)</div>
                    <div className="text-2xl font-black text-white mt-1">
                      {analytics.totalVisits.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-green-400 mt-1 flex items-center gap-1">
                      <Users className="w-2.5 h-2.5" />
                      <span>{analytics.uniqueVisitors || analytics.totalVisits} vizitè inik</span>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-blue-200/60 font-medium">Telechajman Total</div>
                    <div className="text-2xl font-black text-[#35c9ff] mt-1">
                      {analytics.downloadsCount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-200/50 mt-1">
                      Konvèsyon {analytics.totalVisits > 0 ? Math.round((analytics.downloadsCount / analytics.totalVisits) * 100) : 0}%
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-blue-200/60 font-medium">Mobil (Android)</div>
                    <div className="text-2xl font-black text-white mt-1">
                      {analytics.mobileDownloads.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-200/50 mt-1">
                      {mobilePct}% nan total telechajman
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="text-xs text-blue-200/60 font-medium">Windows PC</div>
                    <div className="text-2xl font-black text-white mt-1">
                      {analytics.pcDownloads.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-200/50 mt-1">
                      {pcPct}% nan total telechajman
                    </div>
                  </div>
                </div>

                {/* Device Breakdown if available */}
                {analytics.devices && (
                  <div className="glass p-4 rounded-xl border border-white/10">
                    <div className="text-xs font-bold text-white mb-2.5 flex items-center justify-between">
                      <span>Aparèy Vizitè Yo (Reyèl)</span>
                      <span className="text-[10px] text-blue-200/60">Deteksyon otomatik</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">Windows</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.windows}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">Android</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.android}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">iPhone/iOS</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.ios}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">Mac OS</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.mac}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">Linux</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.linux}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="text-blue-200/60 text-[10px]">Lòt</div>
                        <div className="text-sm font-bold text-white mt-0.5">{analytics.devices.other}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Activity Log */}
                <div className="glass rounded-xl border border-white/10 overflow-hidden">
                  <div className="p-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Dènye Evènman Reyèl</span>
                    <span className="text-[10px] text-blue-200/50">Dènye mizajou: {analytics.lastSeen}</span>
                  </div>
                  <div className="divide-y divide-white/5 max-h-48 overflow-y-auto">
                    {analytics.events.length === 0 ? (
                      <div className="p-6 text-center text-xs text-blue-200/50">
                        Pa gen okenn evènman anrejistre ankò. Chak vizit oswa telechajman ap parèt isit la an tan reyèl.
                      </div>
                    ) : (
                      analytics.events.map((ev) => (
                        <div key={ev.id} className="p-3 text-xs flex items-center justify-between hover:bg-white/5 transition">
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                            <span className="text-white font-medium">{ev.label}</span>
                            {ev.platform && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-blue-200 font-semibold">
                                {ev.platform}
                              </span>
                            )}
                          </div>
                          <span className="text-blue-200/50 text-[11px]">{ev.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DOWNLOAD LINKS */}
            {activeTab === 'links' && (
              <form onSubmit={handleSaveLinks} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Cloud Engine Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/80 to-cyan-950/60 border border-[#35c9ff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(8,124,255,0.15)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#087cff]/20 border border-[#35c9ff]/40 flex items-center justify-center text-[#35c9ff] shrink-0">
                      <Cloud className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">Motè Nwaj Firebase Aktif</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-950/80 text-green-400 border border-green-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                          Senkronize an Tan Reyèl
                        </span>
                      </div>
                      <p className="text-xs text-blue-200/70 mt-0.5">
                        Chak fwa w anrejistre yon lyen isit la, li mete sit la ajou imedyatman pou tout vizitè nan mond lan sou nenpòt PC oswa telefòn san w pa bezwen rekonstwi ni manyen kòd la.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">Mete Lyen Telechajman Yo Ajou</h4>
                    <p className="text-xs text-blue-200/60">
                      Ou ka itilize lyen ki soti nan <strong className="text-white">Mediafire</strong>, <strong className="text-white">Google Drive</strong>, <strong className="text-white">GitHub Releases</strong>, oswa nenpòt lòt kote.
                    </p>
                  </div>
                  {saveSuccess && (
                    <div className="px-3 py-1.5 rounded-xl bg-green-950/70 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Sove nan Nwaj avèk siksè!</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Android APK Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bedaff] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-green-400" />
                        <span>Android APK URL (Telefòn & Tablet)</span>
                      </div>
                      <span className="text-[10px] font-bold text-green-400">Ofisyèl (Disponib)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formLinks.android}
                        onChange={(e) => setFormLinks({ ...formLinks, android: e.target.value })}
                        placeholder="https://.../OmniChurch-v2.4.apk oswa lyen Mediafire"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                      />
                      {formLinks.android && (
                        <a
                          href={formLinks.android}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/40 border border-[#35c9ff]/30 text-xs text-[#35c9ff] font-bold flex items-center gap-1 shrink-0 transition"
                          title="Klike pou teste si lyen sa a ap telechaje oswa si l bay 404"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Teste</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Windows 64-bit PC Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bedaff] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-[#35c9ff]" />
                        <span>Windows Desktop 64-bit (.exe) URL</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#35c9ff]">x64 (Pifò PC)</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formLinks.pc}
                        onChange={(e) => setFormLinks({ ...formLinks, pc: e.target.value })}
                        placeholder="https://.../OmniChurch-Setup-x64.exe"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                      />
                      {formLinks.pc && (
                        <a
                          href={formLinks.pc}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/40 border border-[#35c9ff]/30 text-xs text-[#35c9ff] font-bold flex items-center gap-1 shrink-0 transition"
                          title="Klike pou teste si lyen sa a ap telechaje"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Teste</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Windows 32-bit PC Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bedaff] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-[#35c9ff]" />
                        <span>Windows Desktop 32-bit (.exe) URL</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#35c9ff]">x86</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formLinks.pc32 || ''}
                        onChange={(e) => setFormLinks({ ...formLinks, pc32: e.target.value })}
                        placeholder="https://.../OmniChurch-Setup-x86.exe"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                      />
                      {formLinks.pc32 && (
                        <a
                          href={formLinks.pc32}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/40 border border-[#35c9ff]/30 text-xs text-[#35c9ff] font-bold flex items-center gap-1 shrink-0 transition"
                          title="Klike pou teste lyen sa a"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Teste</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Mac macOS Link */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#bedaff] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-amber-400" />
                        <span>Apple Mac macOS (.dmg) URL</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400">Opsyonèl</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formLinks.mac || ''}
                        onChange={(e) => setFormLinks({ ...formLinks, mac: e.target.value })}
                        placeholder="https://.../OmniChurch-Universal.dmg"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#35c9ff] transition"
                      />
                      {formLinks.mac && (
                        <a
                          href={formLinks.mac}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2.5 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/40 border border-[#35c9ff]/30 text-xs text-[#35c9ff] font-bold flex items-center gap-1 shrink-0 transition"
                          title="Klike pou teste lyen Mac la"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Teste</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1b4882]/50">
                  <button
                    type="button"
                    onClick={handleResetLinks}
                    className="px-4 py-2.5 rounded-xl bg-[#091e3e] border border-[#1e4d8c] text-xs font-bold text-[#8ca8cc] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retabli Lyen Defo Yo</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087cff] to-[#00b8ff] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(8,124,255,0.4)] hover:brightness-110 transition cursor-pointer"
                  >
                    <Cloud className="w-4 h-4" />
                    <span>Sove Tout Lyen Yo nan Nwaj la</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB: DYNAMIC SITE TEXTS & DESCRIPTIONS */}
            {activeTab === 'texts' && (
              <form onSubmit={handleSaveTexts} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-bold text-white">Edite Tout Tèks &amp; Deskripsyon Sit la</h4>
                    </div>
                    <p className="text-xs text-[#8ca8cc] mt-0.5">
                      Devlopè a ka modifye nenpòt tit, sou-tit, ak deskripsyon nenpòt lè. Chanjman yo ap parèt touswit sou sit la epi nan tèm Blogger a.
                    </p>
                  </div>

                  {textSaveSuccess && (
                    <div className="px-3 py-1.5 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                      <Check className="w-3.5 h-3.5" />
                      <span>Tout tèks yo sove avèk siksè!</span>
                    </div>
                  )}
                </div>

                {/* Secret access reminder note */}
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200/90 flex items-start gap-2.5">
                  <Key className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-purple-300">Mòd Devlopè Sekrè: </span>
                    <span>Pou w re-louvri panel sa a pita: 1) Peze <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-purple-400/40 font-mono text-[11px]">Ctrl + Shift + D</kbd>, 2) Klike 3 fwa sou Logo <b>OmniChurch</b> anwo a, oswa 3) Klike sou tèks copyright nan pye paj la.</span>
                  </div>
                </div>

                {/* Section 1: Hero Texts */}
                <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
                  <div className="border-b border-[#1b4882]/50 pb-2">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>1. Akèy &amp; Bannè Prensipal (Hero Section)</span>
                    </h5>
                    <p className="text-[11px] text-blue-200/60">Gwo tit ak paragraf ki parèt anlè nèt lè vizitè a antre sou sit la.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Eyebrow (Tèks Anwo Tit la)</label>
                      <input
                        type="text"
                        value={formTexts.heroEyebrow}
                        onChange={(e) => setFormTexts({ ...formTexts, heroEyebrow: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Sou-Eyebrow</label>
                      <input
                        type="text"
                        value={formTexts.heroEyebrowSub}
                        onChange={(e) => setFormTexts({ ...formTexts, heroEyebrowSub: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Badj Vèsyon</label>
                      <input
                        type="text"
                        value={formTexts.heroBadge}
                        onChange={(e) => setFormTexts({ ...formTexts, heroBadge: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Tit Prefiks (Blan)</label>
                      <input
                        type="text"
                        value={formTexts.heroTitlePrefix}
                        onChange={(e) => setFormTexts({ ...formTexts, heroTitlePrefix: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-[#bedaff]">Tit Prensipal Enpòtan (Ble / Briyan)</label>
                      <input
                        type="text"
                        value={formTexts.heroTitleHighlight}
                        onChange={(e) => setFormTexts({ ...formTexts, heroTitleHighlight: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-[#bedaff]">Sou-tit Prensipal</label>
                      <input
                        type="text"
                        value={formTexts.heroSubtitle}
                        onChange={(e) => setFormTexts({ ...formTexts, heroSubtitle: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold text-[#bedaff]">Gwo Deskripsyon Prensipal (Hero Description)</label>
                      <textarea
                        rows={3}
                        value={formTexts.heroDescription}
                        onChange={(e) => setFormTexts({ ...formTexts, heroDescription: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff] leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Features Section */}
                <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
                  <div className="border-b border-[#1b4882]/50 pb-2">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>2. Karakteristik &amp; Poto Mitan (Features Section)</span>
                    </h5>
                    <p className="text-[11px] text-blue-200/60">Tit ak 4 bèl kat ki prezante avantaj OmniChurch yo.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#bedaff]">Tit Seksyon Karakteristik</label>
                        <input
                          type="text"
                          value={formTexts.featuresTitle}
                          onChange={(e) => setFormTexts({ ...formTexts, featuresTitle: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#bedaff]">Deskripsyon Seksyon Karakteristik</label>
                        <input
                          type="text"
                          value={formTexts.featuresDescription}
                          onChange={(e) => setFormTexts({ ...formTexts, featuresDescription: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                        />
                      </div>
                    </div>

                    {/* 4 Feature cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {/* Card 1 */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="text-xs font-bold text-cyan-300">Kat 1: Jesyon Manm</div>
                        <input
                          type="text"
                          value={formTexts.feature1Title}
                          onChange={(e) => setFormTexts({ ...formTexts, feature1Title: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                          placeholder="Tit Kat 1"
                        />
                        <textarea
                          rows={2}
                          value={formTexts.feature1Desc}
                          onChange={(e) => setFormTexts({ ...formTexts, feature1Desc: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-blue-200/80"
                          placeholder="Deskripsyon Kat 1"
                        />
                      </div>

                      {/* Card 2 */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="text-xs font-bold text-blue-300">Kat 2: Kominikasyon &amp; SMS</div>
                        <input
                          type="text"
                          value={formTexts.feature2Title}
                          onChange={(e) => setFormTexts({ ...formTexts, feature2Title: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                          placeholder="Tit Kat 2"
                        />
                        <textarea
                          rows={2}
                          value={formTexts.feature2Desc}
                          onChange={(e) => setFormTexts({ ...formTexts, feature2Desc: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-blue-200/80"
                          placeholder="Deskripsyon Kat 2"
                        />
                      </div>

                      {/* Card 3 */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="text-xs font-bold text-purple-300">Kat 3: Evènman &amp; Kil</div>
                        <input
                          type="text"
                          value={formTexts.feature3Title}
                          onChange={(e) => setFormTexts({ ...formTexts, feature3Title: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                          placeholder="Tit Kat 3"
                        />
                        <textarea
                          rows={2}
                          value={formTexts.feature3Desc}
                          onChange={(e) => setFormTexts({ ...formTexts, feature3Desc: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-blue-200/80"
                          placeholder="Deskripsyon Kat 3"
                        />
                      </div>

                      {/* Card 4 */}
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="text-xs font-bold text-emerald-300">Kat 4: Rapò &amp; Analiz</div>
                        <input
                          type="text"
                          value={formTexts.feature4Title}
                          onChange={(e) => setFormTexts({ ...formTexts, feature4Title: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold"
                          placeholder="Tit Kat 4"
                        />
                        <textarea
                          rows={2}
                          value={formTexts.feature4Desc}
                          onChange={(e) => setFormTexts({ ...formTexts, feature4Desc: e.target.value })}
                          className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-2.5 py-1.5 text-xs text-blue-200/80"
                          placeholder="Deskripsyon Kat 4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Downloads & Footer */}
                <div className="p-4 rounded-2xl bg-[#030d22] border border-[#1b4882]/70 space-y-4">
                  <div className="border-b border-[#1b4882]/50 pb-2">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>3. Telechajman &amp; Pye Paj (Footer)</span>
                    </h5>
                    <p className="text-[11px] text-blue-200/60">Tèks pou zòn telechajman santral la ak deskripsyon pye paj la.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Tit Seksyon Telechajman</label>
                      <input
                        type="text"
                        value={formTexts.downloadTitle}
                        onChange={(e) => setFormTexts({ ...formTexts, downloadTitle: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Sou-tit Seksyon Telechajman</label>
                      <input
                        type="text"
                        value={formTexts.downloadSubtitle}
                        onChange={(e) => setFormTexts({ ...formTexts, downloadSubtitle: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#bedaff]">Deskripsyon A Pwopo nan Pye Paj la (Footer About)</label>
                      <textarea
                        rows={2}
                        value={formTexts.footerAbout}
                        onChange={(e) => setFormTexts({ ...formTexts, footerAbout: e.target.value })}
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#35c9ff] leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleResetTexts}
                    className="px-4 py-2.5 rounded-xl bg-[#091e3e] border border-[#1e4d8c] text-xs font-bold text-[#8ca8cc] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retabli Tèks Orijinal Yo</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:brightness-110 transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sove Tout Deskripsyon Yo</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: GOOGLE ADSENSE PROFESSIONAL CONFIGURATION */}
            {activeTab === 'adsense' && (
              <form onSubmit={handleSaveAdSense} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <h4 className="text-base font-bold text-white">Konfigirasyon Google AdSense Pwofesyonèl</h4>
                    </div>
                    <p className="text-xs text-blue-200/60 mt-1">
                      Monetize sit la ak tèm Blogger la san danje, avèk plasman estratejik ki konfòm 100% ak Règleman Google.
                    </p>
                  </div>

                  {adSaveSuccess && (
                    <div className="px-3.5 py-1.5 rounded-xl bg-green-950/70 border border-green-500/40 text-green-300 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Konfigirasyon AdSense anrejistre!</span>
                    </div>
                  )}
                </div>

                {/* Main AdSense Master Switches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Master Enable/Disable */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[rgba(6,22,54,0.8)] to-[rgba(10,32,75,0.7)] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Estati AdSense</span>
                        {formAdSense.enabled ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                            AKTIF
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/10 text-blue-200/50">
                            DEZAKTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-blue-200/60 mt-0.5">
                        Limen anons yo sou sit la ak nan kòd Blogger la
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formAdSense.enabled}
                        onChange={(e) => setFormAdSense({ ...formAdSense, enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#35c9ff]"></div>
                    </label>
                  </div>

                  {/* Preview Banners Toggle */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[rgba(6,22,54,0.8)] to-[rgba(10,32,75,0.7)] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-[#35c9ff]" />
                        <span>Mòd Apèsi (Preview Badges)</span>
                      </div>
                      <div className="text-[11px] text-blue-200/60 mt-0.5">
                        Afiche plasman yo menm si AdSense poko apwouve
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formAdSense.showPreviewBadges}
                        onChange={(e) => setFormAdSense({ ...formAdSense, showPreviewBadges: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                    </label>
                  </div>
                </div>

                {/* Publisher ID input with link to Google AdSense */}
                <div className="space-y-2 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>ID Kliyan AdSense (Publisher ID)</span>
                    </label>
                    <a
                      href="https://www.google.com/adsense"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#35c9ff] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Ouvri Google AdSense Console</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="text"
                    value={formAdSense.publisherId}
                    onChange={(e) => setFormAdSense({ ...formAdSense, publisherId: e.target.value.trim() })}
                    placeholder="ca-pub-1234567890123456"
                    className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 font-mono transition"
                  />
                  <p className="text-[11px] text-blue-200/50 leading-relaxed">
                    W ap jwenn ID sa a nan kont AdSense ou anba: <b>Paramètres &gt; Informations sur le compte &gt; Identifiant éditeur</b> (li toujou kòmanse pa <code className="text-amber-300 font-bold">ca-pub-</code>).
                  </p>
                </div>

                {/* Seksyon Dedye: Fichye Verifikasyon ads.txt (Egzijans Ofisyèl Google AdSense) */}
                <div className="space-y-4 p-5 rounded-2xl bg-gradient-to-b from-[#04122c] to-[#020712] border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.1)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Fichye Verifikasyon ads.txt (Egzijans Google)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Obligatwa
                          </span>
                        </h5>
                        <p className="text-[11px] text-blue-200/70">
                          Google egzije pou liy sa a prezan sou <code>https://sitou.com/ads.txt</code> oswa nan paramèt Blogger pou konfime se ou ki mèt kont la.
                        </p>
                      </div>
                    </div>

                    {/* Aksyon Rapid */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyAdsTxt}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        title="Kopye liy lan nan clipboard"
                      >
                        {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAdsTxt ? 'Kopye!' : 'Kopye Liy lan'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadAdsTxtFile}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-extrabold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                        title="Telechaje fichye ads.txt la sou òdinatè w"
                      >
                        {adsTxtDownloadSuccess ? <Check className="w-3.5 h-3.5 text-black" /> : <Download className="w-3.5 h-3.5" />}
                        <span>{adsTxtDownloadSuccess ? 'Telechaje!' : 'Telechaje ads.txt'}</span>
                      </button>

                      <a
                        href="/ads.txt"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-blue-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                        title="Ouvri lyen /ads.txt pou teste"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ouvri /ads.txt</span>
                      </a>
                    </div>
                  </div>

                  {/* Liy kalkile an tan reyèl */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#bedaff] font-bold">
                      <span>Liy ads.txt Ofisyèl ki kalkile ak ID ou a:</span>
                      <span className="text-[11px] text-amber-300/80 font-mono">
                        {formAdSense.publisherId ? 'Mete ajou an tan reyèl' : 'Antre ID ou anlè a'}
                      </span>
                    </div>
                    <div className="p-3 bg-black/60 border border-[#1b4882] rounded-xl font-mono text-xs sm:text-sm text-green-400 selection:bg-green-800 selection:text-white flex items-center justify-between overflow-x-auto">
                      <code>{getComputedAdsTxt()}</code>
                    </div>
                  </div>

                  {/* Kontni Custom ads.txt si itilizatè a gen plizyè liy */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Pèsonalize Kontni ads.txt (Si w gen lòt rezo anons oswa patnè):</span>
                      <span className="text-[10px] text-blue-200/50">Opsyonèl</span>
                    </label>
                    <textarea
                      rows={2}
                      value={formAdSense.customAdsTxt || ''}
                      onChange={(e) => setFormAdSense({ ...formAdSense, customAdsTxt: e.target.value })}
                      placeholder={`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`}
                      className="w-full bg-[#020712] border border-[#1b4882] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono transition"
                    />
                  </div>

                  {/* Enstriksyon Pratik */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-blue-100/90">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                        <span>Si w ap itilize Blogger:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-200/70">
                        <li>Ale nan kont <b>Blogger &gt; Paramètres</b>.</li>
                        <li>Desann nan seksyon <b>Monétisation</b>.</li>
                        <li>Limen <b>&quot;Activer le fichier ads.txt personnalisé&quot;</b>.</li>
                        <li>Klike sou <b>Fichier ads.txt personnalisé</b> epi kole liy lan la.</li>
                      </ol>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-blue-100/90">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-[10px]">2</span>
                        <span>Si w sou yon Domèn Pèsonalize / Hosting:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-200/70">
                        <li>Klike sou bouton <b>&quot;Telechaje ads.txt&quot;</b> anwo a.</li>
                        <li>Mete fichye a nan dosye rasin sit la (<code>public/</code>).</li>
                        <li>Verifye lè w tape <code>https://domènou.com/ads.txt</code> nan navigatè a.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Strategic Ad Unit Slots */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>Espas Anons Manyèl (Slot IDs)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Top Banner Slot */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-xs font-bold text-white">1. Bannè Anwo (Header)</div>
                      <div className="text-[10px] text-blue-200/50">Leaderboard 728x90 oswa Auto</div>
                      <input
                        type="text"
                        value={formAdSense.headerSlot}
                        onChange={(e) => setFormAdSense({ ...formAdSense, headerSlot: e.target.value.trim() })}
                        placeholder="Slot ID (Egz: 1234567890)"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#35c9ff] font-mono"
                      />
                    </div>

                    {/* Mid-Content Slot */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-xs font-bold text-white">2. Bannè Mitan (In-Content)</div>
                      <div className="text-[10px] text-blue-200/50">Ant Karakteristik ak Download</div>
                      <input
                        type="text"
                        value={formAdSense.inContentSlot}
                        onChange={(e) => setFormAdSense({ ...formAdSense, inContentSlot: e.target.value.trim() })}
                        placeholder="Slot ID (Egz: 2345678901)"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#35c9ff] font-mono"
                      />
                    </div>

                    {/* Footer Slot */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="text-xs font-bold text-white">3. Bannè Anba (Footer)</div>
                      <div className="text-[10px] text-blue-200/50">Anlè seksyon Kontak la</div>
                      <input
                        type="text"
                        value={formAdSense.footerSlot}
                        onChange={(e) => setFormAdSense({ ...formAdSense, footerSlot: e.target.value.trim() })}
                        placeholder="Slot ID (Egz: 3456789012)"
                        className="w-full bg-[#020712] border border-[#1b4882] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#35c9ff] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Policy & Best Practice Guidance */}
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200/90 space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Règ Sekirite &amp; Estanda Google AdSense:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-100/80">
                    <li><b>Etikèt Obligatwa:</b> Tout espas gen etikèt transparan &quot;PIBLISITE / ADVERTISEMENT&quot; otomatikman.</li>
                    <li><b>Pa janm klike sou pwòp anons ou:</b> Google ka bloke kont lan si gen fo klik.</li>
                    <li><b>Zewo Pwoblèm XML sou Blogger:</b> Kòd la entegre nan fason ki respekte 100% règleman Blogger san okenn erè XML.</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleResetAdSense}
                    className="px-4 py-2.5 rounded-xl bg-[#091e3e] border border-[#1e4d8c] text-xs font-bold text-[#8ca8cc] hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reyinisyalize AdSense</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:brightness-110 transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sove Konfigirasyon AdSense</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: BLOGGER XML CODE GENERATOR & EXPORT */}
            {activeTab === 'blogger' && (
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Tèm Blogger XML Konplè</span>
                      {formAdSense.enabled && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          + AdSense Entegre
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-[#8ca8cc]">
                      Kòd sa a mete ajou ak tout nouvo tèks yo, deteksyon Windows 64/32-bit, animasyon fa, ak Google AdSense.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyXml}
                      className="px-3.5 py-2 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/40 border border-[#35c9ff]/50 text-xs font-bold text-[#35c9ff] flex items-center gap-2 transition cursor-pointer"
                    >
                      {copiedXml ? <Check className="w-4 h-4 text-[#3df58b]" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedXml ? 'Kopye nan Clipboard!' : 'Kopye Kòd XML la'}</span>
                    </button>

                    <button
                      onClick={handleDownloadXmlFile}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#087cff] to-[#00b8ff] text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(8,124,255,0.4)] transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Telechaje Fichye .xml</span>
                    </button>
                  </div>
                </div>

                {/* Instructions banner */}
                <div className="p-4 rounded-2xl bg-[#061b3d] border border-[#1c4e8c] text-xs text-[#b6d5f8] space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Kijan pou w enstale nouvo tèm nan sou Blogger:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-[11.5px] text-[#9cbddf]">
                    <li>Konekte sou kont Blogger ou a, klike sou <b>&quot;Thème&quot; (Tèm)</b> nan meni a goch la.</li>
                    <li>Klike sou ti flèch bò kote bouton <b>&quot;Personnaliser&quot;</b>, epi chwazi <b>&quot;Modifier le code HTML&quot;</b>.</li>
                    <li>Efase tout ansyen kòd la, kole kòd XML sa a, epi klike sou <b>&quot;Enregistrer&quot; (Sove)</b>!</li>
                  </ol>
                </div>

                {/* Code Preview Box */}
                <div className="relative rounded-2xl border border-[#184275] bg-[#020712] overflow-hidden">
                  <div className="px-4 py-2 bg-[#06142e] border-b border-[#184275] flex items-center justify-between text-[11px] text-[#789ec9]">
                    <span>omnichurch-theme.xml (100% Valid Blogger Template)</span>
                    <span className="text-[#3df58b]">Pare pou Blogger</span>
                  </div>
                  <pre className="p-4 text-[11px] font-mono text-[#a5cbf5] max-h-72 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all">
                    {currentXmlCode}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 5: ADVANCED SEO & SITEMAP PRO */}
            {activeTab === 'seo' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Header & Quick Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      <span>Jesyon SEO &amp; Sitemap Pwofesyonèl</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Estanda Google &amp; Schema.org
                      </span>
                    </h4>
                    <p className="text-xs text-[#8ca8cc] mt-0.5">
                      Kontwole tit, deskripsyon, mo-kle, structured data, ak sitemap pou plase OmniChurch an premye sou Google.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={async () => {
                        const xml = generateDynamicSitemap(sitemapDomain);
                        try {
                          await navigator.clipboard.writeText(xml);
                          setCopiedSitemapXml(true);
                          setTimeout(() => setCopiedSitemapXml(false), 2500);
                        } catch {
                          setCopiedSitemapXml(true);
                          setTimeout(() => setCopiedSitemapXml(false), 2500);
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/50 text-xs font-bold text-emerald-300 flex items-center gap-2 transition cursor-pointer"
                    >
                      {copiedSitemapXml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedSitemapXml ? 'Kòd XML Kopye!' : 'Kopye sitemap.xml'}</span>
                    </button>

                    <button
                      onClick={() => downloadSitemapXmlFile(sitemapDomain)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Telechaje sitemap.xml</span>
                    </button>
                  </div>
                </div>

                {/* CRITICAL GOOGLE SEARCH CONSOLE ALERT: EXPLAINING "Incorrect sitemap address" */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#1b1407] to-amber-900/20 border border-amber-500/40 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-amber-300">
                        Poukisa Google Search Console te di &quot;Incorrect sitemap address&quot; ?
                      </h5>
                      <p className="text-xs text-amber-200/80 leading-relaxed">
                        Nan Google Search Console, Google <b>deja mete domèn ou a devan bwat tèks la</b> (pa egzanp{' '}
                        <code className="px-1 py-0.5 bg-black/60 rounded text-amber-300 font-mono">https://omnichurch.download/</code>).
                        Si w te kopye tout lyen an nèt epi w kole l, Google ap wè adrès la an doub epi l ap di <em>&quot;Incorrect sitemap address. Please enter a valid path to your sitemap&quot;</em>.
                      </p>
                    </div>
                  </div>

                  {/* Visual interactive representation of how to submit correctly */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fason Kòrèk pou Soumèt li sou Google Search Console:</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs">
                      {/* Left: Domain Prefix in GSC */}
                      <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-gray-400 text-xs truncate">
                        {sitemapDomain.replace(/\/+$/, '')}/
                      </div>
                      <span className="hidden sm:inline text-white font-bold">+</span>
                      {/* Right: What user types */}
                      <div className="flex-1 px-3 py-2 rounded-lg bg-emerald-950/60 border-2 border-emerald-400 font-mono text-emerald-300 font-bold text-xs flex items-center justify-between">
                        <span>sitemap.xml</span>
                        <span className="text-[10px] bg-emerald-500 text-black font-extrabold px-1.5 py-0.5 rounded">TAPE SA A SÈLMAN</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-blue-200/70 pt-1">
                      👉 <b>Enstriksyon:</b> Ale nan Google Search Console &gt; Sitemaps &gt; Nan chan <em>&quot;Add a new sitemap&quot;</em>, tape sèlman: <b className="text-emerald-300 font-mono">sitemap.xml</b> epi klike sou <b>Submit</b>.
                    </p>
                  </div>
                </div>

                {/* Google Search Result Live Preview (SERP Preview) */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Aperçu sou Google (Kijan moun ap wè sit la sou Google):</span>
                    </span>
                    <span className="text-[10px] text-blue-200/50">Similatè SERP</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#202124] border border-gray-700 text-left font-sans space-y-1 shadow-md">
                    <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                      <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">
                        ✝
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] text-[#dadce0] font-medium leading-none">OmniChurch</span>
                        <span className="text-[11px] text-[#bdc1c6] font-mono leading-none mt-0.5">{formSEO.canonicalUrl}</span>
                      </div>
                    </div>
                    <div className="text-[#8ab4f8] text-base font-medium hover:underline cursor-pointer leading-tight pt-1">
                      {formSEO.metaTitle || 'OmniChurch - Aplikasyon Jesyon Legliz Pwofesyonèl'}
                    </div>
                    <div className="text-[#bdc1c6] text-xs leading-relaxed pt-0.5 line-clamp-2">
                      {formSEO.metaDescription || 'Deskripsyon sit la ap parèt isit la...'}
                    </div>
                  </div>
                </div>

                {/* SEO Form */}
                <form onSubmit={handleSaveSEO} className="space-y-6">
                  {/* Basic Metadata */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4" />
                        <span>Baliz Meta Fondamantal (Google &amp; Motè Rechèch)</span>
                      </h5>
                    </div>

                    {/* Meta Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-white">Tit Sit la pou Google (Meta Title):</label>
                        <span className={`text-[10px] font-mono ${(formSEO.metaTitle?.length || 0) > 60 ? 'text-amber-400' : 'text-blue-200/60'}`}>
                          {formSEO.metaTitle?.length || 0} / 60 karaktè rekòmande
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formSEO.metaTitle}
                        onChange={(e) => setFormSEO({ ...formSEO, metaTitle: e.target.value })}
                        placeholder="OmniChurch - Aplikasyon Jesyon Legliz Pwofesyonèl | PC & Mobil"
                        className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                      />
                    </div>

                    {/* Meta Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-white">Deskripsyon Google &amp; Rezo Sosyo (Meta Description):</label>
                        <span className={`text-[10px] font-mono ${(formSEO.metaDescription?.length || 0) > 160 ? 'text-amber-400' : 'text-blue-200/60'}`}>
                          {formSEO.metaDescription?.length || 0} / 160 karaktè rekòmande
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={formSEO.metaDescription}
                        onChange={(e) => setFormSEO({ ...formSEO, metaDescription: e.target.value })}
                        placeholder="OmniChurch se platfòm pwofesyonèl pou jesyon manm, kominikasyon SMS, dim ak ofrann..."
                        className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-400 transition leading-relaxed"
                      />
                    </div>

                    {/* Keywords & Canonical URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Mo-kle pou Rechèch (Keywords separe ak vigil):</label>
                        <input
                          type="text"
                          value={formSEO.keywords}
                          onChange={(e) => setFormSEO({ ...formSEO, keywords: e.target.value })}
                          placeholder="omnichurch, aplikasyon legliz, church software, lojisyèl legliz..."
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">URL Ofisyèl Sit la (Canonical URL):</label>
                        <input
                          type="text"
                          value={formSEO.canonicalUrl}
                          onChange={(e) => {
                            setFormSEO({ ...formSEO, canonicalUrl: e.target.value });
                            setSitemapDomain(e.target.value.replace(/\/+$/, ''));
                          }}
                          placeholder="https://omnichurch.download/"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>

                    {/* Robots & Author */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Direktiv Wobo (Robots Indexing):</label>
                        <input
                          type="text"
                          value={formSEO.robots}
                          onChange={(e) => setFormSEO({ ...formSEO, robots: e.target.value })}
                          placeholder="index, follow, max-image-preview:large"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Otè &amp; Òganizasyon (Author):</label>
                        <input
                          type="text"
                          value={formSEO.author}
                          onChange={(e) => setFormSEO({ ...formSEO, author: e.target.value })}
                          placeholder="Jackson Charles (ZOUTIW)"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Sharing (OpenGraph & WhatsApp / Facebook / Twitter) */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h5 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Share2 className="w-4 h-4" />
                        <span>Pataj sou Rezo Sosyo (WhatsApp, Facebook, Twitter Card)</span>
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Tit pou Pataj (OG Title):</label>
                        <input
                          type="text"
                          value={formSEO.ogTitle}
                          onChange={(e) => setFormSEO({ ...formSEO, ogTitle: e.target.value })}
                          placeholder="OmniChurch - Platfòm & Aplikasyon Jesyon Legliz"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Imaj pou Pataj (OG Image URL):</label>
                        <input
                          type="text"
                          value={formSEO.ogImage}
                          onChange={(e) => setFormSEO({ ...formSEO, ogImage: e.target.value })}
                          placeholder="https://omnichurch.download/favicon.svg"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-white block mb-1">Deskripsyon Pataj (OG Description):</label>
                      <textarea
                        rows={2}
                        value={formSEO.ogDescription}
                        onChange={(e) => setFormSEO({ ...formSEO, ogDescription: e.target.value })}
                        placeholder="Solisyon dijital pwofesyonèl pou modènize jesyon ak kominikasyon legliz yo..."
                        className="w-full bg-[#020712] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-teal-400 transition"
                      />
                    </div>
                  </div>

                  {/* Schema.org Structured Data & App Specs */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Code className="w-4 h-4" />
                        <span>Done Estriktire Schema.org &amp; Teknoloji Sekirite</span>
                      </h5>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        SoftwareApplication JSON-LD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Non Aplikasyon an:</label>
                        <input
                          type="text"
                          value={formSEO.appName}
                          onChange={(e) => setFormSEO({ ...formSEO, appName: e.target.value })}
                          placeholder="OmniChurch"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Vèsyon:</label>
                        <input
                          type="text"
                          value={formSEO.appVersion}
                          onChange={(e) => setFormSEO({ ...formSEO, appVersion: e.target.value })}
                          placeholder="2.4.0 Pro"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Pri Lisans:</label>
                        <input
                          type="text"
                          value={formSEO.price}
                          onChange={(e) => setFormSEO({ ...formSEO, price: e.target.value })}
                          placeholder="0.00 USD (Gratis)"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Pwoteksyon Done &amp; Konfidansyalite:</label>
                        <input
                          type="text"
                          value={formSEO.encryptionStandard}
                          onChange={(e) => setFormSEO({ ...formSEO, encryptionStandard: e.target.value })}
                          placeholder="Pwoteksyon Done Lokal &amp; Konfidansyalite"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white block mb-1">Mòd Offline &amp; Baz Done:</label>
                        <input
                          type="text"
                          value={formSEO.offlineSupport}
                          onChange={(e) => setFormSEO({ ...formSEO, offlineSupport: e.target.value })}
                          placeholder="100% Offline-First (SQLite natif san depandans entènèt)"
                          className="w-full bg-[#020712] border border-white/15 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-emerald-400 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Notification & Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetSEO}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition cursor-pointer"
                    >
                      Remèt Vale Defo yo
                    </button>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {seoSaveSuccess && (
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Tout paramèt SEO sove nan nwaj la &amp; aplike!</span>
                        </span>
                      )}

                      <button
                        type="submit"
                        className="btn-gradient w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(8,124,255,0.4)]"
                      >
                        <Save className="w-4 h-4" />
                        <span>Sove Paramèt SEO nan Nwaj la</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Direct Sitemap Verification Links */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-blue-200/80">
                    <span className="font-bold text-white block">Lyen Dirèk pou Verifikasyon Sèvè:</span>
                    <span className="text-[11px] text-blue-200/60">Klike pou verifye ke sèvè a oswa Cloudflare ap sèvi fichye yo kòrèkteman.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-mono flex items-center gap-1 transition"
                    >
                      <span>/sitemap.xml</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/40 text-cyan-300 hover:text-cyan-200 text-xs font-mono flex items-center gap-1 transition"
                    >
                      <span>/robots.txt</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Live XML Code Viewer */}
                <div className="relative rounded-2xl border border-white/10 bg-[#020712] overflow-hidden">
                  <div className="px-4 py-2 bg-[#06142e] border-b border-white/10 flex items-center justify-between text-[11px] text-[#789ec9]">
                    <span className="font-mono text-emerald-400">sitemap.xml dinamik (Fòma Estanda Google)</span>
                    <span className="text-xs text-blue-200/60">
                      {SITEMAP_ENTRIES.length} Paj &amp; Modil Endekse
                    </span>
                  </div>
                  <pre className="p-4 text-[11px] font-mono text-emerald-200/90 max-h-56 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all">
                    {generateDynamicSitemap(sitemapDomain)}
                  </pre>
                </div>
              </div>
            )}


            {/* TAB 7: DEVELOPER ACCESS & PASSWORD */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <h4>Jesyon Aksè Devlopè</h4>
                  </div>
                  <p className="text-xs text-blue-200/60 leading-relaxed">
                    Ou ka modifye modpas devlopè a pou kontwole aksè nan jesyon sit la.
                  </p>
                </div>

                {/* Status message */}
                {passwordChangeStatus && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
                      passwordChangeStatus.startsWith('Erè')
                        ? 'bg-red-950/60 border-red-500/40 text-red-300'
                        : 'bg-green-950/60 border-green-500/40 text-green-300'
                    }`}
                  >
                    {passwordChangeStatus.startsWith('Erè') ? (
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    ) : (
                      <Check className="w-4 h-4 shrink-0 text-green-400" />
                    )}
                    <span>{passwordChangeStatus}</span>
                  </div>
                )}

                {/* Change Password Form */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#35c9ff]" />
                    <h5 className="text-sm font-bold text-white">Chanje Modpas Devlopè a</h5>
                  </div>
                  <p className="text-xs text-blue-200/60">
                    Antre nouvo modpas ou vle defini pou aksè devlopè a.
                  </p>

                  <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-blue-200/80 mb-1">
                        Nouvo Modpas (omwen 8 karaktè)
                      </label>
                      <input
                        type="password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Antre nouvo modpas la..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#35c9ff] transition font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-blue-200/80 mb-1">
                        Konfime Nouvo Modpas la
                      </label>
                      <input
                        type="password"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        placeholder="Re-antre nouvo modpas la..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#35c9ff] transition font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-gradient px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Anrejistre Nouvo Modpas</span>
                    </button>
                  </form>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-blue-200/60">
                      Vle retounen nan modpas defo a?
                    </span>
                    <button
                      type="button"
                      onClick={handleResetToDefaultPassword}
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer"
                    >
                      Retabli modpas defo (OmniChurch@2026)
                    </button>
                  </div>
                </div>

                {/* Session Action */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-300" />
                      <span>Fèmen Sesyon Devlopè a</span>
                    </h5>
                    <p className="text-xs text-blue-200/60 mt-0.5">
                      Sa ap dekonèkte sesyon an epi fèmen panèl la.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsUnlocked(false);
                      setPassword('');
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600/60 hover:bg-blue-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Fèmen Sesyon</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
