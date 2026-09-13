/**
 * Utility pou jenere fichye sitemap.xml dinamik pou OmniChurch
 * Ede Google, Bing, ak tout lòt motè rechèch endekse sit la san okenn erè.
 * 
 * NÒT ENPÒTAN POU GOOGLE SEARCH CONSOLE:
 * 1. Tout lyen yo 100% konfòm ak estanda sitemaps.org (pa gen okenn '#' fragment paske Google refize '#').
 * 2. Nan Google Search Console, nan bwat "Add a new sitemap", tape sèlman: 'sitemap.xml'.
 */

export interface SitemapUrlEntry {
  path: string;
  label: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const SITEMAP_ENTRIES: SitemapUrlEntry[] = [
  {
    path: '',
    label: 'Paj Prensipal OmniChurch (Vitrin & Pwofil)',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    path: '?sec=telechaje',
    label: 'Sant Telechajman Android, Windows PC, ak Mac',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '?sec=features',
    label: 'Karakteristik & Modil Jesyon Legliz',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '?sec=sekirite',
    label: 'Estrikti Teknoloji & Sekirite Done',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '?sec=demo',
    label: 'Demonstrasyon Entèaktif Legliz',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '?sec=contact',
    label: 'Kontak & Sipò Teknik Devlopè ZOUTIW',
    changefreq: 'monthly',
    priority: 0.7,
  },
];

/**
 * Jenere kòd XML sitemap la dinamikman ak domèn kouran ak dat jodi a.
 */
export function generateDynamicSitemap(customBaseUrl?: string): string {
  let baseUrl = customBaseUrl?.trim();
  if (!baseUrl) {
    if (typeof window !== 'undefined' && window.location.origin) {
      baseUrl = window.location.origin;
    } else {
      baseUrl = 'https://omnichurch.download';
    }
  }

  // Netwaye slash nan fen si genyen
  baseUrl = baseUrl.replace(/\/+$/, '');

  // Dat jodi a nan fòma ISO YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const urlsXml = SITEMAP_ENTRIES.map((entry) => {
    const loc = entry.path ? `${baseUrl}/${entry.path}` : `${baseUrl}/`;
    return `  <!-- ${entry.label} -->
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXml}
</urlset>`;
}

/**
 * Telechaje dirèkteman fichye sitemap.xml la sou òdinatè devlopè a
 */
export function downloadSitemapXmlFile(customBaseUrl?: string): void {
  const xmlContent = generateDynamicSitemap(customBaseUrl);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'sitemap.xml');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
