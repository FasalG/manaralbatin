import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';
import { ContentService } from '../../../core/services/content.service';
import { AuthService } from '../../../core/services/auth.service';
import { FirebaseDataService } from '../../../core/services/firebase-data.service';
import { RegistrationService } from '../../../core/services/registration.service';
import { StorageService } from '../../../core/services/storage.service';
import { IconComponent } from '../../../shared/components/icon/icon';
import { RegistrationEnquiry, ResourceItem, SiteContent } from '../../../core/models/content.model';

type Tab = 'content' | 'enquiries';

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class AdminDashboardPage {
  protected readonly i18n = inject(I18nService);
  protected readonly auth = inject(AuthService);
  private readonly content = inject(ContentService);
  private readonly fb = inject(FirebaseDataService);
  private readonly registration = inject(RegistrationService);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  protected readonly tab = signal<Tab>('content');
  protected readonly saving = signal(false);
  protected readonly savedMsg = signal('');
  protected readonly enquiries = signal<RegistrationEnquiry[]>([]);
  protected readonly firebaseOn = this.fb.isEnabled;

  /** A working copy the admin edits; committed on Save. */
  protected draft: SiteContent = structuredClone(this.content.content());

  constructor() {
    void this.loadEnquiries();
  }

  protected setTab(t: Tab): void {
    this.tab.set(t);
    if (t === 'enquiries') void this.loadEnquiries();
  }

  private async loadEnquiries(): Promise<void> {
    const remote = await this.fb.listEnquiries();
    const local = this.registration.readLocal();
    this.enquiries.set(remote.length ? remote : local);
    this.cdr.markForCheck();
  }

  protected async onImage(event: Event, apply: (url: string) => void): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const url = await this.storage.upload(file, 'site');
    apply(url);
    this.cdr.markForCheck();
  }

  protected setHeroImage = (url: string) => { this.draft.hero.image = url; };
  protected setPrincipalImage = (url: string) => { this.draft.principalMessage.photo = url; };

  /** Uploads a downloadable document (brochure, calendar, PDF…) for a resource. */
  protected async onResourceFile(event: Event, resource: ResourceItem): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    resource.fileUrl = await this.storage.upload(file, 'resources');
    this.cdr.markForCheck();
  }

  protected async save(): Promise<void> {
    this.saving.set(true);
    const ok = await this.content.save(structuredClone(this.draft));
    this.saving.set(false);
    this.savedMsg.set(
      ok
        ? this.i18n.pick({ en: 'Saved and published.', ar: 'تم الحفظ والنشر.' })
        : this.i18n.pick({ en: 'Saved to this session (connect Firebase to publish).', ar: 'حُفظ في الجلسة (اربط Firebase للنشر).' }),
    );
    setTimeout(() => { this.savedMsg.set(''); this.cdr.markForCheck(); }, 4000);
  }

  protected resetDraft(): void {
    this.content.resetToSeed();
    this.draft = structuredClone(this.content.content());
    this.savedMsg.set(this.i18n.pick({ en: 'Reset to default content.', ar: 'تمت الاستعادة للمحتوى الافتراضي.' }));
  }

  protected async signOut(): Promise<void> {
    await this.auth.signOutUser();
    this.router.navigate(['/']);
  }

  protected exportEnquiries(): void {
    const rows = this.enquiries();
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => `"${String((r as unknown as Record<string, unknown>)[h] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registration-enquiries.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
