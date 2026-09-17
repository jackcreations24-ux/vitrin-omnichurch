import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { PolicyTab } from './PoliciesModal';

interface CookieConsentBannerProps {
  onOpenPolicies: (tab?: PolicyTab) => void;
}

const STORAGE_KEY = 'omnichurch_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPolicies,
}) => {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        // Short delay for smooth slide-in
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleDeclinePersonalized = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'essential_only');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  const content = {
    ht: {
      title: 'Transparans, Bonbon (Cookies) & Règleman Google',
      desc: 'Nou itilize bonbon ak sèvis Google (tankou AdSense ak Analytics) pou garanti bon fonksyònman sit la ak piblisite ki an sekirite. Tout done legliz ou yo rete 100% prive sou aparèy ou.',
      btnAccept: 'Aksepte Tout',
      btnPolicies: 'Gade Regleman yo',
      btnEssential: 'Esansyèl Sèlman',
    },
    fr: {
      title: 'Transparence, Cookies & Politiques Google',
      desc: 'Nous utilisons des cookies et les services Google (AdSense, Analytics) pour assurer le bon fonctionnement du site et des publicités transparentes. Vos données d’église restent 100% locales.',
      btnAccept: 'Tout Accepter',
      btnPolicies: 'Voir les Politiques',
      btnEssential: 'Essentiels Uniquement',
    },
    en: {
      title: 'Transparency, Cookies & Google Policies',
      desc: 'We use cookies and Google services (including AdSense and Analytics) to ensure reliable operation and transparent advertising. Your church data remains 100% private and offline.',
      btnAccept: 'Accept All',
      btnPolicies: 'View Policies',
      btnEssential: 'Essential Only',
    },
    es: {
      title: 'Transparencia, Cookies y Políticas de Google',
      desc: 'Utilizamos cookies y servicios de Google (AdSense y Analytics) para garantizar el funcionamiento del sitio y anuncios seguros. Los datos de su iglesia permanecen 100% privados.',
      btnAccept: 'Aceptar Todo',
      btnPolicies: 'Ver Políticas',
      btnEssential: 'Solo Esenciales',
    },
  }[lang] || {
    title: 'Transparans, Bonbon (Cookies) & Règleman Google',
    desc: 'Nou itilize bonbon ak sèvis Google (tankou AdSense ak Analytics) pou garanti bon fonksyònman sit la ak piblisite ki an sekirite. Tout done legliz ou yo rete 100% prive sou aparèy ou.',
    btnAccept: 'Aksepte Tout',
    btnPolicies: 'Gade Regleman yo',
    btnEssential: 'Esansyèl Sèlman',
  };

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 p-4 sm:p-5 rounded-2xl bg-[#030917]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-white text-left animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            {content.title}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleDeclinePersonalized}
          className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
          aria-label="Fèmen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] sm:text-xs text-blue-100/75 leading-relaxed mb-3.5">
        {content.desc}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#087cff] to-[#35c9ff] text-white text-xs font-bold shadow-[0_2px_10px_rgba(8,124,255,0.4)] hover:scale-[1.02] transition cursor-pointer"
        >
          {content.btnAccept}
        </button>

        <button
          type="button"
          onClick={() => onOpenPolicies('cookies')}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-blue-200 text-xs font-semibold transition cursor-pointer"
        >
          {content.btnPolicies}
        </button>

        <button
          type="button"
          onClick={handleDeclinePersonalized}
          className="px-2.5 py-1.5 rounded-xl text-blue-300/60 hover:text-white text-[11px] transition cursor-pointer"
        >
          {content.btnEssential}
        </button>
      </div>
    </aside>
  );
};
