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
    heroEyebrow: langOverrides?.heroEyebrow || (isCustomEdited && lang === 'ht' ? current.heroEyebrow : t.hero.eyebrow),
    heroEyebrowSub: langOverrides?.heroEyebrowSub || (isCustomEdited && lang === 'ht' ? current.heroEyebrowSub : t.hero.eyebrowSub),
    heroBadge: current.heroBadge || t.hero.badge,
    heroTitlePrefix: langOverrides?.heroTitlePrefix || (isCustomEdited && lang === 'ht' ? current.heroTitlePrefix : t.hero.titlePrefix),
    heroTitleHighlight: langOverrides?.heroTitleHighlight || (isCustomEdited ? current.heroTitleHighlight : t.hero.titleHighlight),
    heroSubtitle: langOverrides?.heroSubtitle || (isCustomEdited && lang === 'ht' ? current.heroSubtitle : t.hero.subtitle),
    heroDescription: langOverrides?.heroDescription || (isCustomEdited && lang === 'ht' ? current.heroDescription : t.hero.description),

    featuresEyebrow: langOverrides?.featuresEyebrow || (isCustomEdited && lang === 'ht' ? current.featuresEyebrow : t.features.eyebrow),
    featuresTitle: langOverrides?.featuresTitle || (isCustomEdited && lang === 'ht' ? current.featuresTitle : t.features.title),
    featuresDescription: langOverrides?.featuresDescription || (isCustomEdited && lang === 'ht' ? current.featuresDescription : t.features.description),

    feature1Title: langOverrides?.feature1Title || (isCustomEdited && lang === 'ht' ? current.feature1Title : t.features.f1.title),
    feature1Desc: langOverrides?.feature1Desc || (isCustomEdited && lang === 'ht' ? current.feature1Desc : t.features.f1.desc),

    feature2Title: langOverrides?.feature2Title || (isCustomEdited && lang === 'ht' ? current.feature2Title : t.features.f2.title),
    feature2Desc: langOverrides?.feature2Desc || (isCustomEdited && lang === 'ht' ? current.feature2Desc : t.features.f2.desc),

    feature3Title: langOverrides?.feature3Title || (isCustomEdited && lang === 'ht' ? current.feature3Title : t.features.f3.title),
    feature3Desc: langOverrides?.feature3Desc || (isCustomEdited && lang === 'ht' ? current.feature3Desc : t.features.f3.desc),

    feature4Title: langOverrides?.feature4Title || (isCustomEdited && lang === 'ht' ? current.feature4Title : t.features.f4.title),
    feature4Desc: langOverrides?.feature4Desc || (isCustomEdited && lang === 'ht' ? current.feature4Desc : t.features.f4.desc),

    downloadTitle: langOverrides?.downloadTitle || (isCustomEdited && lang === 'ht' ? current.downloadTitle : t.download.title),
    downloadSubtitle: langOverrides?.downloadSubtitle || (isCustomEdited && lang === 'ht' ? current.downloadSubtitle : t.download.subtitle),

    footerAbout: langOverrides?.footerAbout || (isCustomEdited && lang === 'ht' ? current.footerAbout : t.footer.about),
  };
}
