import { DownloadLinks, AnalyticsState, TrafficPoint, AdSenseConfig, SiteTextsConfig, SEOConfig } from '../types';
import { getRealAnalytics, toAnalyticsState, saveRealAnalytics, RealAnalyticsData } from '../utils/realAnalytics';

export const DEV_INFO = {
  name: 'Jackson Charles',
  email: 'jacksonofisyal@gmail.com',
  whatsapp: '+18296211349',
  whatsappLink: 'https://wa.me/18296211349',
  telegram: '@jacksoncharles',
  telegramLink: 'https://t.me/jacksoncharles',
  copyright: '© 2026 ZOUTIW RESERVED. · OmniChurch',
};

export const DEFAULT_SEO: SEOConfig = {
  metaTitle: 'OmniChurch - Aplikasyon Jesyon Legliz Pwofesyonèl | PC & Mobil',
  metaDescription:
    'OmniChurch se platfòm pwofesyonèl pou jesyon manm, kominikasyon SMS, dim ak ofrann, ak kalandriye kil. Teknoloji offline-first ki pwoteje done yo lokalman, 100% gratis pou Android, Windows ak Mac.',
  keywords:
    'omnichurch, aplikasyon legliz, church management software, jesyon legliz, telechaje app legliz, lojisyèl legliz gratis, christian church haiti, church directory app, offline church software, sekirite done legliz',
  canonicalUrl: 'https://omnichurch.download/',
  author: 'Jackson Charles (ZOUTIW)',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogTitle: 'OmniChurch - Platfòm & Aplikasyon Jesyon Legliz',
  ogDescription:
    'Solisyon dijital pwofesyonèl pou modènize jesyon ak kominikasyon legliz yo. Bati sou teknoloji SQLite lokal offline-first ki pwoteje done yo sou aparèy legliz la.',
  ogImage: 'https://omnichurch.download/favicon.svg',
  twitterCard: 'summary_large_image',
  // Technology & Structured Data Specs
  appName: 'OmniChurch',
  appVersion: '2.4.0 Pro',
  category: 'BusinessApplication, ChurchManagementApplication',
  operatingSystems: 'Android 7.0+, Windows 10/11 (64/32-bit), macOS 11+, Web',
  encryptionStandard: 'Pwoteksyon Done Lokal & Konfidansyalite',
  offlineSupport: '100% Offline-First (SQLite natif san depandans entènèt)',
  price: '0.00 USD (Gratis pou tout legliz)',
};

export const DEFAULT_SITE_TEXTS: SiteTextsConfig = {
  // Hero / Header
  heroEyebrow: 'BYENVENI SOU OMNICHURCH',
  heroEyebrowSub: 'Platfòm Dijital Ofisyèl',
  heroBadge: 'v1.0.0 Stable',
  heroTitlePrefix: 'Platfòm Dijital Ofisyèl pou',
  heroTitleHighlight: 'OmniChurch',
  heroSubtitle: 'Jesyon Legliz & Kat Manm Dijital',
  heroDescription:
    'Aplikasyon ofisyèl pou administrasyon legliz la: Kat Manm Vityèl ak kòd QR, eskanè prezans rapid, kominikasyon SMS an mas, ak jesyon offline 100% sekirize sou Android ak Windows PC.',

  // Features - 4 Core App Highlights
  featuresEyebrow: 'Fonksyonalite Kle OmniChurch',
  featuresTitle: 'Poto Mitan Aplikasyon An pou Tout Kominote a',
  featuresDescription:
    'Solisyon dijital konplè pou pastè, administratè ak manm legliz yo: jesyon efikas, rapid, ak disponiblite offline san entènèt.',
  feature1Title: 'Kat Manm Dijital & Kòd QR',
  feature1Desc:
    'Chak fidèl jwenn yon kat manm vityèl sekirize ak kòd QR inik pou idantifikasyon rapid, patisipasyon nan koral, ak aktivite legliz la.',
  feature2Title: 'Siveyans Prezans Rapid',
  feature2Desc:
    'Eskane kòd QR manm yo nan papòt legliz la pou anrejistre prezans nan chak kil, reyinyon lapriyè, oswa konferans espesyal.',
  feature3Title: 'Anons & Notifikasyon an Dirèk',
  feature3Desc:
    'Voye anons ofisyèl, SMS an mas, ak piblikasyon dirèkteman bay tout manm yo oswa nan depatman espesifik an tan reyèl.',
  feature4Title: '100% Offline & Sekirize',
  feature4Desc:
    'Aplikasyon an fonksyone nèt san entènèt ak bazdone lokal SQLite ki pwoteje tout enfòmasyon legliz la sou aparèy la.',

  // Downloads
  downloadTitle: 'Telechaje OmniChurch Kounye a',
  downloadSubtitle:
    'Chwazi platfòm ou a epi kòmanse transfòme jesyon legliz ou a jodi a menm sou Android, Windows ak Mac.',

  // Footer & About
  footerAbout:
    'Solisyon dijital pwofesyonèl pou modènize jesyon ak kominikasyon legliz yo. Bati pou sèvi tout kominote kretyen.',
};

export const DEFAULT_ADSENSE: AdSenseConfig = {
  enabled: false,
  publisherId: '',
  autoAds: true,
  headerSlot: '',
  inContentSlot: '',
  footerSlot: '',
  showPreviewBadges: true,
  customAdsTxt: 'google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0',
};

export const DEFAULT_LINKS: DownloadLinks = {
  android: 'https://github.com/jacksoncharles/omnichurch/releases/download/v2.4.0/OmniChurch-v2.4.apk',
  ios: 'https://apps.apple.com/app/omnichurch/id1689234567',
  pc: 'https://github.com/jacksoncharles/omnichurch/releases/download/v2.4.0/OmniChurch-Setup-x64.exe',
  pc32: 'https://github.com/jacksoncharles/omnichurch/releases/download/v2.4.0/OmniChurch-Setup-x86.exe',
  mac: 'https://github.com/jacksoncharles/omnichurch/releases/download/v2.4.0/OmniChurch-Mac-Universal.dmg',
  web: 'https://app.omnichurch.org',
};

export const INITIAL_HOURLY_TRAFFIC: TrafficPoint[] = [
  { hour: '00h', visits: 18, downloads: 4 },
  { hour: '02h', visits: 11, downloads: 2 },
  { hour: '04h', visits: 7, downloads: 1 },
  { hour: '06h', visits: 24, downloads: 6 },
  { hour: '08h', visits: 68, downloads: 19 },
  { hour: '10h', visits: 142, downloads: 44 },
  { hour: '12h', visits: 185, downloads: 58 },
  { hour: '14h', visits: 210, downloads: 67 },
  { hour: '16h', visits: 194, downloads: 53 },
  { hour: '18h', visits: 248, downloads: 82 },
  { hour: '20h', visits: 275, downloads: 96 },
  { hour: '22h', visits: 160, downloads: 38 },
];

export const STORAGE_KEYS = {
  LINKS: 'oc_download_links_v2',
  ANALYTICS: 'oc_analytics_state_v2',
  ADSENSE: 'oc_adsense_config_v2',
  SITE_TEXTS: 'oc_site_texts_v2',
  SEO: 'oc_seo_config_v2',
  DEV_UNLOCKED: 'oc_dev_unlocked',
};

export function loadSavedSEO(): SEOConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEO);
    if (raw) {
      return { ...DEFAULT_SEO, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SEO;
}

export function saveSEOToStorage(config: SEOConfig) {
  try {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving SEO config:', e);
  }
}

export function loadSavedSiteTexts(): SiteTextsConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SITE_TEXTS);
    if (raw) {
      return { ...DEFAULT_SITE_TEXTS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SITE_TEXTS;
}

export function saveSiteTextsToStorage(texts: SiteTextsConfig) {
  try {
    localStorage.setItem(STORAGE_KEYS.SITE_TEXTS, JSON.stringify(texts));
  } catch (e) {
    console.error('Error saving site texts:', e);
  }
}

export function loadSavedAdSense(): AdSenseConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADSENSE);
    if (raw) {
      return { ...DEFAULT_ADSENSE, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_ADSENSE;
}

export function saveAdSenseToStorage(config: AdSenseConfig) {
  try {
    localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving AdSense config:', e);
  }
}

export function loadSavedLinks(): DownloadLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LINKS);
    if (raw) {
      return { ...DEFAULT_LINKS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_LINKS;
}

export function saveLinksToStorage(links: DownloadLinks) {
  try {
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  } catch (e) {
    console.error('Error saving links:', e);
  }
}

export function loadAnalytics(): AnalyticsState {
  const real = getRealAnalytics();
  return toAnalyticsState(real);
}

export function persistAnalytics(state: AnalyticsState) {
  try {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(state));
  } catch (e) {
    console.error('Error persisting analytics:', e);
  }
}
