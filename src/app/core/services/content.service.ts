import { inject, Injectable, signal } from '@angular/core';
import { SiteContent } from '../models/content.model';
import { SEED_CONTENT } from './seed-content';
import { FirebaseDataService } from './firebase-data.service';

/**
 * Holds the live site content as a signal. Seeded with built-in defaults so
 * the site renders instantly. When Firebase is enabled, content is hydrated
 * from Firestore (document `site/content`) and can be saved back from admin.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly fb = inject(FirebaseDataService);

  readonly content = signal<SiteContent>(structuredClone(SEED_CONTENT));
  readonly loaded = signal(false);

  constructor() {
    void this.hydrate();
  }

  private async hydrate(): Promise<void> {
    const remote = await this.fb.loadContent();
    if (remote) {
      // Shallow-merge so newly added seed sections survive partial remote docs.
      this.content.set({ ...structuredClone(SEED_CONTENT), ...remote });
    }
    this.loaded.set(true);
  }

  /** Persist the current content (admin only). Returns true on success. */
  async save(next: SiteContent): Promise<boolean> {
    this.content.set(next);
    return this.fb.saveContent(next);
  }

  /** Restore the built-in seed content (admin utility). */
  resetToSeed(): void {
    this.content.set(structuredClone(SEED_CONTENT));
  }
}
