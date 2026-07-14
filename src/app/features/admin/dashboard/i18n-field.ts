import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LocalizedText } from '../../../core/models/content.model';

/** A reusable bilingual editor field: English + Arabic inputs that mutate the
 *  same LocalizedText object in the admin draft. */
@Component({
  selector: 'app-i18n-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="i18n">
      @if (label()) { <span class="i18n__label">{{ label() }}</span> }
      <div class="i18n__pair">
        @if (multiline()) {
          <textarea rows="2" [value]="value().en" (input)="write('en', $event)" placeholder="English"></textarea>
          <textarea rows="2" dir="rtl" [value]="value().ar" (input)="write('ar', $event)" placeholder="العربية"></textarea>
        } @else {
          <input [value]="value().en" (input)="write('en', $event)" placeholder="English" />
          <input dir="rtl" [value]="value().ar" (input)="write('ar', $event)" placeholder="العربية" />
        }
      </div>
    </div>
  `,
  styles: [`
    .i18n { display: flex; flex-direction: column; gap: 0.3rem; }
    .i18n__label { font-weight: 600; font-size: 0.82rem; color: var(--ink); }
    .i18n__pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
    .i18n input, .i18n textarea {
      font-family: inherit; font-size: 0.92rem; padding: 0.55rem 0.7rem;
      border: 1.5px solid var(--line); border-radius: 10px; background: var(--paper); width: 100%;
    }
    .i18n input:focus, .i18n textarea:focus { outline: none; border-color: var(--royal); box-shadow: 0 0 0 3px color-mix(in srgb, var(--royal) 16%, transparent); }
    @media (max-width: 640px) { .i18n__pair { grid-template-columns: 1fr; } }
  `],
})
export class AdminI18nField {
  readonly label = input('');
  readonly value = input.required<LocalizedText>();
  readonly multiline = input(false);

  protected write(lang: 'en' | 'ar', event: Event): void {
    this.value()[lang] = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
  }
}
