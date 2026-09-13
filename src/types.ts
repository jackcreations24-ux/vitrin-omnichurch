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
