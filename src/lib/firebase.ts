import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeFirestore,
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  onSnapshot,
  increment,
  updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { DownloadLinks, SiteTextsConfig, AdSenseConfig, SEOConfig } from '../types';
import {
  DEFAULT_LINKS,
  DEFAULT_SITE_TEXTS,
  DEFAULT_ADSENSE,
  DEFAULT_SEO,
  STORAGE_KEYS,
} from '../data/defaultData';

// Inisyalize aplikasyon Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inisyalize Firestore ak auto long polling pou evite pwoblèm streaming/proxy sou navigatè/iframe
export const db = (() => {
  try {
    return firebaseConfig.firestoreDatabaseId
      ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true }, firebaseConfig.firestoreDatabaseId)
      : initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  } catch {
    return firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);
  }
})();

// Estanda jesyon erè Firebase Firestore
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
  if (error instanceof Error && error.message.toLowerCase().includes('permission')) {
    throw new Error(JSON.stringify(errInfo));
  }
}

// Verifye koneksyon dirèk ak sèvè Firestore
async function validateFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore konekte avèk siksè nan nwaj la.');
  } catch (error: unknown) {
    const isOfflineOrUnavailable =
      (error instanceof Error && (
        error.message.includes('offline') ||
        error.message.includes('unavailable') ||
        error.message.includes('Could not reach') ||
        error.message.includes('network')
      )) ||
      (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'unavailable');

    if (isOfflineOrUnavailable) {
      console.warn('Firebase: Kliyan an ap fonksyone an mòd offline/lokal pandan n ap tann rezo a.');
    } else {
      console.debug('Firebase koneksyon notis:', error);
    }
  }
}
validateFirestoreConnection();

/**
 * =========================================================================
 * 1. JESTYON LYEN TELECHAJMAN (DOWNLOAD LINKS) AN TAN REYÈL
 * =========================================================================
 */
export function subscribeToCloudDownloads(
  onUpdate: (links: DownloadLinks) => void,
  onError?: (err: unknown) => void
) {
  const docRef = doc(db, 'config', 'downloads');

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<DownloadLinks>;
        const merged: DownloadLinks = { ...DEFAULT_LINKS, ...data };
        try {
          localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(merged));
        } catch {
          // ignore
        }
        onUpdate(merged);
      } else {
        setDoc(docRef, DEFAULT_LINKS, { merge: true }).catch((err) => {
          console.warn('Erè senkronizasyon lyen defo nan nwaj la:', err?.message || err);
        });
        onUpdate(DEFAULT_LINKS);
      }
    },
    (error) => {
      console.warn('Erè lekti lyen Firebase, n ap itilize kach lokal la:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudDownloads(links: DownloadLinks): Promise<void> {
  const docRef = doc(db, 'config', 'downloads');
  try {
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  } catch {
    // ignore
  }
  try {
    await setDoc(docRef, { ...links, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/downloads');
  }
}

/**
 * =========================================================================
 * 2. JESTYON TÈKS SIT LA (SITE TEXTS & ANNOUNCEMENTS) AN TAN REYÈL
 * =========================================================================
 */
export function subscribeToCloudSiteTexts(
  onUpdate: (texts: SiteTextsConfig) => void,
  onError?: (err: unknown) => void
) {
  const docRef = doc(db, 'config', 'siteTexts');

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<SiteTextsConfig>;
        const merged: SiteTextsConfig = { ...DEFAULT_SITE_TEXTS, ...data };
        try {
          localStorage.setItem(STORAGE_KEYS.SITE_TEXTS, JSON.stringify(merged));
        } catch {
          // ignore
        }
        onUpdate(merged);
      } else {
        setDoc(docRef, DEFAULT_SITE_TEXTS, { merge: true }).catch((err) => {
          console.warn('Erè senkronizasyon tèks defo nan nwaj la:', err?.message || err);
        });
        onUpdate(DEFAULT_SITE_TEXTS);
      }
    },
    (error) => {
      console.warn('Erè lekti tèks Firebase:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudSiteTexts(texts: SiteTextsConfig): Promise<void> {
  const docRef = doc(db, 'config', 'siteTexts');
  try {
    localStorage.setItem(STORAGE_KEYS.SITE_TEXTS, JSON.stringify(texts));
  } catch {
    // ignore
  }
  try {
    await setDoc(docRef, { ...texts, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/siteTexts');
  }
}

/**
 * =========================================================================
 * 3. JESTYON GOOGLE ADSENSE AN TAN REYÈL
 * =========================================================================
 */
export function subscribeToCloudAdSense(
  onUpdate: (adsense: AdSenseConfig) => void,
  onError?: (err: unknown) => void
) {
  const docRef = doc(db, 'config', 'adsense');

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<AdSenseConfig>;
        const merged: AdSenseConfig = { ...DEFAULT_ADSENSE, ...data };
        try {
          localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(merged));
        } catch {
          // ignore
        }
        onUpdate(merged);
      } else {
        setDoc(docRef, DEFAULT_ADSENSE, { merge: true }).catch((err) => {
          console.warn('Erè senkronizasyon AdSense defo nan nwaj la:', err?.message || err);
        });
        onUpdate(DEFAULT_ADSENSE);
      }
    },
    (error) => {
      console.warn('Erè lekti AdSense Firebase:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudAdSense(adsense: AdSenseConfig): Promise<void> {
  const docRef = doc(db, 'config', 'adsense');
  try {
    localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(adsense));
  } catch {
    // ignore
  }
  try {
    await setDoc(docRef, { ...adsense, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/adsense');
  }
}

/**
 * =========================================================================
 * 3b. JESTYON SEO & METADATA AN TAN REYÈL (REAL-TIME SEO MANAGEMENT)
 * =========================================================================
 */
export function subscribeToCloudSEO(
  onUpdate: (seo: SEOConfig) => void,
  onError?: (err: unknown) => void
) {
  const docRef = doc(db, 'config', 'seo');

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<SEOConfig>;
        const merged: SEOConfig = { ...DEFAULT_SEO, ...data };
        try {
          localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(merged));
        } catch {
          // ignore
        }
        onUpdate(merged);
      } else {
        setDoc(docRef, DEFAULT_SEO, { merge: true }).catch((err) => {
          console.warn('Erè senkronizasyon SEO defo nan nwaj la:', err?.message || err);
        });
        onUpdate(DEFAULT_SEO);
      }
    },
    (error) => {
      console.warn('Erè lekti SEO Firebase:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudSEO(seo: SEOConfig): Promise<void> {
  const docRef = doc(db, 'config', 'seo');
  try {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo));
  } catch {
    // ignore
  }
  try {
    await setDoc(docRef, { ...seo, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/seo');
  }
}

/**
 * =========================================================================
 * 4. ESTATISTIK AN TAN REYÈL GLOBAL (REAL-TIME CLOUD ANALYTICS)
 * =========================================================================
 */
export interface CloudAnalyticsMetrics {
  totalVisits: number;
  totalDownloads: number;
  mobileDownloads: number;
  pcDownloads: number;
  lastVisitAt?: string;
  lastDownloadAt?: string;
}

export function subscribeToCloudAnalytics(
  onUpdate: (metrics: CloudAnalyticsMetrics) => void
) {
  const docRef = doc(db, 'analytics', 'global');

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as CloudAnalyticsMetrics);
      } else {
        const initialMetrics: CloudAnalyticsMetrics = {
          totalVisits: 1,
          totalDownloads: 0,
          mobileDownloads: 0,
          pcDownloads: 0,
          lastVisitAt: new Date().toISOString(),
        };
        setDoc(docRef, initialMetrics, { merge: true }).catch((err) => {
          console.warn('Erè senkronizasyon estatistik nan nwaj la:', err?.message || err);
        });
        onUpdate(initialMetrics);
      }
    },
    (err) => console.warn('Analytics snapshot notice:', err)
  );
}

export async function trackCloudVisit(): Promise<void> {
  try {
    const docRef = doc(db, 'analytics', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, {
        totalVisits: increment(1),
        lastVisitAt: new Date().toISOString(),
      });
    } else {
      await setDoc(
        docRef,
        {
          totalVisits: 1,
          totalDownloads: 0,
          mobileDownloads: 0,
          pcDownloads: 0,
          lastVisitAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (e) {
    // Silently handle offline/tracking errors
    console.debug('Cloud visit record error:', e);
  }
}

export async function trackCloudDownload(platform: 'mobile' | 'pc' | 'mac'): Promise<void> {
  try {
    const docRef = doc(db, 'analytics', 'global');
    const snap = await getDoc(docRef);
    const updates: Record<string, unknown> = {
      totalDownloads: increment(1),
      lastDownloadAt: new Date().toISOString(),
    };
    if (platform === 'mobile') {
      updates.mobileDownloads = increment(1);
    } else {
      updates.pcDownloads = increment(1);
    }

    if (snap.exists()) {
      await updateDoc(docRef, updates);
    } else {
      await setDoc(
        docRef,
        {
          totalVisits: 1,
          totalDownloads: 1,
          mobileDownloads: platform === 'mobile' ? 1 : 0,
          pcDownloads: platform !== 'mobile' ? 1 : 0,
          lastDownloadAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }
  } catch (e) {
    console.debug('Cloud download track error:', e);
  }
}
