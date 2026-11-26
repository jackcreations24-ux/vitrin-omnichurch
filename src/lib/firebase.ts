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
import {
  DownloadLinks,
  SiteTextsConfig,
  AdSenseConfig,
  SEOConfig,
  DeveloperEngineConfig,
  CloudSyncVerificationResult,
} from '../types';
import {
  DEFAULT_LINKS,
  DEFAULT_SITE_TEXTS,
  DEFAULT_ADSENSE,
  DEFAULT_SEO,
  STORAGE_KEYS,
} from '../data/defaultData';
import {
  SUPER_DEVELOPER_EMAIL,
  UNIFIED_FIRESTORE_DB_ID,
  DEVELOPER_ENGINE_COLLECTION,
  DEVELOPER_ENGINE_DOC_ID,
  DEFAULT_DEVELOPER_ENGINE_CONFIG,
  mergeDeveloperEngineConfig,
} from '../data/developerEngineDefaults';

// Initialize shared Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const FIREBASE_AUTH_SETTINGS_URL = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`;

export function isUnauthorizedDomainError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const code = 'code' in err ? String((err as { code?: unknown }).code || '') : '';
  const msg = err instanceof Error ? err.message : String(err);
  return (
    code === 'auth/unauthorized-domain' ||
    msg.includes('auth/unauthorized-domain')
  );
}

// Initialize Firebase Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: SUPER_DEVELOPER_EMAIL,
});

export function isSuperDeveloperUser(user: User | null | undefined): boolean {
  if (!user || !user.email) return false;
  return user.email.trim().toLowerCase() === SUPER_DEVELOPER_EMAIL.toLowerCase();
}

/**
 * Authenticates the Super Developer exclusively via Firebase Google Sign-In (signInWithPopup)
 * restricted to charlesjj3186@gmail.com.
 */
export async function signInAsSuperDeveloper(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!isSuperDeveloperUser(user)) {
      const unauthorizedEmail = user?.email || 'unknown';
      await signOut(auth).catch(() => {});
      throw new Error(
        `Aksè refize pou "${unauthorizedEmail}". Sèlman kont Super Devlopè ofisyèl la (${SUPER_DEVELOPER_EMAIL}) otorize.`
      );
    }

    return user;
  } catch (err: unknown) {
    if (isUnauthorizedDomainError(err)) {
      const host = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
      const domainErr = new Error(
        `auth/unauthorized-domain: Domèn "${host}" poko nan lis Authorized Domains pwojè Firebase "${firebaseConfig.projectId}" la.`
      ) as Error & { code?: string; hostname?: string };
      domainErr.code = 'auth/unauthorized-domain';
      domainErr.hostname = host;
      throw domainErr;
    }
    throw err;
  }
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: unknown) {
    console.warn('Erè koneksyon Google:', err);
    throw err;
  }
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Initialize Cloud Firestore against the named database
const activeFirestoreDbId =
  firebaseConfig.firestoreDatabaseId || UNIFIED_FIRESTORE_DB_ID;

export const db = (() => {
  try {
    return initializeFirestore(
      app,
      { experimentalAutoDetectLongPolling: true },
      activeFirestoreDbId
    );
  } catch {
    return getFirestore(app, activeFirestoreDbId);
  }
})();

// Standard Firebase Firestore Error Types & Structured Handler
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

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
  rethrowOnPermission = true
) {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid ?? null,
      email: currentUser?.email ?? null,
      emailVerified: currentUser?.emailVerified ?? null,
      isAnonymous: currentUser?.isAnonymous ?? null,
      tenantId: currentUser?.tenantId ?? null,
      providerInfo:
        currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
  if (
    rethrowOnPermission &&
    error instanceof Error &&
    error.message.toLowerCase().includes('permission')
  ) {
    throw new Error(JSON.stringify(errInfo));
  }
}

// Validate live connection to the unified Firestore named database
async function validateFirestoreConnection() {
  try {
    await getDocFromServer(
      doc(db, DEVELOPER_ENGINE_COLLECTION, DEVELOPER_ENGINE_DOC_ID)
    );
    console.log(
      `Unified OmniChurch Cloud Firestore (${activeFirestoreDbId}) konekte avèk siksè.`
    );
  } catch (error: unknown) {
    const isOfflineOrUnavailable =
      (error instanceof Error &&
        (error.message.includes('offline') ||
          error.message.includes('unavailable') ||
          error.message.includes('Could not reach') ||
          error.message.includes('network'))) ||
      (error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code: string }).code === 'unavailable');

    if (isOfflineOrUnavailable) {
      console.warn(
        'Firebase: Kliyan an ap fonksyone an mòd offline/lokal pandan n ap tann rezo a.'
      );
    } else {
      console.debug('Firebase connection notice:', error);
    }
  }
}
validateFirestoreConnection();

/**
 * =========================================================================
 * 0. UNIFIED DEVELOPER ENGINE (`app_config/developer_engine`) REAL-TIME SYNC
 * =========================================================================
 */
const DEVELOPER_ENGINE_CACHE_KEY = 'oc_developer_engine_cache_v1';

export function loadCachedDeveloperEngine(): DeveloperEngineConfig {
  if (typeof window === 'undefined') return DEFAULT_DEVELOPER_ENGINE_CONFIG;
  try {
    const raw = localStorage.getItem(DEVELOPER_ENGINE_CACHE_KEY);
    if (raw) {
      return mergeDeveloperEngineConfig(JSON.parse(raw));
    }
  } catch {
    // ignore cache parse errors
  }
  return DEFAULT_DEVELOPER_ENGINE_CONFIG;
}

export function subscribeToDeveloperEngine(
  onUpdate: (config: DeveloperEngineConfig) => void,
  onError?: (err: unknown) => void
) {
  const engineDocRef = doc(
    db,
    DEVELOPER_ENGINE_COLLECTION,
    DEVELOPER_ENGINE_DOC_ID
  );

  return onSnapshot(
    engineDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const merged = mergeDeveloperEngineConfig(
          snapshot.data() as Record<string, any>
        );
        try {
          localStorage.setItem(
            DEVELOPER_ENGINE_CACHE_KEY,
            JSON.stringify(merged)
          );
        } catch {
          // ignore storage quota errors
        }
        onUpdate(merged);
      } else {
        onUpdate(DEFAULT_DEVELOPER_ENGINE_CONFIG);
      }
    },
    (error) => {
      handleFirestoreError(
        error,
        OperationType.GET,
        `${DEVELOPER_ENGINE_COLLECTION}/${DEVELOPER_ENGINE_DOC_ID}`,
        false
      );
      if (onError) onError(error);
    }
  );
}

/**
 * Writes partial or full updates directly to `app_config/developer_engine` using
 * `setDoc(..., { merge: true })`. Automatically mirrors `appUpdate` & `appUpdates`
 * and enforces Super Developer Google Auth (`charlesjj3186@gmail.com`).
 */
export async function saveDeveloperEngine(
  partialConfig: Partial<DeveloperEngineConfig>
): Promise<void> {
  if (!isSuperDeveloperUser(auth.currentUser)) {
    throw new Error(
      `Otantifikasyon Google (${SUPER_DEVELOPER_EMAIL}) obligatwa pou ekri nan Cloud Firestore.`
    );
  }

  const engineDocRef = doc(
    db,
    DEVELOPER_ENGINE_COLLECTION,
    DEVELOPER_ENGINE_DOC_ID
  );

  const payload: Record<string, any> = {
    ...partialConfig,
    updatedAt: new Date().toISOString(),
    updatedBy: auth.currentUser?.email || SUPER_DEVELOPER_EMAIL,
  };

  if (partialConfig.appUpdate || partialConfig.appUpdates) {
    const syncedRelease = partialConfig.appUpdate || partialConfig.appUpdates;
    payload.appUpdate = syncedRelease;
    payload.appUpdates = syncedRelease;
  }

  try {
    await setDoc(engineDocRef, payload, { merge: true });
    const cached = mergeDeveloperEngineConfig({
      ...loadCachedDeveloperEngine(),
      ...payload,
    });
    try {
      localStorage.setItem(DEVELOPER_ENGINE_CACHE_KEY, JSON.stringify(cached));
    } catch {
      // ignore
    }
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.WRITE,
      `${DEVELOPER_ENGINE_COLLECTION}/${DEVELOPER_ENGINE_DOC_ID}`,
      true
    );
    throw error;
  }
}

/**
 * Pushes the complete unified Developer Engine state to `app_config/developer_engine`
 * and immediately reads back from the server (`getDocFromServer`) to verify 100% parity
 * across omnichurch.download, the OmniChurch Web Platform, and the Android App.
 */
export async function pushAndVerifyDeveloperEngine(
  fullConfig: DeveloperEngineConfig
): Promise<CloudSyncVerificationResult> {
  if (!isSuperDeveloperUser(auth.currentUser)) {
    throw new Error(
      `Konekte avèk Google (${SUPER_DEVELOPER_EMAIL}) pou pouse epi verifye senkronizasyon Cloud la.`
    );
  }

  const startedAt = performance.now();
  const nowIso = new Date().toISOString();
  const engineDocRef = doc(
    db,
    DEVELOPER_ENGINE_COLLECTION,
    DEVELOPER_ENGINE_DOC_ID
  );

  const syncedRelease = {
    ...(fullConfig.appUpdate || DEFAULT_DEVELOPER_ENGINE_CONFIG.appUpdate),
  };

  const payload: DeveloperEngineConfig = {
    legalConfig: {
      ...fullConfig.legalConfig,
      lastLegalUpdatedAt: fullConfig.legalConfig.lastLegalUpdatedAt || nowIso,
    },
    appUpdate: syncedRelease,
    appUpdates: syncedRelease,
    donations: fullConfig.donations,
    maintenanceMode: Boolean(fullConfig.maintenanceMode),
    maintenanceMessage: fullConfig.maintenanceMessage || '',
    sponsors: Array.isArray(fullConfig.sponsors) ? fullConfig.sponsors : [],
    showSponsorsInFooter: Boolean(fullConfig.showSponsorsInFooter),
    updatedAt: nowIso,
    updatedBy: auth.currentUser?.email || SUPER_DEVELOPER_EMAIL,
  };

  try {
    await setDoc(engineDocRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.WRITE,
      `${DEVELOPER_ENGINE_COLLECTION}/${DEVELOPER_ENGINE_DOC_ID}`,
      true
    );
    throw error;
  }

  let serverSnap;
  try {
    serverSnap = await getDocFromServer(engineDocRef);
  } catch (error) {
    handleFirestoreError(
      error,
      OperationType.GET,
      `${DEVELOPER_ENGINE_COLLECTION}/${DEVELOPER_ENGINE_DOC_ID}`,
      true
    );
    throw error;
  }

  const latencyMs = Math.round(performance.now() - startedAt);
  const serverMerged = mergeDeveloperEngineConfig(
    serverSnap.exists() ? (serverSnap.data() as Record<string, any>) : payload
  );

  try {
    localStorage.setItem(
      DEVELOPER_ENGINE_CACHE_KEY,
      JSON.stringify(serverMerged)
    );
  } catch {
    // ignore
  }

  const verified =
    serverSnap.exists() &&
    serverMerged.appUpdate.latestVersion === payload.appUpdate.latestVersion &&
    serverMerged.legalConfig.officialPrivacyUrl ===
      payload.legalConfig.officialPrivacyUrl &&
    serverMerged.legalConfig.officialTermsUrl ===
      payload.legalConfig.officialTermsUrl &&
    serverMerged.maintenanceMode === payload.maintenanceMode;

  return {
    verified,
    syncedAt: serverMerged.updatedAt || nowIso,
    latencyMs,
    databaseId: activeFirestoreDbId,
    documentPath: `${DEVELOPER_ENGINE_COLLECTION}/${DEVELOPER_ENGINE_DOC_ID}`,
    serverVersion: serverMerged.appUpdate.latestVersion,
    legalUpdatedAt: serverMerged.legalConfig.lastLegalUpdatedAt,
    donationsEnabled: serverMerged.donations.enabled,
    maintenanceMode: serverMerged.maintenanceMode,
    sponsorsCount: serverMerged.sponsors.filter((s) => s.active !== false)
      .length,
  };
}

/**
 * =========================================================================
 * 1. LEGACY PORTAL CONFIG & ANALYTICS (SAFE READ-ONLY FOR PUBLIC VISITORS)
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
          if (
            typeof val === 'string' &&
            !val.includes('jacksoncharles/omnichurch/releases/download/v2.4.0')
          ) {
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
      console.debug('Legacy config/downloads notice:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudDownloads(links: DownloadLinks): Promise<void> {
  if (!isSuperDeveloperUser(auth.currentUser)) return;
  const docRef = doc(db, 'config', 'downloads');
  try {
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  } catch {
    // ignore
  }
  try {
    await setDoc(
      docRef,
      { ...links, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/downloads', false);
  }
}

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
        onUpdate(DEFAULT_SITE_TEXTS);
      }
    },
    (error) => {
      console.debug('Legacy config/siteTexts notice:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudSiteTexts(texts: SiteTextsConfig): Promise<void> {
  if (!isSuperDeveloperUser(auth.currentUser)) return;
  const docRef = doc(db, 'config', 'siteTexts');
  try {
    localStorage.setItem(STORAGE_KEYS.SITE_TEXTS, JSON.stringify(texts));
  } catch {
    // ignore
  }
  try {
    await setDoc(
      docRef,
      { ...texts, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/siteTexts', false);
  }
}

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
        onUpdate(DEFAULT_ADSENSE);
      }
    },
    (error) => {
      console.debug('Legacy config/adsense notice:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudAdSense(adsense: AdSenseConfig): Promise<void> {
  if (!isSuperDeveloperUser(auth.currentUser)) return;
  const docRef = doc(db, 'config', 'adsense');
  try {
    localStorage.setItem(STORAGE_KEYS.ADSENSE, JSON.stringify(adsense));
  } catch {
    // ignore
  }
  try {
    await setDoc(
      docRef,
      { ...adsense, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/adsense', false);
  }
}

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
        onUpdate(DEFAULT_SEO);
      }
    },
    (error) => {
      console.debug('Legacy config/seo notice:', error);
      if (onError) onError(error);
    }
  );
}

export async function saveCloudSEO(seo: SEOConfig): Promise<void> {
  if (!isSuperDeveloperUser(auth.currentUser)) return;
  const docRef = doc(db, 'config', 'seo');
  try {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo));
  } catch {
    // ignore
  }
  try {
    await setDoc(
      docRef,
      { ...seo, updatedAt: new Date().toISOString() },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/seo', false);
  }
}

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
      }
    },
    (err) => console.debug('Analytics snapshot notice:', err)
  );
}

export async function trackCloudVisit(): Promise<void> {
  if (!auth.currentUser) return;
  try {
    const docRef = doc(db, 'analytics', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, {
        totalVisits: increment(1),
        lastVisitAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.debug('Cloud visit record notice:', e);
  }
}

export async function trackCloudDownload(
  platform: 'mobile' | 'pc' | 'mac'
): Promise<void> {
  if (!auth.currentUser) return;
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
    }
  } catch (e) {
    console.debug('Cloud download track notice:', e);
  }
}

/**
 * =========================================================================
 * 5. REAL-TIME REVIEWS & RATINGS
 * =========================================================================
 */
export interface AppReview {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userPhoto?: string;
  rating: number;
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
      console.debug('Realtime reviews fallback:', err);
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
    handleFirestoreError(error, OperationType.WRITE, 'reviews', false);
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
    handleFirestoreError(
      error,
      OperationType.DELETE,
      `reviews/${reviewId}`,
      false
    );
    try {
      const cached: AppReview[] = JSON.parse(
        localStorage.getItem(REVIEWS_STORAGE_KEY) || '[]'
      );
      const filtered = cached.filter((r) => r.id !== reviewId);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(filtered));
    } catch {
      // ignore
    }
  }
}
