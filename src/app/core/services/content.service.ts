import { computed, inject, Injectable, signal } from '@angular/core';
import { SiteContent } from '../models/content.model';
import { SEED_CONTENT } from './seed-content';
import { FirebaseDataService } from './firebase-data.service';

/**
 * Holds the live site content as a signal. Content is loaded ONLY from Firebase
 * (Firestore document `site/content`) — the built-in seed is no longer used to
 * render the public site. Until Firebase responds, `content()` is null and the
 * app shows a loading state (see app.html, which gates rendering on `ready()`).
 *
 * The seed is retained for a single purpose: the admin "Reset to defaults"
 * action (`resetToSeed`), so a brand-new / empty Firebase project can still be
 * populated and published from the dashboard.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly fb = inject(FirebaseDataService);

  // Was seeded with built-in defaults; now starts empty and loads only from Firebase.
  // readonly content = signal<SiteContent>(structuredClone(SEED_CONTENT));
  private readonly _content = signal<SiteContent | null>(null);

  /** Live site content. Typed non-null for consumers, but only safe to read once
   *  `ready()` is true — the app gates all rendering of it on that flag. */
  readonly content = computed(() => this._content()!);
  /** True once Firebase content has arrived and is safe to render. */
  readonly ready = computed(() => this._content() !== null);
  readonly loaded = signal(false);

  constructor() {
    void this.hydrate();
  }

  private async hydrate(): Promise<void> {
    // Load only from Firebase now — no seed fallback for public rendering.
    const remote = await this.fb.loadContent();
    this._content.set(remote);
    // Previously merged over the seed so partial docs kept working:
    // if (remote) {
    //   this.content.set({ ...structuredClone(SEED_CONTENT), ...remote });
    // }
    this.loaded.set(true);
  }

  /** Persist the current content (admin only). Returns true on success. */
  async save(next: SiteContent): Promise<boolean> {
    this._content.set(next);
    return this.fb.saveContent(next);
  }

  /** Admin utility: load the built-in defaults so an empty Firebase project can
   *  be populated in the dashboard and published with one Save. */
  resetToSeed(): void {
    this._content.set(structuredClone(SEED_CONTENT));
  }
}
