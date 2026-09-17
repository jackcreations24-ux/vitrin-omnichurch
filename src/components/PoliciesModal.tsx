import React, { useState } from 'react';
import {
  X,
  Shield,
  FileText,
  Cookie,
  ShieldCheck,
  ExternalLink,
  Mail,
  CheckCircle2,
  Lock,
  Eye,
  Server,
  Scale,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { DEV_INFO } from '../data/defaultData';

export type PolicyTab = 'privacy' | 'terms' | 'cookies' | 'security';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { lang, setLang } = useI18n();
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  if (!isOpen) return null;

  const tabs: { id: PolicyTab; label: Record<string, string>; icon: React.ReactNode }[] = [
    {
      id: 'privacy',
      label: {
        ht: 'Politik Konfidansyalite',
        fr: 'Politique de Confidentialité',
        en: 'Privacy Policy',
        es: 'Política de Privacidad',
      },
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: 'terms',
      label: {
        ht: 'Kondisyon Itilizasyon',
        fr: "Conditions d'Utilisation",
        en: 'Terms of Service',
        es: 'Términos de Servicio',
      },
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'cookies',
      label: {
        ht: 'Bonbon & Google AdSense',
        fr: 'Cookies & Google AdSense',
        en: 'Cookies & Google AdSense',
        es: 'Cookies y Google AdSense',
      },
      icon: <Cookie className="w-4 h-4" />,
    },
    {
      id: 'security',
      label: {
        ht: 'Transparans & Sekirite Done',
        fr: 'Transparence & Sécurité',
        en: 'Transparency & Data Safety',
        es: 'Transparencia y Seguridad',
      },
      icon: <ShieldCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[24px] bg-[#030917] border border-cyan-500/30 shadow-[0_0_60px_rgba(8,124,255,0.3)] text-white overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#087cff] to-[#35c9ff] flex items-center justify-center text-white shadow-[0_0_15px_rgba(53,201,255,0.4)]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>
                  {lang === 'ht'
                    ? 'Regleman Ofisyèl & Transparans Sit la'
                    : lang === 'fr'
                    ? 'Politiques Officielles & Transparence'
                    : lang === 'es'
                    ? 'Políticas Oficiales y Transparencia'
                    : 'Official Site Policies & Transparency'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Google Verified
                </span>
              </h2>
              <p className="text-xs text-blue-200/60">
                {lang === 'ht'
                  ? 'Konfòm ak règleman Google AdSense, Google Identity & Pwoteksyon Done'
                  : 'Compliant with Google AdSense, Google Identity & Data Protection Standards'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Quick-Switch inside modal */}
            <div className="hidden sm:flex items-center bg-black/40 rounded-xl border border-white/10 p-0.5 text-xs">
              {(['ht', 'fr', 'en', 'es'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                    lang === code
                      ? 'bg-[#087cff] text-white shadow-sm'
                      : 'text-blue-200/60 hover:text-white'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-black/50 border-b border-white/10 overflow-x-auto no-scrollbar">
          {tabs.map((t) => {
            const isCurrent = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white shadow-[0_0_15px_rgba(8,124,255,0.4)]'
                    : 'text-blue-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.icon}
                <span>{t.label[lang] || t.label.ht}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-left text-xs sm:text-sm text-blue-100/90 leading-relaxed">
          {/* ========================================================================= */}
          {/* TAB 1: PRIVACY POLICY */}
          {/* ========================================================================= */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#35c9ff] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'ht'
                      ? 'Angajman Konfidansyalite OmniChurch'
                      : lang === 'fr'
                      ? 'Engagement de Confidentialité OmniChurch'
                      : 'OmniChurch Privacy Commitment'}
                  </h3>
                  <p className="text-xs text-blue-200/80">
                    {lang === 'ht'
                      ? 'Nou respekte lavi prive chak lidè, pastè, ak manm legliz. Dokiman sa a eksplike transparanman kijan nou trete enfòmasyon sou sit entènèt sa a ak aplikasyon nou an.'
                      : 'We strictly protect the privacy of every church leader, pastor, and congregation member. This policy outlines transparently how we collect, use, and protect your information.'}
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35c9ff]" />
                  {lang === 'ht' ? '1. Ki Done Nou Kolekte Sou Sit la?' : '1. Information We Collect'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Nou kolekte sèlman enfòmasyon ki nesesè pou garanti pi bon fonksyònman sèvis la :'
                    : 'We only collect data strictly necessary to deliver a reliable and secure experience:'}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-blue-200/80">
                  <li>
                    <strong className="text-white">
                      {lang === 'ht' ? 'Done Kont Google (Lè w konekte pou bay avi) :' : 'Google Account Data (Reviews) :'}
                    </strong>{' '}
                    {lang === 'ht'
                      ? 'Non afichaj Google ou, imèl ou, ak foto pwofil ou lè w chwazi pibliye yon avi sou aplikasyon an. Done sa yo itilize sèlman pou afiche avi ou avèk badj verifye.'
                      : 'Your public Google display name, email, and avatar when you choose to submit a verified app review. This is used solely to display your public review credentials.'}
                  </li>
                  <li>
                    <strong className="text-white">
                      {lang === 'ht' ? 'Estatistik Anonim sou Sit la :' : 'Anonymous Site Analytics :'}
                    </strong>{' '}
                    {lang === 'ht'
                      ? 'Kantite vizit jeneral ak telechajman (PC Windows oswa Android APK) pou mezire adopsyon zouti a. Pa gen okenn enfòmasyon pèsonèl ki mare ak estatistik sa yo.'
                      : 'Aggregated visit counts and download metrics (Windows PC or Android APK) to evaluate community adoption. No personal identity is tied to aggregate counts.'}
                  </li>
                  <li>
                    <strong className="text-emerald-300">
                      {lang === 'ht' ? 'DONE LEGLIZ YO PA KANPE SOU SÈVÈ NOU (OFFLINE-FIRST) :' : 'CHURCH ROSTER DATA IS NEVER UPLOADED (OFFLINE-FIRST) :'}
                    </strong>{' '}
                    {lang === 'ht'
                      ? 'Tout anyè manm, foto, prezans nan kil, ak nimewo telefòn legliz ou a rete lokalman 100% sou pwòp òdinatè oswa telefòn ou. Nou PA JANM gen aksè a lis manm legliz ou a.'
                      : 'All church membership lists, member photos, attendance logs, and contact details stay 100% locally on your computer or phone. We NEVER upload, view, or sell church roster data.'}
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35c9ff]" />
                  {lang === 'ht' ? '2. Kijan Nou Itilize Done yo?' : '2. How We Use Collected Data'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Done yo sèvi eksklizifman pou : pèmèt telechajman rapid lojisyèl la, verifye kòmantè lidè yo sou app la, ak amelyore pèfòmans sit la. Nou pa janm vann, lwe, oswa pataje done pèsonèl ou ak koutye done (data brokers).'
                    : 'Information is utilized strictly to provide smooth app downloads, authenticate public church reviews, and maintain technical stability. We NEVER sell, rent, or trade your personal information.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35c9ff]" />
                  {lang === 'ht' ? '3. Dwa Ou Kòm Itilizatè' : '3. Your Data Rights'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Ou gen dwa pou w wè, retire oswa efase avi ou te pibliye sou sit la nenpòt kilè. Ou gen dwa tou pou w dekonekte kont Google ou oswa mande efasman tout referans pèsonèl lè w kontakte nou.'
                    : 'You retain full control to edit or delete any review you have published, disconnect your Google account, or request complete deletion of any submitted feedback by contacting us.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35c9ff]" />
                  {lang === 'ht' ? '4. Kontak Responsab Konfidansyalite a' : '4. Privacy Officer Contact'}
                </h4>
                <p className="flex items-center gap-2 text-xs text-cyan-300">
                  <Mail className="w-4 h-4" />
                  <span>Jackson Charles (ZOUTIW) : <strong>{DEV_INFO.email}</strong></span>
                </p>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: TERMS OF SERVICE */}
          {/* ========================================================================= */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'ht'
                      ? 'Kondisyon Itilizasyon Ofisyèl (Terms of Service)'
                      : 'Official Terms of Service'}
                  </h3>
                  <p className="text-xs text-blue-200/80">
                    {lang === 'ht'
                      ? 'Lè w sèvi ak sit entènèt sa a oswa lè w telechaje aplikasyon OmniChurch sou PC oswa Android, ou dakò ak tout règ ak kondisyon sa yo.'
                      : 'By accessing this website or downloading OmniChurch for PC or Android, you agree to comply with the terms and conditions outlined below.'}
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {lang === 'ht' ? '1. Lisans Itilizasyon Gratis pou Legliz' : '1. Free License for Churches'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Nou akòde tout asanble kretyèn, pastè, kowòdonatè, ak lidè yon lisans gratis pou telechaje, enstale, epi itilize OmniChurch sou plizyè òdinatè ak aparèy mobil san limit manm.'
                    : 'We grant churches, ministries, and Christian leaders a royalty-free license to download, install, and utilize OmniChurch across multiple desktop and mobile devices without arbitrary member caps.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {lang === 'ht' ? '2. Règleman sou Konduit & Itilizasyon Entèdi' : '2. Prohibited Conduct'}
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-blue-200/80">
                  <li>
                    {lang === 'ht'
                      ? 'Li entèdi pou re-vann dosye enstalasyon OmniChurch la oswa fè kòmès ak li kòm si se yon pwodwi pa w.'
                      : 'You may not resell or distribute paid unauthorized repackagings of OmniChurch installation binaries.'}
                  </li>
                  <li>
                    {lang === 'ht'
                      ? 'Li entèdi pou fè tantativ pirataj, voye spams, oswa kòd malveyan sou sèvis nwaj sit sa a.'
                      : 'You may not conduct malicious penetration tests, distribute malware, or disrupt cloud synchronization infrastructure.'}
                  </li>
                  <li>
                    {lang === 'ht'
                      ? 'Tout avi ki pibliye dwe respekte lòt moun, san vye mo ni kontni ki vyole lwa.'
                      : 'All public reviews must maintain respectful decorum, free of profanity or unlawful content.'}
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {lang === 'ht' ? '3. Limit Responsablite & Sovgad (Backup)' : '3. Limitation of Liability & Backups'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Malgre nou fèt lojisyèl la avèk pi gwo nivo estabilite offline, chak legliz responsab pou fè sovgad (backups) regilye de baz done lokal li. Nou pa responsab pou pèt done ki soti nan echèk materyèl (pan òdinatè, vòl aparèy).'
                    : 'While OmniChurch is engineered for resilient offline performance, each user is responsible for conducting periodic local backups. We are not liable for physical hardware failure or device theft.'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {lang === 'ht' ? '4. Pwopriyete Entèlektyèl' : '4. Intellectual Property'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'OmniChurch ak mak ZOUTIW se pwopriyete devlopè Jackson Charles. Tout dwa rezève.'
                    : 'OmniChurch and associated trademarks are the intellectual property of Jackson Charles (ZOUTIW). All rights reserved.'}
                </p>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: COOKIES & GOOGLE ADSENSE TRANSPARENCY */}
          {/* ========================================================================= */}
          {activeTab === 'cookies' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
                <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'ht'
                      ? 'Politik sou Bonbon (Cookies) & Piblisite Google AdSense'
                      : 'Cookies Policy & Google AdSense Transparency'}
                  </h3>
                  <p className="text-xs text-blue-200/80">
                    {lang === 'ht'
                      ? 'Google mande pou tout sit ki difize anons gen yon deklarasyon transparan sou itilizasyon bonbon ak piblisite pèsonalize.'
                      : 'Google requires all partner sites to maintain an explicit and transparent disclosure regarding cookies and interest-based advertising.'}
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {lang === 'ht' ? '1. Ki sa ki bonbon (Cookies)?' : '1. What Are Cookies?'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Bonbon se ti fichye tèks ke sit wèb mete sou aparèy ou pou kenbe preferans ou (egzanp: chwa lang Kreyòl/Franse/Angle, estati koneksyon Google, preferans navigasyon).'
                    : 'Cookies are small text files placed on your browser to remember preferences (such as your chosen language, login session status, or display mode).'}
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {lang === 'ht'
                    ? '2. Deklarasyon Ofisyèl Google AdSense (Egzijans Google)'
                    : '2. Mandatory Google AdSense Disclosures'}
                </h4>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-blue-200/90">
                  <p>
                    {lang === 'ht'
                      ? '• Founisè tyèspati, tankou Google, itilize bonbon pou difize anons ki baze sou vizit anvan yon itilizatè sou sit wèb nou an oswa sou lòt sit sou Entènèt.'
                      : '• Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to your website or other websites.'}
                  </p>
                  <p>
                    {lang === 'ht'
                      ? '• Itilizasyon bonbon piblisite pa Google pèmèt li menm ak patnè li yo difize anons bay vizitè nou yo selon vizit yo sou sit nou an ak lòt sit sou Entènèt.'
                      : '• Google’s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.'}
                  </p>
                  <p>
                    {lang === 'ht'
                      ? '• Itilizatè yo ka dezaktive piblisite pèsonalize a nenpòt kilè lè yo vizite Paramèt Anons Google.'
                      : '• Users may opt out of personalized advertising by visiting Google Ads Settings.'}
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {lang === 'ht' ? '3. Kijan Pou Dezaktive Bonbon Piblisite yo (Opt-Out)?' : '3. How to Opt-Out of Personalized Ads?'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Ou gen kontwòl total. Si w pa vle resevwa piblisite pèsonalize de Google, ou ka vizite lyen sa yo :'
                    : 'You maintain full control. If you prefer not to see personalized advertising, consult these official resources:'}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/40 text-xs font-bold text-[#35c9ff] transition cursor-pointer"
                  >
                    <span>Google Ads Settings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition cursor-pointer"
                  >
                    <span>AboutAds Choices</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: DATA SAFETY & CHURCH TRANSPARENCY */}
          {/* ========================================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'ht'
                      ? 'Transparans & Sekirite Done Kominote Kretyèn nan'
                      : 'Data Safety & Church Transparency Architecture'}
                  </h3>
                  <p className="text-xs text-blue-200/80">
                    {lang === 'ht'
                      ? 'Pwoteksyon manm yo se premye priyorite nou. Aprann kijan achitekti offline OmniChurch la garanti sekirite total twoupo a.'
                      : 'Protecting church member data is our foremost core principle. Discover how the offline architecture guarantees absolute confidentiality.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Server className="w-4 h-4" />
                    <span>{lang === 'ht' ? 'Baz Done Lokal (Zewo Nwaj pou Manm)' : 'Zero Cloud for Members'}</span>
                  </div>
                  <p className="text-xs text-blue-200/70">
                    {lang === 'ht'
                      ? 'Tout non manm, foto, ak prezans rete sou disk di PC ou oswa memwa telefòn ou. Pa gen sèvè ekstèn ki ka espione legliz ou.'
                      : 'All roster records, member photos, and attendance logs reside strictly on your device local storage.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#35c9ff] font-bold text-xs">
                    <Lock className="w-4 h-4" />
                    <span>{lang === 'ht' ? 'Kat Dijital QR Chifre' : 'Encrypted QR Credentials'}</span>
                  </div>
                  <p className="text-xs text-blue-200/70">
                    {lang === 'ht'
                      ? 'Kòd QR sou kat manm yo verifye prezans nan 1 segonn san bezwen entènèt, menm nan zòn ki pa gen kouran ni rezo.'
                      : 'Member QR badges verify attendance in under 1 second without internet dependency, fully operable offline.'}
                  </p>
                </div>
              </div>

              <section className="space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {lang === 'ht' ? 'Konfòmite ak Estanda Entènasyonal yo' : 'International Privacy Compliance'}
                </h4>
                <p>
                  {lang === 'ht'
                    ? 'Aplikasyon an ak sit la fèt pou respekte pi wo egzijans pwoteksyon done pèsonèl yo, tankou RGPD (GDPR) an Ewòp ak estanda CCPA Ozetazini, pou asire ke chak moun konnen egzakteman sa ki fèt ak enfòmasyon li.'
                    : 'OmniChurch respects international data privacy benchmarks, adhering to GDPR principles and CCPA transparency standards to uphold accountability.'}
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.02]">
          <div className="text-[11px] text-blue-200/60 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'ht'
                ? 'Dènye mizajou : Septanm 2026 • Valid pou tout vèsyon OmniChurch'
                : 'Last updated: September 2026 • Effective for all OmniChurch releases'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white text-xs font-bold shadow-[0_2px_15px_rgba(8,124,255,0.4)] hover:scale-[1.02] transition cursor-pointer"
          >
            {lang === 'ht' ? 'Mwen Konprann & Aksepte' : 'I Understand & Accept'}
          </button>
        </div>
      </div>
    </div>
  );
};
