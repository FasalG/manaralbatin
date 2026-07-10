import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RegistrationEnquiry } from '../models/content.model';
import { FirebaseDataService } from './firebase-data.service';

export type SubmitResult = 'firestore' | 'googleform' | 'local';

/**
 * Delivers a parent's registration enquiry to the school. Order of delivery:
 *   1. Firestore `registrations` collection (admin sees it in the dashboard).
 *   2. A Google Form (if `registrationGoogleFormAction` is configured).
 *   3. Local storage fallback so nothing is lost during a demo / offline.
 */
@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private readonly fb = inject(FirebaseDataService);

  async submit(enquiry: RegistrationEnquiry): Promise<SubmitResult> {
    const savedToFirestore = await this.fb.submitEnquiry(enquiry);

    // Fire the Google Form in parallel if configured (no-cors: we can't read
    // the response, but the submission still lands in the linked sheet).
    if (environment.registrationGoogleFormAction) {
      void this.sendToGoogleForm(enquiry);
      if (!savedToFirestore) return 'googleform';
    }

    if (savedToFirestore) return 'firestore';

    this.saveLocally(enquiry);
    return 'local';
  }

  /** Enquiries collected locally when no backend is available (dev/demo). */
  readLocal(): RegistrationEnquiry[] {
    try {
      return JSON.parse(localStorage.getItem('mab-enquiries') || '[]');
    } catch {
      return [];
    }
  }

  private saveLocally(enquiry: RegistrationEnquiry): void {
    try {
      const all = this.readLocal();
      all.unshift(enquiry);
      localStorage.setItem('mab-enquiries', JSON.stringify(all.slice(0, 100)));
    } catch { /* ignore */ }
  }

  private async sendToGoogleForm(enquiry: RegistrationEnquiry): Promise<void> {
    // Map fields to Google Form `entry.<id>` names in environment/README.
    const body = new URLSearchParams();
    body.set('entry.studentName', enquiry.studentName);
    body.set('entry.grade', enquiry.gradeApplying);
    body.set('entry.parentName', enquiry.parentName);
    body.set('entry.phone', enquiry.phone);
    body.set('entry.email', enquiry.email);
    body.set('entry.message', enquiry.message);
    try {
      await fetch(environment.registrationGoogleFormAction, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } catch { /* best-effort */ }
  }
}
