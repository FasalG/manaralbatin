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
import { AdminI18nField } from './i18n-field';
import {
  Accreditation, CalendarEvent, FacultyMember, Feature, FeeRow, GalleryImage,
  LocalizedText, RegistrationEnquiry, Requirement, ResourceItem, SiteContent,
} from '../../../core/models/content.model';

type Tab = 'content' | 'enquiries';

const blankText = (): LocalizedText => ({ en: '', ar: '' });

@Component({
  selector: 'app-admin-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, IconComponent, AdminI18nField],
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

  readonly uploading = signal<string | null>(null);

  /** Bilingual label helper for the editor UI. */
  protected pick(en: string, ar: string): string {
    return this.i18n.pick({ en, ar });
  }

  /** Uploads a picked file (auto-compressed) and returns its URL, or null. */
  private async uploadPicked(event: Event, folder: string, key: string): Promise<string | null> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return null;
    this.uploading.set(key);
    try {
      return await this.storage.upload(file, folder);
    } finally {
      this.uploading.set(null);
      input.value = '';
      this.cdr.markForCheck();
    }
  }

  protected async onImage(event: Event, apply: (url: string) => void): Promise<void> {
    const url = await this.uploadPicked(event, 'site', 'single');
    if (url) { apply(url); this.cdr.markForCheck(); }
  }

  protected setLogoImage = (url: string) => { this.draft.school.logoUrl = url; };
  protected setHeroImage = (url: string) => { this.draft.hero.image = url; };
  protected setPrincipalImage = (url: string) => { this.draft.principalMessage.photo = url; };
  protected setDirectorImage = (url: string) => { this.draft.directorMessage.photo = url; };

  protected async onFacilityImage(event: Event, item: { image: string; slug: string }): Promise<void> {
    const url = await this.uploadPicked(event, 'facilities', 'fac-' + item.slug);
    if (url) { item.image = url; this.cdr.markForCheck(); }
  }

  protected async onGalleryImage(event: Event, item: { src: string }, i: number): Promise<void> {
    const url = await this.uploadPicked(event, 'gallery', 'gal-' + i);
    if (url) { item.src = url; this.cdr.markForCheck(); }
  }

  protected async onFacultyImage(event: Event, item: { photo: string }, i: number): Promise<void> {
    const url = await this.uploadPicked(event, 'faculty', 'fac-m-' + i);
    if (url) { item.photo = url; this.cdr.markForCheck(); }
  }

  /** Uploads a downloadable document (brochure, calendar, PDF…) for a resource. */
  protected async onResourceFile(event: Event, resource: ResourceItem): Promise<void> {
    const url = await this.uploadPicked(event, 'resources', 'res');
    if (url) { resource.fileUrl = url; this.cdr.markForCheck(); }
  }

  // ---- Add / remove list items ----
  protected removeAt<T>(list: T[], i: number): void {
    list.splice(i, 1);
    this.cdr.markForCheck();
  }

  protected addFeature(): void {
    this.draft.features.push({ icon: 'star', title: blankText(), text: blankText() } as Feature);
  }
  protected addAccreditation(): void {
    this.draft.accreditations.push({ name: blankText(), note: blankText(), logo: '' } as Accreditation);
  }
  protected addFaculty(): void {
    this.draft.faculty.push({ name: blankText(), role: blankText(), subject: blankText(), photo: '' } as FacultyMember);
  }
  protected addGallery(): void {
    this.draft.gallery.push({ src: '', caption: blankText(), category: 'campus' } as GalleryImage);
  }
  protected addCalendar(): void {
    this.draft.calendar.push({ date: blankText(), title: blankText(), type: 'event' } as CalendarEvent);
  }
  protected addFee(): void {
    this.draft.fees.push({ grade: blankText(), tuition: '', registration: '', note: blankText() } as FeeRow);
  }
  protected addRequirement(): void {
    this.draft.requirements.push({ text: blankText() } as Requirement);
  }
  protected addValue(): void {
    this.draft.aim.values.push({ title: blankText(), text: blankText() });
  }
  protected addResource(): void {
    this.draft.resources.push({ icon: 'download', title: blankText(), description: blankText(), fileUrl: '', fileLabel: 'PDF' } as ResourceItem);
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
