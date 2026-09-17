import { SiteTextsConfig } from '../types';
import { Translations, SupportedLang } from '../i18n/translations';
import { DEFAULT_SITE_TEXTS } from '../data/defaultData';

export interface ResolvedSiteTexts {
  heroEyebrow: string;
  heroEyebrowSub: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroDescription: string;
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
  downloadTitle: string;
  downloadSubtitle: string;
  footerAbout: string;
}

export function resolveSiteTexts(
  siteTexts: SiteTextsConfig | undefined,
  t: Translations,
  lang: SupportedLang
): ResolvedSiteTexts {
  const current = siteTexts || DEFAULT_SITE_TEXTS;

  // Si itilizatè a te mete tèks espesifik pou lang sa a nan panèl dev la
  const langOverrides = current.translations?.[lang];

  // Èske tèks jeneral la te modifye parapò ak defo a?
  const isCustomEdited = Boolean(
    siteTexts && (
      siteTexts.heroTitleHighlight !== DEFAULT_SITE_TEXTS.heroTitleHighlight ||
      siteTexts.heroDescription !== DEFAULT_SITE_TEXTS.heroDescription ||
      siteTexts.heroSubtitle !== DEFAULT_SITE_TEXTS.heroSubtitle ||
      siteTexts.heroTitlePrefix !== DEFAULT_SITE_TEXTS.heroTitlePrefix ||
      siteTexts.heroBadge !== DEFAULT_SITE_TEXTS.heroBadge ||
      siteTexts.featuresTitle !== DEFAULT_SITE_TEXTS.featuresTitle ||
      siteTexts.downloadTitle !== DEFAULT_SITE_TEXTS.downloadTitle
    )
  );

  return {
    heroEyebrow: langOverrides?.heroEyebrow || (lang === 'ht' && current.heroEyebrow ? current.heroEyebrow : t.hero.eyebrow),
    heroEyebrowSub: langOverrides?.heroEyebrowSub || (lang === 'ht' && current.heroEyebrowSub ? current.heroEyebrowSub : t.hero.eyebrowSub),
    heroBadge: current.heroBadge || t.hero.badge,
    heroTitlePrefix: langOverrides?.heroTitlePrefix || (lang === 'ht' && current.heroTitlePrefix ? current.heroTitlePrefix : t.hero.titlePrefix),
    heroTitleHighlight: langOverrides?.heroTitleHighlight || current.heroTitleHighlight || t.hero.titleHighlight,
    heroSubtitle: langOverrides?.heroSubtitle || (lang === 'ht' && current.heroSubtitle ? current.heroSubtitle : t.hero.subtitle),
    heroDescription: langOverrides?.heroDescription || (lang === 'ht' && current.heroDescription ? current.heroDescription : t.hero.description),

    featuresEyebrow: langOverrides?.featuresEyebrow || (lang === 'ht' && current.featuresEyebrow ? current.featuresEyebrow : t.features.eyebrow),
    featuresTitle: langOverrides?.featuresTitle || (lang === 'ht' && current.featuresTitle ? current.featuresTitle : t.features.title),
    featuresDescription: langOverrides?.featuresDescription || (lang === 'ht' && current.featuresDescription ? current.featuresDescription : t.features.description),

    feature1Title: langOverrides?.feature1Title || (lang === 'ht' && current.feature1Title ? current.feature1Title : t.features.f1.title),
    feature1Desc: langOverrides?.feature1Desc || (lang === 'ht' && current.feature1Desc ? current.feature1Desc : t.features.f1.desc),

    feature2Title: langOverrides?.feature2Title || (lang === 'ht' && current.feature2Title ? current.feature2Title : t.features.f2.title),
    feature2Desc: langOverrides?.feature2Desc || (lang === 'ht' && current.feature2Desc ? current.feature2Desc : t.features.f2.desc),

    feature3Title: langOverrides?.feature3Title || (lang === 'ht' && current.feature3Title ? current.feature3Title : t.features.f3.title),
    feature3Desc: langOverrides?.feature3Desc || (lang === 'ht' && current.feature3Desc ? current.feature3Desc : t.features.f3.desc),

    feature4Title: langOverrides?.feature4Title || (lang === 'ht' && current.feature4Title ? current.feature4Title : t.features.f4.title),
    feature4Desc: langOverrides?.feature4Desc || (lang === 'ht' && current.feature4Desc ? current.feature4Desc : t.features.f4.desc),

    downloadTitle: langOverrides?.downloadTitle || (lang === 'ht' && current.downloadTitle ? current.downloadTitle : t.download.title),
    downloadSubtitle: langOverrides?.downloadSubtitle || (lang === 'ht' && current.downloadSubtitle ? current.downloadSubtitle : t.download.subtitle),

    footerAbout: langOverrides?.footerAbout || (lang === 'ht' && current.footerAbout ? current.footerAbout : t.footer.about),
  };
}
