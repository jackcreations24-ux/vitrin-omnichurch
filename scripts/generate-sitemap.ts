import fs from 'fs';
import path from 'path';

/**
 * Script otomatik pou jenere sitemap.xml ak robots.txt nan moman 'npm run build'.
 * Sa asire ke fichye sitemap la toujou gen dènye dat bati a (lastmod ISO)
 * ak tout paj/seksyon aplikasyon an byen konfigire pou Google ak motè rechèch yo.
 *
 * Enpòtan: Tout URL yo konfòm ak sitemaps.org (pa gen okenn '#' fragment paske Google refize '#').
 */

// Domèn defo a - pèsonalize pou https://omnichurch.download oswa Cloudflare Pages
const SITE_URL = (
  process.env.SITE_URL ||
  process.env.CF_PAGES_URL ||
  process.env.VITE_SITE_URL ||
  'https://omnichurch.download'
).replace(/\/+$/, '');

// Dat jodi a nan fòma ISO YYYY-MM-DD
const buildDate = new Date().toISOString().split('T')[0];

interface SitemapRoute {
  path: string;
  name: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const routes: SitemapRoute[] = [
  {
    path: '',
    name: 'Paj Prensipal OmniChurch (Vitrin & Pwofil)',
    changefreq: 'daily',
    priority: '1.0',
  },
  {
    path: '?sec=telechaje',
    name: 'Sant Telechajman PC & Mobil (Android, Windows, Mac)',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '?sec=features',
    name: 'Fonksyonalite & Karakteristik Jesyon Legliz',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '?sec=sekirite',
    name: 'Estrikti Teknoloji & Sekirite Done',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '?sec=demo',
    name: 'Demonstrasyon Entèaktif OmniChurch',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '?sec=contact',
    name: 'Kontak & Sipò Teknik Devlopè ZOUTIW',
    changefreq: 'monthly',
    priority: '0.7',
  },
];

const xmlUrls = routes
  .map((route) => {
    const fullLoc = route.path ? `${SITE_URL}/${route.path}` : `${SITE_URL}/`;
    return `  <!-- ${route.name} -->
  <url>
    <loc>${fullLoc}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n\n');

const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlUrls}
</urlset>
`;

const robotsTxtContent = `# robots.txt for OmniChurch
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

// Asire dosye yo egziste
const publicDir = path.resolve(process.cwd(), 'public');
const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Ekri nan /public (pou dev & pou pwochen builds)
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXmlContent, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxtContent, 'utf-8');

// Si dosye /dist egziste deja (apre vite build), ekri dirèkteman ladan l tou
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXmlContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxtContent, 'utf-8');
}

console.log(`[Sitemap Generator] Siksè: sitemap.xml & robots.txt jenere otomatikman pou ${SITE_URL} (Dat: ${buildDate})`);
