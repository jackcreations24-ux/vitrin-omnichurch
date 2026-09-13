/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { LighthouseBeam } from './components/LighthouseBeam';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InstallGuideSection } from './components/InstallGuideSection';
import { TechSecuritySection } from './components/TechSecuritySection';
import { ChurchDemoPreview } from './components/ChurchDemoPreview';
import { DownloadSection } from './components/DownloadSection';
import { ContactSection } from './components/ContactSection';
import { DevDashboardModal } from './components/DevDashboardModal';
import { DownloadModal } from './components/DownloadModal';
import { PcInstallGuideModal } from './components/PcInstallGuideModal';
import { SitemapModal } from './components/SitemapModal';
import { AdSenseBanner } from './components/AdSenseBanner';
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
} from './data/defaultData';
import {
  subscribeToCloudDownloads,
  saveCloudDownloads,
  subscribeToCloudSiteTexts,
  saveCloudSiteTexts,
  subscribeToCloudAdSense,
  saveCloudAdSense,
  subscribeToCloudSEO,
  saveCloudSEO,
  subscribeToCloudAnalytics,
  trackCloudVisit,
  trackCloudDownload,
} from './lib/firebase';
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
import { DownloadLinks, AnalyticsState, ActivityEvent, AdSenseConfig, SiteTextsConfig, SEOConfig } from './types';

export default function App() {
  const [links, setLinks] = useState<DownloadLinks>(() => loadSavedLinks());
  const [analytics, setAnalytics] = useState<AnalyticsState>(() => toAnalyticsState(getRealAnalytics()));
  const [adsense, setAdSense] = useState<AdSenseConfig>(() => loadSavedAdSense());
  const [siteTexts, setSiteTexts] = useState<SiteTextsConfig>(() => loadSavedSiteTexts());
  const [seo, setSeo] = useState<SEOConfig>(() => loadSavedSEO());
  const [detectedArch, setDetectedArch] = useState<'64' | '32'>(() => detectArchitecture());
  const [pcGuideModalOpen, setPcGuideModalOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadPlatform, setDownloadPlatform] = useState<'mobile' | 'pc'>('mobile');

  // Real-time synchronization with Firebase Cloud Database (Zero code edit needed!)
  useEffect(() => {
    // Initial dynamic SEO application
    applyDynamicSEO(seo);

    const unsubDownloads = subscribeToCloudDownloads((cloudLinks) => {
      setLinks(cloudLinks);
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
      unsubDownloads();
      unsubTexts();
      unsubAdSense();
      unsubSEO();
      unsubAnalytics();
    };
  }, []);

  // Check URL hash or path for direct sitemap modal invocation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (hash === '#sitemap' || path.includes('sitemap')) {
        setSitemapModalOpen(true);
      }
    }
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

  // Track real page visit on mount
  useEffect(() => {
    const updatedReal = recordRealVisit();
    setAnalytics(toAnalyticsState(updatedReal));
  }, []);

  // Save updated links to Cloud & local storage
  const handleSaveLinks = async (updated: DownloadLinks) => {
    setLinks(updated);
    saveLinksToStorage(updated);
    await saveCloudDownloads(updated);

    const updatedReal = recordSettingsEvent('Mizajou lyen telechajman nan Nwaj Firebase');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated Google AdSense configuration to Cloud & local storage
  const handleSaveAdSense = async (updated: AdSenseConfig) => {
    setAdSense(updated);
    saveAdSenseToStorage(updated);
    await saveCloudAdSense(updated);

    const label = updated.enabled
      ? `AdSense Aktive nan Nwaj (${updated.publisherId || 'Mòd Apèsi'})`
      : 'AdSense dezaktive nan Nwaj';
    const updatedReal = recordSettingsEvent(label);
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated dynamic site texts to Cloud & local storage
  const handleSaveSiteTexts = async (updated: SiteTextsConfig) => {
    setSiteTexts(updated);
    saveSiteTextsToStorage(updated);
    await saveCloudSiteTexts(updated);

    const updatedReal = recordSettingsEvent('Mizajou deskripsyon & tèks sit la nan Nwaj');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Save updated SEO configuration to Cloud & local storage & update live DOM
  const handleSaveSEO = async (updated: SEOConfig) => {
    setSeo(updated);
    saveSEOToStorage(updated);
    applyDynamicSEO(updated);
    await saveCloudSEO(updated);

    const updatedReal = recordSettingsEvent('Mizajou paramèt SEO & Sitemap nan Nwaj');
    setAnalytics(toAnalyticsState(updatedReal));
  };

  // Track real downloads
  const handleTrackDownload = useCallback((platform: 'mobile' | 'pc', name: string) => {
    const updatedReal = recordRealDownload(platform, name);
    setAnalytics(toAnalyticsState(updatedReal));
    trackCloudDownload(platform);
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

  return (
    <div className="min-h-screen bg-[#020711] text-[#f6fbff] relative selection:bg-[#087cff] selection:text-white">
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

        {/* Mid-Content AdSense Banner */}
        {adsense.enabled && (
          <AdSenseBanner
            config={adsense}
            slot={adsense.inContentSlot}
            positionLabel="Mid-Content Banner"
          />
        )}

        {/* Interactive Live Church Demo */}
        <ChurchDemoPreview onOpenDownload={handleOpenDownloadModal} />

        {/* Centralized Download Hub with dynamic OS architecture and Smart PC Guide */}
        <DownloadSection
          links={links}
          siteTexts={siteTexts}
          detectedArch={detectedArch}
          onOpenPcGuide={() => setPcGuideModalOpen(true)}
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

      {/* Contact & Footer with Jackson Charles credentials and (c) ZOUTIW */}
      <ContactSection
        siteTexts={siteTexts}
        onOpenDev={() => setDevModalOpen(true)}
      />

      {/* Developer Dashboard Modal (Links management, Real-time analytics, Blogger XML Theme exporter, SEO & Sitemap) */}
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
      />

      {/* Fast Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        platform={downloadPlatform}
        links={links}
        onTrackDownload={handleTrackDownload}
      />

      {/* Smart PC Installation Guide Modal */}
      <PcInstallGuideModal
        isOpen={pcGuideModalOpen}
        onClose={() => setPcGuideModalOpen(false)}
        detectedArch={detectedArch}
        links={links}
        onDownload={handleTrackDownload}
      />

      {/* Dynamic SEO & Sitemap Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
      />
    </div>
  );
}
