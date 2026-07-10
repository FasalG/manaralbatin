import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseStorage, getStorage } from 'firebase/storage';
import { environment } from '../../../environments/environment';

/**
 * Lazily initialises the Firebase Web SDK — but ONLY when `useFirebase` is on
 * and the config looks real (no leftover PASTE_* placeholders). Until then the
 * whole app runs on seed content, so nothing throws before setup is complete.
 */
let app: FirebaseApp | null = null;
let initialised = false;

function configLooksReal(): boolean {
  const c = environment.firebase;
  return (
    !!c &&
    !!c.apiKey &&
    !c.apiKey.startsWith('PASTE') &&
    !!c.appId &&
    !c.appId.startsWith('PASTE') &&
    !!c.projectId
  );
}

export function firebaseEnabled(): boolean {
  return environment.useFirebase && configLooksReal();
}

function ensureApp(): FirebaseApp | null {
  if (initialised) return app;
  initialised = true;
  if (!firebaseEnabled()) return null;
  try {
    app = initializeApp(environment.firebase);
  } catch (e) {
    console.error('[Firebase] init failed.', e);
    app = null;
  }
  return app;
}

export function getDb(): Firestore | null {
  const a = ensureApp();
  return a ? getFirestore(a) : null;
}

export function getAuthInstance(): Auth | null {
  const a = ensureApp();
  return a ? getAuth(a) : null;
}

export function getStorageInstance(): FirebaseStorage | null {
  const a = ensureApp();
  return a ? getStorage(a) : null;
}
