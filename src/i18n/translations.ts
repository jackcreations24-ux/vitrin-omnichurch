export type SupportedLang = 'ht' | 'fr' | 'en' | 'es';

export interface Translations {
  code: SupportedLang;
  label: string;
  flag: string;

  // Navigation
  nav: {
    home: string;
    features: string;
    installGuide: string;
    security: string;
    preview: string;
    download: string;
    contact: string;
    stableBadge: string;
    quickDownload: string;
    adminPanel: string;
    tagline: string;
  };

  // Hero Section
  hero: {
    eyebrow: string;
    eyebrowSub: string;
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    downloadApk: string;
    downloadPc: string;
    selectVersion: string;
    recommended: string;
    fastOffline: string;
    securePrivacy: string;
    freeForever: string;
    noCardNeeded: string;
    comingSoonIos: string;
    cardFrontTitle: string;
    cardBackTitle: string;
    cardFidelity: string;
    cardMemberName: string;
    cardChurchName: string;
    cardScanHint: string;
    cardFlipNotice: string;
    memberId: string;
    issueDate: string;
    validThru: string;
  };

  // Features Section
  features: {
    eyebrow: string;
    title: string;
    description: string;
    f1: {
      title: string;
      desc: string;
      badge: string;
      benefits: string[];
    };
    f2: {
      title: string;
      desc: string;
      badge: string;
      benefits: string[];
    };
    f3: {
      title: string;
      desc: string;
      badge: string;
      benefits: string[];
    };
    f4: {
      title: string;
      desc: string;
      badge: string;
      benefits: string[];
    };
  };

  // Installation Guide
  installGuide: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabMobile: string;
    tabPc: string;
    mobileSteps: Array<{
      num: string;
      title: string;
      desc: string;
      actionText: string;
    }>;
    pcSteps: Array<{
      num: string;
      title: string;
      desc: string;
      actionText: string;
    }>;
    badge: string;
    needHelp: string;
  };

  // Security & Tech Specs Section
  security: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pillars: Array<{
      badge: string;
      title: string;
      desc: string;
      highlights: string[];
    }>;
    specsTitle: string;
    specsBadge: string;
    specs: Array<{ label: string; value: string }>;
  };

  // Interactive Demo Preview
  demo: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabs: {
      members: string;
      messages: string;
      events: string;
      reports: string;
    };
    searchPlaceholder: string;
    addMemberBtn: string;
    sendAnnouncementBtn: string;
    announcementPlaceholder: string;
    announcementSuccess: string;
    membersCount: string;
    activeStatus: string;
    table: {
      name: string;
      role: string;
      phone: string;
      group: string;
      status: string;
    };
    stats: {
      totalMembers: string;
      attendanceRate: string;
      groupsActive: string;
      smsDelivered: string;
    };
  };

  // Download Section
  download: {
    eyebrow: string;
    title: string;
    subtitle: string;
    detectedBadge: string;
    downloadBtn: string;
    otherOptions: string;
    androidCard: {
      title: string;
      desc: string;
      btn: string;
      badge: string;
      note: string;
    };
    pcCard: {
      title: string;
      desc: string;
      btn: string;
      badge: string;
      note: string;
      archHelp: string;
    };
    macCard: {
      title: string;
      desc: string;
      btn: string;
      badge: string;
      note: string;
    };
    iosCard: {
      title: string;
      desc: string;
      btn: string;
      badge: string;
      note: string;
    };
  };

  // Contact & Footer
  footer: {
    about: string;
    supportTitle: string;
    supportDesc: string;
    whatsappBtn: string;
    telegramBtn: string;
    emailBtn: string;
    phoneBtn: string;
    backToTop: string;
    rights: string;
    madeWithLove: string;
    adminPanelBtn: string;
  };

  // Modals & Banners
  modals: {
    downloadTitle: string;
    chooseInstaller: string;
    directDownload: string;
    close: string;
    pcGuideTitle: string;
    smartScreenWarning: string;
    clickMoreInfo: string;
    runAnyway: string;
    copied: string;
    copy: string;
    downloadFile: string;
    comingSoonMessage: string;
  };

  downloadModal: {
    mobileTitle: string;
    mobileSubtitle: string;
    pcTitle: string;
    pcSubtitle: string;
    starting: string;
    download: string;
    comingSoon: string;
    androidTitle: string;
    androidBadge: string;
    androidDesc: string;
    iosTitle: string;
    iosDesc: string;
    qrTitle: string;
    qrDesc: string;
    win64Title: string;
    win64Badge: string;
    win64Desc: string;
    win32Title: string;
    win32Desc: string;
    macTitle: string;
    macDesc: string;
    detectedWindows: string;
    comingSoonAlert: string;
  };

  // Ads & Utilities
  ads: {
    advertisement: string;
    previewMode: string;
  };
}

export const translations: Record<SupportedLang, Translations> = {
  // ==================== KREYÒL AYISYEN ====================
  ht: {
    code: 'ht',
    label: 'Kreyòl',
    flag: '🇭🇹',
    nav: {
      home: 'Akèy',
      features: 'Fonksyon',
      installGuide: 'Gid Enstalasyon',
      security: 'Sekirite & Teknoloji',
      preview: 'Eksplore',
      download: 'Telechaje',
      contact: 'Kontak',
      stableBadge: 'v1.0.0 Etabli',
      quickDownload: 'Telechaje',
      adminPanel: 'Panèl Admin',
      tagline: 'Solisyon dijital pou legliz',
    },
    hero: {
      eyebrow: 'BYENVENI SOU OMNICHURCH',
      eyebrowSub: 'Platfòm Dijital Ofisyèl',
      badge: 'v1.0.0 Etabli',
      titlePrefix: 'Platfòm Dijital Ofisyèl pou',
      titleHighlight: 'OmniChurch',
      subtitle: 'Jesyon Legliz & Kat Manm Dijital',
      description:
        'Aplikasyon ofisyèl pou administrasyon legliz la: Kat Manm Vityèl ak kòd QR, eskanè prezans rapid, kominikasyon SMS an mas, ak jesyon offline 100% sekirize sou Android ak Windows PC.',
      downloadApk: 'Telechaje pou Android (APK)',
      downloadPc: 'Telechaje pou Windows PC (.EXE)',
      selectVersion: 'Chwazi vèsyon Windows ou an:',
      recommended: 'Rekòmande pou aparèy ou an',
      fastOffline: 'Fonksyone 100% San Entènèt',
      securePrivacy: 'Pwoteksyon Done Lokal',
      freeForever: 'Gratis pou Tout Legliz',
      noCardNeeded: 'Zewo Kat Kredi Obligatwa',
      comingSoonIos: 'Vèsyon iOS & Mac disponib talè',
      cardFrontTitle: 'Tabènak de Gras',
      cardBackTitle: 'Kat Manm Vityèl',
      cardFidelity: 'Fidèl Legliz la',
      cardMemberName: 'Jean-Baptiste Pierre',
      cardChurchName: 'Tabènak de Gras',
      cardScanHint: 'Eskane pou verifye idantite',
      cardFlipNotice: 'Pase sourit oswa klike pou vire kat la',
      memberId: 'ID: OC-2026-084',
      issueDate: 'Emisyon: Jan 2026',
      validThru: 'Valid: 2027',
    },
    features: {
      eyebrow: 'Fonksyonalite Kle OmniChurch',
      title: 'Poto Mitan Aplikasyon An pou Tout Kominote a',
      description:
        'Solisyon dijital konplè pou pastè, administratè ak manm legliz yo: jesyon efikas, rapid, ak disponiblite offline san entènèt.',
      f1: {
        title: 'Kat Manm Dijital & Kòd QR',
        desc: 'Chak fidèl jwenn yon kat manm vityèl sekirize ak kòd QR inik pou idantifikasyon rapid, patisipasyon nan koral, ak aktivite legliz la.',
        badge: 'Sekirize & Pèsonalize',
        benefits: ['Kat manm vityèl ak foto', 'Kòd QR inik pou chak fidèl', 'Aksè rapid san kontak'],
      },
      f2: {
        title: 'Siveyans Prezans Rapid',
        desc: 'Eskane kòd QR manm yo nan papòt legliz la pou anrejistre prezans nan chak kil, reyinyon lapriyè, oswa konferans espesyal.',
        badge: 'Eskanè An Tan Reyèl',
        benefits: ['Eskane nan papòt legliz la', 'Estatistik prezans otomatik', 'Fichye prezans san papye'],
      },
      f3: {
        title: 'Anons & Notifikasyon an Dirèk',
        desc: 'Voye anons ofisyèl, SMS an mas, ak piblikasyon dirèkteman bay tout manm yo oswa nan depatman espesifik an tan reyèl.',
        badge: 'Kominikasyon Instantane',
        benefits: ['SMS an mas pou tout manm', 'Alèt pou kil ak priyè espesyal', 'Notifikasyon pou komite & koral'],
      },
      f4: {
        title: '100% Offline & Sekirize',
        desc: 'Aplikasyon an fonksyone nèt san entènèt ak bazdone lokal SQLite ki pwoteje tout enfòmasyon legliz la sou aparèy la.',
        badge: '100% Prive & San Entènèt',
        benefits: ['Bazdone lokal sekirize sou aparèy', 'Zewo depandans sou koneksyon entènèt', 'Sovgard rapid e fasil pou ekspòte'],
      },
    },
    installGuide: {
      eyebrow: 'Etap Fasil & Rapid',
      title: 'Gid Enstalasyon OmniChurch',
      subtitle: 'Enstale aplikasyon an nan mwens pase 2 minit sou nenpòt telefòn Android oswa òdinatè Windows.',
      tabMobile: 'Enstalasyon Android (APK)',
      tabPc: 'Enstalasyon Windows (.EXE)',
      mobileSteps: [
        {
          num: '01',
          title: 'Klike sou Telechaje APK',
          desc: 'Telechaje vèsyon ofisyèl OmniChurch APK a (gwosè apeprè 18 MB) dirèkteman sou telefòn ou.',
          actionText: 'Telechaje APK Kounye a',
        },
        {
          num: '02',
          title: 'Otorize Enstalasyon an',
          desc: 'Si telefòn ou mande pèmisyon, aksepte "Enstale aplikasyon sous enkoni" pou pèmèt Android mete APK a.',
          actionText: 'Gade Sekirite & Pèmisyon',
        },
        {
          num: '03',
          title: 'Konekte & Jwenn Kat Manm',
          desc: 'Lanse OmniChurch, antre kòd sekirite legliz ou a, epi jwenn Kat Manm Vityèl ak kòd QR ou imedyatman!',
          actionText: 'Pare pou Itilize',
        },
      ],
      pcSteps: [
        {
          num: '01',
          title: 'Telechaje Enstalatè PC (.EXE)',
          desc: 'Chwazi vèsyon 64-bit oswa 32-bit ki koresponn ak sistèm Windows ou a epi telechaje fichye .exe a.',
          actionText: 'Telechaje pou Windows',
        },
        {
          num: '02',
          title: 'Lanse Enstalasyon an',
          desc: 'Klike de fwa sou "OmniChurch-Setup.exe". Si Windows SmartScreen parèt, klike "Plis enfòmasyon" epi "Egzekite kanmenm".',
          actionText: 'Gid SmartScreen',
        },
        {
          num: '03',
          title: 'Lanse & Òganize Legliz Ou',
          desc: 'Lojisyèl la ap louvri imedyatman nan mòd offline lokal san bezwen entènèt pou enprime rapò ak anyè manm.',
          actionText: 'Pare pou Biwo',
        },
      ],
      badge: 'Gid Etabli',
      needHelp: 'Ou bezwen èd pou enstalasyon an? Kontakte sipò teknik la dirèkteman.',
    },
    security: {
      eyebrow: 'Teknoloji & Pwoteksyon Done',
      title: 'Sekirite Lokal & Achitekti Offline-First',
      subtitle:
        'Konstwi pou pwoteje vi prive kominote w la avèk yon baz done SQLite lokal ultra-rapid ki pa depann de okenn sèvè etranje.',
      pillars: [
        {
          badge: 'Zewo Depandans Entènèt',
          title: 'Offline-First & Baz Done Lokal',
          desc: 'Tout enfòmasyon legliz la (anyè manm, dim, ofrann, rapò kil) rete konsève dirèkteman sou aparèy legliz la. Lojisyèl la fonksyone nèt san entènèt pou sèvis yo pa janm entewonp.',
          highlights: ['Aksè 100% san koneksyon', 'Baz done lokal ultra-rapid', 'Zewo depandans sou sèvè etranje'],
        },
        {
          badge: 'Konfidansyalite Garanti',
          title: 'Pwoteksyon & Konfidansyalite Total',
          desc: 'Enfòmasyon pèsonèl manm yo ak rapò finansye yo rete strikman konfidansyèl sou aparèy legliz la. Se sèl dirijan yo ki gen aksè a dosye legliz la.',
          highlights: ['Dosye lokal pwoteje', 'Aksè rezève pou dirijan', 'Entegrite dosye finansyè'],
        },
        {
          badge: 'Lejè & Pèfòman',
          title: 'Motè Ultra-Rapid (64 & 32-bit)',
          desc: 'Optimizasyon espesyal pou tout tip materyèl: PC Windows modèn (64-bit), ansyen PC legliz (32-bit x86 ki gen 2GB RAM), ak telefòn Android ekonomik san ralantisman.',
          highlights: ['Ouvri an mwens pase 1s', 'Konsomasyon RAM enferyè a 65MB', 'Sipò konplè Windows 32/64-bit'],
        },
        {
          badge: 'Kontwòl Total',
          title: 'Sovgard Nwaj Siwoutab (Opsyonèl)',
          desc: 'Legliz la ka chwazi kreye kopi sovgard fasilman. Si ta gen yon chanjman òdinatè, responsab la ka restore tout enfòmasyon yo an yon sèl klik.',
          highlights: ['Sovgard senp an 1-klik', 'Restorasyon fasil ak rapid', 'Pwoteksyon dosye legliz la'],
        },
      ],
      specsTitle: 'Espesifikasyon Teknik Ofisyèl',
      specsBadge: 'Konpatibilite Total',
      specs: [
        { label: 'Baz Done', value: 'Lokal (SQLite)' },
        { label: 'Pwoteksyon', value: 'Lokal & Konfidansyèl' },
        { label: 'Mòd Rezo', value: '100% Offline (Endepandan)' },
        { label: 'Sistèm', value: 'Windows, Android, Mac' },
        { label: 'Vi Prive', value: '100% Prive, Zewo Pataj' },
        { label: 'Sovgard', value: 'Lokal oswa Nwaj (Opsyonèl)' },
      ],
    },
    demo: {
      eyebrow: 'Demonstrasyon Entèaktif',
      title: 'Eksplore Panèl Administrasyon an Dirèk',
      subtitle: 'Teste koòdone lojisyèl la an aksyon: anyè manm, voye anons SMS, planifikasyon kil ak estatistik.',
      tabs: {
        members: 'Anyè Manm',
        messages: 'Voye SMS & Alèt',
        events: 'Kalandriye Kil',
        reports: 'Rapò Finansyè',
      },
      searchPlaceholder: 'Chèche yon manm pa non, depatman oswa wòl...',
      addMemberBtn: 'Ajoute yon Manm',
      sendAnnouncementBtn: 'Voye SMS la Kounye a',
      announcementPlaceholder: 'Tape tèks anons lan isit la (egz: Rapèl kil lapriyè demen maten a 6h00 AM)...',
      announcementSuccess: 'Anons SMS la voye bay tout manm yo avèk siksè!',
      membersCount: '1,248 Manm Anrejistre',
      activeStatus: 'Aktif',
      table: {
        name: 'Non & Prenon',
        role: 'Wòl / Pozisyon',
        phone: 'Telefòn',
        group: 'Depatman',
        status: 'Eta',
      },
      stats: {
        totalMembers: 'Total Manm',
        attendanceRate: 'Pousantaj Prezans',
        groupsActive: 'Depatman Aktif',
        smsDelivered: 'SMS Voye Mwa Sa A',
      },
    },
    download: {
      eyebrow: 'Aksè Imedya & Gratis',
      title: 'Telechaje OmniChurch Kounye a',
      subtitle: 'Chwazi platfòm ou a epi kòmanse transfòme jesyon legliz ou a jodi a menm sou Android, Windows ak Mac.',
      detectedBadge: 'Detekte sou aparèy ou an',
      downloadBtn: 'Telechaje Kounye a',
      otherOptions: 'Lòt Opsyon & Vèsyon',
      androidCard: {
        title: 'Android (Telefòn & Tablèt)',
        desc: 'Fichye APK dirèk pare pou enstale sou nenpòt aparèy Android 7.0 oswa pi resan.',
        btn: 'Telechaje APK (Android)',
        badge: 'Vèsyon Prensipal Mobil',
        note: 'Gwosè: ~18 MB • San piblisite • 100% gratis',
      },
      pcCard: {
        title: 'Windows PC (Biwo & Sekretarya)',
        desc: 'Enstalatè ofisyèl pou òdinatè biwo legliz la avèk enpresyon kat ak rapò.',
        btn: 'Telechaje pou Windows (.exe)',
        badge: 'Vèsyon Biwo & Sekretarya',
        note: 'Sipòte Windows 11, 10, 8, 7 • Disponib an 64-bit ak 32-bit',
        archHelp: 'Gid Konfigirasyon 32/64-bit',
      },
      macCard: {
        title: 'macOS (Apple Mac)',
        desc: 'Fichye DMG inivèsèl konpatib ak Apple Silicon (M1/M2/M3) ak procesè Intel.',
        btn: 'Telechaje pou Mac (.dmg)',
        badge: 'macOS Inivèsèl',
        note: 'macOS 11.0 oswa pi resan',
      },
      iosCard: {
        title: 'iPhone & iPad (iOS)',
        desc: 'Disponib talè sou Apple App Store pou fidèl yo jwenn kat manm yo sou iPhone.',
        btn: 'Disponib Talè sou App Store',
        badge: 'Apple iOS',
        note: 'Nan faz verifikasyon Apple',
      },
    },
    footer: {
      about: 'Solisyon dijital pwofesyonèl pou modènize jesyon ak kominikasyon legliz yo. Bati pou sèvi tout kominote kretyen.',
      supportTitle: 'Sipò & Kominikasyon',
      supportDesc: 'Chwazi yon kanal pou kontakte ekip sipò OmniChurch la dirèkteman:',
      whatsappBtn: 'WhatsApp Ofisyèl',
      telegramBtn: 'Telegram Sipò',
      emailBtn: 'Imèl Asistans',
      phoneBtn: 'Apèl Dirèk',
      backToTop: 'Anlè',
      rights: '© 2026 ZOUTIW RESERVED. · Tout dwa rezève.',
      madeWithLove: 'Devlope avèk devouman pa Jackson Charles pou kominote kretyen yo.',
      adminPanelBtn: 'Panèl Admin',
    },
    modals: {
      downloadTitle: 'Telechaje OmniChurch',
      chooseInstaller: 'Chwazi fichye enstalasyon ki koresponn ak aparèy ou an:',
      directDownload: 'Telechaje Dirèk',
      close: 'Fèmen',
      pcGuideTitle: 'Gid Enstalasyon Windows & SmartScreen',
      smartScreenWarning: 'Si Windows SmartScreen parèt:',
      clickMoreInfo: '1. Klike sou "Plus d\'informations" (More info)',
      runAnyway: '2. Klike sou "Exécuter quand même" (Run anyway)',
      copied: 'Kopye nan clipboard!',
      copy: 'Kopye',
      downloadFile: 'Telechaje Fichye a',
      comingSoonMessage: 'Vèsyon sa a ap finalize epi l ap disponib talè!',
    },
    downloadModal: {
      mobileTitle: 'Telechaje pou Telefòn & Tablet',
      mobileSubtitle: 'Chwazi vèsyon ki koresponn ak sistèm mobil ou an',
      pcTitle: 'Telechaje pou Òdinatè (PC)',
      pcSubtitle: 'Chwazi vèsyon ki adapte ak sistèm operasyon Windows ou an',
      starting: 'Ap kòmanse...',
      download: 'Telechaje',
      comingSoon: 'Disponib Talè',
      androidTitle: 'Android APK Dirèk',
      androidBadge: 'DISPONIB • 38 MB',
      androidDesc: 'Enstale san pase pa Play Store',
      iosTitle: 'Apple iOS / iPhone',
      iosDesc: 'Vèsyon App Store ap prepare',
      qrTitle: 'Eskane ak Kamera Telefòn Ou',
      qrDesc: 'Pou telechaje fichye APK a dirèkteman sou telefòn ou san kopye okenn lyen.',
      win64Title: 'Windows 64-bit (x64)',
      win64Badge: 'REKÒMANDE POU PC OU',
      win64Desc: 'Pou Windows 11 ak majorite Windows 10',
      win32Title: 'Windows 32-bit (x86)',
      win32Desc: 'Pou pi ansyen PC Windows 7/8/10 32-bit',
      macTitle: 'Apple Mac (macOS)',
      macDesc: 'Fichye .dmg pou Mac M1/M2/M3 & Intel',
      detectedWindows: 'Sistèm ou detekte: Windows',
      comingSoonAlert: 'ap devlope aktivman epi l ap disponib talè sou magazen ofisyèl la.',
    },
    ads: {
      advertisement: 'Piblisite / Advertisement',
      previewMode: 'Mòd Apèsi',
    },
  },

  // ==================== FRANÇAIS ====================
  fr: {
    code: 'fr',
    label: 'Français',
    flag: '🇫🇷',
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      installGuide: "Guide d'Installation",
      security: 'Sécurité & Tech',
      preview: 'Découvrir',
      download: 'Télécharger',
      contact: 'Contact',
      stableBadge: 'v1.0.0 Stable',
      quickDownload: 'Télécharger',
      adminPanel: 'Panneau Admin',
      tagline: 'Solution numérique pour les églises',
    },
    hero: {
      eyebrow: 'BIENVENUE SUR OMNICHURCH',
      eyebrowSub: 'Plateforme Numérique Officielle',
      badge: 'v1.0.0 Stable',
      titlePrefix: 'Plateforme Numérique Officielle pour',
      titleHighlight: 'OmniChurch',
      subtitle: 'Gestion d’Église & Carte de Membre Digitale',
      description:
        'Application officielle pour l’administration ecclésiale : Carte de membre virtuelle avec code QR, pointage des présences en temps réel, alertes SMS de masse et gestion 100% hors-ligne sur Android et Windows PC.',
      downloadApk: 'Télécharger pour Android (APK)',
      downloadPc: 'Télécharger pour Windows PC (.EXE)',
      selectVersion: 'Choisissez votre version Windows :',
      recommended: 'Recommandé pour votre appareil',
      fastOffline: 'Fonctionne 100% Hors-Ligne',
      securePrivacy: 'Données Protégées Localement',
      freeForever: 'Gratuit pour Toutes les Églises',
      noCardNeeded: 'Aucune Carte de Crédit Requise',
      comingSoonIos: 'Versions iOS & Mac bientôt disponibles',
      cardFrontTitle: 'Tabernacle de Grâce',
      cardBackTitle: 'Carte de Membre Virtuelle',
      cardFidelity: 'Fidèle de l’Église',
      cardMemberName: 'Jean-Baptiste Pierre',
      cardChurchName: 'Tabernacle de Grâce',
      cardScanHint: 'Scannez pour vérifier l’identité',
      cardFlipNotice: 'Survolez ou cliquez pour retourner la carte',
      memberId: 'ID : OC-2026-084',
      issueDate: 'Émission : Janv 2026',
      validThru: 'Validité : 2027',
    },
    features: {
      eyebrow: 'Fonctionnalités Clés d’OmniChurch',
      title: 'Le Pilier Numérique pour Toute la Communauté',
      description:
        'Solution numérique complète pour pasteurs, administrateurs et membres : gestion fluide, rapide et disponible hors-ligne sans connexion internet.',
      f1: {
        title: 'Carte de Membre Digitale & QR Code',
        desc: 'Chaque fidèle dispose d’une carte de membre virtuelle sécurisée avec QR code unique pour une identification instantanée et sans contact.',
        badge: 'Sécurisé & Personnalisé',
        benefits: ['Carte virtuelle avec photo', 'Code QR individuel chiffré', 'Accès rapide sans contact'],
      },
      f2: {
        title: 'Pointage Rapide des Présences',
        desc: 'Scannez les codes QR des membres à l’entrée du sanctuaire pour enregistrer automatiquement la présence lors des cultes et conférences.',
        badge: 'Scan en Temps Réel',
        benefits: ['Pointage rapide à l’entrée', 'Statistiques de présence automatiques', 'Zéro registre papier'],
      },
      f3: {
        title: 'Annonces & Notifications Directes',
        desc: 'Diffusez des annonces officielles, SMS de masse et messages urgents à toute la congrégation ou à des départements spécifiques.',
        badge: 'Communication Instantanée',
        benefits: ['SMS de masse pour tous les fidèles', 'Alertes cultes et réunions de prière', 'Notifications comités & chorales'],
      },
      f4: {
        title: '100% Hors-Ligne & Données Protégées',
        desc: 'L’application fonctionne intégralement sans connexion internet grâce à un moteur SQLite local préservant vos registres sur votre appareil.',
        badge: '100% Privé & Sans Internet',
        benefits: ['Base de données locale sécurisée', 'Zéro dépendance aux serveurs distants', 'Sauvegardes faciles à exporter'],
      },
    },
    installGuide: {
      eyebrow: 'Simple & Rapide',
      title: "Guide d'Installation OmniChurch",
      subtitle: 'Installez l’application en moins de 2 minutes sur tout smartphone Android ou ordinateur Windows.',
      tabMobile: 'Installation Android (APK)',
      tabPc: 'Installation Windows (.EXE)',
      mobileSteps: [
        {
          num: '01',
          title: 'Télécharger le fichier APK',
          desc: 'Téléchargez la version officielle de l’APK OmniChurch (~18 Mo) directement sur votre téléphone.',
          actionText: 'Télécharger l’APK',
        },
        {
          num: '02',
          title: 'Autoriser l’installation',
          desc: 'Si votre smartphone vous le demande, activez l’option "Installer des applications de sources inconnues" dans les paramètres.',
          actionText: 'Paramètres de Sécurité',
        },
        {
          num: '03',
          title: 'Connexion & Carte Virtuelle',
          desc: 'Ouvrez OmniChurch, entrez le code de votre église et accédez immédiatement à votre Carte de Membre Digitale !',
          actionText: 'Prêt à l’Emploi',
        },
      ],
      pcSteps: [
        {
          num: '01',
          title: 'Télécharger l’Installateur PC (.EXE)',
          desc: 'Sélectionnez la version 64 bits ou 32 bits correspondant à votre PC Windows et téléchargez l’exécutable.',
          actionText: 'Télécharger pour Windows',
        },
        {
          num: '02',
          title: 'Lancer l’installation',
          desc: 'Double-cliquez sur "OmniChurch-Setup.exe". Si Windows SmartScreen apparaît, cliquez sur "Plus d’informations" puis "Exécuter quand même".',
          actionText: 'Guide SmartScreen',
        },
        {
          num: '03',
          title: 'Organiser votre Église',
          desc: 'Le logiciel se lance aussitôt en mode hors-ligne sans connexion internet pour imprimer rapports, annuaires et fiches.',
          actionText: 'Prêt pour le Secrétariat',
        },
      ],
      badge: 'Guide Éprouvé',
      needHelp: 'Besoin d’aide pour l’installation ? Contactez directement notre support technique.',
    },
    security: {
      eyebrow: 'Architecture & Confidentialité',
      title: 'Sécurité Locale & Philosophie Offline-First',
      subtitle:
        'Conçu pour préserver scrupuleusement la confidentialité de votre assemblée avec une base SQLite embarquée ultra-rapide.',
      pillars: [
        {
          badge: 'Zéro Dépendance Web',
          title: 'Offline-First & Base Locale',
          desc: 'Tous les registres (membres, dîmes, offrandes, rapports) demeurent sur l’appareil de l’église. Les cultes ne sont jamais interrompus.',
          highlights: ['Fonctionnement autonome 100%', 'Moteur local haute performance', 'Zéro dépendance aux serveurs externes'],
        },
        {
          badge: 'Confidentialité Totale',
          title: 'Protection Rigoureuse des Données',
          desc: 'Les informations personnelles et financières restent strictement confidentielles sur les machines du secrétariat.',
          highlights: ['Fichiers locaux chiffrés', 'Accès réservé aux dirigeants', 'Intégrité financière garantie'],
        },
        {
          badge: 'Ultra Léger & Fluide',
          title: 'Moteur Optimisé (64 & 32 bits)',
          desc: 'Compatible avec les PC modernes et les ordinateurs d’église plus anciens (32 bits avec 2 Go de RAM), ainsi que les smartphones Android d’entrée de gamme.',
          highlights: ['Démarrage en moins d’une seconde', 'Empreinte RAM inférieure à 65 Mo', 'Support Windows 64/32 bits complet'],
        },
        {
          badge: 'Maîtrise Absolue',
          title: 'Sauvegardes Sécurisées (Optionnel)',
          desc: 'Exportez facilement une copie de sécurité sur clé USB ou stockage cloud chiffré pour restaurer vos données en 1 clic.',
          highlights: ['Sauvegarde en un clic', 'Restauration rapide et sans perte', 'Pérennité de vos archives'],
        },
      ],
      specsTitle: 'Spécifications Techniques Officielles',
      specsBadge: 'Compatibilité Étendue',
      specs: [
        { label: 'Base de Données', value: 'Locale (SQLite embarquée)' },
        { label: 'Confidentialité', value: 'Locale & Rigoureuse' },
        { label: 'Mode Réseau', value: '100% Hors-Ligne (Autonome)' },
        { label: 'Plateformes', value: 'Windows, Android, macOS' },
        { label: 'Vie Privée', value: '100% Privé, Zéro Revente' },
        { label: 'Sauvegardes', value: 'Locale ou Cloud (Optionnel)' },
      ],
    },
    demo: {
      eyebrow: 'Démonstration Interactive',
      title: 'Explorez le Panneau d’Administration en Direct',
      subtitle: 'Testez l’interface du logiciel en action : annuaire des membres, diffusion d’alertes SMS, cultes et statistiques.',
      tabs: {
        members: 'Annuaire des Membres',
        messages: 'SMS & Diffusions',
        events: 'Calendrier des Cultes',
        reports: 'Rapports & Statistiques',
      },
      searchPlaceholder: 'Rechercher un membre par nom, département ou rôle...',
      addMemberBtn: 'Ajouter un Membre',
      sendAnnouncementBtn: 'Envoyer le SMS Maintenant',
      announcementPlaceholder: 'Rédigez l’annonce ici (ex: Rappel : Culte de prière demain matin à 6h00)...',
      announcementSuccess: 'L’alerte SMS a été diffusée avec succès à tous les membres !',
      membersCount: '1 248 Membres Enregistrés',
      activeStatus: 'Actif',
      table: {
        name: 'Nom & Prénom',
        role: 'Fonction / Rôle',
        phone: 'Téléphone',
        group: 'Département',
        status: 'Statut',
      },
      stats: {
        totalMembers: 'Total Membres',
        attendanceRate: 'Taux de Présence',
        groupsActive: 'Groupes Actifs',
        smsDelivered: 'SMS Envoyés ce Mois',
      },
    },
    download: {
      eyebrow: 'Accès Immédiat & Gratuit',
      title: 'Téléchargez OmniChurch Maintenant',
      subtitle: 'Choisissez votre plateforme et commencez à moderniser l’administration de votre église sur Android, Windows et Mac.',
      detectedBadge: 'Détecté sur votre appareil',
      downloadBtn: 'Télécharger Maintenant',
      otherOptions: 'Autres Versions Disponibles',
      androidCard: {
        title: 'Android (Smartphones & Tablettes)',
        desc: 'Fichier APK direct prêt à l’installation sur tout appareil Android 7.0 ou supérieur.',
        btn: 'Télécharger l’APK (Android)',
        badge: 'Version Mobile Principale',
        note: 'Taille : ~18 Mo • Sans publicité • 100% Gratuit',
      },
      pcCard: {
        title: 'Windows PC (Bureau & Secrétariat)',
        desc: 'Installateur officiel pour le secrétariat et les postes d’accueil avec impression de cartes et de bilans.',
        btn: 'Télécharger pour Windows (.exe)',
        badge: 'Version Bureau & Secrétariat',
        note: 'Windows 11, 10, 8, 7 • Disponible en 64 bits et 32 bits',
        archHelp: 'Guide d’Aide 32/64 bits',
      },
      macCard: {
        title: 'macOS (Apple Mac)',
        desc: 'Image DMG universelle compatible avec les puces Apple Silicon (M1/M2/M3) et processeurs Intel.',
        btn: 'Télécharger pour Mac (.dmg)',
        badge: 'macOS Universel',
        note: 'macOS 11.0 ou version ultérieure',
      },
      iosCard: {
        title: 'iPhone & iPad (iOS)',
        desc: 'Bientôt disponible sur l’App Store d’Apple pour les membres souhaitant leur carte sur iPhone.',
        btn: 'Bientôt sur l’App Store',
        badge: 'Apple iOS',
        note: 'En cours de validation Apple',
      },
    },
    footer: {
      about: 'Solution numérique professionnelle pour moderniser la gestion et la communication des églises chrétiennes.',
      supportTitle: 'Assistance & Communication',
      supportDesc: 'Sélectionnez un canal pour joindre directement l’équipe OmniChurch :',
      whatsappBtn: 'WhatsApp Officiel',
      telegramBtn: 'Support Telegram',
      emailBtn: 'Courriel d’Assistance',
      phoneBtn: 'Ligne Directe',
      backToTop: 'Haut de page',
      rights: '© 2026 ZOUTIW RESERVED. · Tous droits réservés.',
      madeWithLove: 'Développé avec dévouement par Jackson Charles pour la communauté chrétienne.',
      adminPanelBtn: 'Panneau Admin',
    },
    modals: {
      downloadTitle: 'Télécharger OmniChurch',
      chooseInstaller: 'Sélectionnez l’installateur correspondant à votre équipement :',
      directDownload: 'Téléchargement Direct',
      close: 'Fermer',
      pcGuideTitle: 'Guide Windows & SmartScreen',
      smartScreenWarning: 'Si l’avertissement Windows SmartScreen s’affiche :',
      clickMoreInfo: '1. Cliquez sur "Plus d’informations"',
      runAnyway: '2. Cliquez sur "Exécuter quand même"',
      copied: 'Copié dans le presse-papier !',
      copy: 'Copier',
      downloadFile: 'Télécharger le Fichier',
      comingSoonMessage: 'Cette version est en phase finale et sera disponible très bientôt !',
    },
    downloadModal: {
      mobileTitle: 'Télécharger pour Smartphone & Tablette',
      mobileSubtitle: 'Sélectionnez l’option correspondant à votre système mobile',
      pcTitle: 'Télécharger pour Ordinateur (PC)',
      pcSubtitle: 'Sélectionnez l’installateur adapté à votre système Windows',
      starting: 'Démarrage...',
      download: 'Télécharger',
      comingSoon: 'Bientôt Disponible',
      androidTitle: 'Android APK Direct',
      androidBadge: 'DISPONIBLE • 38 Mo',
      androidDesc: 'Installez directement sans passer par Google Play Store',
      iosTitle: 'Apple iOS / iPhone',
      iosDesc: 'Version officielle App Store en cours de finalisation',
      qrTitle: 'Scannez avec l’appareil photo de votre téléphone',
      qrDesc: 'Téléchargez le fichier APK directement sur votre mobile sans copier de lien.',
      win64Title: 'Windows 64-bit (x64)',
      win64Badge: 'RECOMMANDÉ POUR VOTRE PC',
      win64Desc: 'Pour Windows 11 et la majorité des ordinateurs Windows 10',
      win32Title: 'Windows 32-bit (x86)',
      win32Desc: 'Pour les anciens PC équipés de Windows 7/8/10 32-bit',
      macTitle: 'Apple Mac (macOS)',
      macDesc: 'Image disque .dmg pour processeurs Mac Apple Silicon et Intel',
      detectedWindows: 'Votre système détecté : Windows',
      comingSoonAlert: 'est en développement actif et sera bientôt disponible sur le store officiel.',
    },
    ads: {
      advertisement: 'Publicité / Advertisement',
      previewMode: 'Mode Aperçu',
    },
  },

  // ==================== ENGLISH ====================
  en: {
    code: 'en',
    label: 'English',
    flag: '🇺🇸',
    nav: {
      home: 'Home',
      features: 'Features',
      installGuide: 'Install Guide',
      security: 'Security & Tech',
      preview: 'Explore',
      download: 'Download',
      contact: 'Contact',
      stableBadge: 'v1.0.0 Stable',
      quickDownload: 'Download',
      adminPanel: 'Admin Panel',
      tagline: 'Digital solution for churches',
    },
    hero: {
      eyebrow: 'WELCOME TO OMNICHURCH',
      eyebrowSub: 'Official Digital Platform',
      badge: 'v1.0.0 Stable',
      titlePrefix: 'Official Digital Platform for',
      titleHighlight: 'OmniChurch',
      subtitle: 'Church Management & Digital Membership Cards',
      description:
        'Official application for church administration: Virtual Membership Cards with QR codes, rapid attendance tracking, mass SMS broadcasts, and 100% offline local management on Android and Windows PC.',
      downloadApk: 'Download for Android (APK)',
      downloadPc: 'Download for Windows PC (.EXE)',
      selectVersion: 'Select your Windows version:',
      recommended: 'Recommended for your device',
      fastOffline: 'Works 100% Offline',
      securePrivacy: 'Local Data Protection',
      freeForever: 'Free for All Churches',
      noCardNeeded: 'No Credit Card Required',
      comingSoonIos: 'iOS & Mac versions coming soon',
      cardFrontTitle: 'Tabernacle of Grace',
      cardBackTitle: 'Virtual Member Card',
      cardFidelity: 'Church Member',
      cardMemberName: 'Jean-Baptiste Pierre',
      cardChurchName: 'Tabernacle of Grace',
      cardScanHint: 'Scan to verify identity',
      cardFlipNotice: 'Hover or click to flip the card',
      memberId: 'ID: OC-2026-084',
      issueDate: 'Issued: Jan 2026',
      validThru: 'Valid: 2027',
    },
    features: {
      eyebrow: 'OmniChurch Core Features',
      title: 'The Digital Backbone for Your Entire Community',
      description:
        'A comprehensive digital suite for pastors, church administrators, and congregation members: fast, reliable, and available offline without internet.',
      f1: {
        title: 'Digital Member Cards & QR Codes',
        desc: 'Every member receives a virtual card with a unique QR code for seamless contactless identification and check-ins.',
        badge: 'Secure & Personalized',
        benefits: ['Virtual member card with photo', 'Encrypted individual QR code', 'Fast contactless check-in'],
      },
      f2: {
        title: 'Rapid Attendance Scanning',
        desc: 'Scan member QR codes at the church entrance to automatically record attendance across Sunday services and prayer meetings.',
        badge: 'Real-Time Scanning',
        benefits: ['Entrance door check-in', 'Automated attendance records', 'Zero paper attendance books'],
      },
      f3: {
        title: 'Instant Announcements & SMS',
        desc: 'Send official church announcements, mass SMS updates, and alerts directly to all members or specific ministry departments.',
        badge: 'Instant Communication',
        benefits: ['Mass SMS broadcast to all members', 'Worship service & prayer alerts', 'Ministry & choir group notices'],
      },
      f4: {
        title: '100% Offline & Data Security',
        desc: 'The app works completely without internet via an embedded SQLite database that keeps all church records private on your device.',
        badge: '100% Private & Offline',
        benefits: ['Secure on-device local database', 'Zero dependence on remote servers', 'Easy one-click backup exports'],
      },
    },
    installGuide: {
      eyebrow: 'Fast & Simple',
      title: 'OmniChurch Installation Guide',
      subtitle: 'Install the application in under 2 minutes on any Android smartphone or Windows computer.',
      tabMobile: 'Android Installation (APK)',
      tabPc: 'Windows Installation (.EXE)',
      mobileSteps: [
        {
          num: '01',
          title: 'Download the APK file',
          desc: 'Download the official OmniChurch APK (~18 MB) directly to your mobile device.',
          actionText: 'Download APK Now',
        },
        {
          num: '02',
          title: 'Allow installation',
          desc: 'If prompted by Android, grant permission to "Install apps from unknown sources" in settings.',
          actionText: 'Security Settings Guide',
        },
        {
          num: '03',
          title: 'Login & Access Your Card',
          desc: 'Launch OmniChurch, enter your church security code, and access your Digital Member Card immediately!',
          actionText: 'Ready to Use',
        },
      ],
      pcSteps: [
        {
          num: '01',
          title: 'Download PC Installer (.EXE)',
          desc: 'Select the 64-bit or 32-bit installer matching your Windows PC architecture and download the file.',
          actionText: 'Download for Windows',
        },
        {
          num: '02',
          title: 'Run Setup',
          desc: 'Double-click "OmniChurch-Setup.exe". If Windows SmartScreen prompts, click "More info" then "Run anyway".',
          actionText: 'SmartScreen Guide',
        },
        {
          num: '03',
          title: 'Organize Your Church',
          desc: 'The software opens instantly in local offline mode without internet to print directories, badges, and reports.',
          actionText: 'Ready for Office',
        },
      ],
      badge: 'Verified Guide',
      needHelp: 'Need help installing? Reach out directly to our technical support team.',
    },
    security: {
      eyebrow: 'Technology & Data Privacy',
      title: 'Local Security & Offline-First Philosophy',
      subtitle:
        'Built to protect your congregation’s privacy with a lightning-fast embedded SQLite database free from third-party server dependency.',
      pillars: [
        {
          badge: 'Zero Internet Dependency',
          title: 'Offline-First & Local Database',
          desc: 'All church records (membership directories, tithes, offerings, reports) stay safe directly on your church hardware. Services run smoothly uninterrupted.',
          highlights: ['100% offline operation', 'High-speed local database', 'Zero foreign server dependency'],
        },
        {
          badge: 'Guaranteed Privacy',
          title: 'Total Confidentiality & Protection',
          desc: 'Personal information and financial records remain strictly confidential on church devices. Access is restricted to authorized leaders.',
          highlights: ['Protected local records', 'Leadership-only access', 'Financial data integrity'],
        },
        {
          badge: 'Lightweight & Fast',
          title: 'Optimized Engine (64 & 32-bit)',
          desc: 'Engineered for modern 64-bit PCs, legacy church computers (32-bit x86 with 2GB RAM), and budget Android smartphones without lagging.',
          highlights: ['Instant boot in under 1 second', 'Memory footprint under 65MB RAM', 'Full 32/64-bit Windows support'],
        },
        {
          badge: 'Complete Ownership',
          title: 'Flexible Backups (Optional)',
          desc: 'Export encrypted backups to flash drives or secure cloud storage to restore records effortlessly whenever needed.',
          highlights: ['Simple one-click backup', 'Rapid seamless restoration', 'Long-term church archives safe'],
        },
      ],
      specsTitle: 'Official Technical Specifications',
      specsBadge: 'Full Compatibility',
      specs: [
        { label: 'Database', value: 'Local (Embedded SQLite)' },
        { label: 'Privacy', value: 'Local & Confidential' },
        { label: 'Network Mode', value: '100% Offline (Self-Sufficient)' },
        { label: 'Platforms', value: 'Windows, Android, Mac' },
        { label: 'Data Policy', value: '100% Private, Zero Tracking' },
        { label: 'Backup', value: 'Local or Cloud (Optional)' },
      ],
    },
    demo: {
      eyebrow: 'Interactive Showcase',
      title: 'Experience the Live Administration Panel',
      subtitle: 'Test drive the church software interface: membership directory, SMS dispatch, worship calendar, and reports.',
      tabs: {
        members: 'Member Directory',
        messages: 'SMS & Broadcasts',
        events: 'Worship Calendar',
        reports: 'Financial Reports',
      },
      searchPlaceholder: 'Search a member by name, ministry, or role...',
      addMemberBtn: 'Add New Member',
      sendAnnouncementBtn: 'Send Broadcast SMS Now',
      announcementPlaceholder: 'Type your church announcement here (e.g. Prayer Service tomorrow morning at 6:00 AM)...',
      announcementSuccess: 'SMS announcement dispatched to all members successfully!',
      membersCount: '1,248 Registered Members',
      activeStatus: 'Active',
      table: {
        name: 'Full Name',
        role: 'Role / Position',
        phone: 'Phone',
        group: 'Ministry Group',
        status: 'Status',
      },
      stats: {
        totalMembers: 'Total Members',
        attendanceRate: 'Attendance Rate',
        groupsActive: 'Active Ministries',
        smsDelivered: 'SMS Sent This Month',
      },
    },
    download: {
      eyebrow: 'Instant & Free Access',
      title: 'Download OmniChurch Today',
      subtitle: 'Select your platform and begin modernizing your church management today across Android, Windows, and Mac.',
      detectedBadge: 'Detected on your machine',
      downloadBtn: 'Download Now',
      otherOptions: 'Other Operating Systems',
      androidCard: {
        title: 'Android (Phones & Tablets)',
        desc: 'Direct APK file ready to install on any Android smartphone or tablet running Android 7.0 or higher.',
        btn: 'Download APK (Android)',
        badge: 'Main Mobile Release',
        note: 'Size: ~18 MB • Ad-free • 100% Free',
      },
      pcCard: {
        title: 'Windows PC (Office & Desk)',
        desc: 'Official installer for church secretarial desks and kiosks with badge printing and financial reporting.',
        btn: 'Download for Windows (.exe)',
        badge: 'Desk & Administration',
        note: 'Windows 11, 10, 8, 7 • Available in 64-bit and 32-bit',
        archHelp: '32/64-bit Setup Guide',
      },
      macCard: {
        title: 'macOS (Apple Mac)',
        desc: 'Universal DMG package compatible with Apple Silicon (M1/M2/M3) and Intel-based Macs.',
        btn: 'Download for Mac (.dmg)',
        badge: 'macOS Universal',
        note: 'macOS 11.0 or newer',
      },
      iosCard: {
        title: 'iPhone & iPad (iOS)',
        desc: 'Coming soon to the Apple App Store for churchgoers wanting their member card on iPhone.',
        btn: 'Coming Soon to App Store',
        badge: 'Apple iOS',
        note: 'In Apple review process',
      },
    },
    footer: {
      about: 'Professional digital solution for modern church administration and communication. Built for Christian communities worldwide.',
      supportTitle: 'Support & Help Desk',
      supportDesc: 'Select an official channel to reach the OmniChurch support desk directly:',
      whatsappBtn: 'Official WhatsApp',
      telegramBtn: 'Telegram Support',
      emailBtn: 'Help Desk Email',
      phoneBtn: 'Direct Hotline',
      backToTop: 'Back to Top',
      rights: '© 2026 ZOUTIW RESERVED. · All rights reserved.',
      madeWithLove: 'Crafted with devotion by Jackson Charles for Christian ministries everywhere.',
      adminPanelBtn: 'Admin Panel',
    },
    modals: {
      downloadTitle: 'Download OmniChurch',
      chooseInstaller: 'Choose the appropriate setup package for your operating system:',
      directDownload: 'Direct Download',
      close: 'Close',
      pcGuideTitle: 'Windows & SmartScreen Setup Guide',
      smartScreenWarning: 'If Windows SmartScreen prompts during setup:',
      clickMoreInfo: '1. Click "More info"',
      runAnyway: '2. Click "Run anyway"',
      copied: 'Copied to clipboard!',
      copy: 'Copy',
      downloadFile: 'Download File',
      comingSoonMessage: 'This version is in final touches and will be released very soon!',
    },
    downloadModal: {
      mobileTitle: 'Download for Mobile & Tablet',
      mobileSubtitle: 'Choose the installer for your mobile operating system',
      pcTitle: 'Download for Desktop PC',
      pcSubtitle: 'Choose the installer matching your Windows architecture',
      starting: 'Starting...',
      download: 'Download',
      comingSoon: 'Coming Soon',
      androidTitle: 'Direct Android APK',
      androidBadge: 'AVAILABLE • 38 MB',
      androidDesc: 'Install directly without Google Play Store',
      iosTitle: 'Apple iOS / iPhone',
      iosDesc: 'Official App Store release in progress',
      qrTitle: 'Scan with your Phone Camera',
      qrDesc: 'Download the APK file directly to your phone without copying links.',
      win64Title: 'Windows 64-bit (x64)',
      win64Badge: 'RECOMMENDED FOR YOUR PC',
      win64Desc: 'For Windows 11 and most Windows 10 computers',
      win32Title: 'Windows 32-bit (x86)',
      win32Desc: 'For older Windows 7/8/10 32-bit PCs',
      macTitle: 'Apple Mac (macOS)',
      macDesc: '.dmg disk image for Apple Silicon & Intel Mac',
      detectedWindows: 'Detected System: Windows',
      comingSoonAlert: 'is actively in development and will soon be available on the official store.',
    },
    ads: {
      advertisement: 'Advertisement',
      previewMode: 'Preview Mode',
    },
  },

  // ==================== ESPAÑOL ====================
  es: {
    code: 'es',
    label: 'Español',
    flag: '🇪🇸',
    nav: {
      home: 'Inicio',
      features: 'Funciones',
      installGuide: 'Guía de Instalación',
      security: 'Seguridad y Tech',
      preview: 'Explorar',
      download: 'Descargar',
      contact: 'Contacto',
      stableBadge: 'v1.0.0 Estable',
      quickDownload: 'Descargar',
      adminPanel: 'Panel Admin',
      tagline: 'Solución digital para iglesias',
    },
    hero: {
      eyebrow: 'BIENVENIDO A OMNICHURCH',
      eyebrowSub: 'Plataforma Digital Oficial',
      badge: 'v1.0.0 Estable',
      titlePrefix: 'Plataforma Digital Oficial para',
      titleHighlight: 'OmniChurch',
      subtitle: 'Gestión de Iglesias y Carnet Digital de Miembro',
      description:
        'Aplicación oficial para la administración de iglesias: Carnet digital con código QR, control de asistencia rápido, alertas masivas por SMS y gestión 100% offline en Android y Windows PC.',
      downloadApk: 'Descargar para Android (APK)',
      downloadPc: 'Descargar para Windows PC (.EXE)',
      selectVersion: 'Seleccione su versión de Windows:',
      recommended: 'Recomendado para su dispositivo',
      fastOffline: 'Funciona 100% Sin Internet',
      securePrivacy: 'Protección Local de Datos',
      freeForever: 'Gratis para Todas las Iglesias',
      noCardNeeded: 'Sin Tarjeta de Crédito Requerida',
      comingSoonIos: 'Versiones iOS y Mac disponibles pronto',
      cardFrontTitle: 'Tabernáculo de Gracia',
      cardBackTitle: 'Carnet Virtual de Miembro',
      cardFidelity: 'Fiel de la Iglesia',
      cardMemberName: 'Jean-Baptiste Pierre',
      cardChurchName: 'Tabernáculo de Gracia',
      cardScanHint: 'Escanear para verificar identidad',
      cardFlipNotice: 'Pase el ratón o toque para voltear la tarjeta',
      memberId: 'ID: OC-2026-084',
      issueDate: 'Emisión: Ene 2026',
      validThru: 'Validez: 2027',
    },
    features: {
      eyebrow: 'Funciones Principales de OmniChurch',
      title: 'El Pilar Digital para Toda la Comunidad',
      description:
        'Solución digital completa para pastores, líderes y miembros: gestión eficiente, rápida y disponible sin necesidad de conexión a internet.',
      f1: {
        title: 'Carnet Digital de Miembro y Código QR',
        desc: 'Cada fiel dispone de un carnet digital con código QR único para identificación inmediata, grupos y actividades sin contacto.',
        badge: 'Seguro y Personalizado',
        benefits: ['Carnet virtual con fotografía', 'Código QR individual único', 'Acceso rápido y sin contacto'],
      },
      f2: {
        title: 'Control Rápido de Asistencia',
        desc: 'Escanee el código QR de los miembros en la entrada de la iglesia para registrar automáticamente la asistencia en cultos y eventos.',
        badge: 'Escaneo en Tiempo Real',
        benefits: ['Registro ágil en puerta', 'Estadísticas automáticas de asistencia', 'Cero libros de registro en papel'],
      },
      f3: {
        title: 'Anuncios y Notificaciones Directas',
        desc: 'Envíe comunicados oficiales, mensajes masivos de SMS y alertas al instante a toda la congregación o ministerios específicos.',
        badge: 'Comunicación Instantánea',
        benefits: ['SMS masivos a todos los miembros', 'Avisos de cultos y oración', 'Notificaciones de comités y coros'],
      },
      f4: {
        title: '100% Offline y Datos Protegidos',
        desc: 'La aplicación funciona totalmente sin internet gracias a su motor SQLite local que protege la información en su propio equipo.',
        badge: '100% Privado y Offline',
        benefits: ['Base de datos local en el dispositivo', 'Cero dependencia de servidores externos', 'Copias de seguridad fáciles de exportar'],
      },
    },
    installGuide: {
      eyebrow: 'Paso a Paso Rápido',
      title: 'Guía de Instalación OmniChurch',
      subtitle: 'Instale la aplicación en menos de 2 minutos en cualquier teléfono Android o computadora Windows.',
      tabMobile: 'Instalación Android (APK)',
      tabPc: 'Instalación Windows (.EXE)',
      mobileSteps: [
        {
          num: '01',
          title: 'Descargar el archivo APK',
          desc: 'Descargue el APK oficial de OmniChurch (~18 MB) directamente en su teléfono móvil.',
          actionText: 'Descargar APK Ahora',
        },
        {
          num: '02',
          title: 'Permitir instalación',
          desc: 'Si Android se lo solicita, active la opción "Instalar aplicaciones de fuentes desconocidas" en los ajustes.',
          actionText: 'Ajustes de Seguridad',
        },
        {
          num: '03',
          title: 'Iniciar y Obtener Carnet',
          desc: 'Abra OmniChurch, ingrese el código de su iglesia y obtenga su Carnet Digital con código QR al instante.',
          actionText: 'Listo para Usar',
        },
      ],
      pcSteps: [
        {
          num: '01',
          title: 'Descargar Instalador PC (.EXE)',
          desc: 'Seleccione la versión de 64 bits o 32 bits correspondiente a su sistema Windows y descargue el instalador.',
          actionText: 'Descargar para Windows',
        },
        {
          num: '02',
          title: 'Ejecutar la Instalación',
          desc: 'Haga doble clic en "OmniChurch-Setup.exe". Si aparece Windows SmartScreen, haga clic en "Más información" y "Ejecutar de todas formas".',
          actionText: 'Guía SmartScreen',
        },
        {
          num: '03',
          title: 'Organizar su Iglesia',
          desc: 'El software se abrirá de inmediato en modo offline local sin necesidad de internet para emitir credenciales e informes.',
          actionText: 'Listo para Secretaría',
        },
      ],
      badge: 'Guía Comprobada',
      needHelp: '¿Necesita ayuda con la instalación? Contáctenos directamente para soporte técnico.',
    },
    security: {
      eyebrow: 'Tecnología y Privacidad',
      title: 'Seguridad Local y Filosofía Offline-First',
      subtitle:
        'Diseñado para proteger rigurosamente la privacidad de su congregación con una base de datos local SQLite ultrarrápida.',
      pillars: [
        {
          badge: 'Cero Dependencia de Internet',
          title: 'Offline-First y Base Local',
          desc: 'Toda la información de la iglesia (directorio de miembros, diezmos, ofrendas, registros) permanece segura en el equipo de la iglesia.',
          highlights: ['Operación 100% sin internet', 'Motor local de alto rendimiento', 'Cero dependencia de servidores extranjeros'],
        },
        {
          badge: 'Privacidad Garantizada',
          title: 'Total Confidencialidad y Resguardo',
          desc: 'Los datos personales y financieros son estrictamente confidenciales en los equipos de la iglesia. Acceso exclusivo para líderes autorizados.',
          highlights: ['Registros locales cifrados', 'Acceso reservado a líderes', 'Integridad financiera asegurada'],
        },
        {
          badge: 'Ultraligero y Veloz',
          title: 'Motor Optimizado (64 y 32 bits)',
          desc: 'Optimizado tanto para PCs modernas como para computadoras antiguas de iglesia (32 bits con 2GB de RAM) y teléfonos Android económicos.',
          highlights: ['Inicio instantáneo en menos de 1s', 'Consumo de RAM inferior a 65MB', 'Soporte completo Windows 32/64 bits'],
        },
        {
          badge: 'Control Total',
          title: 'Copias de Seguridad (Opcional)',
          desc: 'Exporte respaldos en memoria USB o almacenamiento en la nube cifrado para restaurar toda la información con un solo clic.',
          highlights: ['Respaldo simple con un clic', 'Restauración rápida y segura', 'Archivos históricos protegidos'],
        },
      ],
      specsTitle: 'Especificaciones Técnicas Oficiales',
      specsBadge: 'Compatibilidad Total',
      specs: [
        { label: 'Base de Datos', value: 'Local (SQLite integrada)' },
        { label: 'Privacidad', value: 'Local y Confidencial' },
        { label: 'Modo de Red', value: '100% Offline (Autónomo)' },
        { label: 'Sistemas', value: 'Windows, Android, Mac' },
        { label: 'Datos Personales', value: '100% Privados, Cero Rastreo' },
        { label: 'Respaldos', value: 'Local o Nube (Opcional)' },
      ],
    },
    demo: {
      eyebrow: 'Demostración Interactiva',
      title: 'Explore el Panel de Administración en Vivo',
      subtitle: 'Pruebe la interfaz en acción: directorio de miembros, envío de avisos por SMS, calendario de cultos y reportes.',
      tabs: {
        members: 'Directorio de Miembros',
        messages: 'SMS y Avisos',
        events: 'Calendario de Cultos',
        reports: 'Reportes Financieros',
      },
      searchPlaceholder: 'Buscar miembro por nombre, departamento o rol...',
      addMemberBtn: 'Agregar Miembro',
      sendAnnouncementBtn: 'Enviar SMS Ahora',
      announcementPlaceholder: 'Escriba el anuncio aquí (ej: Recordatorio: Culto de oración mañana a las 6:00 AM)...',
      announcementSuccess: '¡Aviso por SMS enviado a todos los miembros con éxito!',
      membersCount: '1,248 Miembros Registrados',
      activeStatus: 'Activo',
      table: {
        name: 'Nombre Completo',
        role: 'Función / Cargo',
        phone: 'Teléfono',
        group: 'Ministerio',
        status: 'Estado',
      },
      stats: {
        totalMembers: 'Total Miembros',
        attendanceRate: 'Tasa de Asistencia',
        groupsActive: 'Ministerios Activos',
        smsDelivered: 'SMS Enviados este Mes',
      },
    },
    download: {
      eyebrow: 'Acceso Inmediato y Gratuito',
      title: 'Descargue OmniChurch Hoy',
      subtitle: 'Elija su plataforma y empiece a modernizar la administración de su congregación en Android, Windows y Mac.',
      detectedBadge: 'Detectado en su equipo',
      downloadBtn: 'Descargar Ahora',
      otherOptions: 'Otras Versiones Disponibles',
      androidCard: {
        title: 'Android (Teléfonos y Tabletas)',
        desc: 'Archivo APK directo listo para instalar en cualquier teléfono o tableta con Android 7.0 o superior.',
        btn: 'Descargar APK (Android)',
        badge: 'Versión Móvil Principal',
        note: 'Tamaño: ~18 MB • Sin publicidad • 100% Gratis',
      },
      pcCard: {
        title: 'Windows PC (Oficina y Secretaría)',
        desc: 'Instalador oficial para equipos de secretaría con emisión e impresión de carnets e informes.',
        btn: 'Descargar para Windows (.exe)',
        badge: 'Versión Oficina y Gestión',
        note: 'Windows 11, 10, 8, 7 • Disponible en 64 bits y 32 bits',
        archHelp: 'Guía de Configuración 32/64 bits',
      },
      macCard: {
        title: 'macOS (Apple Mac)',
        desc: 'Paquete DMG universal compatible con chips Apple Silicon (M1/M2/M3) y procesadores Intel.',
        btn: 'Descargar para Mac (.dmg)',
        badge: 'macOS Universal',
        note: 'macOS 11.0 o superior',
      },
      iosCard: {
        title: 'iPhone y iPad (iOS)',
        desc: 'Próximamente disponible en Apple App Store para que los fieles porten su carnet en iPhone.',
        btn: 'Próximamente en App Store',
        badge: 'Apple iOS',
        note: 'En proceso de revisión por Apple',
      },
    },
    footer: {
      about: 'Solución digital profesional para modernizar la gestión y comunicación en las iglesias cristianas.',
      supportTitle: 'Soporte y Atención',
      supportDesc: 'Elija un canal oficial para comunicarse con el equipo de soporte de OmniChurch:',
      whatsappBtn: 'WhatsApp Oficial',
      telegramBtn: 'Soporte Telegram',
      emailBtn: 'Correo de Asistencia',
      phoneBtn: 'Línea Telefónica',
      backToTop: 'Subir al Inicio',
      rights: '© 2026 ZOUTIW RESERVED. · Todos los derechos reservados.',
      madeWithLove: 'Desarrollado con devoción por Jackson Charles para las congregaciones cristianas.',
      adminPanelBtn: 'Panel Admin',
    },
    modals: {
      downloadTitle: 'Descargar OmniChurch',
      chooseInstaller: 'Seleccione el paquete de instalación correspondiente a su sistema operativo:',
      directDownload: 'Descarga Directa',
      close: 'Cerrar',
      pcGuideTitle: 'Guía de Instalación Windows y SmartScreen',
      smartScreenWarning: 'Si aparece el aviso de Windows SmartScreen:',
      clickMoreInfo: '1. Haga clic en "Más información"',
      runAnyway: '2. Haga clic en "Ejecutar de todas formas"',
      copied: '¡Copiado al portapapeles!',
      copy: 'Copiar',
      downloadFile: 'Descargar Archivo',
      comingSoonMessage: '¡Esta versión está en fase final y estará disponible muy pronto!',
    },
    downloadModal: {
      mobileTitle: 'Descargar para Teléfono y Tableta',
      mobileSubtitle: 'Seleccione la opción adecuada para su sistema móvil',
      pcTitle: 'Descargar para Computadora (PC)',
      pcSubtitle: 'Seleccione el instalador compatible con su sistema Windows',
      starting: 'Iniciando...',
      download: 'Descargar',
      comingSoon: 'Próximamente',
      androidTitle: 'Android APK Directo',
      androidBadge: 'DISPONIBLE • 38 MB',
      androidDesc: 'Instale directamente sin pasar por Google Play Store',
      iosTitle: 'Apple iOS / iPhone',
      iosDesc: 'Versión oficial de App Store en proceso de finalización',
      qrTitle: 'Escanee con la Cámara de su Teléfono',
      qrDesc: 'Descargue el archivo APK directamente a su móvil sin copiar enlaces.',
      win64Title: 'Windows 64-bit (x64)',
      win64Badge: 'RECOMENDADO PARA SU PC',
      win64Desc: 'Para Windows 11 y la gran mayoría de Windows 10',
      win32Title: 'Windows 32-bit (x86)',
      win32Desc: 'Para PC más antiguos con Windows 7/8/10 32-bit',
      macTitle: 'Apple Mac (macOS)',
      macDesc: 'Imagen de disco .dmg para Mac con chip Apple o Intel',
      detectedWindows: 'Su sistema detectado: Windows',
      comingSoonAlert: 'está en desarrollo activo y pronto estará disponible en la tienda oficial.',
    },
    ads: {
      advertisement: 'Publicidad / Advertisement',
      previewMode: 'Modo Vista Previa',
    },
  },
};
