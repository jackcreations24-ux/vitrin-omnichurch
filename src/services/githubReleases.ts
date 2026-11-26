import { DownloadLinks } from '../types';

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

export interface GitHubReleaseInfo {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: GitHubReleaseAsset[];
}

export interface SyncedReleaseData {
  version: string;
  title: string;
  links: Partial<DownloadLinks>;
  assetsCount: number;
  publishedAt: string;
  htmlUrl: string;
}

export const OFFICIAL_GITHUB_REPO = 'jackcreations24-ux/vitrin-omnichurch';

/**
 * Fetch the latest GitHub release directly from GitHub API.
 * Works seamlessly across all devices, browsers, and platforms (including static GitHub Pages).
 */
export async function fetchLatestGitHubRelease(
  repo: string = OFFICIAL_GITHUB_REPO
): Promise<SyncedReleaseData | null> {
  try {
    const url = `https://api.github.com/repos/${repo}/releases/latest`;
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API notice (${res.status}): Pa ka jwenn dènye release pou ${repo}`);
      return null;
    }

    const data: GitHubReleaseInfo = await res.json();
    if (!data || !data.assets) {
      return null;
    }

    const extractedLinks: Partial<DownloadLinks> = {};

    for (const asset of data.assets) {
      const name = asset.name.toLowerCase();
      const dlUrl = asset.browser_download_url;

      // Android APK detection
      if (name.endsWith('.apk')) {
        extractedLinks.android = dlUrl;
      }
      // Windows 32-bit (ia32, x86, win32)
      else if (
        name.endsWith('.exe') &&
        (name.includes('ia32') || name.includes('x86') || name.includes('32'))
      ) {
        extractedLinks.pc32 = dlUrl;
      }
      // Windows 64-bit or default installer
      else if (
        name.endsWith('.exe') &&
        (name.includes('x64') || name.includes('64') || !extractedLinks.pc)
      ) {
        extractedLinks.pc = dlUrl;
      }
      // macOS dmg or zip
      else if (name.endsWith('.dmg') || (name.endsWith('.zip') && name.includes('mac'))) {
        extractedLinks.mac = dlUrl;
      }
    }

    // If 64-bit wasn't found but a general exe was found, assign to pc
    if (!extractedLinks.pc && extractedLinks.pc32) {
      extractedLinks.pc = extractedLinks.pc32;
    }

    const version = data.tag_name || 'v1.1.0';

    return {
      version,
      title: data.name || `OmniChurch ${version}`,
      links: extractedLinks,
      assetsCount: data.assets.length,
      publishedAt: data.published_at,
      htmlUrl: data.html_url || `https://github.com/${repo}/releases/latest`,
    };
  } catch (err) {
    console.warn('Erè koneksyon GitHub Releases API:', err);
    return null;
  }
}
