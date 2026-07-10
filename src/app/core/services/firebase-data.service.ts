import { Injectable } from '@angular/core';
import { doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { RegistrationEnquiry, SiteContent } from '../models/content.model';
import { getDb } from './firebase-app';

/**
 * Null-safe gateway to Firestore. Every method degrades gracefully when
 * Firebase is not configured, so the site and the registration form keep
 * working on seed / local data until the school connects their project.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseDataService {
  get isEnabled(): boolean {
    return !!getDb();
  }

  async loadContent(): Promise<SiteContent | null> {
    const db = getDb();
    if (!db) return null;
    try {
      const snap = await getDoc(doc(db, 'site', 'content'));
      return snap.exists() ? (snap.data() as SiteContent) : null;
    } catch (e) {
      console.warn('[Firebase] loadContent failed, using seed content.', e);
      return null;
    }
  }

  async saveContent(content: SiteContent): Promise<boolean> {
    const db = getDb();
    if (!db) {
      console.info('[Firebase] Not configured — content kept in this session only.');
      return false;
    }
    try {
      await setDoc(doc(db, 'site', 'content'), content);
      return true;
    } catch (e) {
      console.error('[Firebase] saveContent failed.', e);
      return false;
    }
  }

  async submitEnquiry(enquiry: RegistrationEnquiry): Promise<boolean> {
    const db = getDb();
    if (!db) return false;
    try {
      await addDoc(collection(db, 'registrations'), enquiry);
      return true;
    } catch (e) {
      console.error('[Firebase] submitEnquiry failed.', e);
      return false;
    }
  }

  async listEnquiries(): Promise<RegistrationEnquiry[]> {
    const db = getDb();
    if (!db) return [];
    try {
      const q = query(collection(db, 'registrations'), orderBy('submittedAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map((d) => d.data() as RegistrationEnquiry);
    } catch (e) {
      console.warn('[Firebase] listEnquiries failed.', e);
      return [];
    }
  }
}
