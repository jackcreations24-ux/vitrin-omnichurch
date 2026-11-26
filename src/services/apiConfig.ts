import { DownloadLinks, SiteTextsConfig, AdSenseConfig, SEOConfig } from '../types';

export interface ServerConfigResponse {
  links?: DownloadLinks;
  siteTexts?: SiteTextsConfig | null;
  adsense?: AdSenseConfig | null;
  seo?: SEOConfig | null;
  analytics?: {
    totalVisits: number;
    totalDownloads: number;
    mobileDownloads: number;
    pcDownloads: number;
  };
  updatedAt?: string;
}

/**
 * Fetch the master persistent configuration from the server.
 * This guarantees that every visitor on any browser/device gets
 * the exact real links published by the developer.
 */
export async function fetchServerConfig(): Promise<ServerConfigResponse | null> {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn('Notice: Server config fetch fallback:', err);
    return null;
  }
}

/**
 * Save updated download links permanently on the server.
 */
export async function saveServerLinks(links: DownloadLinks): Promise<boolean> {
  try {
    const res = await fetch('/api/config/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(links),
    });
    return res.ok;
  } catch (err) {
    console.error('Erè sove lyen sou sèvè:', err);
    return false;
  }
}

/**
 * Save site texts permanently on the server.
 */
export async function saveServerTexts(texts: SiteTextsConfig): Promise<boolean> {
  try {
    const res = await fetch('/api/config/texts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(texts),
    });
    return res.ok;
  } catch (err) {
    console.error('Erè sove tèks sou sèvè:', err);
    return false;
  }
}

/**
 * Save AdSense settings permanently on the server.
 */
export async function saveServerAdSense(adsense: AdSenseConfig): Promise<boolean> {
  try {
    const res = await fetch('/api/config/adsense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adsense),
    });
    return res.ok;
  } catch (err) {
    console.error('Erè sove AdSense sou sèvè:', err);
    return false;
  }
}

/**
 * Save SEO settings permanently on the server.
 */
export async function saveServerSEO(seo: SEOConfig): Promise<boolean> {
  try {
    const res = await fetch('/api/config/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(seo),
    });
    return res.ok;
  } catch (err) {
    console.error('Erè sove SEO sou sèvè:', err);
    return false;
  }
}

/**
 * Track visit on server.
 */
export async function trackServerVisit(): Promise<void> {
  try {
    await fetch('/api/analytics/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // ignore
  }
}

/**
 * Track download on server.
 */
export async function trackServerDownload(platform: 'mobile' | 'pc'): Promise<void> {
  try {
    await fetch('/api/analytics/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform }),
    });
  } catch {
    // ignore
  }
}
