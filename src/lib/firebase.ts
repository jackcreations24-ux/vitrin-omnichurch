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
  collection,
  query,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
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

// Inisyalize Firebase Auth ak Google Auth Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: unknown) {
    console.error('Erè koneksyon Google:', err);
    throw err;
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

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
        const cleaned: Partial<DownloadLinks> = {};
        for (const [key, val] of Object.entries(data)) {
          if (typeof val === 'string' && !val.includes('jacksoncharles/omnichurch/releases/download/v2.4.0')) {
            cleaned[key as keyof DownloadLinks] = val;
          }
        }
        const merged: DownloadLinks = { ...DEFAULT_LINKS, ...cleaned };
        try {
          localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(merged));
        } catch {
          // ignore
        }
        onUpdate(merged);
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

/**
 * =========================================================================
 * 5. JESTYON AVI & NÒT AN TAN REYÈL (REAL-TIME REVIEWS & RATINGS)
 * =========================================================================
 */
export interface AppReview {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userPhoto?: string;
  rating: number; // 1 to 5
  comment: string;
  role?: string;
  church?: string;
  createdAt: string;
  verified: boolean;
}

const REVIEWS_STORAGE_KEY = 'omnichurch_reviews_cache';

export function subscribeToRealtimeReviews(
  onUpdate: (reviews: AppReview[]) => void,
  onError?: (err: unknown) => void
) {
  const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: AppReview[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          userId: data.userId || '',
          userName: data.userName || 'Lidè Legliz',
          userEmail: data.userEmail || '',
          userPhoto: data.userPhoto || '',
          rating: typeof data.rating === 'number' ? data.rating : 5,
          comment: data.comment || '',
          role: data.role || 'Lidè',
          church: data.church || 'Kominote Kretyèn',
          createdAt: data.createdAt || new Date().toISOString(),
          verified: data.verified !== false,
        });
      });

      try {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(list));
      } catch {
        // ignore
      }
      onUpdate(list);
    },
    (err) => {
      console.warn('Realtime reviews stream error, using local fallback:', err);
      try {
        const cached = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (cached) {
          onUpdate(JSON.parse(cached));
        }
      } catch {
        // ignore
      }
      if (onError) onError(err);
    }
  );
}

export async function submitRealtimeReview(reviewData: {
  userId: string;
  userName: string;
  userEmail?: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  role?: string;
  church?: string;
}): Promise<string> {
  const colRef = collection(db, 'reviews');
  const docRef = doc(colRef);
  const newReview: Omit<AppReview, 'id'> = {
    userId: reviewData.userId,
    userName: reviewData.userName,
    userEmail: reviewData.userEmail || '',
    userPhoto: reviewData.userPhoto || '',
    rating: Math.max(1, Math.min(5, reviewData.rating)),
    comment: reviewData.comment.trim(),
    role: reviewData.role?.trim() || 'Lidè / Manm',
    church: reviewData.church?.trim() || 'Asanble Kretyèn',
    createdAt: new Date().toISOString(),
    verified: true,
  };

  try {
    await setDoc(docRef, newReview);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'reviews');
    // Fallback: save locally if Firestore error
    const cached: AppReview[] = (() => {
      try {
        return JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '[]');
      } catch {
        return [];
      }
    })();
    cached.unshift({ id: docRef.id, ...newReview });
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(cached));
    } catch {
      // ignore
    }
    return docRef.id;
  }
}

export async function deleteRealtimeReview(reviewId: string): Promise<void> {
  try {
    const docRef = doc(db, 'reviews', reviewId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
    // Also clean from local cache
    try {
      const cached: AppReview[] = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '[]');
      const filtered = cached.filter((r) => r.id !== reviewId);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }
  }
}

