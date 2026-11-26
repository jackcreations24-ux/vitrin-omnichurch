import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, SupportedLang, Translations } from './translations';

interface I18nContextType {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: Translations;
  detectedBrowserLang: string;
}

export const I18N_STORAGE_KEY = 'oc_preferred_lang_v1';

const SUPPORTED_LANGS: SupportedLang[] = ['ht', 'fr', 'en', 'es'];

/**
 * Retrieve saved language preference from localStorage
 */
export const getStoredLanguage = (): SupportedLang | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(I18N_STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved as SupportedLang)) {
      return saved as SupportedLang;
    }
  } catch (err) {
    console.warn('Unable to access localStorage for language preference:', err);
  }
  return null;
};

/**
 * Save user language choice to localStorage
 */
export const savePreferredLanguage = (lang: SupportedLang): void => {
  if (typeof window === 'undefined') return null;
  try {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
  } catch (err) {
    console.warn('Unable to save language preference to localStorage:', err);
  }
};

/**
 * Detect browser's language from navigator.languages and navigator.language
 */
export const detectBrowserLanguage = (): SupportedLang => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'ht';
  }

  try {
    // Gather all candidate language strings from browser
    const candidates: string[] = [];
    if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
      candidates.push(...navigator.languages);
    }
    if (navigator.language) {
      candidates.push(navigator.language);
    }

    for (const raw of candidates) {
      const normalized = raw.toLowerCase().trim();
      // Check Haitian Creole (ht, ht-HT, or kreyol)
      if (normalized.startsWith('ht')) return 'ht';
      // Check French (fr, fr-FR, fr-CA, etc.)
      if (normalized.startsWith('fr')) return 'fr';
      // Check Spanish (es, es-ES, es-US, es-419, etc.)
      if (normalized.startsWith('es')) return 'es';
      // Check English (en, en-US, en-GB, etc.)
      if (normalized.startsWith('en')) return 'en';
    }
  } catch (err) {
    console.warn('Error detecting browser language:', err);
  }

  // Default to Kreyòl Ayisyen
  return 'ht';
};

/**
 * Resolve initial language:
 * 1. Prioritize explicitly saved user preference in localStorage
 * 2. Fall back to automatic browser language detection
 * 3. Default to 'ht' (Kreyòl Ayisyen)
 */
export const getInitialLanguage = (): SupportedLang => {
  const stored = getStoredLanguage();
  if (stored) return stored;
  return detectBrowserLanguage();
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLang>(getInitialLanguage);
  const [detectedBrowserLang, setDetectedBrowserLang] = useState<string>('ht');

  // Detect browser language once on mount for diagnostics/debug if needed
  useEffect(() => {
    const detected = detectBrowserLanguage();
    setDetectedBrowserLang(detected);
  }, []);

  // Update HTML lang attribute whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Listen for language changes in other tabs via the StorageEvent
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === I18N_STORAGE_KEY && e.newValue) {
        if (SUPPORTED_LANGS.includes(e.newValue as SupportedLang)) {
          setLangState(e.newValue as SupportedLang);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Explicit function to set language and persist to localStorage
  const setLang = useCallback((newLang: SupportedLang) => {
    setLangState(newLang);
    savePreferredLanguage(newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  }, []);

  const value: I18nContextType = {
    lang,
    setLang,
    t: translations[lang] || translations.ht,
    detectedBrowserLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      lang: 'ht',
      setLang: () => {},
      t: translations.ht,
      detectedBrowserLang: 'ht',
    };
  }
  return context;
};

