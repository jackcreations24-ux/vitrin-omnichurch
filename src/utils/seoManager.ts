import { SEOConfig } from '../types';

/**
 * Aplike tout baliz SEO yo dinamikman nan <head> paj la
 * Sa gen ladan l: Title, Meta Description, Keywords, Canonical, OpenGraph, Twitter Cards,
 * epi Structured Data JSON-LD pou Google Rich Snippets.
 */
export function applyDynamicSEO(seo: SEOConfig): void {
  if (typeof document === 'undefined') return;

  try {
    // 1. Title
    if (seo.metaTitle) {
      document.title = seo.metaTitle;
    }

    // 2. Helper pou mete ajou oswa kreye yon baliz meta
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Meta Tags Estanda
    setMetaTag('name', 'description', seo.metaDescription);
    setMetaTag('name', 'keywords', seo.keywords);
    setMetaTag('name', 'author', seo.author);
    setMetaTag('name', 'robots', seo.robots || 'index, follow');

    // OpenGraph (Facebook, LinkedIn, WhatsApp)
    setMetaTag('property', 'og:title', seo.ogTitle || seo.metaTitle);
    setMetaTag('property', 'og:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('property', 'og:url', seo.canonicalUrl || window.location.href);
    setMetaTag('property', 'og:image', seo.ogImage || `${window.location.origin}/favicon.svg`);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'OmniChurch');

    // Twitter Card
    setMetaTag('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.ogTitle || seo.metaTitle);
    setMetaTag('name', 'twitter:description', seo.ogDescription || seo.metaDescription);
    setMetaTag('name', 'twitter:image', seo.ogImage || `${window.location.origin}/favicon.svg`);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const cleanCanonical = seo.canonicalUrl || (window.location.origin + '/');
    canonicalLink.setAttribute('href', cleanCanonical);

    // 4. Structured Data (JSON-LD) pou Google Search & Rich Results
    let scriptJsonLd = document.getElementById('omnichurch-schema-jsonld') as HTMLScriptElement | null;
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.id = 'omnichurch-schema-jsonld';
      scriptJsonLd.type = 'application/ld+json';
      document.head.appendChild(scriptJsonLd);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': `${cleanCanonical}#software`,
          name: seo.appName || 'OmniChurch',
          operatingSystem: seo.operatingSystems || 'Windows, Android, macOS, Web',
          applicationCategory: seo.category || 'BusinessApplication',
          softwareVersion: seo.appVersion || '2.4.0 Pro',
          offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          description: seo.metaDescription,
          url: cleanCanonical,
          author: {
            '@type': 'Person',
            name: seo.author || 'Jackson Charles',
          },
          featureList: [
            'Offline-First SQLite Architecture',
            'Local Data Protection & Privacy',
            'Centralized Member Directory',
            'Automated SMS & Announcements',
            'Interactive Church Calendar',
            'Cross-Platform: Windows 64/32-bit, Android APK, Mac',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${cleanCanonical}#website`,
          url: cleanCanonical,
          name: 'OmniChurch',
          description: seo.metaDescription,
          publisher: {
            '@type': 'Organization',
            name: 'ZOUTIW - OmniChurch',
            url: cleanCanonical,
          },
        },
      ],
    };

    scriptJsonLd.text = JSON.stringify(schemaData, null, 2);
  } catch (err) {
    console.warn('[SEO Manager] Erè pandan aplikasyon baliz SEO:', err);
  }
}
