import {
  DeveloperEngineAppUpdate,
  DeveloperEngineConfig,
  DeveloperEngineDonations,
  DeveloperEngineLegalConfig,
  EngineLang,
  LocalizedLegalDocument,
} from '../types';
import { DEFAULT_LINKS, DEV_INFO } from './defaultData';

export const SUPER_DEVELOPER_EMAIL = 'charlesjj3186@gmail.com';
export const UNIFIED_FIRESTORE_DB_ID =
  'ai-studio-applegizplatfmmu-438b9782-c8b8-4863-805f-d40924b9f1d1';
export const DEVELOPER_ENGINE_COLLECTION = 'app_config';
export const DEVELOPER_ENGINE_DOC_ID = 'developer_engine';

export const BUILTIN_PRIVACY_DOCS: Record<EngineLang, Required<LocalizedLegalDocument>> = {
  ht: {
    title: 'Politik Konfidansyalite Ofisyèl — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Angajman Konfidansyalite OmniChurch Pro
Nou respekte lavi prive chak lidè, pastè, sekretè, ak manm legliz k ap itilize ekosistèm OmniChurch Pro (aplikasyon Web, Android APK, Windows PC, ak pòtay ofisyèl https://omnichurch.download). Dokiman sa a eksplike avèk transparans total kijan nou pwoteje done yo.

## 1. Done Legliz Yo Rete 100% Lokal (Achitekti Offline-First)
- Tout anyè manm, foto fidèl yo, nimewo telefòn, rejis prezans QR, ak rapò entèn legliz ou a estoke lokalman sou aparèy ou an (SQLite / memwa lokal).
- Nou PA JANM vann, lwe, ni pataje bazdone manm legliz ou a ak okenn twazyèm pati oswa koutye done.
- Fonksyònman prensipal OmniChurch Pro pa depann de entènèt pou jere fidèl yo.

## 2. Ki Enfòmasyon Pòtay la ak Sèvis Cloud yo Trete?
- **Otantifikasyon Google (Sign-In)**: Lè yon itilizatè oswa devlopè chwazi konekte ak Google, nou resevwa sèlman non afichaj, adrès imèl, ak foto pwofil piblik Google bay la pou verifye idantite ak otorizasyon.
- **Konfigirasyon Dinamik (\`app_config/developer_engine\`)**: Pòtay la ak aplikasyon mobil/biwo yo li konfigirasyon piblik (vèsyon, nòt mizajou, dokiman legal, sponsò ak opsyon don) an tan reyèl via Cloud Firestore.
- **Estatistik Anonim & Sekirite**: Mezi vizit ak telechajman yo agrége san idantifikasyon pèsonèl manm legliz ou yo.

## 3. Bonbon (Cookies) & Google AdSense
- Sit sa a ka itilize bonbon esansyèl pou memorize chwa lang ou (Kreyòl Ayisyen, Français, English, Español) ak sèvis piblisite Google AdSense ki konfòm ak estanda Google yo.
- Ou ka jere oswa dezaktive pèsonalizasyon piblisite nenpòt kilè nan Paramèt Anons Google (https://www.google.com/settings/ads).

## 4. Dwa Ou Kòm Itilizatè
Ou gen tout dwa pou mande aksè, koreksyon, oswa efasman nenpòt kòmantè oswa done kont ou te soumèt atravè pòtay sa a.

## 5. Kontak Responsab Pwoteksyon Done
- Devlopè & Responsab: Jackson Charles (ZOUTIW)
- Imèl Ofisyèl: ${DEV_INFO.email}
- Sit Ofisyèl: https://omnichurch.download/privacy-policy`,
  },
  fr: {
    title: 'Politique de Confidentialité Officielle — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Engagement de Confidentialité OmniChurch Pro
Nous protégeons strictement la vie privée de chaque pasteur, administrateur et membre d'église utilisant l'écosystème OmniChurch Pro (Application Web, Android APK, Windows PC et le portail https://omnichurch.download).

## 1. Données d'Église 100% Locales (Architecture Offline-First)
- Tous les répertoires de membres, photos, numéros de téléphone, registres de présence par QR code et rapports internes restent stockés localement sur votre appareil.
- Nous ne vendons, ne louons ni ne partageons jamais les listes de membres de votre assemblée avec des tiers.

## 2. Informations Traitées par le Portail et les Services Cloud
- **Authentification Google (Sign-In)** : Lorsqu'un utilisateur se connecte avec Google, nous utilisons uniquement son nom d'affichage, son e-mail et son avatar pour l'identification et le contrôle d'accès.
- **Configuration Temps Réel (\`app_config/developer_engine\`)** : L'application et le portail synchronisent les notes de version, documents légaux, sponsors et informations de don en temps réel via Cloud Firestore.
- **Analytique Agrégée** : Les compteurs de téléchargements et visites restent anonymes et dissociés des données de votre église.

## 3. Cookies & Google AdSense
- Des cookies essentiels enregistrent votre préférence linguistique (Kreyòl Ayisyen, Français, English, Español).
- Les partenaires publicitaires tiers comme Google peuvent utiliser des cookies conformément aux politiques Google AdSense. Vous pouvez gérer vos préférences via Google Ads Settings.

## 4. Vos Droits (RGPD / CCPA)
Vous pouvez à tout moment demander la consultation, la modification ou la suppression de tout avis ou donnée personnelle associée à votre compte.

## 5. Contact du Délégué à la Protection des Données
- Responsable : Jackson Charles (ZOUTIW)
- E-mail : ${DEV_INFO.email}
- URL Officielle : https://omnichurch.download/privacy-policy`,
  },
  en: {
    title: 'Official Privacy Policy — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## OmniChurch Pro Privacy Commitment
We strictly safeguard the privacy of every pastor, church administrator, and congregation member across the OmniChurch Pro ecosystem (Web App, Android APK, Windows Desktop, and https://omnichurch.download).

## 1. 100% Local Church Roster Storage (Offline-First Architecture)
- All congregation directories, member photos, contact numbers, QR attendance scans, and internal church records reside locally on your device.
- We NEVER sell, rent, harvest, or share your congregation's membership database with third-party brokers.

## 2. Portal & Cloud Configuration Data
- **Google Sign-In Authentication**: When you sign in with Google, we receive only your Google display name, verified email, and avatar URL strictly for identity and access control.
- **Real-Time Configuration (\`app_config/developer_engine\`)**: The portal, Web App, and Android App read synchronized release metadata, official legal notices, sponsor strips, and multilingual donation channels from Cloud Firestore.
- **Aggregated Metrics**: Download counters (Android APK / Windows EXE) and general traffic analytics are anonymous and never linked to church member records.

## 3. Cookies & Google AdSense Transparency
- Essential storage remembers your preferred language (Kreyòl Ayisyen, Français, English, Español) and consent choices.
- Third-party vendors, including Google, may use cookies to serve ads. Users may opt out of personalized ads via Google Ads Settings (https://www.google.com/settings/ads).

## 4. Your Rights (GDPR & CCPA)
You retain complete control to request access, correction, or deletion of any public review or account data submitted through this portal.

## 5. Privacy Officer Contact
- Lead Developer: Jackson Charles (ZOUTIW)
- Official Email: ${DEV_INFO.email}
- Official URL: https://omnichurch.download/privacy-policy`,
  },
  es: {
    title: 'Política de Privacidad Oficial — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Compromiso de Privacidad de OmniChurch Pro
Protegemos estrictamente la privacidad de cada pastor, administrador y miembro de iglesia que utiliza el ecosistema OmniChurch Pro (Aplicación Web, Android APK, Windows PC y el portal https://omnichurch.download).

## 1. Datos de la Iglesia 100% Locales (Arquitectura Offline-First)
- Todos los directorios de miembros, fotografías, teléfonos, registros de asistencia QR e informes internos permanecen almacenados localmente en su dispositivo.
- NUNCA vendemos, alquilamos ni compartimos la base de datos de su congregación con terceros.

## 2. Datos Tratados por el Portal y Servicios en la Nube
- **Autenticación con Google (Sign-In)**: Cuando inicia sesión con Google, solo utilizamos su nombre público, correo electrónico verificado y foto de perfil para identificación y permisos.
- **Sincronización en Tiempo Real (\`app_config/developer_engine\`)**: Las notas de versión, documentos legales, patrocinadores y canales de donación se sincronizan mediante Cloud Firestore.
- **Métricas Anónimas**: Los contadores de descarga y visitas son agregados y anónimos.

## 3. Cookies y Google AdSense
- Utilizamos almacenamiento esencial para recordar su idioma preferido (Kreyòl Ayisyen, Français, English, Español).
- Google y socios terceros pueden usar cookies publicitarias según las políticas de Google AdSense. Puede desactivar la publicidad personalizada en la configuración de anuncios de Google.

## 4. Sus Derechos
Puede solicitar en cualquier momento la revisión, modificación o eliminación de cualquier reseña o información personal enviada.

## 5. Contacto de Privacidad
- Desarrollador Principal: Jackson Charles (ZOUTIW)
- Correo Oficial: ${DEV_INFO.email}
- URL Oficial: https://omnichurch.download/privacy-policy`,
  },
};

export const BUILTIN_TERMS_DOCS: Record<EngineLang, Required<LocalizedLegalDocument>> = {
  ht: {
    title: 'Kondisyon Itilizasyon Ofisyèl — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Akò Itilizasyon Pòtay & Lojisyèl OmniChurch Pro
Lè w aksede sit https://omnichurch.download oswa lè w telechaje, enstale, epi itilize OmniChurch Pro sou Android, Windows PC, oswa Web, ou dakò ak kondisyon sa yo.

## 1. Lisans Itilizasyon Gratis pou Legliz yo
- Nou akòde tout legliz, ministè, pastè, ak kowòdonatè kretyen yon lisans gratis pou enstale epi itilize OmniChurch Pro pou jesyon asanble yo san limit manm.
- Aplikasyon an fèt pou sèvi kominote a avèk entegrite ak pèfòmans pwofesyonèl.

## 2. Itilizasyon ki Entèdi
- Li entèdi pou modifye, rekonpile san otorizasyon, oswa revann fichye enstalasyon OmniChurch Pro yo (APK / EXE) kòm pwòp pwodwi komèsyal pa w.
- Li entèdi pou tante atake, voye spam, oswa manipile enfrastrikti Cloud Firestore oswa sèvè API sit sa a.
- Tout avi ak kòmantè piblik dwe rete respèktueu e konfòm ak lwa.

## 3. Sovgad (Backups) & Responsablite
- Kòm OmniChurch Pro fonksyone an mòd offline-first sou pwòp aparèy legliz la, chak administratè responsab pou fè sovgad regilye bazdone lokal li.
- Ekip ZOUTIW pa responsab pou pèt done ki soti nan pan materyèl, fòmataj, oswa vòl aparèy.

## 4. Pwopriyete Entèlektyèl & Kontak
- Non OmniChurch, logo, mak ZOUTIW, ak kòd aplikasyon an se pwopriyete entèlektyèl Jackson Charles.
- Pou kesyon legal oswa sipò teknik: ${DEV_INFO.email}
- URL Ofisyèl: https://omnichurch.download/terms-of-service`,
  },
  fr: {
    title: "Conditions Générales d'Utilisation — OmniChurch Pro",
    lastUpdatedDate: '2026-11-26',
    content: `## Acceptation des Conditions
En accédant à https://omnichurch.download ou en téléchargeant et utilisant OmniChurch Pro sur Android, Windows PC ou Web, vous acceptez les présentes Conditions d'Utilisation.

## 1. Licence Gratuite pour les Églises
- Nous accordons aux églises, ministères et responsables chrétiens une licence gratuite et non exclusive d'installation et d'utilisation d'OmniChurch Pro sans plafond artificiel de membres.

## 2. Usages Interdits
- Il est interdit de revendre, redistribuer commercialement ou modifier sans autorisation les installateurs officiels (APK / EXE) d'OmniChurch Pro.
- Il est strictement interdit de perturber ou tenter de compromettre l'infrastructure Cloud Firestore ou les API du portail.
- Les avis publiés doivent rester respectueux et conformes à la loi.

## 3. Sauvegardes & Limitation de Responsabilité
- Grâce à son architecture offline-first, chaque église est responsable d'effectuer des sauvegardes régulières de sa base locale.
- ZOUTIW décline toute responsabilité en cas de panne matérielle, perte ou vol de l'appareil.

## 4. Propriété Intellectuelle & Contact
- La marque OmniChurch, le logo et les logiciels associés appartiennent à Jackson Charles (ZOUTIW).
- Contact officiel : ${DEV_INFO.email}
- URL Officielle : https://omnichurch.download/terms-of-service`,
  },
  en: {
    title: 'Official Terms of Service — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Acceptance of Terms
By accessing https://omnichurch.download or downloading and operating OmniChurch Pro on Android, Windows Desktop, or the Web, you agree to be bound by these Terms of Service.

## 1. Royalty-Free License for Churches & Ministries
- We grant churches, ministries, and Christian leaders a royalty-free, non-exclusive license to download, install, and operate OmniChurch Pro without arbitrary member limits.

## 2. Prohibited Conduct
- You may not resell, commercially repackage, or distribute unauthorized modifications of official OmniChurch Pro installers (APK / EXE).
- You may not conduct unauthorized penetration testing, spam injection, or interfere with Cloud Firestore synchronization services.
- All public reviews and submissions must remain respectful and lawful.

## 3. Local Backups & Limitation of Liability
- Because OmniChurch Pro operates offline-first on your local hardware, each congregation is responsible for maintaining regular backups of its local database.
- ZOUTIW is not liable for data loss caused by hardware failure, accidental erasure, or device theft.

## 4. Intellectual Property & Contact
- OmniChurch, ZOUTIW trademarks, and software assets remain the intellectual property of Jackson Charles.
- Official Contact: ${DEV_INFO.email}
- Official URL: https://omnichurch.download/terms-of-service`,
  },
  es: {
    title: 'Términos de Servicio Oficiales — OmniChurch Pro',
    lastUpdatedDate: '2026-11-26',
    content: `## Aceptación de los Términos
Al acceder a https://omnichurch.download o descargar y utilizar OmniChurch Pro en Android, Windows PC o Web, usted acepta cumplir con estos Términos de Servicio.

## 1. Licencia Gratuita para Iglesias
- Otorgamos a iglesias, ministerios y líderes cristianos una licencia gratuita y no exclusiva para descargar, instalar y utilizar OmniChurch Pro sin límites arbitrarios de miembros.

## 2. Conducta Prohibida
- Está prohibido revender, reempaquetar comercialmente o distribuir versiones no autorizadas de los instaladores oficiales (APK / EXE).
- Queda prohibido intentar vulnerar o interferir con la infraestructura de Cloud Firestore o los servicios del portal.
- Todas las reseñas públicas deben mantener un tono respetuoso y legal.

## 3. Copias de Seguridad y Limitación de Responsabilidad
- Debido a su arquitectura offline-first, cada congregación es responsable de realizar copias de seguridad periódicas de su base de datos local.
- ZOUTIW no se hace responsable por fallos físicos de hardware o robo de dispositivos.

## 4. Propiedad Intelectual y Contacto
- OmniChurch, la marca ZOUTIW y sus activos de software son propiedad intelectual de Jackson Charles.
- Contacto oficial: ${DEV_INFO.email}
- URL Oficial: https://omnichurch.download/terms-of-service`,
  },
};

export const DEFAULT_LEGAL_CONFIG: DeveloperEngineLegalConfig = {
  officialPrivacyUrl: 'https://omnichurch.download/privacy-policy',
  officialTermsUrl: 'https://omnichurch.download/terms-of-service',
  useExternalLinksOnClick: false,
  customPrivacy: {
    ht: { ...BUILTIN_PRIVACY_DOCS.ht },
    fr: { ...BUILTIN_PRIVACY_DOCS.fr },
    en: { ...BUILTIN_PRIVACY_DOCS.en },
    es: { ...BUILTIN_PRIVACY_DOCS.es },
  },
  customTerms: {
    ht: { ...BUILTIN_TERMS_DOCS.ht },
    fr: { ...BUILTIN_TERMS_DOCS.fr },
    en: { ...BUILTIN_TERMS_DOCS.en },
    es: { ...BUILTIN_TERMS_DOCS.es },
  },
  lastLegalUpdatedAt: '2026-11-26T00:00:00.000Z',
};

export const DEFAULT_APP_UPDATE: DeveloperEngineAppUpdate = {
  enabled: true,
  latestVersion: '1.1.0',
  currentVersion: '1.1.0',
  minRequiredVersion: '1.0.0',
  downloadUrl: 'https://omnichurch.download',
  androidDownloadUrl: DEFAULT_LINKS.android,
  pcDownloadUrl: DEFAULT_LINKS.pc,
  pc32DownloadUrl: DEFAULT_LINKS.pc32 || DEFAULT_LINKS.pc,
  macDownloadUrl: DEFAULT_LINKS.mac || '',
  channel: 'stable',
  isMandatory: false,
  releaseDate: '2026-11-26',
  targetPlatform: 'all',
  highlights: {
    ht: [
      'Kat Manm Vityèl 3D avèk kòd QR ak eskanè prezans rapid offline',
      'Senkronizasyon an tan reyèl avèk pòtay ofisyèl omnichurch.download',
      'Amelyorasyon estabilite sou Android APK ak Windows 64-bit / 32-bit',
    ],
    fr: [
      'Cartes de Membres Numériques 3D avec QR Code et scan de présence hors ligne',
      'Synchronisation en temps réel avec le portail officiel omnichurch.download',
      'Stabilité renforcée sur Android APK et Windows 64-bit / 32-bit',
    ],
    en: [
      '3D Digital Membership Cards with QR Code and instant offline attendance scan',
      'Real-time synchronization with the official omnichurch.download portal',
      'Improved stability on Android APK and Windows 64-bit / 32-bit installers',
    ],
    es: [
      'Credenciales Digitales 3D con Código QR y escáner de asistencia sin conexión',
      'Sincronización en tiempo real con el portal oficial omnichurch.download',
      'Mayor estabilidad en Android APK e instaladores Windows 64-bit / 32-bit',
    ],
  },
  importantNotice: {
    ht: 'Vèsyon 1.1.0 sa a gratis pou tout legliz epi li konpatib ak tout baz done vèsyon anvan yo.',
    fr: 'Cette version 1.1.0 est gratuite pour toutes les églises et compatible avec vos données existantes.',
    en: 'Version 1.1.0 is free for all churches and fully compatible with existing local databases.',
    es: 'La versión 1.1.0 es gratuita para todas las iglesias y compatible con bases de datos anteriores.',
  },
};

export const DEFAULT_DONATIONS: DeveloperEngineDonations = {
  enabled: true,
  enableShakeAnimation: true,
  shakeIntervalSeconds: 8,
  developerName: 'Jackson Charles',
  developerEmail: DEV_INFO.email,
  developerPhone: DEV_INFO.whatsapp,
  localizedCopy: {
    ht: {
      screenTitle: 'Soutni Pwojè OmniChurch Pro',
      screenSubtitle: 'Ede nou kenbe OmniChurch 100% gratis pou tout legliz ak ministè atravè lemond.',
      developerRole: 'Kreyatè & Devlopè Prensipal — ZOUTIW',
      developerBio: 'Nou konstwi zouti dijital pwofesyonèl pou ede legliz yo jere manm yo ak sekirite, modènite, ak efikasite.',
      customNote: 'Chak kontribisyon sèvi pou finanse sèvè nwaj, mizajou Android/PC, ak nouvo fonksyonalite gratis pou legliz yo.',
    },
    fr: {
      screenTitle: 'Soutenir le Projet OmniChurch Pro',
      screenSubtitle: 'Aidez-nous à maintenir OmniChurch 100% gratuit pour toutes les églises et ministères.',
      developerRole: 'Créateur & Développeur Principal — ZOUTIW',
      developerBio: 'Nous concevons des solutions numériques professionnelles pour moderniser la gestion des églises en toute sécurité.',
      customNote: 'Chaque don contribue à l’hébergement cloud, aux mises à jour Android/PC et au développement continu.',
    },
    en: {
      screenTitle: 'Support the OmniChurch Pro Project',
      screenSubtitle: 'Help us keep OmniChurch 100% free for churches, ministries, and communities worldwide.',
      developerRole: 'Founder & Lead Engineer — ZOUTIW',
      developerBio: 'Building resilient, privacy-first church management software for Android, Windows, and Web.',
      customNote: 'Every contribution directly supports cloud infrastructure, mobile/desktop releases, and ongoing church features.',
    },
    es: {
      screenTitle: 'Apoyar el Proyecto OmniChurch Pro',
      screenSubtitle: 'Ayúdanos a mantener OmniChurch 100% gratuito para todas las iglesias y ministerios.',
      developerRole: 'Fundador e Ingeniero Principal — ZOUTIW',
      developerBio: 'Creamos herramientas digitales seguras y modernas para fortalecer la gestión de las iglesias.',
      customNote: 'Cada aporte financia la infraestructura en la nube y nuevas actualizaciones gratuitas para Android y PC.',
    },
  },
  paypalEnabled: true,
  paypalEmail: DEV_INFO.email,
  paypalMeUrl: 'https://paypal.me/omnichurch',
  binanceEnabled: true,
  binancePayId: '',
  binanceUsdtAddress: '',
  binanceNetwork: 'TRC20 / BEP20',
  wiseEnabled: false,
  wiseEmail: DEV_INFO.email,
  wiseTag: '',
  wiseIban: '',
  moncashEnabled: true,
  moncashNumber: '+509',
  moncashName: 'Jackson Charles',
  zelleEnabled: false,
  zelleInfo: '',
};

export const DEFAULT_DEVELOPER_ENGINE_CONFIG: DeveloperEngineConfig = {
  legalConfig: DEFAULT_LEGAL_CONFIG,
  appUpdate: DEFAULT_APP_UPDATE,
  appUpdates: DEFAULT_APP_UPDATE,
  donations: DEFAULT_DONATIONS,
  maintenanceMode: false,
  maintenanceMessage: '',
  sponsors: [],
  showSponsorsInFooter: true,
};

/**
 * Safely merges partial Cloud Firestore `app_config/developer_engine` snapshots with defaults,
 * keeping `appUpdate` and `appUpdates` synchronized.
 */
export function mergeDeveloperEngineConfig(raw: Record<string, any> | undefined | null): DeveloperEngineConfig {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_DEVELOPER_ENGINE_CONFIG;
  }

  const rawLegal = raw.legalConfig || {};
  const mergedLegal: DeveloperEngineLegalConfig = {
    officialPrivacyUrl: rawLegal.officialPrivacyUrl || DEFAULT_LEGAL_CONFIG.officialPrivacyUrl,
    officialTermsUrl: rawLegal.officialTermsUrl || DEFAULT_LEGAL_CONFIG.officialTermsUrl,
    useExternalLinksOnClick:
      typeof rawLegal.useExternalLinksOnClick === 'boolean'
        ? rawLegal.useExternalLinksOnClick
        : DEFAULT_LEGAL_CONFIG.useExternalLinksOnClick,
    customPrivacy: {
      ht: { ...DEFAULT_LEGAL_CONFIG.customPrivacy.ht, ...(rawLegal.customPrivacy?.ht || {}) },
      fr: { ...DEFAULT_LEGAL_CONFIG.customPrivacy.fr, ...(rawLegal.customPrivacy?.fr || {}) },
      en: { ...DEFAULT_LEGAL_CONFIG.customPrivacy.en, ...(rawLegal.customPrivacy?.en || {}) },
      es: { ...DEFAULT_LEGAL_CONFIG.customPrivacy.es, ...(rawLegal.customPrivacy?.es || {}) },
    },
    customTerms: {
      ht: { ...DEFAULT_LEGAL_CONFIG.customTerms.ht, ...(rawLegal.customTerms?.ht || {}) },
      fr: { ...DEFAULT_LEGAL_CONFIG.customTerms.fr, ...(rawLegal.customTerms?.fr || {}) },
      en: { ...DEFAULT_LEGAL_CONFIG.customTerms.en, ...(rawLegal.customTerms?.en || {}) },
      es: { ...DEFAULT_LEGAL_CONFIG.customTerms.es, ...(rawLegal.customTerms?.es || {}) },
    },
    lastLegalUpdatedAt: rawLegal.lastLegalUpdatedAt || DEFAULT_LEGAL_CONFIG.lastLegalUpdatedAt,
  };

  const rawUpdate = raw.appUpdate || raw.appUpdates || {};
  const mergedUpdate: DeveloperEngineAppUpdate = {
    ...DEFAULT_APP_UPDATE,
    ...rawUpdate,
    highlights: {
      ht: Array.isArray(rawUpdate.highlights?.ht) ? rawUpdate.highlights.ht : DEFAULT_APP_UPDATE.highlights.ht,
      fr: Array.isArray(rawUpdate.highlights?.fr) ? rawUpdate.highlights.fr : DEFAULT_APP_UPDATE.highlights.fr,
      en: Array.isArray(rawUpdate.highlights?.en) ? rawUpdate.highlights.en : DEFAULT_APP_UPDATE.highlights.en,
      es: Array.isArray(rawUpdate.highlights?.es) ? rawUpdate.highlights.es : DEFAULT_APP_UPDATE.highlights.es,
    },
    importantNotice: {
      ht: rawUpdate.importantNotice?.ht ?? DEFAULT_APP_UPDATE.importantNotice.ht,
      fr: rawUpdate.importantNotice?.fr ?? DEFAULT_APP_UPDATE.importantNotice.fr,
      en: rawUpdate.importantNotice?.en ?? DEFAULT_APP_UPDATE.importantNotice.en,
      es: rawUpdate.importantNotice?.es ?? DEFAULT_APP_UPDATE.importantNotice.es,
    },
  };

  const rawDonations = raw.donations || {};
  const mergedDonations: DeveloperEngineDonations = {
    ...DEFAULT_DONATIONS,
    ...rawDonations,
    shakeIntervalSeconds:
      typeof rawDonations.shakeIntervalSeconds === 'number'
        ? Math.min(30, Math.max(3, rawDonations.shakeIntervalSeconds))
        : DEFAULT_DONATIONS.shakeIntervalSeconds,
    localizedCopy: {
      ht: { ...DEFAULT_DONATIONS.localizedCopy.ht, ...(rawDonations.localizedCopy?.ht || {}) },
      fr: { ...DEFAULT_DONATIONS.localizedCopy.fr, ...(rawDonations.localizedCopy?.fr || {}) },
      en: { ...DEFAULT_DONATIONS.localizedCopy.en, ...(rawDonations.localizedCopy?.en || {}) },
      es: { ...DEFAULT_DONATIONS.localizedCopy.es, ...(rawDonations.localizedCopy?.es || {}) },
    },
  };

  const sponsors = Array.isArray(raw.sponsors) ? raw.sponsors : [];

  return {
    legalConfig: mergedLegal,
    appUpdate: mergedUpdate,
    appUpdates: mergedUpdate,
    donations: mergedDonations,
    maintenanceMode: Boolean(raw.maintenanceMode),
    maintenanceMessage: typeof raw.maintenanceMessage === 'string' ? raw.maintenanceMessage : '',
    sponsors,
    showSponsorsInFooter:
      typeof raw.showSponsorsInFooter === 'boolean' ? raw.showSponsorsInFooter : true,
    updatedAt: raw.updatedAt,
    updatedBy: raw.updatedBy,
  };
}
