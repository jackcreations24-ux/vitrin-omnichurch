/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Wrench } from 'lucide-react';
import { LighthouseBeam } from './components/LighthouseBeam';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InstallGuideSection } from './components/InstallGuideSection';
import { TechSecuritySection } from './components/TechSecuritySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DownloadSection } from './components/DownloadSection';
import { ContactSection } from './components/ContactSection';
import { DevDashboardModal } from './components/DevDashboardModal';
import { DownloadModal } from './components/DownloadModal';
import { PcInstallGuideModal } from './components/PcInstallGuideModal';
import { IosInstallGuideModal } from './components/IosInstallGuideModal';
import { SitemapModal } from './components/SitemapModal';
import { PoliciesModal, PolicyTab } from './components/PoliciesModal';
import { LegalDocumentPage, LegalDocType } from './components/LegalDocumentPage';
import { DonationsModal } from './components/DonationsModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { DownloadToast } from './components/DownloadToast';
import { AdSenseBanner } from './components/AdSenseBanner';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { detectArchitecture } from './utils/deviceDetect';
import {
  loadSavedLinks,
  saveLinksToStorage,
  loadSavedAdSense,
  saveAdSenseToStorage,
  loadSavedSiteTexts,
  saveSiteTextsToStorage,
  loadSavedSEO,
  saveSEOToStorage,
  DEFAULT_SITE_TEXTS,
} from './data/defaultData';
import {
  subscribeToCloudDownloads,
  subscribeToCloudSiteTexts,
  subscribeToCloudAdSense,
  subscribeToCloudSEO,
  subscribeToCloudAnalytics,
  trackCloudVisit,
  trackCloudDownload,
  saveCloudDownloads,
  saveCloudSiteTexts,
  saveCloudAdSense,
  saveCloudSEO,
  subscribeToDeveloperEngine,
  loadCachedDeveloperEngine,
} from './lib/firebase';
import {
  fetchServerConfig,
  saveServerLinks,
  saveServerTexts,
  saveServerAdSense,
  saveServerSEO,
  trackServerVisit,
  trackServerDownload,
} from './services/apiConfig';
import { fetchLatestGitHubRelease } from './services/githubReleases';
import {
  recordRealVisit,
  recordRealDownload,
  recordSettingsEvent,
  recordCustomEvent,
  clearRealAnalytics,
  toAnalyticsState,
  getRealAnalytics,
} from './utils/realAnalytics';
import { applyDynamicSEO } from './utils/seoManager';
import {
  DownloadLinks,
  AnalyticsState,
  AdSenseConfig,
  SiteTextsConfig,
  SEOConfig,
  DeveloperEngineConfig,
} from './types';
import { useI18n } from './i18n/I18nContext';
import { formatLocalizedVersionBadge } from './utils/versionHelper';

function resolveLegalRouteFromLocation(): LegalDocType | null {
  if (typeof window === 'undefined') return null;

  const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);
  const pageParam = (params.get('page') || params.get('sec') || '').toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (
    cleanPath === '/privacy-policy' ||
    cleanPath === '/policy-privacy' ||
    cleanPath === '/privacy' ||
    pageParam === 'privacy' ||
    pageParam === 'privacy-policy' ||
    hash === '#privacy'
  ) {
    return 'privacy';
  }

  if (
    cleanPath === '/terms-of-service' ||
    cleanPath === '/terms' ||
    cleanPath === '/tos' ||
    pageParam === 'terms' ||
    pageParam === 'terms-of-service' ||
    hash === '#terms'
  ) {
    return 'terms';
  }

  return null;
}

export default function App() {
  const { lang } = useI18n();
  const [links, setLinks] = useState<DownloadLinks>(() => loadSavedLinks());
  const [analytics, setAnalytics] = useState<AnalyticsState>(() => toAnalyticsState(getRealAnalytics()));
  const [adsense, setAdSense] = useState<AdSenseConfig>(() => loadSavedAdSense());
  const [siteTexts, setSiteTexts] = useState<SiteTextsConfig>(() => loadSavedSiteTexts());
  const [seo, setSeo] = useState<SEOConfig>(() => loadSavedSEO());
  const [developerEngine, setDeveloperEngine] = useState<DeveloperEngineConfig>(() => loadCachedDeveloperEngine());
  const [activeLegalRoute, setActiveLegalRoute] = useState<LegalDocType | null>(() =>
    resolveLegalRouteFromLocation()
  );
  const [donationsModalOpen, setDonationsModalOpen] = useState(false);
  const [detectedArch, setDetectedArch] = useState<'64' | '32'>(() => detectArchitecture());
  const [pcGuideModalOpen, setPcGuideModalOpen] = useState(false);
  const [iosGuideModalOpen, setIosGuideModalOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [policiesModalOpen, setPoliciesModalOpen] = useState(false);
  const [policiesTab, setPoliciesTab] = useState<PolicyTab>('privacy');
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadPlatform, setDownloadPlatform] = useState<'mobile' | 'pc'>('mobile');
  const [downloadToast, setDownloadToast] = useState<{
    open: boolean;
    platform: 'mobile' | 'pc';
    name: string;
  } | null>(null);

  const navigateToLegalRoute = useCallback((docType: LegalDocType | null) => {
    setActiveLegalRoute(docType);
    if (typeof window !== 'undefined') {
      const targetUrl =
        docType === 'privacy'
          ? '/privacy-policy'
          : docType === 'terms'
          ? '/terms-of-service'
          : '/';
      if (window.location.pathname !== targetUrl) {
        window.history.pushState({}, '', targetUrl);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenPolicies = useCallback((tab: PolicyTab = 'privacy') => {
    if (tab === 'privacy' || tab === 'terms') {
      navigateToLegalRoute(tab);
      return;
    }
    setPoliciesTab(tab);
    setPoliciesModalOpen(true);
  }, [navigateToLegalRoute]);

  // Dynamic synchronized version across all supported languages
  const effectiveVersionString = developerEngine?.appUpdate?.enabled && developerEngine.appUpdate.latestVersion
    ? `v${developerEngine.appUpdate.latestVersion.replace(/^v/i, '')} ${
        developerEngine.appUpdate.channel === 'beta'
          ? 'Beta'
          : developerEngine.appUpdate.channel === 'urgent'
          ? 'Urgent'
          : 'Stable'
      }`
    : siteTexts?.heroBadge;
  const currentVersionBadge = formatLocalizedVersionBadge(effectiveVersionString, lang);

  // Real-time synchronization with Persistent Server & Cloud Database
  useEffect(() => {
    // Initial dynamic SEO application
    applyDynamicSEO(seo);

    // 1. Fetch persistent server-side configuration (available to 100% of visitors & devices)
    fetchServerConfig().then((serverCfg) => {
      if (serverCfg) {
        if (serverCfg.links && (serverCfg.links.android || serverCfg.links.pc || serverCfg.links.pc32 || serverCfg.links.mac)) {
          setLinks((prev) => ({ ...prev, ...serverCfg.links }));
          saveLinksToStorage(serverCfg.links);
        }
        if (serverCfg.siteTexts) {
          setSiteTexts((prev) => ({ ...prev, ...serverCfg.siteTexts }));
          saveSiteTextsToStorage(serverCfg.siteTexts);
        }
        if (serverCfg.adsense) {
          setAdSense((prev) => ({ ...prev, ...serverCfg.adsense }));
          saveAdSenseToStorage(serverCfg.adsense);
        }
        if (serverCfg.seo) {
          setSeo((prev) => ({ ...prev, ...serverCfg.seo }));
          applyDynamicSEO(serverCfg.seo);
          saveSEOToStorage(serverCfg.seo);
        }
        if (serverCfg.analytics) {
          setAnalytics((prev) => ({
            ...prev,
            totalVisits: Math.max(prev.totalVisits, serverCfg.analytics?.totalVisits || 0),
            downloadsCount: Math.max(prev.downloadsCount, serverCfg.analytics?.totalDownloads || 0),
            mobileDownloads: Math.max(prev.mobileDownloads, serverCfg.analytics?.mobileDownloads || 0),
            pcDownloads: Math.max(prev.pcDownloads, serverCfg.analytics?.pcDownloads || 0),
          }));
        }
      }
    });

    trackServerVisit();

    // 2. Fetch live GitHub Release directly from repository (works 100% reliably on all devices & static GitHub Pages)
    fetchLatestGitHubRelease().then((ghRelease) => {
      if (ghRelease && ghRelease.links) {
        const validLinks: Partial<DownloadLinks> = {};
        if (ghRelease.links.android) validLinks.android = ghRelease.links.android;
        if (ghRelease.links.pc) validLinks.pc = ghRelease.links.pc;
        if (ghRelease.links.pc32) validLinks.pc32 = ghRelease.links.pc32;
        if (ghRelease.links.mac) validLinks.mac = ghRelease.links.mac;

        if (Object.keys(validLinks).length > 0) {
          setLinks((prev) => {
            const merged = { ...prev, ...validLinks };
            saveLinksToStorage(merged);
            return merged;
          });
        }

        if (ghRelease.version) {
          setSiteTexts((prev) => {
            const currentBadge = prev?.heroBadge || '';
            // Update badge if not customized or matching previous version
            if (!currentBadge || currentBadge.includes('v1.0') || currentBadge.includes('v1.1')) {
              const updated = {
                ...(prev || DEFAULT_SITE_TEXTS),
                heroBadge: `${ghRelease.version} Stable`,
              };
              saveSiteTextsToStorage(updated);
              return updated;
            }
            return prev;
          });
        }
      }
    });

    // 3. Real-time subscription to Unified OmniChurch Cloud Firestore Developer Engine (app_config/developer_engine)
    const unsubDeveloperEngine = subscribeToDeveloperEngine((engineConfig) => {
      setDeveloperEngine(engineConfig);

      const release = engineConfig.appUpdate;
      if (release) {
        const syncedLinks: Partial<DownloadLinks> = {};
        if (release.androidDownloadUrl?.trim()) syncedLinks.android = release.androidDownloadUrl.trim();
        if (release.pcDownloadUrl?.trim()) syncedLinks.pc = release.pcDownloadUrl.trim();
        if (release.pc32DownloadUrl?.trim()) syncedLinks.pc32 = release.pc32DownloadUrl.trim();
        if (release.macDownloadUrl?.trim()) syncedLinks.mac = release.macDownloadUrl.trim();

        if (Object.keys(syncedLinks).length > 0) {
          setLinks((prev) => {
            const merged = { ...prev, ...syncedLinks };
            saveLinksToStorage(merged);
            return merged;
          });
        }

        if (release.latestVersion?.trim()) {
          const cleanVer = `v${release.latestVersion.trim().replace(/^v/i, '')}`;
          const channelTag =
            release.channel === 'beta'
              ? 'Beta'
              : release.channel === 'urgent'
              ? 'Urgent'
              : 'Stable';
          setSiteTexts((prev) => {
            const updated = {
              ...(prev || DEFAULT_SITE_TEXTS),
              heroBadge: `${cleanVer} ${channelTag}`,
            };
            saveSiteTextsToStorage(updated);
            return updated;
          });
        }
      }
    });

    const unsubDownloads = subscribeToCloudDownloads((cloudLinks) => {
      if (cloudLinks && (cloudLinks.android || cloudLinks.pc || cloudLinks.pc32 || cloudLinks.mac)) {
        setLinks(cloudLinks);
      }
    });

    const unsubTexts = subscribeToCloudSiteTexts((cloudTexts) => {
      setSiteTexts(cloudTexts);
    });

    const unsubAdSense = subscribeToCloudAdSense((cloudAdSense) => {
      setAdSense(cloudAdSense);
    });

    const unsubSEO = subscribeToCloudSEO((cloudSeo) => {
      setSeo(cloudSeo);
      applyDynamicSEO(cloudSeo);
    });

    const unsubAnalytics = subscribeToCloudAnalytics((cloudMetrics) => {
      setAnalytics((prev) => ({
        ...prev,
        totalVisits: Math.max(prev.totalVisits, cloudMetrics.totalVisits || 0),
        downloadsCount: Math.max(prev.downloadsCount, cloudMetrics.totalDownloads || 0),
        mobileDownloads: Math.max(prev.mobileDownloads, cloudMetrics.mobileDownloads || 0),
        pcDownloads: Math.max(prev.pcDownloads, cloudMetrics.pcDownloads || 0),
      }));
    });

    // Record visit in cloud database
    trackCloudVisit();

    return () => {
      unsubDeveloperEngine();
      unsubDownloads();
      unsubTexts();
      unsubAdSense();
      unsubSEO();
      unsubAnalytics();
    };
  }, []);

  // Handle GitHub Pages 404 SPA fallback (?p=...) and clean enterprise legal routes (/privacy-policy, /terms-of-service)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const redirectedPath = params.get('p');
    if (redirectedPath && redirectedPath.startsWith('/')) {
      window.history.replaceState({}, '', redirectedPath);
    }

    const syncLocationState = () => {
      const legalRoute = resolveLegalRouteFromLocation();
      setActiveLegalRoute(legalRoute);

      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (hash === '#sitemap' || path.includes('sitemap')) {
        setSitemapModalOpen(true);
      } else if (hash === '#cookies' || search.includes('sec=cookies')) {
        setPoliciesTab('cookies');
        setPoliciesModalOpen(true);
      } else if (hash === '#security' || hash === '#transparency' || search.includes('sec=transparency')) {
        setPoliciesTab('security');
        setPoliciesModalOpen(true);
      }
    };

    syncLocationState();
    window.addEventListener('popstate', syncLocationState);
    window.addEventListener('hashchange', syncLocationState);
    return () => {
      window.removeEventListener('popstate', syncLocationState);
      window.removeEventListener('hashchange', syncLocationState);
    };
  }, []);

  // Verify and update detected architecture on mount via navigator.platform or navigator.userAgent
  useEffect(() => {
    const arch = detectArchitecture();
    setDetectedArch(arch);
  }, []);

  // Dynamically load Google AdSense script if client ID is specified
  useEffect(() => {
    if (adsense.enabled && adsense.publisherId && adsense.publisherId.trim().length > 5) {
      const rawId = adsense.publisherId.trim();
      const normalizedId = rawId.startsWith('ca-pub-')
        ? rawId
        : rawId.startsWith('pub-')
          ? `ca-${rawId}`
          : `ca-pub-${rawId}`;

      const scriptId = 'google-adsense-script';
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${normalizedId}`;
        document.head.appendChild(script);
      } else if (existingScript.src && !existingScript.src.includes(normalizedId)) {
        existingScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${normalizedId}`;
      }
    }
  }, [adsense.enabled, adsense.publisherId]);

  // Secret dev panel triggers:
  // 1. Secret hotkey: Ctrl + Shift + D (or Cmd + Shift + D)
  // 2. Secret URL hash: #dev or #admin
  // 3. Continuous 10-second hold on the Live green indicator pill
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setDevModalOpen((prev) => !prev);
      }
    };

    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#dev' || hash === '#admin') {
        setDevModalOpen(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track real page visit on mount
  useEffect(() => {
    const updatedReal = recordRealVisit();
    setAnalytics(toAnalyticsState(updatedReal));
  }, []);

  // Save updated links to Server, Cloud & local storage
  const handleSaveLinks = async (updated: DownloadLinks) => {
    setLinks(updated);
    saveLinksToStorage(updated);
    await saveServerLinks(updated);
    await saveCloudDownloads(updated);

    const updatedReal = recordSettingsEvent('Mizajou lyen telechajman pèmanan sou Sèvè & Nwaj');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated Google AdSense configuration to Server, Cloud & local storage
  const handleSaveAdSense = async (updated: AdSenseConfig) => {
    setAdSense(updated);
    saveAdSenseToStorage(updated);
    await saveServerAdSense(updated);
    await saveCloudAdSense(updated);

    const label = updated.enabled
      ? `AdSense Aktive nan Nwaj (${updated.publisherId || 'Mòd Apèsi'})`
      : 'AdSense dezaktive nan Nwaj';
    const updatedReal = recordSettingsEvent(label);
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated dynamic site texts to Server, Cloud & local storage
  const handleSaveSiteTexts = async (updated: SiteTextsConfig) => {
    setSiteTexts(updated);
    saveSiteTextsToStorage(updated);
    await saveServerTexts(updated);
    await saveCloudSiteTexts(updated);

    const updatedReal = recordSettingsEvent('Mizajou deskripsyon & tèks sit la nan Nwaj');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated SEO configuration to Server, Cloud & local storage & update live DOM
  const handleSaveSEO = async (updated: SEOConfig) => {
    setSeo(updated);
    saveSEOToStorage(updated);
    applyDynamicSEO(updated);
    await saveServerSEO(updated);
    await saveCloudSEO(updated);

    const updatedReal = recordSettingsEvent('Mizajou paramèt SEO & Sitemap nan Nwaj');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Track real downloads & show instant confirmation toast notification
  const handleTrackDownload = useCallback((platform: 'mobile' | 'pc', name: string) => {
    const updatedReal = recordRealDownload(platform, name);
    setAnalytics(toAnalyticsState(updatedReal));
    trackCloudDownload(platform);
    trackServerDownload(platform);
    setDownloadToast({ open: true, platform, name });
  }, []);

  // Clear analytics to start fresh at true zero
  const handleClearAnalytics = useCallback(() => {
    const cleared = clearRealAnalytics();
    setAnalytics(toAnalyticsState(cleared));
  }, []);

  // Test/Simulate analytics event from dev dashboard
  const handleSimulateEvent = (type: 'visit' | 'download_mobile' | 'download_pc') => {
    let label = 'Nouvo vizitè konekte sou sit la';
    let platformName: 'Android' | 'Windows' | 'Web' = 'Web';

    if (type === 'visit') {
      label = 'Nouvo vizitè konekte sou sit la';
      platformName = 'Web';
    } else if (type === 'download_mobile') {
      label = 'Telechajman OmniChurch APK (Android)';
      platformName = 'Android';
    } else if (type === 'download_pc') {
      label = 'Telechajman OmniChurch PC Installer (.exe)';
      platformName = 'Windows';
    }

    const updated = recordCustomEvent(type, label, platformName);
    setAnalytics(toAnalyticsState(updated));
  };

  const handleOpenDownloadModal = (platform: 'mobile' | 'pc' = 'mobile') => {
    setDownloadPlatform(platform);
    setDownloadModalOpen(true);
  };

  const maintenanceBanner = developerEngine?.maintenanceMode ? (
    <div className="relative z-50 bg-gradient-to-r from-amber-950 via-orange-950 to-amber-950 border-b border-amber-500/40 px-4 py-3 text-center">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-amber-100">
        <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>
            {lang === 'ht'
              ? 'Mòd Antretyen Aktif'
              : lang === 'fr'
              ? 'Maintenance en Cours'
              : lang === 'es'
              ? 'Mantenimiento Activo'
              : 'Maintenance Mode'}
          </span>
        </span>
        <span className="text-amber-100/90">
          {developerEngine.maintenanceMessage ||
            'Nou ap fè yon ti amelyorasyon nan sèvè a. Sèvis la ap retabli talè.'}
        </span>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-[#020711] text-[#f6fbff] relative selection:bg-[#087cff] selection:text-white">
      {maintenanceBanner}

      {activeLegalRoute ? (
        <LegalDocumentPage
          docType={activeLegalRoute}
          legalConfig={developerEngine.legalConfig}
          onNavigateHome={() => navigateToLegalRoute(null)}
          onNavigateDoc={(docType) => navigateToLegalRoute(docType)}
        />
      ) : (
        <>
          {/* Sleek Interface Ambient Glows */}
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>

          {/* Sweeping Lighthouse Light Animation ("Fa ale vini") */}
          <LighthouseBeam />

          {/* Main Navbar */}
          <Navbar
            onOpenDev={() => setDevModalOpen(true)}
            onOpenDownload={handleOpenDownloadModal}
            liveUsers={analytics.liveUsers}
            versionBadge={currentVersionBadge}
            onOpenPolicies={handleOpenPolicies}
            onNavigateLegalRoute={navigateToLegalRoute}
            donationsEnabled={developerEngine.donations.enabled}
            onOpenDonations={() => setDonationsModalOpen(true)}
          />

          {/* Main Content Sections */}
          <main>
            {/* Top AdSense Banner (Header Placement) */}
            {adsense.enabled && (
              <AdSenseBanner
                config={adsense}
                slot={adsense.headerSlot}
                positionLabel="Top Banner (Header)"
                className="pt-2"
              />
            )}

            {/* Hero Section with Ultra-Pro Mobile & PC buttons and 3D preview */}
            <HeroSection
              links={links}
              siteTexts={siteTexts}
              onOpenDownload={handleOpenDownloadModal}
              onOpenDev={() => setDevModalOpen(true)}
              onTrackDownload={handleTrackDownload}
            />

            {/* 4 Core Features of OmniChurch */}
            <FeaturesSection siteTexts={siteTexts} />

            {/* How to Install Guide (3 Steps) */}
            <InstallGuideSection
              links={links}
              onOpenDownload={handleOpenDownloadModal}
            />

            {/* Dedicated Offline-First & Data Protection Architecture */}
            <TechSecuritySection />

            {/* Testimonials: Sa lidè legliz yo di */}
            <TestimonialsSection />

            {/* Mid-Content AdSense Banner */}
            {adsense.enabled && (
              <AdSenseBanner
                config={adsense}
                slot={adsense.inContentSlot}
                positionLabel="Mid-Content Banner"
              />
            )}

            {/* Centralized Download Hub with dynamic OS architecture and Smart PC Guide */}
            <DownloadSection
              links={links}
              siteTexts={siteTexts}
              appUpdate={developerEngine.appUpdate}
              detectedArch={detectedArch}
              onOpenPcGuide={() => setPcGuideModalOpen(true)}
              onOpenIosGuide={() => setIosGuideModalOpen(true)}
              onTrackDownload={handleTrackDownload}
            />

            {/* Footer AdSense Banner */}
            {adsense.enabled && (
              <AdSenseBanner
                config={adsense}
                slot={adsense.footerSlot}
                positionLabel="Footer Banner"
              />
            )}
          </main>

          {/* Contact & Footer with Sponsors, Donations trigger, and Clean Legal Routes */}
          <ContactSection
            siteTexts={siteTexts}
            developerEngine={developerEngine}
            onOpenPolicies={handleOpenPolicies}
            onNavigateLegalRoute={navigateToLegalRoute}
            onOpenDonations={() => setDonationsModalOpen(true)}
          />
        </>
      )}

      {/* Developer Dashboard Modal (Unified Cloud Engine + Legacy Controls) */}
      <DevDashboardModal
        isOpen={devModalOpen}
        onClose={() => setDevModalOpen(false)}
        links={links}
        onSaveLinks={handleSaveLinks}
        analytics={analytics}
        onSimulateEvent={handleSimulateEvent}
        onClearAnalytics={handleClearAnalytics}
        adsense={adsense}
        onSaveAdSense={handleSaveAdSense}
        siteTexts={siteTexts}
        onSaveSiteTexts={handleSaveSiteTexts}
        seo={seo}
        onSaveSEO={handleSaveSEO}
        developerEngine={developerEngine}
        onDeveloperEngineChange={setDeveloperEngine}
        onNavigateLegalRoute={navigateToLegalRoute}
      />

      {/* Multilingual Donations Modal */}
      <DonationsModal
        isOpen={donationsModalOpen}
        onClose={() => setDonationsModalOpen(false)}
        donations={developerEngine.donations}
      />

      {/* Fast Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        platform={downloadPlatform}
        links={links}
        onTrackDownload={handleTrackDownload}
        versionBadge={currentVersionBadge}
      />

      {/* Smart PC Installation Guide Modal */}
      <PcInstallGuideModal
        isOpen={pcGuideModalOpen}
        onClose={() => setPcGuideModalOpen(false)}
        detectedArch={detectedArch}
        links={links}
        onDownload={handleTrackDownload}
      />

      {/* Ultra Pro iOS PWA Installation Guide Modal with simulated screenshots */}
      <IosInstallGuideModal
        isOpen={iosGuideModalOpen}
        onClose={() => setIosGuideModalOpen(false)}
      />

      {/* Dynamic SEO & Sitemap Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
      />

      {/* Official Site Policies & Google AdSense Transparency Modal */}
      <PoliciesModal
        isOpen={policiesModalOpen}
        onClose={() => setPoliciesModalOpen(false)}
        initialTab={policiesTab}
        legalConfig={developerEngine.legalConfig}
        onNavigateLegalPage={(docType) => {
          setPoliciesModalOpen(false);
          navigateToLegalRoute(docType);
        }}
      />

      {/* Google & Cookie Transparency Consent Banner */}
      <CookieConsentBanner
        onOpenPolicies={handleOpenPolicies}
      />

      {/* Real-time Download Confirmation Toast */}
      {downloadToast && (
        <DownloadToast
          isOpen={downloadToast.open}
          onClose={() => setDownloadToast(null)}
          platform={downloadToast.platform}
          fileName={downloadToast.name}
        />
      )}

      {/* Floating Scroll to Top Navigation Button */}
      {!activeLegalRoute && <ScrollToTopButton />}
    </div>
  );
}
