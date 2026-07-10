import { Injectable, signal } from '@angular/core';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getAuthInstance } from './firebase-app';

/** Demo credentials used ONLY when Firebase is not configured, so the admin
 *  dashboard can be previewed locally. Real security comes from Firebase Auth. */
const DEMO_EMAIL = 'admin@manaralbatin.local';
const DEMO_PASSWORD = 'manar2026';

export interface AuthUser {
  email: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = getAuthInstance();

  readonly user = signal<AuthUser | null>(null);
  readonly ready = signal(false);

  constructor() {
    if (this.auth) {
      onAuthStateChanged(this.auth, (u: User | null) => {
        this.user.set(u ? { email: u.email } : null);
        this.ready.set(true);
      });
    } else {
      try {
        if (localStorage.getItem('mab-demo-admin') === '1') {
          this.user.set({ email: DEMO_EMAIL });
        }
      } catch { /* ignore */ }
      this.ready.set(true);
    }
  }

  get isFirebaseAuth(): boolean {
    return !!this.auth;
  }

  async signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    if (this.auth) {
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
        return { ok: true };
      } catch {
        return { ok: false, error: 'Invalid email or password.' };
      }
    }
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      this.user.set({ email: DEMO_EMAIL });
      try { localStorage.setItem('mab-demo-admin', '1'); } catch { /* ignore */ }
      return { ok: true };
    }
    return { ok: false, error: 'Invalid email or password.' };
  }

  async signOutUser(): Promise<void> {
    if (this.auth) {
      await signOut(this.auth);
    } else {
      this.user.set(null);
      try { localStorage.removeItem('mab-demo-admin'); } catch { /* ignore */ }
    }
  }
}
