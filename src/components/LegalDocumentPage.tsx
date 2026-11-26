import React from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FileText,
  Globe,
  Mail,
  Scale,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { DeveloperEngineLegalConfig, EngineLang } from '../types';
import {
  BUILTIN_PRIVACY_DOCS,
  BUILTIN_TERMS_DOCS,
} from '../data/developerEngineDefaults';
import { useI18n } from '../i18n/I18nContext';
import { SupportedLang } from '../i18n/translations';
import { DEV_INFO } from '../data/defaultData';

export type LegalDocType = 'privacy' | 'terms';

/**
 * Safely renders inline bold (**text**) and URLs without raw HTML injection.
 */
function renderInlineSegments(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|`[^`]+`)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-white/10 text-[#35c9ff] font-mono text-[0.9em]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (/^https?:\/\//.test(token)) {
      return (
        <a
          key={idx}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#35c9ff] hover:underline break-all"
        >
          {token}
        </a>
      );
    }
    return <React.Fragment key={idx}>{token}</React.Fragment>;
  });
}

interface StructuredLegalContentProps {
  content: string;
}

/**
 * Parses structured plain/markdown-like legal text into headings, paragraphs, and bullet lists.
 */
export const StructuredLegalContent: React.FC<StructuredLegalContentProps> = ({
  content,
}) => {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let currentBullets: string[] = [];
  let keyCounter = 0;

  const flushBullets = () => {
    if (currentBullets.length === 0) return;
    blocks.push(
      <ul
        key={`ul-${keyCounter++}`}
        className="list-disc pl-6 space-y-2 text-blue-100/85 leading-relaxed my-3"
      >
        {currentBullets.map((item, idx) => (
          <li key={idx} className="pl-1">
            {renderInlineSegments(item)}
          </li>
        ))}
      </ul>
    );
    currentBullets = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushBullets();
      continue;
    }

    // Bullet item (- , * , • )
    if (/^[-*•]\s+/.test(line)) {
      currentBullets.push(line.replace(/^[-*•]\s+/, ''));
      continue;
    }

    flushBullets();

    // Markdown headings (#, ##, ###) or numbered section titles (1. Heading)
    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${keyCounter++}`}
          className="text-base font-bold text-[#35c9ff] pt-4 pb-1"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('## ') || line.startsWith('# ')) {
      const headingText = line.replace(/^#{1,2}\s+/, '');
      blocks.push(
        <h2
          key={`h2-${keyCounter++}`}
          className="text-lg sm:text-xl font-extrabold text-white pt-6 pb-2 border-b border-white/10 flex items-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#35c9ff] shrink-0" />
          <span>{headingText}</span>
        </h2>
      );
    } else if (/^\d+\.\s+[A-ZÀ-Ÿ]/.test(line) && line.length < 110) {
      blocks.push(
        <h2
          key={`hn-${keyCounter++}`}
          className="text-lg sm:text-xl font-extrabold text-white pt-6 pb-2 border-b border-white/10 flex items-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#35c9ff] shrink-0" />
          <span>{line}</span>
        </h2>
      );
    } else {
      blocks.push(
        <p
          key={`p-${keyCounter++}`}
          className="text-sm sm:text-[15px] text-blue-100/85 leading-relaxed my-2.5"
        >
          {renderInlineSegments(line)}
        </p>
      );
    }
  }

  flushBullets();

  return <div className="space-y-1">{blocks}</div>;
};

interface LegalDocumentPageProps {
  docType: LegalDocType;
  legalConfig: DeveloperEngineLegalConfig;
  onNavigateHome: () => void;
  onNavigateDoc: (docType: LegalDocType) => void;
}

const LANGUAGE_OPTIONS: Array<{
  code: SupportedLang;
  name: string;
  flag: string;
}> = [
  { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const LegalDocumentPage: React.FC<LegalDocumentPageProps> = ({
  docType,
  legalConfig,
  onNavigateHome,
  onNavigateDoc,
}) => {
  const { lang, setLang } = useI18n();
  const activeLang: EngineLang = (['ht', 'fr', 'en', 'es'].includes(lang)
    ? lang
    : 'ht') as EngineLang;

  const builtIn =
    docType === 'privacy'
      ? BUILTIN_PRIVACY_DOCS[activeLang]
      : BUILTIN_TERMS_DOCS[activeLang];
  const custom =
    docType === 'privacy'
      ? legalConfig.customPrivacy?.[activeLang]
      : legalConfig.customTerms?.[activeLang];

  const resolvedTitle =
    custom?.title && custom.title.trim().length > 0
      ? custom.title.trim()
      : builtIn.title;
  const resolvedDate =
    custom?.lastUpdatedDate && custom.lastUpdatedDate.trim().length > 0
      ? custom.lastUpdatedDate.trim()
      : legalConfig.lastLegalUpdatedAt
      ? legalConfig.lastLegalUpdatedAt.split('T')[0]
      : builtIn.lastUpdatedDate;
  const resolvedContent =
    custom?.content && custom.content.trim().length > 0
      ? custom.content.trim()
      : builtIn.content;

  const canonicalUrl =
    docType === 'privacy'
      ? legalConfig.officialPrivacyUrl || 'https://omnichurch.download/privacy-policy'
      : legalConfig.officialTermsUrl || 'https://omnichurch.download/terms-of-service';

  const uiText = {
    ht: {
      back: 'Retounen sou Pòtay OmniChurch',
      privacyTab: 'Politik Konfidansyalite',
      termsTab: 'Kondisyon Itilizasyon',
      lastUpdated: 'Dènye Mizajou',
      cloudSynced: 'Senkronize an Dirèk ak Cloud Firestore',
      officialDoc: 'Dokiman Legal Ofisyèl',
      contactTitle: 'Kesyon oswa Demann Legal?',
      contactDesc: 'Kontakte responsab konfidansyalite ak administrasyon OmniChurch Pro.',
    },
    fr: {
      back: 'Retour au Portail OmniChurch',
      privacyTab: 'Politique de Confidentialité',
      termsTab: "Conditions d'Utilisation",
      lastUpdated: 'Dernière Mise à Jour',
      cloudSynced: 'Synchronisé en Direct via Cloud Firestore',
      officialDoc: 'Document Légal Officiel',
      contactTitle: 'Questions ou Demandes Légales ?',
      contactDesc: "Contactez le responsable de la conformité et de la confidentialité d'OmniChurch Pro.",
    },
    en: {
      back: 'Back to OmniChurch Portal',
      privacyTab: 'Privacy Policy',
      termsTab: 'Terms of Service',
      lastUpdated: 'Last Updated',
      cloudSynced: 'Live Synced with Cloud Firestore',
      officialDoc: 'Official Legal Document',
      contactTitle: 'Legal Questions or Inquiries?',
      contactDesc: 'Reach out to the OmniChurch Pro privacy and compliance officer.',
    },
    es: {
      back: 'Volver al Portal OmniChurch',
      privacyTab: 'Política de Privacidad',
      termsTab: 'Términos de Servicio',
      lastUpdated: 'Última Actualización',
      cloudSynced: 'Sincronizado en Vivo con Cloud Firestore',
      officialDoc: 'Documento Legal Oficial',
      contactTitle: '¿Preguntas o Consultas Legales?',
      contactDesc: 'Comuníquese con el responsable de privacidad y cumplimiento de OmniChurch Pro.',
    },
  }[activeLang];

  return (
    <div className="min-h-screen bg-[#020711] text-[#f6fbff] flex flex-col">
      {/* Top Sticky Enterprise Header with Language Switcher */}
      <header className="sticky top-0 z-40 glass border-b border-white/10 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-blue-100 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#35c9ff]" />
              <span className="hidden sm:inline">{uiText.back}</span>
            </button>

            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 via-blue-600 to-blue-700 flex items-center justify-center font-black text-white text-xs border border-white/20">
                OC
              </div>
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                Omni<span className="text-[#35c9ff]">Church</span>
              </span>
            </div>
          </div>

          {/* Official 4-Language Switcher in Header */}
          <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-xl border border-white/15 text-[11px] font-bold">
            <Globe className="w-3.5 h-3.5 text-[#35c9ff] mr-1 hidden sm:block" />
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={`px-2 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  activeLang === item.code
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_0_12px_rgba(8,124,255,0.6)] font-extrabold'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/10'
                }`}
                title={item.name}
              >
                <span>{item.flag}</span>
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">{item.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Legal Document Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Route Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-2xl bg-black/50 border border-white/10 gap-1">
            <button
              type="button"
              onClick={() => onNavigateDoc('privacy')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                docType === 'privacy'
                  ? 'bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white shadow-md'
                  : 'text-blue-200/70 hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{uiText.privacyTab}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateDoc('terms')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                docType === 'terms'
                  ? 'bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white shadow-md'
                  : 'text-blue-200/70 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{uiText.termsTab}</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{uiText.cloudSynced}</span>
          </div>
        </div>

        {/* Legal Card */}
        <article className="glass rounded-[24px] border border-cyan-500/25 p-6 sm:p-10 shadow-[0_20px_70px_rgba(3,10,25,0.8)] space-y-6">
          <div className="border-b border-white/10 pb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#087cff]/15 border border-[#35c9ff]/30 text-[#35c9ff] text-[11px] font-extrabold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>{uiText.officialDoc}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-200/80 text-[11px] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#35c9ff]" />
                <span>
                  {uiText.lastUpdated}: <strong className="text-white">{resolvedDate}</strong>
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {resolvedTitle}
            </h1>

            <div className="text-xs font-mono text-blue-200/50 break-all">
              {canonicalUrl}
            </div>
          </div>

          {/* Structured Content */}
          <StructuredLegalContent content={resolvedContent} />

          {/* Contact & Verification Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/30 p-5 rounded-2xl">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{uiText.contactTitle}</span>
              </div>
              <p className="text-xs text-blue-200/70">{uiText.contactDesc}</p>
            </div>
            <a
              href={`mailto:${DEV_INFO.email}`}
              className="px-4 py-2.5 rounded-xl bg-[#087cff]/20 hover:bg-[#087cff]/30 border border-[#35c9ff]/40 text-xs font-bold text-[#35c9ff] flex items-center gap-2 transition shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>{DEV_INFO.email}</span>
            </a>
          </div>
        </article>
      </main>
    </div>
  );
};
