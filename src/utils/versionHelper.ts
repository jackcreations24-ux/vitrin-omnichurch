import { SupportedLang } from '../i18n/translations';

/**
 * Extracts a clean version string like "v1.0.4", "v2.4.0", "1.0.0" from any input string.
 */
export function extractVersionNumber(raw?: string): string {
  if (!raw || !raw.trim()) return 'v1.0.0';
  const match = raw.match(/v?\d+(\.\d+)+(-\w+)?/i);
  if (!match) return raw.trim();
  const v = match[0];
  return v.startsWith('v') || v.startsWith('V') ? `v${v.slice(1)}` : `v${v}`;
}

/**
 * Formats a localized badge for the app across all supported languages (ht, fr, en, es).
 * When the developer changes the version in the Dev Dashboard (e.g. "v1.0.4", "v2.0", "v1.0.4 Stable", "v2.4.0 Pro"),
 * it automatically adapts to the active language while keeping the developer's exact version number!
 */
export function formatLocalizedVersionBadge(rawBadge: string | undefined, lang: SupportedLang): string {
  if (!rawBadge || !rawBadge.trim()) {
    switch (lang) {
      case 'ht':
        return 'v1.0.0 Etabli';
      case 'es':
        return 'v1.0.0 Estable';
      case 'fr':
      case 'en':
      default:
        return 'v1.0.0 Stable';
    }
  }

  const trimmed = rawBadge.trim();
  const versionMatch = trimmed.match(/v?\d+(\.\d+)+(-\w+)?/i);

  if (versionMatch) {
    const vStr = versionMatch[0].startsWith('v') || versionMatch[0].startsWith('V')
      ? `v${versionMatch[0].slice(1)}`
      : `v${versionMatch[0]}`;

    const lower = trimmed.toLowerCase();
    const hasStableWord =
      lower.includes('stab') ||
      lower.includes('etabli') ||
      lower.includes('stable') ||
      lower.includes('estable');

    // Remove version and standard stable words to see if there's a custom edition (e.g., "Pro", "Beta", "Gold")
    const remainder = trimmed
      .replace(versionMatch[0], '')
      .replace(/etabli|stable|estable|stab/gi, '')
      .trim();

    if (remainder) {
      // Custom developer label like "v2.4.0 Pro" or "v1.0.4 Beta"
      return `${vStr} ${remainder}`;
    }

    if (hasStableWord || trimmed === versionMatch[0]) {
      switch (lang) {
        case 'ht':
          return `${vStr} Etabli`;
        case 'es':
          return `${vStr} Estable`;
        case 'fr':
        case 'en':
        default:
          return `${vStr} Stable`;
      }
    }
  }

  // If completely custom text, return as-is
  return trimmed;
}

/**
 * Returns a short version badge (e.g., "v1.0.4")
 */
export function getShortVersion(rawBadge?: string): string {
  return extractVersionNumber(rawBadge);
}
