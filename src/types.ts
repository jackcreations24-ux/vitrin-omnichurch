export interface DownloadLinks {
  android: string;
  ios: string;
  pc: string;
  pc32?: string;
  mac?: string;
  web?: string;
}

export interface ActivityEvent {
  id: string;
  time: string;
  type: 'visit' | 'download_mobile' | 'download_pc' | 'settings_update';
  label: string;
  platform?: 'Android' | 'iOS' | 'Windows' | 'Web';
  location?: string;
}

export interface TrafficPoint {
  hour: string;
  visits: number;
  downloads: number;
}

export interface AnalyticsState {
  totalVisits: number;
  uniqueVisitors?: number;
  liveUsers: number;
  downloadsCount: number;
  mobileDownloads: number;
  pcDownloads: number;
  macDownloads?: number;
  lastSeen: string;
  trafficHistory: TrafficPoint[];
  events: ActivityEvent[];
  devices?: {
    windows: number;
    android: number;
    ios: number;
    mac: number;
    linux: number;
    other: number;
  };
  referrers?: Record<string, number>;
  isRealMode?: boolean;
}

export interface ChurchStats {
  members: number;
  eventsCount: number;
  announcementsCount: number;
  groupsCount: number;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string; // e.g. ca-pub-1234567890123456
  autoAds: boolean;
  headerSlot: string;
  inContentSlot: string;
  footerSlot: string;
  showPreviewBadges: boolean;
  customAdsTxt?: string;
}

export interface SiteTextsConfig {
  // Hero / Header
  heroEyebrow: string;
  heroEyebrowSub: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroDescription: string;

  // Features
  featuresEyebrow: string;
  featuresTitle: string;
  featuresDescription: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;

  // Downloads
  downloadTitle: string;
  downloadSubtitle: string;

  // Footer & About
  footerAbout: string;

  // Multi-language custom overrides for each language (ht, fr, en, es)
  translations?: Partial<Record<'ht' | 'fr' | 'en' | 'es', Partial<Omit<SiteTextsConfig, 'translations'>>>>;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  author: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  // Technology & Structured Data Specs
  appName: string;
  appVersion: string;
  category: string;
  operatingSystems: string;
  encryptionStandard: string;
  offlineSupport: string;
  price: string;
}

export type EngineLang = 'ht' | 'fr' | 'en' | 'es';

export interface LocalizedLegalDocument {
  title?: string;
  lastUpdatedDate?: string;
  content?: string;
}

export interface DeveloperEngineLegalConfig {
  officialPrivacyUrl: string;
  officialTermsUrl: string;
  useExternalLinksOnClick: boolean;
  customPrivacy: Partial<Record<EngineLang, LocalizedLegalDocument>>;
  customTerms: Partial<Record<EngineLang, LocalizedLegalDocument>>;
  lastLegalUpdatedAt: string;
}

export interface DeveloperEngineAppUpdate {
  enabled: boolean;
  latestVersion: string;
  currentVersion: string;
  minRequiredVersion: string;
  downloadUrl: string;
  androidDownloadUrl?: string;
  pcDownloadUrl?: string;
  pc32DownloadUrl?: string;
  macDownloadUrl?: string;
  channel: 'stable' | 'beta' | 'urgent';
  isMandatory: boolean;
  releaseDate: string;
  targetPlatform: 'all' | 'android' | 'web';
  highlights: Record<EngineLang, string[]>;
  importantNotice: Record<EngineLang, string>;
}

export interface DonationLocalizedCopy {
  screenTitle: string;
  screenSubtitle: string;
  developerRole: string;
  developerBio: string;
  customNote: string;
}

export interface DeveloperEngineDonations {
  enabled: boolean;
  enableShakeAnimation: boolean;
  shakeIntervalSeconds: number;
  developerName: string;
  developerEmail: string;
  developerPhone: string;
  localizedCopy: Record<EngineLang, DonationLocalizedCopy>;
  paypalEnabled: boolean;
  paypalEmail: string;
  paypalMeUrl: string;
  binanceEnabled: boolean;
  binancePayId: string;
  binanceUsdtAddress: string;
  binanceNetwork: string;
  wiseEnabled: boolean;
  wiseEmail: string;
  wiseTag: string;
  wiseIban: string;
  moncashEnabled: boolean;
  moncashNumber: string;
  moncashName: string;
  zelleEnabled: boolean;
  zelleInfo: string;
}

export interface DeveloperEngineSponsor {
  id?: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  tagline?: string;
  tier?: string;
  active?: boolean;
}

export interface DeveloperEngineConfig {
  legalConfig: DeveloperEngineLegalConfig;
  appUpdate: DeveloperEngineAppUpdate;
  appUpdates?: DeveloperEngineAppUpdate;
  donations: DeveloperEngineDonations;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  sponsors: DeveloperEngineSponsor[];
  showSponsorsInFooter: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CloudSyncVerificationResult {
  verified: boolean;
  syncedAt: string;
  latencyMs: number;
  databaseId: string;
  documentPath: string;
  serverVersion: string;
  legalUpdatedAt: string;
  donationsEnabled: boolean;
  maintenanceMode: boolean;
  sponsorsCount: number;
}

